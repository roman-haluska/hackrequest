import { fetchUsersByEvents } from './attendeesByEvent-fetch'
import { AttendeesDashboard } from './AttendeesDashboard'


export default async function Page({ params }: { params: { id: number } }) {
    const users = await fetchUsersByEvents(params.id)
    return <AttendeesDashboard users={users} />
}
