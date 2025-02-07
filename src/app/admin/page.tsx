// src/app/admin/page.tsx
import { fetchUsers } from './users-fetch'
import { AdminDashboard } from './AdminDashboard'

export default async function Page() {
	const users = await fetchUsers()
	return <AdminDashboard users={users} />
}
