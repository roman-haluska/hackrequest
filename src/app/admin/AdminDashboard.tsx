// src/app/admin/page.tsx
'use client'
import React, { useState } from 'react'
import { LogoutButton } from '@/components/logout-button'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'

export const AdminDashboard = ({ users }) => {
	const [searchQuery, setSearchQuery] = useState('')
	const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' })

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value)
	}

	const handleSort = (key) => {
		let direction = 'ascending'
		if (sortConfig.key === key && sortConfig.direction === 'ascending') {
			direction = 'descending'
		}
		setSortConfig({ key, direction })
	}

	const sortedUsers = [...users].sort((a, b) => {
		if (a[sortConfig.key] < b[sortConfig.key]) {
			return sortConfig.direction === 'ascending' ? -1 : 1
		}
		if (a[sortConfig.key] > b[sortConfig.key]) {
			return sortConfig.direction === 'ascending' ? 1 : -1
		}
		return 0
	})

	const filteredUsers = sortedUsers.filter((user) =>
		user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
		user.email.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<div className="container mx-auto p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Dashboard</h1>
				<LogoutButton />
			</div>
			<div className="mb-4">
				<input
					type="text"
					placeholder="Search..."
					value={searchQuery}
					onChange={handleSearchChange}
					className="p-2 border border-gray-300 rounded"
				/>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableCell onClick={() => handleSort('id')}>ID</TableCell>
						<TableCell onClick={() => handleSort('fullName')}>Name</TableCell>
						<TableCell onClick={() => handleSort('email')}>Email</TableCell>
						<TableCell onClick={() => handleSort('phone')}>Phone</TableCell>
						<TableCell onClick={() => handleSort('city')}>City</TableCell>
						<TableCell onClick={() => handleSort('category')}>Category</TableCell>
						<TableCell onClick={() => handleSort('club')}>Club</TableCell>
						<TableCell onClick={() => handleSort('dateOfBirth')}>Date of birth</TableCell>
						<TableCell onClick={() => handleSort('gender')}>Gender</TableCell>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredUsers.map((user) => (
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
	)
}
