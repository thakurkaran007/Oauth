"use server"

import { getUserByEmail } from "@/data/user";
import { sendVerifySignup } from "@/lib/mail";
import { generateTwoFactorToken } from "@/lib/tokens"

export const sendMail = async (email: string) => {
    try {
        console.log("Email verification sent")
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return { error: "Email already in use" };
        }
        const token = await generateTwoFactorToken(email);
        await sendVerifySignup(email, token.token);
        return { success: "Confirmation Email Sent!!" }; 
    } catch (error) {
        return { error: "Error sending mail" };
    }
}   