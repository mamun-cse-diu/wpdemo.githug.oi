import useSWR from 'swr'

export const useFetch = (params, fetcher) => {
    const { data: fetchedData, error } = useSWR(params, fetcher, {})
    const data = fetchedData?.data ?? fetchedData
    return { data, loading: !data, error }
}
