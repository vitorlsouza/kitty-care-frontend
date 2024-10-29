import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { signUpAPI } from '../../services/api';

interface UserState {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  isAuthenticated: boolean;
  status: string;
  error: string;
}

const initialState: UserState = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  isAuthenticated: false,
  status: '',
  error: '',
};

export const signUpUserAsync = createAsyncThunk(
  'user/signUpUser',
  async (userData: Partial<UserState>, { rejectWithValue }) => {
    try {
      const response = await signUpAPI(userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(signUpUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUpUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        return { ...state, ...action.payload, isAuthenticated: true };
      })
      .addCase(signUpUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { signUpUser, logout } = userSlice.actions;
export default userSlice.reducer; 