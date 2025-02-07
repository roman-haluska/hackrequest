'use server'

import { Resend } from 'resend'
import EventRegistrationEmail from './email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendMail = async ({ userName, userEmail }: { userName: string; userEmail: string }) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: userEmail,
        subject: 'Potvrdenie registrácie',
        react: EventRegistrationEmail({
            userName: userName,
            eventName: 'Konferencia 2024',
            eventDate: '15. apríla 2024',
        }),
    })
}
