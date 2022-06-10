import axios from 'axios'

const Axios = axios.create({
    baseURL: window.extOnbData.root,
    headers: {
        'X-WP-Nonce': window.extOnbData.nonce,
        'X-Requested-With': 'XMLHttpRequest',
        'X-Extendify-Onboarding': true,
        'X-Extendify': true,
    },
})

function findResponse(response) {
    return Object.prototype.hasOwnProperty.call(response, 'data')
        ? response.data
        : response
}

function handleErrors(error) {
    if (!error.response) {
        return
    }
    console.error(error.response)
    return Promise.reject(findResponse(error.response))
}

Axios.interceptors.response.use(
    (response) => findResponse(response),
    (error) => handleErrors(error),
)

export { Axios }
