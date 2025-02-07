"use server";

import { db } from "@/db/db";
import { attendees } from "@/db/schema";
import { RegisterFormData, registerSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export const createRegistration = async (formData: RegisterFormData) => {
    try {
        const validatedData = registerSchema.parse(formData);

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
    }
};
