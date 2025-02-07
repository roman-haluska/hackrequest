'use server'

import { db } from '@/db/db'
import { attendees } from '@/db/schema'
import { RegisterFormData, registerSchema } from '@/lib/schemas'
import { revalidatePath } from 'next/cache'

import { sendMail } from './emails'

export const createRegistration = async (formData: RegisterFormData) => {
    try {
        const validatedData = registerSchema.parse(formData)

        await db.insert(attendees).values({
            fullName: validatedData.fullName,
            email: validatedData.email,
            gender: validatedData.gender,
            dateOfBirth: validatedData.birthDate.toISOString(),
            city: validatedData.city,
            club: validatedData.club,
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
    }
}
