"use client";

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '../ui/Button';
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const Social = () => {
    const on = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        });
    };

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size="lg"
                className="w-full"
                variant={"outline"}
                onClick={() => on("google")}
            >
                <FcGoogle className="w-6 h-6" />
            </Button>
            <Button
                size="lg"
                className="w-full"
                variant={"outline"}
                onClick={() => on("github")}
            >
                <FaGithub className="w-6 h-6" />
            </Button>
        </div>
    );
};
