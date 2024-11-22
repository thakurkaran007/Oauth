"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import bcrypt from 'bcryptjs';
import { currentUser } from "@/lib/currentUser";
import { db } from "@/lib/db";
import { SettingSchema } from "@/schemas";
import * as z from 'zod';

export const settings = async (values: z.infer<typeof SettingSchema>) => {
    const user = await currentUser();
    if (!user) return { error: "Unauthorized" };

    if (user.isOAuth) {
        values.email = undefined;
        values.password = undefined
        values.newPassword = undefined
    }

    const dbUser = await getUserById(user.id || '');
    if (!dbUser) return { error: "User not found" };

    if (values.email && values.email !== dbUser.email) {
        const existingUser = await getUserByEmail(values.email);
        if (existingUser && existingUser.id !== user.id) return { error: "Email already exists" };
    }

    if (!dbUser.password || dbUser.password === '') return { error: "Password not found" };
    const confirmOld = await bcrypt.compare(values.password || '', dbUser.password);
    if (!confirmOld) return { error: "Old Password is incorrect" };

    await db.user.update({
        where: {
            id: dbUser.id
        },
        data: {
            ...values
        }
    })
    return { success: "Settings updated!" };
}