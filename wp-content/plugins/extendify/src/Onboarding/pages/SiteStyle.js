import { useEffect } from '@wordpress/element'
import { __, sprintf } from '@wordpress/i18n'
import { mutate } from 'swr'
import { getStyles } from '@onboarding/api/DataApi'
import { StylePreview } from '@onboarding/components/StyledPreview'
import { useCache } from '@onboarding/hooks/useCache'
import { PageLayout } from '@onboarding/layouts/PageLayout'
import { usePagesStore } from '@onboarding/state/Pages'
import { useUserSelectionStore } from '@onboarding/state/UserSelections'
import { fetcher as pageDataFetcher } from '../components/PagePreview'
import { useFetch } from '../hooks/useFetch'
import { findTheCode } from '../lib/util'

export const fetcher = async (params) => {
    const res = await getStyles(params)
    // TODO: these transforms should be moved to the server eventually
    return res?.data
        ?.map((style) => {
            return {
                label: style.title,
                slug: style.slug,
                recordId: style.id,
                themeJson: style?.themeJson,
                homeBaseLayout: style?.homeBaseLayout,
                header: style?.header,
                footer: style?.footer,
                kit: style?.kit,
                headerCode: style?.headerCode,
                footerCode: style?.footerCode,
                code: findTheCode(style),
            }
        })
        ?.filter((style) => style.code)
}
export const fetchData = (siteType) => {
    siteType = siteType ?? useUserSelectionStore?.getState().siteType
    return {
        key: 'site-style',
        siteType: siteType?.slug ?? 'default',
    }
}
export const SiteStyle = () => {
    const siteType = useUserSelectionStore((state) => state.siteType)
    const nextPage = usePagesStore((state) => state.nextPage)
    const { data: styles, loading } = useFetch(fetchData, fetcher)
    const selectStyle = (style) => {
        useUserSelectionStore.getState().setStyle(style)
        nextPage()
    }
    const cache = useCache()
    const onHover = (style) => {
        if (!style) return
        let hoveringTimeout = 0
        window.clearTimeout(hoveringTimeout)
        hoveringTimeout = window.setTimeout(() => {
            // Attempt to build the preview early
            const pages = cache('layout-types')
            pages?.forEach((page) => {
                const data = {
                    siteType: siteType.slug,
                    layoutType: page.slug,
                    baseLayout:
                        page.slug === 'home' ? style?.homeBaseLayout : null,
                    kit: page.slug !== 'home' ? style?.kit : null,
                }
                mutate(data, (cache) => {
                    if (cache?.length) return cache
                    return pageDataFetcher(data)
                })
            })
        }, 100)
        return () => {
            window.clearTimeout(hoveringTimeout)
        }
    }

    useEffect(() => {
        if (styles?.length && !useUserSelectionStore.getState().style) {
            useUserSelectionStore.getState().setStyle(styles[0])
        }
    }, [styles])

    return (
        <PageLayout>
            <div>
                <h1 className="text-3xl text-white mb-4 mt-0">
                    {sprintf(
                        __(
                            'Now pick a design for your new %s site.',
                            'extendify',
                        ),
                        siteType?.label?.toLowerCase(),
                    )}
                </h1>
                <p className="text-base opacity-70">
                    {__('You can personalize this later.', 'extendify')}
                </p>
            </div>
            <div className="w-full">
                <p className="mt-0 mb-8 text-base">
                    {loading
                        ? __(
                              'Please wait a moment while we generate style previews...',
                              'extendify',
                          )
                        : __('Pick your style', 'extendify')}
                </p>
                <div className="button-card-wrap">
                    {styles?.map((style) => (
                        <StylePreview
                            key={style.slug}
                            style={style}
                            selectStyle={selectStyle}
                            blockHeight={590}
                            onHover={() => onHover(style)}
                        />
                    ))}
                </div>
            </div>
        </PageLayout>
    )
}
