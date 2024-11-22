"use client";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { LoginButton } from "@/components/auth/LoginButton";
import { useRouter } from "next/navigation"; // For client-side navigation

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login"); // Client-side navigation
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold drop-shadow-md text-white",
            font.className
          )}
        >
          🔐 Auth
        </h1>
        <p className="text-white text-lg">A simple Authentication Service</p>
        <div>
          <LoginButton mode="redirect">
            <Button variant="secondary" size="lg" onClick={handleClick}>
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
