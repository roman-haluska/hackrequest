'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { useTransition } from 'react'
import { createRegistration } from '@/server/actions'
import { registerSchema, type RegisterFormData } from '@/lib/schemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { DatePicker } from '@/components/ui/datePicker'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

const GENDERS = [
    {
        id: 'Man',
        name: 'Muž',
    },
    {
        id: 'Woman',
        name: 'Žena',
    },
    {
        id: 'Other',
        name: 'Iné',
    },
]

export const RegisterForm = ({ eventId }: { eventId: number }) => {
    const [isPending, startTransition] = useTransition()

    const categories = [
        {
            id: 'osa1d',
            name: 'OSA 1 dievčatá',
            genderId: 'Woman',
            dateRangeStart: '2020',
            dateRangeEnd: '2022',
        },
        {
            id: 'osa2d',
            name: 'OSA 2 dievčatá',
            genderId: 'Woman',
            dateRangeStart: '2018',
            dateRangeEnd: '2019',
        },
        {
            id: 'osa1c',
            name: 'OSA 1 chlapci',
            genderId: 'Man',
            dateRangeStart: '2020',
            dateRangeEnd: '2022',
        },
        {
            id: 'osa2c',
            name: 'OSA 2 chlapci',
            genderId: 'Man',
            dateRangeStart: '2018',
            dateRangeEnd: '2019',
        },
    ]

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            users: [
                {
                    fullName: '',
                    email: '',
                    gender: '',
                    birthDate: new Date(),
                    category: '',
                    city: '',
                    club: '',
                },
            ],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'users',
    })

    const onSubmit = (values: RegisterFormData) => {
        startTransition(async () => {
            const result = await createRegistration(values, eventId)
            if (result.success) {
                form.reset()
            }
        })
    }

    return (
        <div className='container w-full max-w-[960] mx-auto p-4'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full space-y-12'
                >
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className='card bg-gray-100 p-8 rounded-lg relative'
                        >
                            {index !== 0 && (
                                <Button
                                    type='button'
                                    variant={'onlineDestructive'}
                                    onClick={() => remove(index)}
                                    className='absolute top-4 right-8'
                                >
                                    Odstrániť
                                </Button>
                            )}
                            <div className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name={`users.${index}.fullName`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Meno a priezvisko*
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Ján Novák'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`users.${index}.email`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email*</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='priklad@priklad.sk'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`users.${index}.gender`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pohlavie*</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='Vyberte pohlavie' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories.map(
                                                        (category) => (
                                                            <SelectItem
                                                                key={category.id}
                                                                value={
                                                                    category.id
                                                                }
                                                            >
                                                                {category.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`users.${index}.birthDate`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Dátum narodenia*
                                            </FormLabel>
                                            <FormControl>
                                                <DatePicker {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`users.${index}.category`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Kategória*</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='Vyberte kategóriu' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='OSA 1 dievčatá'>
                                                        OSA 1 dievčatá
                                                    </SelectItem>
                                                    <SelectItem value='OSA 2 dievčatá'>
                                                        OSA 2 dievčatá
                                                    </SelectItem>
                                                    <SelectItem value='OSA 1 chlapci'>
                                                        OSA 1 chlapci
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`users.${index}.city`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mesto</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Mesto'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`users.${index}.club`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Klub</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Klub'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                    <div className='space-y-4'>
                        <Button
                            type='button'
                            variant={'outline'}
                            size={'lg'}
                            onClick={() =>
                                append({
                                    fullName: '',
                                    email: '',
                                    gender: '',
                                    birthDate: new Date(),
                                    category: '',
                                    city: '',
                                    club: '',
                                })
                            }
                            className='w-full'
                        >
                            Pridať ďalšieho účastníka
                        </Button>

                        <Button
                            type='submit'
                            size={'lg'}
                            className='w-full'
                            disabled={isPending}
                        >
                            {isPending ? 'Odosiela sa...' : 'Registrovať'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
