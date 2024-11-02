import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCatsAPI, createCatAPI } from '../../services/api';

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
        const highestId = response.reduce((max, cat) => Math.max(max, cat.id), 0);
        localStorage.setItem('catId', JSON.stringify(highestId));
        return response;
      }
      throw new Error('Invalid response format');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCatAsync = createAsyncThunk(
  'cats/createCat',
  async (catDetails: any, { rejectWithValue }) => {
    try {
      const response = await createCatAPI(catDetails);

      const catId = response.id;
      localStorage.setItem(`catId`, JSON.stringify(catId));

      localStorage.setItem(`food_bowls`, JSON.stringify(response.food_bowls));
      localStorage.setItem(`treats`, JSON.stringify(response.treats));
      localStorage.setItem(`playtime`, JSON.stringify(response.playtime));
      
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
      .addCase(createCatAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCatAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cats.push(action.payload);
      })
      .addCase(createCatAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCats } = catsSlice.actions;
export default catsSlice.reducer; 