"use server";

import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/currentRole";


export const admin = async () => {
    const role = await currentRole();
    if (role === UserRole.ADMIN) {
        return { success: "Allowed by Server" };
    } else {
        return { error: "Forbidden API Route!" };
    }
}