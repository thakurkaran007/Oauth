"use server"

import * as z from "zod"
import { SignupSchema } from "@/schemas";
import bycrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";


const Signup = async (values: z.infer<typeof SignupSchema>) => {
    console.log("Signup Triggered Bro: ", values);
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
    return { success: "User created" };
}

export default Signup;