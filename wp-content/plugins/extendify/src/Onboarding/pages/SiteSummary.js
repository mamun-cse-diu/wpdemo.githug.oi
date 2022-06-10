import { __ } from '@wordpress/i18n'
import { PagePreview } from '@onboarding/components/PagePreview'
import { StylePreview } from '@onboarding/components/StyledPreview'
import { PageLayout } from '@onboarding/layouts/PageLayout'
import { usePagesStore } from '@onboarding/state/Pages'
import { useUserSelectionStore } from '@onboarding/state/UserSelections'

export const SiteSummary = () => {
    const siteType = useUserSelectionStore((state) => state.siteType)
    const style = useUserSelectionStore((state) => state.style)
    const pages = useUserSelectionStore((state) => state.pages)
    const setPage = usePagesStore((state) => state.setPage)

    return (
        <PageLayout>
            <div>
                <h1 className="text-3xl text-white mb-4 mt-0">
                    {__("Let's launch your site!", 'extendify')}
                </h1>
                <p className="text-base">
                    {__('Review your site configuration.', 'extendify')}
                </p>
            </div>
            <div className="w-full">
                <p className="mt-0 mb-8 text-base">
                    {__('Site settings', 'extendify')}
                </p>
                <div className="flex flex-col space-y-8">
                    <div className="flex items-center">
                        <div className="w-20 flex-shrink-0 text-base">
                            {__('Industry:', 'extendify')}
                        </div>
                        {siteType?.label ? (
                            <div
                                className="p-4 py-2 rounded-lg text-base flex bg-transparent border border-gray-600 cursor-pointer"
                                onClick={() => setPage('site-type-select')}
                                title={__(
                                    'Press to change the site type',
                                    'extendify',
                                )}>
                                {siteType.label}
                            </div>
                        ) : (
                            <button
                                onClick={() => setPage('site-type-select')}
                                className="bg-transparent text-partner-primary underline">
                                {__('Press to set a site type', 'extendify')}
                            </button>
                        )}
                    </div>
                    <div className="flex items-start">
                        <div className="w-20 flex-shrink-0 text-base">
                            {__('Style:', 'extendify')}
                        </div>
                        {style?.label ? (
                            <div
                                className="w-80 cursor-pointer overflow-hidden border rounded-lg p-4"
                                onClick={() => setPage('site-style-select')}
                                title={__(
                                    'Press to change the site style',
                                    'extendify',
                                )}>
                                <StylePreview style={style} blockHeight={350} />
                            </div>
                        ) : (
                            <button
                                onClick={() => setPage('site-style-select')}
                                className="bg-transparent text-partner-primary underline">
                                {__('Press to set a style type', 'extendify')}
                            </button>
                        )}
                    </div>
                    <div className="flex items-start">
                        <div className="w-20 flex-shrink-0 text-base">
                            {__('Pages:', 'extendify')}
                        </div>
                        {pages.length > 0 ? (
                            <div
                                className="flex items-start space-x-2 cursor-pointer w-full"
                                onClick={() => setPage('site-pages-select')}
                                title={__(
                                    'Press to change the selected pages',
                                    'extendify',
                                )}>
                                <div className="grid w-full grid-cols-3 gap-4">
                                    {pages.map((page) => {
                                        return (
                                            <PagePreview
                                                key={page.id}
                                                lock={true}
                                                page={page}
                                                blockHeight={175}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setPage('site-pages-select')}
                                className="bg-transparent text-partner-primary underline">
                                {__('Press to set your pages', 'extendify')}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
