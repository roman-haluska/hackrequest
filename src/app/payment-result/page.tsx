// import PaymentResultConfirmation from '@/components/payment-result-confirmation'
import { buttonVariants } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Výsledok platby',
    description: 'Stránka potvrdenia platby',
}

export default async function PaymentResult({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const isSuccess = searchParams?.success === 'true'
    const isCanceled = searchParams?.canceled === 'true'

    return (
        <>
            <main className='min-h-screen flex items-center justify-center' >
                <div className='max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center'>
                    {isSuccess ? (
                        // Success SVG and message
                        <>
                            <div className='w-24 h-24 mx-auto mb-6'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    className='text-green-500'
                                >
                                    <circle cx='12' cy='12' r='11' stroke='currentColor' strokeWidth='2' />
                                    <path
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        d='M7 13l3 3 7-7'
                                    />
                                </svg>
                            </div>
                            <h1 className='text-2xl font-bold text-gray-900 mb-4'>Platba úspešná!</h1>
                            <p className='text-gray-600 mb-8'>
                                Ďakujeme za váš nákup. Čoskoro vám bude doručený potvrdzujúci email.
                            </p>
                        </>
                    ) : isCanceled ? (
                        // Canceled SVG and message
                        <>
                            <div className='w-24 h-24 mx-auto mb-6'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    className='text-yellow-500'
                                >
                                    <circle cx='12' cy='12' r='11' stroke='currentColor' strokeWidth='2' />
                                    <path
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        d='M12 7v6M12 17.01l.01-.011'
                                    />
                                </svg>
                            </div>
                            <h1 className='text-2xl font-bold text-gray-900 mb-4'>Platba zrušená</h1>
                            <p className='text-gray-600 mb-8'>
                                Vaša platba bola zrušená. Žiadne poplatky neboli účtované.
                            </p>
                        </>
                    ) : (
                        // Error SVG and message
                        <>
                            <div className='w-24 h-24 mx-auto mb-6'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    className='text-red-500'
                                >
                                    <circle cx='12' cy='12' r='11' stroke='currentColor' strokeWidth='2' />
                                    <path
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        d='M8 8l8 8M16 8l-8 8'
                                    />
                                </svg>
                            </div>
                            <h1 className='text-2xl font-bold text-gray-900 mb-4'>Chyba platby</h1>
                            <p className='text-gray-600 mb-8'>Pri platbe sa vyskytla chyba. Prosím, skúste to znova.</p>
                        </>
                    )}

                    <Link href='/' className={buttonVariants()}>
                        Domov
                    </Link>
                </div>
            </main>
            {/* <PaymentResultConfirmation /> */}
        </>
    )
}
