import { Metadata } from 'next'

import StoreTemplate from '@modules/store/templates'

export const metadata: Metadata = {
    title: 'Store',
    description: 'Explore all of our products.',
}

type Params = {
    searchParams: {
        page?: string
    }
    params: {
        countryCode: string
    }
}

export default async function StorePage({ searchParams, params }: Params) {
    const { page } = searchParams

    return <StoreTemplate page={page} countryCode={params.countryCode} />
}
