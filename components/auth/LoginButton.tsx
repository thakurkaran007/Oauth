"use client"

interface LoginProps {
    children: React.ReactNode;
    mode?: "modal" | 'redirect',
    asChild?: boolean;
}

export const LoginButton = ({children, mode = "redirect"}: LoginProps)  => {


    if (mode == "modal") {
        return (
            <span>
                Have to implement modals
            </span>
        )
    }

    return (
        <span className="cursor-pointer">
            {children}
        </span>
    )
}