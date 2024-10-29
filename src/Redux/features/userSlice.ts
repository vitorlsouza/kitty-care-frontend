import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUpUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { signUpUser, logout } = userSlice.actions;
export default userSlice.reducer; 