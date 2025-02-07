import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { LogoutButton } from '@/components/logout-button'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { db } from '@/db/db'
import { attendees } from '@/db/schema'


export default async function AdminDashboard() {
  const supabase = createServerComponentClient({ cookies })

  const { data: { session } } = await supabase.auth.getSession()
	// fetch users
  if (!session) {
    redirect('/login')
  }

  const users = await db.select().from(attendees)

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>
	  <div>
			<h1>Admin Page</h1>
			<Table>
				<TableHeader>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Phone</TableCell>
						<TableCell>City</TableCell>
						<TableCell>Category</TableCell>
						<TableCell>Club</TableCell>
						<TableCell>Date of birth</TableCell>
						<TableCell>Gender</TableCell>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{user.id}</TableCell>
							<TableCell>{user.fullName}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.phone}</TableCell>
							<TableCell>{user.city}</TableCell>
							<TableCell>{user.category}</TableCell>
							<TableCell>{user.club}</TableCell>
							<TableCell>{user.dateOfBirth}</TableCell>
							<TableCell>{user.gender}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
    </div>
  )
}
