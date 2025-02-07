import { z } from 'zod'

export const registerSchema = z.object({
<<<<<<< HEAD
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
        })
    ),
})
=======
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    gender: z.string().min(1, "Gender is required"),
    birthDate: z.date().refine(date => !isNaN(date.getTime()), "Invalid date format"),
    category: z.string().min(1, "Category is required"),
    city: z.string().min(1, "City is required"),
    club: z.string().optional(),
    eventId: z.number().min(1, "Event is required"),
});
>>>>>>> 77f5fc7eb2ddd424407ba827370773fc02abb1e7

export type RegisterFormData = z.infer<typeof registerSchema>
