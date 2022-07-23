import { configureStore } from '@reduxjs/toolkit';
import breedsSlice from './features/breedsSlice';
import favouritesReducer from './features/favouritesSlice';
import votesReducer from './features/votesSlice';
import votingLogsSlice from './features/votingLogsSlice';

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    votes: votesReducer,
    breeds: breedsSlice,
    votingLogs: votingLogsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
