import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  logs: VoteLog[],
} = {
  logs: [],
};

const votingLogsSlice = createSlice({
  name: 'votingLogs',
  initialState,
  reducers: {
    addLog: (state, action) => {
      const newLog = action.payload;

      state.logs = [ newLog, ...state.logs ];
    },
  },
});

export const { addLog } = votingLogsSlice.actions;
export default votingLogsSlice.reducer;
