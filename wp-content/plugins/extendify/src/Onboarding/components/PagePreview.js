import { __ } from '@wordpress/i18n'
import classNames from 'classnames'
import { getTemplate } from '@onboarding/api/DataApi'
import { StylePreview } from '@onboarding/components/StyledPreview'
import { useFetch } from '@onboarding/hooks/useFetch'
import { useUserSelectionStore } from '@onboarding/state/UserSelections'
import { Checkmark } from '@onboarding/svg'
import { findTheCode } from '../lib/util'

export const fetcher = (data) => getTemplate(data)
export const PagePreview = ({ lock, page, blockHeight }) => {
    const pagesSelected = useUserSelectionStore((state) => state.pages)
    const siteType = useUserSelectionStore((state) => state.siteType)
    const style = useUserSelectionStore((state) => state.style)
    const isHome = page?.slug === 'home'
    const { data: pageData } = useFetch(
        {
            siteType: siteType.slug,
            layoutType: page.slug,
            baseLayout: isHome ? style?.homeBaseLayout : null,
            kit: page.slug !== 'home' ? style?.kit : null,
        },
        fetcher,
    )
    if (isHome) {
        lock = true
    }

    const isPageSelected = pagesSelected?.find((p) => p?.id === page?.id)
    return (
        <div
            role={lock ? undefined : 'button'}
            tabIndex={lock ? undefined : 0}
            aria-label={lock ? undefined : __('Press to select', 'extendify')}
            key={page.slug}
            className={classNames(
                'text-base p-0 bg-transparent overflow-hidden rounded-lg border border-gray-100',
                {
                    'button-focus': !lock,
                },
            )}
            onKeyDown={(e) => {
                if (['Enter', 'Space', ' '].includes(e.key)) {
                    if (lock) return
                    useUserSelectionStore.getState().togglePage(page)
                }
            }}
            onClick={() =>
                lock || useUserSelectionStore.getState().togglePage(page)
            }>
            <div className="border-gray-100 border-b p-2 flex justify-between min-w-sm">
                <div
                    className={classNames('flex items-center', {
                        'text-gray-700': !isPageSelected,
                    })}>
                    <span>{page.title}</span>
                    {lock && (
                        <span
                            title={
                                isHome
                                    ? __('Home page is required', 'extendify')
                                    : null
                            }
                            className="w-4 h-4 text-base leading-none pl-2 mr-6 dashicons dashicons-lock"></span>
                    )}
                </div>
                {(lock || isPageSelected) && (
                    <Checkmark className="text-partner-primary-bg w-6" />
                )}
            </div>

            <StylePreview
                blockHeight={blockHeight}
                key={style?.slug}
                style={{
                    ...style,
                    code: findTheCode({ template: pageData }),
                }}
            />
        </div>
    )
}
