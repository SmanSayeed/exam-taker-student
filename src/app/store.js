import { apiSlice } from "@/exams/features/api/apiSlice";
import authSliceReducer from "@/exams/features/auth/authSlice";
import categorySliceReducer from "@/exams/features/categories/categorySlice";
import examSliceReducer from "@/exams/features/exams/examSlice";
import submittedExamSliceReducer from "@/exams/features/exams/submittedExamSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSliceReducer,
  category: categorySliceReducer,
  exam: examSliceReducer,
  submittedExam: submittedExamSliceReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['auth', 'exam'],
  blacklist: [apiSlice.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);