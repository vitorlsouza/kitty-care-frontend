import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCatsAPI, createCatAPI, updateCatAPI } from '../../services/api';

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
  async (token: string | undefined, { rejectWithValue }) => {
    try {
      const response = await getCatsAPI(token || '');

      if (Array.isArray(response)) {
        const highestIdCat = response.reduce((maxCat, cat) => (cat.id > maxCat.id ? cat : maxCat), response[0]);
        localStorage.setItem('catId', JSON.stringify(highestIdCat.id));
        localStorage.setItem('food_bowls', JSON.stringify(highestIdCat.food_bowls));
        localStorage.setItem('treats', JSON.stringify(highestIdCat.treats));
        localStorage.setItem('playtime', JSON.stringify(highestIdCat.playtime));

        return highestIdCat;
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

export const updateCatAsync = createAsyncThunk(
  'cats/updateCat',
  async ({ data }: { data: any }, { rejectWithValue }) => {
    try {
      const catId = localStorage.getItem('catId');
      const response = await updateCatAPI(data, catId);
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