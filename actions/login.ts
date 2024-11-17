"use server"

import { LoginSchema } from "@/schemas";
import * as z from "zod"
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";


const Login = async (values: z.infer<typeof LoginSchema>) => {
    const validation = LoginSchema.safeParse(values);

    if (!validation.success) {
        return { error: "Invalid input" };
    } 
    
    const { email, password } = validation.data;

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