import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from '../api/api';

const initialState: {
  allBreeds: Breed[],
  searchedBreeds: Breed[],
  breedsName: string,
  choosenBreed: Breed,
  allBreedsLoaded: boolean,
  searchedBreedsLoaded: boolean,
} = {
  allBreeds: [],
  searchedBreeds: [],
  breedsName: '',
  choosenBreed: {} as Breed,
  allBreedsLoaded: false,
  searchedBreedsLoaded: false,
};

export const getAllBreeds = createAsyncThunk(
  'breeds/getAllBreeds',
  async () => request('breeds?attach_breed=0')
);

export const getBreedsByName = createAsyncThunk(
  'breeds/getBreedsByName',
  async (name: string) => {
    const allBreeds = await request('breeds?attach_breed=0');
    
    return { allBreeds, name };
  },
);


const breedsSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setBreed: (state, action) => {
      state.choosenBreed = action.payload;
    },
    setNameOfSearchedBreeds: (state, action) => {
      state.breedsName = action.payload;
      
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBreeds.fulfilled, (state, action) => {
      state.allBreeds = action.payload;
      
      state.allBreedsLoaded = true;
    });

    builder.addCase(getBreedsByName.fulfilled, (state, action) => {
      const { allBreeds, name } = action.payload;
      const loweredName = name.toLocaleLowerCase();

      state.allBreeds = allBreeds;
      state.searchedBreeds = allBreeds.filter((breed: Breed) => breed.name.toLowerCase().includes(loweredName));
      state.searchedBreedsLoaded = true;
    });
  },
});

export const { setBreed, setNameOfSearchedBreeds } = breedsSlice.actions;
export default breedsSlice.reducer;
