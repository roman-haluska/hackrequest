'use server'

import { db } from '@/db/db'
import { attendees, eventRegistrations } from '@/db/schema'
import { RegisterFormData, registerSchema } from '@/lib/schemas'
import { revalidatePath } from 'next/cache'

import { sendMail } from './emails'
import { eq } from 'drizzle-orm'

export const createRegistration = async (formData: RegisterFormData) => {
    try {
        const validatedData = registerSchema.parse(formData)

<<<<<<< HEAD
        const usersToInsert = validatedData.users.map(user => ({
            fullName: user.fullName,
            email: user.email,
            gender: user.gender,
            dateOfBirth: user.birthDate.toISOString(),
            city: user.city,
            club: user.club,
        }));

        await db.insert(attendees).values(usersToInsert);
        revalidatePath("/");
        return { success: true };
    } catch (e) {
        console.log('error', e);
        return { error: "Failed to create users", source: e };
=======
        let attendeeId: number

        const [existingAttendee] = await db.select().from(attendees).where(eq(attendees.email, validatedData.email))

        if (!existingAttendee) {
            const [{ id }] = await db
                .insert(attendees)
                .values({
                    fullName: validatedData.fullName,
                    email: validatedData.email,
                    gender: validatedData.gender,
                    dateOfBirth: validatedData.birthDate.toISOString(),
                    city: validatedData.city,
                    club: validatedData.club,
                })
                .returning({ id: attendees.id })
            attendeeId = id
        } else {
            attendeeId = existingAttendee.id
        }

        await db.insert(eventRegistrations).values({
            eventId: formData.eventId,
            attendeeId: attendeeId,
        })

        await sendMail({
            userEmail: validatedData.email,
            userName: validatedData.fullName,
        })

        revalidatePath('/')
        return { success: true }
    } catch (e) {
        console.log('error', e)
        return { error: 'Failed to create user', source: e }
>>>>>>> 77f5fc7eb2ddd424407ba827370773fc02abb1e7
    }
}
