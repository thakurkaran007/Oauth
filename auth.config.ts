import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from './schemas';
import { getUserByEmail } from './data/user';
import bcrypt from 'bcryptjs';


export default {
    providers: [
        Credentials({
            async authorize(credentials): Promise<any> {
                const validateFields = LoginSchema.safeParse(credentials);
                if (validateFields.success) {
                    const { email, password } = validateFields.data;

                    const user = await getUserByEmail(email);

                    if (!user || !user.password) return null;

                    const comparePassword = await bcrypt.compare(password, user.password);

                    if (!comparePassword) return null;

                    if (comparePassword) {
                        return user;
                    }

                    return null;
                }
            }
        })
    ],
    secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;