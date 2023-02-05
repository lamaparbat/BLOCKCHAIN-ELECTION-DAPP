import { createSlice } from '@reduxjs/toolkit';

const voter = createSlice({
  name: 'voter',
  initialState: {
    details: {},
    list: [],
  },
  reducers: {
    setVoterDetails: (state, action) => { state.details = action.payload },
    setVoterList: (state, action) => { state.list = action.payload }
  }
});

export const { setVoterDetails, setVoterList } = voter.actions;
export default voter.reducer;

