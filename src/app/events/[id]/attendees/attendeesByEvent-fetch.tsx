import { db } from '@/db/db'
import { attendees, eventRegistrations, events } from '@/db/schema'
import { eq, getTableColumns } from 'drizzle-orm'

export const fetchUsersByEvents = async (eventId: number) => {
    const users = await db
        .select({
            ...getTableColumns(attendees),
            eventName: events.name,
            eventId: events.id,
        })
        .from(attendees)
        .leftJoin(eventRegistrations, eq(attendees.id, eventRegistrations.attendeeId))
        .leftJoin(events, eq(eventRegistrations.eventId, events.id))
        .where(eq(events.id, eventId))

    return users
}

export type AttendesByEventWithEvent = Awaited<ReturnType<typeof fetchUsersByEvents>>
