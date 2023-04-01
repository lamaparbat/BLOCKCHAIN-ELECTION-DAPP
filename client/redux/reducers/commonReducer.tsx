import { createSlice } from '@reduxjs/toolkit';
import { getStorage } from '../../services';

const commonReducer = createSlice({
  name: 'counter',
  initialState: {
    currentLanguage: getStorage("lang") ?? "en"
  },
  reducers: {
    setCurrentLanguage: (state, action) => state.currentLanguage = action.payload
  }
});

export const { setCurrentLanguage } = commonReducer.actions;
export default commonReducer.reducer;
