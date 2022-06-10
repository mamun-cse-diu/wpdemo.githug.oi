import { __ } from '@wordpress/i18n'
import { Axios as api } from './axios'

export const saveThemeJson = (themeJson) =>
    api.post('onboarding/save-theme-json', { themeJson })

export const parseThemeJson = (themeJson) =>
    api.post('onboarding/parse-theme-json', { themeJson })

export const updateOption = (option, value) =>
    api.post('onboarding/options', { option, value })

export const getOption = async (option) => {
    const { data } = await api.get('onboarding/options', {
        params: { option },
    })
    return data
}

export const createPage = async (pageData) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-WP-Nonce': window.extOnbData.nonce,
        },
        body: JSON.stringify(pageData),
    }
    const url = `${window.extOnbData.wpRoot}wp/v2/pages`
    const response = await fetch(url, options)
    const data = await response.json()
    return data
}

export const updateTemplatePart = async (part, content) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-WP-Nonce': window.extOnbData.nonce,
        },
        body: JSON.stringify({
            slug: `${part}`,
            theme: 'extendable',
            type: 'wp_template_part',
            status: 'publish',
            description: __('Added by Extendify Launch', 'extendify'),
            content,
        }),
    }

    try {
        const url = `${window.extOnbData.wpRoot}wp/v2/template-parts/${part}`
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (e) {
        // Fail gracefully for now
    }
}
