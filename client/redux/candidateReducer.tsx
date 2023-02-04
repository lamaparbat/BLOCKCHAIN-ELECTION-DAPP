import { createSlice } from '@reduxjs/toolkit';

const candidate = createSlice({
  name: 'counter',
  initialState: {
    details: {},
    list: [],
  },
  reducers: {
    setCandidateDetails: (state, action) => { state.details = action.payload },
    setCandidateList: (state, action) => { state.list = action.payload }
  }
});

export const { setCandidateDetails, setCandidateList } = candidate.actions;
export default candidate.reducer;

