import { z } from "zod";

export const registerSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    gender: z.string().min(1, "Gender is required"),
    birthDate: z.date().refine(date => !isNaN(date.getTime()), "Invalid date format"),
    category: z.string().min(1, "Category is required"),
    city: z.string().min(1, "City is required"),
    club: z.string().optional(),
    eventId: z.number().min(1, "Event is required"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
