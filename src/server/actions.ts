'use server'

import { db } from '@/db/db'
import { attendees, eventRegistrations } from '@/db/schema'
import { RegisterFormData, registerSchema } from '@/lib/schemas'

import { sendMail } from './emails'
import { eq } from 'drizzle-orm'

import Stripe from 'stripe'
import { redirect } from 'next/navigation'

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-01-27.acacia', // specify the Stripe API version
})

export const createRegistration = async (formData: RegisterFormData, eventId: number) => {
    let sessionUrl: string | null = null

    try {
        const validatedData = registerSchema.parse(formData)

        const promises = validatedData.users.map(async (user) => {
            let attendeeId: number

            const [existingAttendee] = await db.select().from(attendees).where(eq(attendees.email, user.email))

            if (!existingAttendee) {
                const [{ id }] = await db
                    .insert(attendees)
                    .values({
                        fullName: user.fullName,
                        email: user.email,
                        gender: user.gender,
                        dateOfBirth: user.birthDate.toISOString(),
                        city: user.city,
                        club: user.club,
                    })
                    .returning({ id: attendees.id })
                attendeeId = id
            } else {
                attendeeId = existingAttendee.id
            }

            // formData.eventId
            await db.insert(eventRegistrations).values({
                eventId,
                attendeeId: attendeeId,
            })

            await sendMail({
                userEmail: user.email,
                userName: user.fullName,
            })
        })

        await Promise.all(promises)

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: 'price_1QpoxqDIK8aT4FWPuNrig7ve',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            payment_method_types: ['card'],
            // customer_email: email, // Use the email from parameters
            // success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000/payment-result'}?success=true&registrationIds=${eventRegistrationsResults.map((eventRegistration) => eventRegistration.id).join(',')}`,
            success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000/payment-result'}?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000/payment-result'}?canceled=true`,
        })

        if (!session.url) {
            console.error('No URL found')
            throw new Error('No URL found')
        }

        sessionUrl = session.url
    } catch (e) {
        console.log('error', e)
        return { error: 'Failed to create users', source: e }
    }

    return redirect(sessionUrl)
}
