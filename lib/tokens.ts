import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { getPasswordResetTokenByEmail } from '@/data/reset-token';
import { getTwoFactorTokenByEmail } from '@/data/twoFactor-token';

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 1000 * 3600);
    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            token,
            email,
            expires
        }
    });
    return verificationToken;
}


export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 1000 * 60);
    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }
    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            token,
            email,
            expires
        }
    });
    return passwordResetToken;
}

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100000,1000000).toString();
    const expires = new Date(new Date().getTime() + 1000 * 5 * 60);

    const existingToken = await getTwoFactorTokenByEmail(email);
    if (existingToken) {
        await db.twoFactorToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            token,
            email,
            expires
        }
    })

    return twoFactorToken;
}