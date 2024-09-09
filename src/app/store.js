import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./../exams/features/auth/authSlice";
import { apiSlice } from "./../exams/features/api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});