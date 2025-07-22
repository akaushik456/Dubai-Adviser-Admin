import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './app/features/auth/authSlice';
import mainApi from './services/mainApiSlice';
// import mainApi from './services/mainApiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

// Enable automatic refetching for queries
setupListeners(store.dispatch);

// Define RootState and AppDispatch for proper type inference
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define AppThunk for handling async actions
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
