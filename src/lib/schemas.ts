import { z } from 'zod'

export const registerSchema = z.object({
    users: z.array(
        z.object({
            fullName: z.string().min(1, 'Pohlavie je povinné'),
            email: z.string().email('Neplatná emailová adresa'),
            gender: z.string().min(1, 'Pohlavie je povinné'),
            birthDate: z
                .date()
                .refine(
                    (date) => !isNaN(date.getTime()),
                    'Neplatný formát dátumu'
                ),
            category: z.string().min(1, 'Kategória je povinná'),
            city: z.string().optional(),
            club: z.string().optional(),
        }),
    )
})

export type RegisterFormData = z.infer<typeof registerSchema>
