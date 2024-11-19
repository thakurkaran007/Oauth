import { Resend } from 'resend';

const resend = new Resend(process.env.API_KEY_EMAIL);

export const sendVerificationMail = async (email: string, token: string) => {
    const confirmlink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verify your email address",
        html: `
            <h1>Verify your email address</h1>
            <p>Click the link below to verify your email address</p>
            <a href="${confirmlink}">Verify email</a>
        `
    })
}