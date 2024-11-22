import { db } from "@/lib/db";

export const getAccountById = async (id: string) => {
    try {
        const account = await db.account.findUnique({
            where: {
                id
            }
        });
        return account;
    } catch (error) {
        return null;
    }
}