import { configureStore } from '@reduxjs/toolkit'
import { theMovies } from './services'


export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [theMovies.reducerPath]: theMovies.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(theMovies.middleware),
})
