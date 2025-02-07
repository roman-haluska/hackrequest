// src/app/admin/server-fetch.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '@/db/db'
import { attendees, eventRegistrations } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const fetchUsers = async () => {
	const supabase = createServerComponentClient({ cookies })
	const { data: { session } } = await supabase.auth.getSession()
	if (!session) {
		redirect('/login')
	}
	const users = await db
		.select()
		.from(attendees)
		.leftJoin(eventRegistrations, eq(attendees.id, eventRegistrations.attendeeId))

	return users
}
