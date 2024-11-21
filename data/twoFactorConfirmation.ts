import { db } from "@/lib/db";

export const getTwoFactorConfimationbyUserId = async (userId: string) => {
    try {
        const twoFactorConfirmation = await db.twoFactorConfirmation.findFirst({
            where: {
                userId: userId
            }
        })
        return twoFactorConfirmation;
    } catch (error) {
        return null;
    }
}