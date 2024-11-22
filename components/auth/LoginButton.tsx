"use client"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";

interface LoginProps {
    children: React.ReactNode;
    mode?: "modal" | 'redirect',
    asChild?: boolean;
}

export const LoginButton = ({children, mode}: LoginProps)  => {


    if (mode == "modal") {
        return (
            <Dialog>
                <DialogTrigger>
                    {children}
                </DialogTrigger>
                <DialogContent className="p-0 w-auto bg-transparent border-none">
                    <LoginForm />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <span className="cursor-pointer">
            {children}
        </span>
    )
}