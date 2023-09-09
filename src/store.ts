import { configureStore } from "@reduxjs/toolkit";
import { theMovies } from "./services";

export const store = configureStore({
  reducer: {
    [theMovies.reducerPath]: theMovies.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(theMovies.middleware),
});
