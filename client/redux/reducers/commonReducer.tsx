import { createSlice } from '@reduxjs/toolkit';

const commonReducer = createSlice({
  name: 'counter',
  initialState: {
    currentLanguage: "english",
  },
  reducers: {
    setCurrentLanguage: (state, action) => { state.currentLanguage = action.payload },
  }
});

export const { setCurrentLanguage } = commonReducer.actions;
export default commonReducer.reducer;

