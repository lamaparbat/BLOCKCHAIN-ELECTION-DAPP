import { createSlice } from '@reduxjs/toolkit';

export const candidate = createSlice({
 name: 'counter',
 initialState: {
  details: {},
 },
 reducers: {
  setDetails: (state, action) => { state.details = action.payload }
 }
});

export const { setDetails } = candidate.actions;
export default candidate.reducer;

