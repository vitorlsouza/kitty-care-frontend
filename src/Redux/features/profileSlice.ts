import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { updateProfileAPI } from "../../services/api";
import { ProfileState } from "../../utils/types";
import { setAuthToken, clearAuthToken } from "../../utils/auth";

const initialState: ProfileState = {
  name: "",
  breed: "",
  gender: "",
  color: "",
  medicalHistory: "",
  dietaryPreferences: "",
  status: "",
  error: "",
};

export const updateProfileAsync = createAsyncThunk(
  "profile/updateProfile",
  async (
    profileData: ProfileState,
    { rejectWithValue }
  ) => {
    try {
      const response = await updateProfileAPI(profileData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      return { ...state, ...action.payload };
    },
    logout: () => {
      clearAuthToken();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        if (action.payload?.token) {
          setAuthToken({
            token: action.payload.token,
            expiresIn: action.payload.expiresIn || "1h",
          });
          Object.assign(state, {
            status: "succeeded",
            isAuthenticated: true,
          });
        }
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { updateProfile, logout } = profileSlice.actions;
export default profileSlice.reducer;
