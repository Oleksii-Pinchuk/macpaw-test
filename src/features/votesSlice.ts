import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { request } from '../api/api';

const initialState: {
  votes: Vote[],
  likes: Vote[],
  dislikes: Vote[],
  loading: boolean
} = {
  votes: [],
  likes: [],
  dislikes: [],
  loading: false,
};

export const getVotes = createAsyncThunk(
  'votes/getVotes',
  async () => await request('votes?api_key=c03feea5-7160-4ef0-a72f-c7e33b4c4895'),
);

export const getVote = createAsyncThunk(
  'votes/getVote',
  async (voteId) => await request(`votes?api_key=c03feea5-7160-4ef0-a72f-c7e33b4c4895/${voteId}`),
);

export const removeVote = createAsyncThunk(
  'votes/removeVote',
  async (voteId: string) => {
    request(`votes/${voteId}`,
      {
        method: 'DELETE',
        headers: {
          'x-api-key': 'c03feea5-7160-4ef0-a72f-c7e33b4c4895',
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
    return voteId;
  },
);

export const addToVotes = createAsyncThunk(
  'votes/addToVotes',
  async ({ image_id, value }: Vote) => {
    const response = await request('votes',
      {
        headers: {
          'x-api-key': 'c03feea5-7160-4ef0-a72f-c7e33b4c4895',
          'Content-type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify({
          image_id,
          value,
        }),
      }
    );

    return { id: response.id, image_id, value };
  },
);

const votesSlice = createSlice({
  name: 'votes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVotes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVotes.fulfilled, (state, action) => {
      state.votes = action.payload;
      state.loading = false;
    });

    builder.addCase(removeVote.fulfilled, (state, action) => {
      const voteId = action.payload;

      state.votes = state.votes.filter(vote => voteId !== vote.id);
    });

    builder.addCase(addToVotes.fulfilled, (state, action) => {
      const vote = action.payload;

      state.votes = [...state.votes, vote];
    });
  },
});

export default votesSlice.reducer;
