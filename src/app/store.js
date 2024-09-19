import categorySliceReducer from "@/exams/features/categories/categorySlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./../exams/features/api/apiSlice";
import authSliceReducer from "./../exams/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    category: categorySliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});