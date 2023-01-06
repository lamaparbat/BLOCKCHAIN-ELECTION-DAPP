import { createSlice } from '@reduxjs/toolkit';

const candidate = createSlice({
 name: 'counter',
 initialState: {
  details: {},
 },
 reducers: {
  setCandidateDetails: (state, action) => { state.details = action.payload }
 }
});

export const { setCandidateDetails } = candidate.actions;
export default candidate.reducer;

