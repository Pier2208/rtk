import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { todoApi } from '../api/todoApi';
import { authApi } from '../api/authApi';
import { categoryApi } from '../api/categoryApi';
import authReducer from '../features/AuthSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    // Add other reducers if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(todoApi.middleware)
      .concat(categoryApi.middleware),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
