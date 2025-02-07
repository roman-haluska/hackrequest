// src/app/admin/AdminDashboard.tsx
'use client'
import React, { useState } from 'react'
import { LogoutButton } from '@/components/logout-button'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { Attendee } from '@/db/schema'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { format } from 'date-fns'

type Props = {
 users: Attendee[]
}

export const AdminDashboard = (props: Props) => {
 const { users } = props
 const [searchQuery, setSearchQuery] = useState('')
 const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' })

 const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(event.target.value)
 }

 const handleSort = (key: keyof Attendee) => {
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
  user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  user.email?.toLowerCase().includes(searchQuery.toLowerCase())
 )

 const exportToPDF = () => {
  const doc = new jsPDF()
  doc.autoTable({
   head: [['ID', 'Name', 'Email', 'City', 'Category', 'Club', 'Date of Birth', 'Gender']],
   body: filteredUsers.map(user => [
    user.id,
    user.fullName,
    user.email,
    user.city,
    user.category,
    user.club,
    format(new Date(user.dateOfBirth!), 'dd.MM.yyyy'),
    user.gender
   ])
  })
  doc.save('users.pdf')
 }

 return (
  <div className="container mx-auto p-6 min-h-screen ">
   <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold text-gray-800">Zoznam registrovaných na podujatie</h1>
    <LogoutButton />
   </div>
   <div className="mb-4 flex space-x-4">
    <input
     type="text"
     placeholder="Search..."
     value={searchQuery}
     onChange={handleSearchChange}
     className="p-2 border border-gray-300 rounded flex-grow"
    />
    <button
     onClick={exportToPDF}
     className="p-2 bg-[#ff9a00] text-white rounded"
    >
     Export to PDF
    </button>
   </div>
   <Table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
    <TableHeader className="bg-[#ff9a00] text-white">
     <TableRow>
      {['id', 'fullName', 'email', 'city', 'category', 'club', 'dateOfBirth', 'gender'].map((key) => (
       <TableCell
        key={key}
        onClick={() => handleSort(key as keyof Attendee)}
        className="cursor-pointer p-4 font-semibold"
       >
        {key.charAt(0).toUpperCase() + key.slice(1)}
       </TableCell>
      ))}
     </TableRow>
    </TableHeader>
    <TableBody>
     {filteredUsers.map((user) => (
      <TableRow key={user.id} className="hover:bg-gray-100">
       <TableCell className="p-4 border-b">{user.id}</TableCell>
       <TableCell className="p-4 border-b">{user.fullName}</TableCell>
       <TableCell className="p-4 border-b">{user.email}</TableCell>
       <TableCell className="p-4 border-b">{user.city}</TableCell>
       <TableCell className="p-4 border-b">{user.category || '-'}</TableCell>
       <TableCell className="p-4 border-b">{user.club || '-'}</TableCell>
       <TableCell className="p-4 border-b">{format(new Date(user.dateOfBirth!), 'dd.MM.yyyy')}</TableCell>
       <TableCell className="p-4 border-b">{user.gender}</TableCell>
      </TableRow>
     ))}
    </TableBody>
   </Table>
  </div>
 )
}
