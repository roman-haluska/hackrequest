"use server";

import { db } from "@/db/db";
import { users } from "@/db/schema";

export async function createUser(formData: FormData) {
    try {
        await db.insert(users).values({
            fullName: formData.get("fullName") as string,
            phone: formData.get("phone") as string,
        });

        return { success: true };
    } catch (e) {
        return { error: "Failed to create user", source: e };
    }
}
