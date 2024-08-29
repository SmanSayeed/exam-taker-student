import authSliceReducer  from "./../exams/features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./../exams/features/api/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
    },
    // devTools: import.meta.env.NODE_ENV !== "production",
    middleware: (

getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware),
});
