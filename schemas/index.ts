import * as z from 'zod';

export const ResetSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address'
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address'
    }),
    password: z.string().min(1, {
        message: 'Password is required'
    }),
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
    })
});