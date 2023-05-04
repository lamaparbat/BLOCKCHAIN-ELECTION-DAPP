import { createSlice } from '@reduxjs/toolkit';
import { getStorage } from '../../services';

const commonReducer = createSlice({
  name: 'counter',
  initialState: {
    currentLanguage: getStorage("lang") ?? "en",
    currentElection: {}
  },
  reducers: {
    setCurrentLanguage: (state, action) => state.currentLanguage = action.payload,
    setCurrentElection: (state, action) => state.currentElection = { ...action.payload }
  }
});

export const { setCurrentLanguage, setCurrentElection } = commonReducer.actions;
export default commonReducer.reducer;
