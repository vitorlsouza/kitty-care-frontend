import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import billingReducer from './features/billingSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    billing: billingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
