import { apiSlice } from "@/exams/features/api/apiSlice";
import authSliceReducer from "@/exams/features/auth/authSlice";
import categorySliceReducer from "@/exams/features/categories/categorySlice";
import examSliceReducer from "@/exams/features/questions/examSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSliceReducer,
  category: categorySliceReducer,
  exam: examSliceReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['exam', 'auth'], // Specify the reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export const persistor = persistStore(store);