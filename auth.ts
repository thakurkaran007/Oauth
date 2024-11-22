import NextAuth from 'next-auth'
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "@/lib/db"
import { getUserById } from './data/user'
import { UserRole } from '@prisma/client'
import { getTwoFactorTokenByEmail } from './data/twoFactor-token'
import { getTwoFactorConfimationbyUserId } from './data/twoFactorConfirmation'
import { getAccountById } from './data/account'

export const {
    handlers: { GET, POST }, 
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        error: '/auth/error',
        signIn: '/auth/login',
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: {
                    emailVerified: new Date()
                }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }: any) {
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id);
            if (!existingUser?.emailVerified) {
                console.log("existingUser donot exist : ", existingUser);
                return false;
            }

            if (existingUser?.isTwoFactor) {
                const twoFactorConfirmation = await getTwoFactorConfimationbyUserId(existingUser.id);
                if (!twoFactorConfirmation) {
                    console.log("twoFactorConfirmation donot exist : ", twoFactorConfirmation);
                    return false;
                }
            }
            return true;
        },
        async session({token, session}) {
            if (token.sub && session.user) session.user.id = token.sub;
            if (token.role && session.user) session.user.role = token.role as UserRole;
            if (token.isTwoFactor && session.user) session.user.isTwoFactor = token.isTwoFactor as boolean;
            if (token.email && session.user) session.user.email = token.email;
            if (token.name && session.user) session.user.name = token.name;
            if (token.isOAuth && session.user) session.user.isOAuth = token.isOAuth as boolean;
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            const existingAccount = await getAccountById(existingUser.id);

            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.isTwoFactor = existingUser.isTwoFactor;
            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
})