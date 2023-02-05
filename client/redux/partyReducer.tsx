import { createSlice } from "@reduxjs/toolkit";

const party = createSlice({
  name: "party",
  initialState: {
    list: [],
    details: {}
  },
  reducers: {
    setParties: (state, action) => { state.list = action.payload },
    setSelectedPartyDetails: (state, action) => { state.details = action.payload }
  }
});

export const { setParties, setSelectedPartyDetails } = party.actions;
export default party.reducer;