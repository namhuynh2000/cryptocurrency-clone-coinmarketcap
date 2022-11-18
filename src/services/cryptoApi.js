import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url, params = {}) => ({ url, params })

// Define a service using a base URL and expected endpoints
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl, headers: cryptoApiHeaders }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: ({ count, timePeriod = '24h' }) => createRequest('/coins', { limit: count.toString(), timePeriod: timePeriod })
        }),
        getCrypto: builder.query({
            query: ({ coinId, timePeriod = '24h' }) => createRequest(`/coin/${coinId}`, { timePeriod: timePeriod })
        }),
        getStats: builder.query({
            query: () => createRequest('/stats')
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod = '24h' }) => createRequest(`/coin/${coinId}/history`, { timePeriod: timePeriod })
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCryptosQuery, useGetStatsQuery, useGetCryptoHistoryQuery, useGetCryptoQuery } = cryptoApi