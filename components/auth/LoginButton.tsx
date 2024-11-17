"use client"

interface LoginProps {
    children: React.ReactNode;
    mode?: "modal" | 'redirect',
    asChild?: boolean;
}

export const LoginButton = ({children, mode = "redirect"}: LoginProps)  => {

    const click = () => {
        console.log("Login Button onclicked");
    }

    if (mode == "modal") {
        return (
            <span>
                Have to implement modals
            </span>
        )
    }

    return (
        <span onClick={click} className="cursor-pointer">
            {children}
        </span>
    )
}