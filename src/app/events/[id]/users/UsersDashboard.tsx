'use client'

import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { Attendee } from '@/db/schema'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { AttendesByEventWithEvent } from './usersByEvent-fetch'
import { Button } from '@/components/ui/button'

type Props = {
    users: AttendesByEventWithEvent
}

export const UsersDashboard = (props: Props) => {
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
    })

    const filteredUsers = sortedUsers.filter(
        (user) =>
            user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.club?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.category?.toLowerCase().includes(searchQuery.toLowerCase())
    )

 const exportToPDF = () => {
  const doc = new jsPDF()
  doc.autoTable({
   head: [['ID', 'Name', 'Category', 'Club']],
   body: filteredUsers.map((user) => [
    user.id,
    user.fullName,
    user.category || '-',
    user.club || '-',
   ]),
   styles: {
       // 255, 191, 0
    fillColor: [255, 191, 0],
    textColor: [0,0,0],
   },
   headStyles: {
    fillColor: [255, 191, 0],
    textColor: [0,0,0],
    fontStyle: 'bold',
   },
   bodyStyles: {
    fillColor: [255, 255, 255],
    textColor: [0, 0, 0],
   },
   alternateRowStyles: {
    fillColor: [245, 245, 245],
   },
  })
  doc.save('users.pdf')
 }

    return (
        <div className='container mx-auto p-6 min-h-screen '>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold text-gray-800'>Zoznam registrovaných účastníkov</h1>
            </div>

            <div className='mb-4 flex space-x-4'>
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className='p-2 border border-gray-300 rounded flex-grow'
                />
                <Button onClick={exportToPDF}>
                    Export to PDF
                </Button>
            </div>
            <Table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
                <TableHeader className='bg-primary text-black'>
                    <TableRow>
                        {[
                            'id',
                            'fullName',
                            'category',
                            'club',
                        ].map((key) => (
                            <TableCell
                                key={key}
                                onClick={() => handleSort(key as keyof Attendee)}
                                className='cursor-pointer p-4 font-semibold'
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredUsers.map((user) => (
                        <TableRow key={user.id} className='hover:bg-gray-100'>
                            <TableCell className='p-4 border-b'>{user.id}</TableCell>
                            <TableCell className='p-4 border-b'>{user.fullName}</TableCell>
                            <TableCell className='p-4 border-b'>{user.category || '-'}</TableCell>
                            <TableCell className='p-4 border-b'>{user.club || '-'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
