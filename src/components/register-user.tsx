'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { createUser } from '@/server/actions'
import { registerSchema, type RegisterFormData } from '@/lib/schemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/datePicker'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition()

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: '',
            email: '',
            gender: '',
            birthDate: new Date(),
            category: '',
            city: '',
            club: '',
        },
    })

    const onSubmit = (values: RegisterFormData) => {
        startTransition(async () => {
            const result = await createUser(values)
            if (result.success) {
                form.reset()
            }
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-full max-w-md space-y-4'
            >
                <FormField
                    control={form.control}
                    name='fullName'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder='John Doe' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='example@example.com'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='gender'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                                <Input placeholder='Male/Female' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='birthDate'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Birth Date</FormLabel>
                            <FormControl>
                                <DatePicker {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='category'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Select {...field}>
                                    <SelectTrigger className='w-[180px]'>
                                        <SelectValue placeholder='Theme' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='light'>
                                            Light
                                        </SelectItem>
                                        <SelectItem value='dark'>
                                            Dark
                                        </SelectItem>
                                        <SelectItem value='system'>
                                            System
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='city'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City (optional)</FormLabel>
                            <FormControl>
                                <Input placeholder='City' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='club'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Club (optional)</FormLabel>
                            <FormControl>
                                <Input placeholder='Club' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit' className='w-full' disabled={isPending}>
                    {isPending ? 'Submitting...' : 'Register'}
                </Button>
            </form>
        </Form>
    )
}
