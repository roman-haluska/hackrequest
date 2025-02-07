// src/app/admin/server-fetch.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '@/db/db'
import { attendees, eventRegistrations, events } from '@/db/schema'
import { eq, getTableColumns } from 'drizzle-orm'

export const fetchUsers = async () => {
    const supabase = createServerComponentClient({ cookies })
    const {
        data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
        redirect('/login')
    }
    const users = await db
        .select({
            ...getTableColumns(attendees),
            eventName: events.name,
            eventId: events.id,
        })
        .from(attendees)
        .leftJoin(eventRegistrations, eq(attendees.id, eventRegistrations.attendeeId))
        .leftJoin(events, eq(eventRegistrations.eventId, events.id))

    return users
}

export type AttendesWithEvent = Awaited<ReturnType<typeof fetchUsers>>
