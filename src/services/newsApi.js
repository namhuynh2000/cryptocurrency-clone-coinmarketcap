import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const newsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': process.env.REACT_APP_NEWS_API_KEY,
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url, params = {}) => ({ url, params })

// Define a service using a base URL and expected endpoints
export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({ baseUrl, headers: newsApiHeaders }),
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({ newsCategory, count = 10 }) => createRequest('/news/search', { q: newsCategory, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off', count: count.toString() })
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNewsQuery } = newsApi