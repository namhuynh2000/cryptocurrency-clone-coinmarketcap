import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./reduces/userSlice"

import { cryptoApi } from '../services/cryptoApi'
import { newsApi } from '../services/newsApi'

export const store = configureStore({
    reducer: {
        user: userReducer,
        // Add the generated reducer as a specific top-level slice
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cryptoApi.middleware, newsApi.middleware),
})

