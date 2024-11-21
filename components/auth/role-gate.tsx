"use client"

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";

interface roleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole
}

export const RoleGate = ({children, allowedRole}: roleGateProps) => {
    const role = useCurrentRole();
    if (allowedRole !== role) {
        return (
            <FormError message="You donot have permission to see the page"/>
        )
    }
    return (
        <>
            {children}
        </>
    )
}   