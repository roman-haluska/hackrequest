import { fetchUsersByEvents } from './usersByEvent-fetch'
import { UsersDashboard } from './UsersDashboard'


export default async function Page({ params }: { params: { id: number } }) {
    const users = await fetchUsersByEvents(params.id)
    return <UsersDashboard users={users} />
}
