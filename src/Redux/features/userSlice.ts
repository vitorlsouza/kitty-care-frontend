import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { signUpAPI, loginAPI } from '../../services/api';
import { UserState } from '../../utils/types';
import { setAuthToken, clearAuthToken } from '../../utils/auth';

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
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginAPI(credentials);
      return response;
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
    logout: () => {
      clearAuthToken();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUpUserAsync.fulfilled, (state, action) => {
        if (action.payload?.token) {
          setAuthToken({
            token: action.payload.token,
            expiresIn: action.payload.expiresIn || '1h'
          });
          Object.assign(state, {
            status: 'succeeded',
            isAuthenticated: true
          });
        }
      })
      .addCase(signUpUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        if (action.payload?.token) {
          setAuthToken({
            token: action.payload.token,
            expiresIn: action.payload.expiresIn || '1h'
          });
          Object.assign(state, {
            status: 'succeeded',
            isAuthenticated: true
          });
        }
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { signUpUser, logout } = userSlice.actions;
export default userSlice.reducer; 