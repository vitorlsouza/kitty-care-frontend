import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCatsAPI, updateCatAPI } from '../../services/api';

interface Cat {
  id: string;       
}

interface CatsState {
  cats: Cat[];
  isLoading: boolean;
  error: string | null;
}

const loadInitialState = (): CatsState => {
  try {
    const savedCats = localStorage.getItem('cats');
    if (savedCats) {
      const parsedCats = JSON.parse(savedCats);
      if (Array.isArray(parsedCats)) {
        return {
          cats: parsedCats,
          isLoading: false,
          error: null,
        };
      }
    }
  } catch (error) {
    console.error('Error loading cats from localStorage:', error);
    localStorage.removeItem('cats');
  }
  
  return {
    cats: [],
    isLoading: false,
    error: null,
  };
};

const initialState: CatsState = loadInitialState();

export const fetchCatsAsync = createAsyncThunk(
  'cats/fetchCats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCatsAPI();

      if (Array.isArray(response)) {
        localStorage.setItem('cats', JSON.stringify(response));
        return response;
      }
      throw new Error('Invalid response format');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCatAsync = createAsyncThunk(
  'cats/updateCat',
  async ({ data }: { data: any }, { rejectWithValue }) => {
    try {
      const response = await updateCatAPI(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    clearCats: (state) => {
      state.cats = [];
      state.error = null;
      localStorage.removeItem('cats');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCatsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cats = action.payload;
      })
      .addCase(fetchCatsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCatAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCatAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedCat = action.payload;
        const index = state.cats.findIndex(cat => cat.id === updatedCat.id);
        if (index !== -1) {
          state.cats[index] = updatedCat;
        }
      })
      .addCase(updateCatAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCats } = catsSlice.actions;
export default catsSlice.reducer; 