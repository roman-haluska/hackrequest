import { AdminDashboard } from '../AdminDashboard'
import { fetchUsersByEvents } from './usersByEvent-fetch'


export default async function Page({ params }: { params: { id: number } }) {
    const users = await fetchUsersByEvents(params.id)
    return <AdminDashboard users={users} />
}
