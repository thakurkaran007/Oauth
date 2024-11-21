"use server"

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { z } from "zod"
import { generatePasswordResetToken } from "@/lib/tokens"
import { sendResetPasswordMail } from "@/lib/mail"

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validation = ResetSchema.safeParse(values);   
    if (!validation.success) return { error: "Invalid Mail" };

    const { email } = validation.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser) return { error: "User not found" };

    const resetToken = await generatePasswordResetToken(email);
    await sendResetPasswordMail(resetToken.email, resetToken.token);

    return { success: "Reset link sent to your mail" };
}