import { createSlice } from "@reduxjs/toolkit";

const electionTimeCounter = createSlice({
  name:"timer",
  initialState:{
    timer:{}
  },
  reducers:{
    setElectionTimeCounter: (state, action) => {state.timer = action.payload}
  }
});

export const {setElectionTimeCounter} = electionTimeCounter.actions;
export default electionTimeCounter.reducer;