import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { request } from '../api/api';

const initialState: {
  favourites: Favourite[],
  logs: VoteLog[],
  loading: boolean
} = {
  favourites: [],
  logs: [],
  loading: false,
};

export const getFavourites = createAsyncThunk(
  'favourites/getFavourites',
  async () => request('favourites?api_key=c03feea5-7160-4ef0-a72f-c7e33b4c4895'),
);

export const removeFromFavourites = createAsyncThunk(
  'favourites/removeFromFavourites',
  async (favouriteId: string) => {
    request(`favourites/${favouriteId}`,
      {
        method: 'DELETE',
        headers: {
          'x-api-key': 'c03feea5-7160-4ef0-a72f-c7e33b4c4895',
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
    return favouriteId;
  },
);

export const addToFavourites = createAsyncThunk(
  'favourites/addToFavourites',
  async ({ imageId, url }: { imageId: string, url: string }) => {
    const response = await request('favourites',
      {
        headers: {
          'x-api-key': 'c03feea5-7160-4ef0-a72f-c7e33b4c4895',
          'Content-type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify({
          image_id: imageId,
          sub_id: "User-123",
        }),
      }
    );

    return { id: response.id, image_id: imageId, image: { id: imageId, url } };
  },
);

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addLog: (state, action) => {
      const newLog = action.payload;

      state.logs = [ newLog, ...state.logs ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFavourites.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFavourites.fulfilled, (state, action) => {
      state.favourites = action.payload;
      state.loading = false;
    });

    builder.addCase(removeFromFavourites.fulfilled, (state, action) => {
      const favouriteId = action.payload;

      state.favourites = state.favourites.filter(favourite => favouriteId !== favourite.id);
    });

    builder.addCase(addToFavourites.fulfilled, (state, action) => {
      const favourite = action.payload;

      state.favourites = [...state.favourites, favourite];
    });
  },
});

export const { addLog } = favouritesSlice.actions;
export default favouritesSlice.reducer;
