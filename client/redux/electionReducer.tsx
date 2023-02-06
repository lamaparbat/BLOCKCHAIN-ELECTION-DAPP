import { createSlice } from "@reduxjs/toolkit";

const election = createSlice({
  name: "election",
  initialState: {
    electionData: {}
  },
  reducers: {
    setElectionData: (state, action) => { state.electionData = action.payload }
  }
});

export const { setElectionData } = election.actions;
export default election.reducer;