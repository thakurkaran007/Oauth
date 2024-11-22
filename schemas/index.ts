import { UserRole } from '@prisma/client';
import * as z from 'zod';

export const ResetSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address'
    }),
});

export const SettingSchema = z.object({
    name: z.string().optional(),
    password: z.string().min(6).optional(),
    newPassword: z.string().min(6).optional(),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.string().email({ message: 'Invalid email address' }).optional()
})
    .refine(data => {
        if (data.password && !data.newPassword) {
            return false;
        }
        return true;
    }, {
        message: 'New password is required',
        path: ['newPassword']
    }
    )
    .refine(data => {
        if (!data.password && data.newPassword) {
            return false;
        }
        return true;
    },
        {
            message: 'Current password is required',
            path: ['password']
        }
)

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: 'Minimum 6 characters is required'
    })
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address'
    }),
    password: z.string().min(1, {
        message: 'Password is required'
    }),
    code: z.string().optional()
});

export const SignupSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address'
    }),
    password: z.string().min(6, {
        message: 'Minimum 6 characters is required'
    }),
    name: z.string().min(1, {
        message: 'Name is required'
    }),
    code: z.string().optional()
});