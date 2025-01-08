"use client";

import { createUser } from "@/server/actions";
import { useTransition } from "react";

export function UserForm() {
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            const result = await createUser(formData);
            if (result.success) {
                (
                    document.getElementById("userForm") as HTMLFormElement
                ).reset();
            }
        });
    }

    return (
        <form
            id="userForm"
            action={handleSubmit}
            className="w-full max-w-md space-y-4">
            <div>
                <label
                    htmlFor="fullName"
                    className="block text-sm font-medium mb-1">
                    Full Name
                </label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div>
                <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1">
                    Phone
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50">
                {isPending ? "Creating..." : "Create User"}
            </button>
        </form>
    );
}
