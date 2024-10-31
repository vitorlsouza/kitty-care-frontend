import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createPlanAPI, updatePlanAPI } from "../../services/api";
import { BillingState, PlanState, UserState } from "../../utils/types";
import { setAuthToken, clearAuthToken } from "../../utils/auth";

const initialState: BillingState = {
  method: true,
  price: 0,
  daily: 0.82,
  monthly: 49.99,
  yearly: 299.99,
  trustOption: true,
  nostringOption: true,
  saveOption: true,
  status: "",
  error: "",
};

export const createPlanAsync = createAsyncThunk(
  "billing/createPlan",
  async (_userData: BillingState, { rejectWithValue }) => {
    try {
      const response = await createPlanAPI();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePlanAsync = createAsyncThunk(
  "billing/updatePlan",
  async (
    credentials: PlanState,
    { rejectWithValue }
  ) => {
    try {
      const response = await updatePlanAPI(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const billingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    createPlan: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    logout: () => {
      clearAuthToken();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlanAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPlanAsync.fulfilled, (state, action) => {
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
      .addCase(createPlanAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updatePlanAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePlanAsync.fulfilled, (state, action) => {
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
      .addCase(updatePlanAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { createPlan, logout } = billingSlice.actions;
export default billingSlice.reducer;
