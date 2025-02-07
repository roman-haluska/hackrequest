import { db } from '@/db/db'
import { events } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import { MapPin, Calendar, Info } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function EventDetailPage({
    params,
}: {
    params: { id: string }
}) {
  const { id } = await params

  const eventId = Number.isNaN(id) ? null : Number(id)

  if (!eventId) {
    notFound()
}
  
  const [event] = await db
      .select()
      .from(events)
      .where(eq(events.id, parseInt(id)))

  
  if (!event) {
      notFound()
  }

    const formattedStartDate = format(event.startDate, 'dd.M.yyyy')
    const formattedEndDate = format(event.endDate, 'dd.M.yyyy')
    const dateDisplay =
        event.startDate === event.endDate
            ? formattedStartDate
            : `${formattedStartDate} – ${formattedEndDate}`

    return (
        <div className='container'>
            {/* Image */}
            <div
                className='w-full h-[400px] rounded-lg bg-cover bg-center mb-8'
                style={{
                    backgroundImage: event.imageUrl
                        ? `url(${event.imageUrl})`
                        : 'linear-gradient(to bottom right, #1f2937, #111827)',
                }}
            />

            {/* Event Status */}
            {event.isCanceled && (
                <div className='mb-6'>
                    <Badge variant='destructive' className='text-lg px-4 py-2'>
                        ZRUŠENÉ
                    </Badge>
                </div>
            )}

            {/* Header */}
            <div className='mb-8'>
                <div className='flex gap-2 mb-3'>
                    <Badge variant='secondary'>{event.type}</Badge>
                    {event.eventCategory && (
                        <Badge variant='outline'>{event.eventCategory}</Badge>
                    )}
                </div>
                <h1 className='text-4xl font-bold mb-4'>{event.name}</h1>
            </div>

            {/* Details */}
            <div className='space-y-4 mb-8'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                    <Calendar className='w-5 h-5' />
                    <span>{dateDisplay}</span>
                </div>

                <div className='flex items-center gap-2 text-muted-foreground'>
                    <MapPin className='w-5 h-5' />
                    <span>{event.location}</span>
                    {event.venueDetail && (
                        <span className='text-sm'>({event.venueDetail})</span>
                    )}
                </div>
            </div>

            {/* Description */}
            {event.description && (
                <div className='prose max-w-none'>
                    <div className='flex items-center gap-2 text-xl font-semibold mb-4'>
                        <Info className='w-5 h-5' />
                        <h2>O podujatí</h2>
                    </div>
                    <p className='text-muted-foreground whitespace-pre-line'>
                        {event.description}
                    </p>
                </div>
            )}

            <div className='space-x-4'>
                {/* Registration */}
                {!event.isCanceled && (
                    <Link href={`/events/${event.id}/register`}>
                        <Button size={'lg'} className={'mt-8'}>
                            Zaregistrovať sa na udalosť
                        </Button>
                    </Link>
                )}

                <Link href={`/events/${event.id}/list`}>
                    <Button size={'lg'} className={'mt-8'} variant={'outline'}>
                        Zoznam účastníkov
                    </Button>
                </Link>
            </div>
        </div>
    )
}
