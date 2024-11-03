import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import chatReducer from './features/chatSlice';
import catsReducer from './features/catsSlice';
import billingReducer from './features/billingSlice';
import subscriptionReducer from './features/subscriptionSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    cats: catsReducer,
    billing: billingReducer,
    subscription: subscriptionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
