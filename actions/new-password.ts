"use server"

import { getPasswordResetTokenByToken } from "@/data/reset-token"
import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"
import { NewPasswordSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import { z } from "zod"

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token: string) => {
    const validataion = NewPasswordSchema.safeParse(values);
    if (!validataion.success) return { error: "Invalid Mail" };

    const checkToken = await getPasswordResetTokenByToken(token);
    if (!checkToken) return { error: "Invalid Token" };

    if (new Date() > new Date(checkToken.expires)) return { error: "Token Expired" };

    const user = await getUserByEmail(checkToken.email);
    if (!user) return { error: "User not found" };

    const hashedPassword = await bcrypt.hash(validataion.data.password, 10);

    // Update user password
    await db.user.update({
        where: {
            id: user.id
        },
        data: {
            password: hashedPassword
        }
    });

    // Delete token
    await db.passwordResetToken.delete({
        where: {
            token
        }
    });
    return { success: "Your Password is Changed" };
}