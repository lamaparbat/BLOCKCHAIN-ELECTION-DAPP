import { createSlice } from "@reduxjs/toolkit";

const walletDetailsReducer = createSlice({
  name: "timer",
  initialState: {
    loggedInAccountAddress: null
  },
  reducers: {
    setWalletDetails: (state, action) => { state.loggedInAccountAddress = action.payload }
  }
});

export const { setWalletDetails } = walletDetailsReducer.actions;
export default walletDetailsReducer.reducer;