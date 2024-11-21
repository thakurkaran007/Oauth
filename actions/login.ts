"use server"

import { LoginSchema } from "@/schemas";
import * as z from "zod"
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens";
import { sendVerificationMail, sendTwoFactorMail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/twoFactor-token";
import { getTwoFactorConfimationbyUserId } from "@/data/twoFactorConfirmation";


const Login = async (values: z.infer<typeof LoginSchema>) => {

    const validation = LoginSchema.safeParse(values);
    if (!validation.success) {
        return { error: "Invalid input" };
    } 
    
    const { email, password, code } = validation.data;


    const existingUser = await db.user.findFirst({
        where: {
            email,
        }
    })

    if (!existingUser) return { error: "Email doesn't exist" };
    
    const correctPassword = bcrypt.compare(password, existingUser?.password || '');
    if (!correctPassword) return { error: "Invalid password" };

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(email);

        await sendVerificationMail(verificationToken.email, verificationToken.token);

        return { success: "Confirmation mail sent" }
    }

    if (existingUser.isTwoFactor && existingUser.email) {
        if (code) {
            const twofactorToken = await getTwoFactorTokenByEmail(email);
            if (!twofactorToken) return { error: "Invalid code" };
            if (twofactorToken.token !== code) return { error: "Invalid code" };
            const hasExpired = new Date() > new Date(twofactorToken.expires);
            if (hasExpired) return { error: "Code has expired" };
            await db.twoFactorToken.delete({
                where: {
                    id: twofactorToken.id
                }
            })
            const existingConfirmation = await getTwoFactorConfimationbyUserId(existingUser.id);
            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: existingConfirmation.id
                    }
                })
            }
            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            })
        } else {
            const twoFactorToken = await generateTwoFactorToken(email);
            await sendTwoFactorMail(existingUser.email, twoFactorToken.token);
            return { twoFactor: true };
        }
     }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
        return { success: "Logged in successfully" };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin" :
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Something went wrong" };
            }
        }
        throw error;
    }
}

export default Login;