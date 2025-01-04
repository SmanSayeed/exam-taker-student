import { apiSlice } from "@/features/api/apiSlice";
import authSliceReducer from "@/features/auth/authSlice";
import examSliceReducer from "@/features/exams/examSlice";
import submittedExamSliceReducer from "@/features/exams/submittedExamSlice";
import mtExamSliceReducer from "@/features/packages/mtExamSlice";
import submittedMTExamSliceReducer from "@/features/packages/submittedMTExamSlice";

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
  exam: examSliceReducer,
  submittedExam: submittedExamSliceReducer,
  mtExam: mtExamSliceReducer,
  submittedMTExam: submittedMTExamSliceReducer
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['auth', 'exam', 'mtExam', "submittedMTExam"],
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
    })
    .concat(apiSlice.middleware),
});

export const persistor = persistStore(store);