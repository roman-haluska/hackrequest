import { RegisterForm } from '@/components/register-user'

export default async function RegisterPage({
    params,
  }: {
    params: { id: string };
  }) {

    return (
        <div className='min-h-screen flex pt-10 items-center justify-center p-4 flex-col'>
            <h1 className='font-bold text-3xl'>Registrácia</h1>
            <RegisterForm eventId={Number(params.id)} />
        </div>
    )
}
