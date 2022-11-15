import { configureStore } from '@reduxjs/toolkit'

import { cryptoApi } from '../services/cryptoApi'

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [cryptoApi.reducerPath]: cryptoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cryptoApi.middleware),
})

