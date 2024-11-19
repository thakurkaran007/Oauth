"use server"

import * as z from "zod"
import { SignupSchema } from "@/schemas";
import bycrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationMail } from "@/lib/mail";


const Signup = async (values: z.infer<typeof SignupSchema>) => {
    const validation = SignupSchema.safeParse(values);

    if (!validation.success) {
        return { error: "Invalid input" };
    } 
    
    const { email, password, name } = validation.data;
    const hashedPassword = await bycrypt.hash(password, 10);
    
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already in use" };
    }

    await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name
        }
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationMail(verificationToken.email, verificationToken.token);
    

    return { success: "Confirmation Email Sent!!" };
}

export default Signup;