"use server"

import { LoginSchema } from "@/schemas";
import * as z from "zod"
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationMail } from "@/lib/mail";


const Login = async (values: z.infer<typeof LoginSchema>) => {

    const validation = LoginSchema.safeParse(values);

    if (!validation.success) {
        return { error: "Invalid input" };
    } 
    
    const { email, password } = validation.data;

    const existingUser = await db.user.findFirst({
        where: {
            email,
        }
    })
    if (!existingUser) return { error: "Email doesn't exist" };

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(email);

        await sendVerificationMail(verificationToken.email, verificationToken.token);

        return { success: "Confirmation mail sent" }
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