'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { createRegistration } from '@/server/actions'
import { registerSchema, type RegisterFormData } from '@/lib/schemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/datePicker'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

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
            const result = await createRegistration(values)
            if (result.success) {
                form.reset()
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-md space-y-4'>
                <FormField
                    control={form.control}
                    name='fullName'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Meno a priezvisko</FormLabel>
                            <FormControl>
                                <Input placeholder='Ján Novák' {...field} />
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
                                <Input placeholder='priklad@priklad.sk' {...field} />
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
                            <FormLabel>Pohlavie</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Vyberte kategóriu' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value='muz'>Muž</SelectItem>
                                    <SelectItem value='zena'>Žena</SelectItem>
                                    <SelectItem value='iné'>Iné</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='birthDate'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dátum narodenia</FormLabel>
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
                            <FormLabel>Kategória</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Vyberte kategóriu' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value='OSA 1 dievčatá'>OSA 1 dievčatá</SelectItem>
                                    <SelectItem value='OSA 2 dievčatá'>OSA 2 dievčatá</SelectItem>
                                    <SelectItem value='OSA 1 chlapci'>OSA 1 chlapci</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='city'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mesto (voliteľné)</FormLabel>
                            <FormControl>
                                <Input placeholder='Mesto' {...field} />
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
                            <FormLabel>Klub (voliteľné)</FormLabel>
                            <FormControl>
                                <Input placeholder='Klub' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit' className='w-full' disabled={isPending}>
                    {isPending ? 'Odosiela sa...' : 'Registrovať'}
                </Button>
            </form>
        </Form>
    )
}
