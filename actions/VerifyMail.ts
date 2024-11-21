"use server"; 

import { getTwoFactorTokenByEmail } from "@/data/twoFactor-token";
import { db } from "@/lib/db";

export const VerifyMail = async (email: string, code: string) => {
    try {
        const token = await getTwoFactorTokenByEmail(email);
        console.log("token", token)
        console.log("code", code)
        if (token?.token !== code) {
            return { error: "Invalid code" };
        } 
        await db.twoFactorToken.delete({ where: { id: token.id } });
        return { success: "Code verified" };
    } catch (error) {
        return { error: "Error sending mail" };
    }
}