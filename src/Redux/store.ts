import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import chatReducer from './features/chatSlice';
import catsReducer from './features/catsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    cats: catsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
