import { CheckboxControl } from '@wordpress/components'
import { useState, useEffect } from '@wordpress/element'
import { __ } from '@wordpress/i18n'
import { getLayoutTypes } from '@onboarding/api/DataApi'
import { PagePreview } from '@onboarding/components/PagePreview'
import { PageLayout } from '@onboarding/layouts/PageLayout'
import { useUserSelectionStore } from '@onboarding/state/UserSelections'
import { useFetch } from '../hooks/useFetch'

export const fetcher = async () => {
    // TODO: these transforms should be moved to the server eventually
    const layoutTypes = await getLayoutTypes()
    const pageRecords = layoutTypes?.data?.map((record) => ({
        id: record.id,
        slug: record.slug,
        title: record.title,
    }))
    if (!pageRecords?.length) throw new Error('Error fetching pages')

    // Home first and sort the other pages
    const homePage = pageRecords[0]
    const otherPages = pageRecords
        .slice(1)
        ?.sort((a, b) => (a.title > b.title ? 1 : -1))
    return [homePage, ...(otherPages ?? [])]
}
export const fetchData = () => {
    return { key: 'layout-types' }
}
export const SitePages = () => {
    const { data: availablePages } = useFetch(fetchData, fetcher)
    const [toggleAllPages, setToggleAllPages] = useState(false)
    const pagesSelected = useUserSelectionStore((state) => state.pages)

    // Toggle all pages on/off (except home)
    const updateToggleStatus = () => {
        availablePages?.map((page) => {
            toggleAllPages
                ? useUserSelectionStore.getState().removePage(page)
                : useUserSelectionStore.getState().addPage(page)
        })
    }

    // Every time the number of selected pages changes, update the checkbox value
    useEffect(() => {
        setToggleAllPages(pagesSelected?.length === availablePages?.length)
    }, [pagesSelected, availablePages])

    // Select all pages by default
    useEffect(() => {
        availablePages?.map((page) => {
            useUserSelectionStore.getState().addPage(page)
        })
    }, [availablePages])

    return (
        <PageLayout>
            <div>
                <h1 className="text-3xl text-white mb-4 mt-0">
                    {__('What pages do you want on this site?', 'extendify')}
                </h1>
                <p className="text-base opacity-70">
                    {__('You can add more later', 'extendify')}
                </p>
            </div>
            <div className="w-full">
                <div className="flex justify-between">
                    <p className="mt-0 mb-8 text-base">
                        {__(
                            "Pick the pages you'd like to add to your site",
                            'extendify',
                        )}
                    </p>

                    <CheckboxControl
                        label={__('Include all pages', 'extendify')}
                        checked={toggleAllPages}
                        onChange={updateToggleStatus}
                    />
                </div>
                <div className="grid w-full grid-cols-2 gap-8">
                    {availablePages?.map((page) => {
                        return (
                            <PagePreview
                                key={page.id}
                                lock={false}
                                page={page}
                                blockHeight={390}
                            />
                        )
                    })}
                </div>
            </div>
        </PageLayout>
    )
}
