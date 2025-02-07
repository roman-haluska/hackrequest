'use server'

import { db } from '@/db/db'
import { attendees, eventRegistrations } from '@/db/schema'
import { RegisterFormData, registerSchema } from '@/lib/schemas'
import { revalidatePath } from 'next/cache'

import { sendMail } from './emails'
import { eq } from 'drizzle-orm'

export const createRegistration = async (formData: RegisterFormData, eventId: number) => {
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

        revalidatePath('/')
        return { success: true }
    } catch (e) {
        console.log('error', e)
        return { error: 'Failed to create users', source: e }
    }
}