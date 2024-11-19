"use server"

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { z } from "zod"

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validation = ResetSchema.safeParse(values);   
    if (!validation.success) return { error: "Invalid Mail" };

    const { email } = validation.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser) return { error: "User not found" };



    return { success: "Reset link sent to your mail" };
}