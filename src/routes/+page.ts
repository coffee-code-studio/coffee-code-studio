import type { PageLoad } from './$types'

export const load = (({ params }: PageLoad) => {
    return {
        title: 'Coffee Code Studio - Web Design and Development',
        description: 'At Coffee Code Studio, our mission is to deliver high quality, afforable, cutting edge web apps, for your business.',
    }
})