import { createSlice } from '@reduxjs/toolkit';
import { getStorage } from '../../services';

const loggedInUserReducer = createSlice({
  name: 'loggedInUser',
  initialState: {
    address: getStorage("loggedInAccountAddress"),
  },
  reducers: {
    setLoggedInAddress: (state, action) => { state.address = action.payload },
  }
});

export const { setLoggedInAddress } = loggedInUserReducer.actions;
export default loggedInUserReducer.reducer;

