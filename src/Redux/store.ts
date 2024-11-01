import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import chatReducer from './features/chatSlice';
import catsReducer from './features/catsSlice';
import billingReducer from './features/billingSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    cats: catsReducer,
    billing: billingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
