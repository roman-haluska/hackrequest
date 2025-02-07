import { RegisterForm } from '@/components/register-user'
import { events } from '@/db/schema'
import { db } from '@/db/db'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'

export default async function RegisterPage({
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

    return (
        <div className='min-h-screen flex items-center justify-center p-4 flex-col'>
            <h1 className='font-bold text-3xl'>Registrácia na udalost</h1>
            <RegisterForm eventId={eventId} />
        </div>
    )
}
