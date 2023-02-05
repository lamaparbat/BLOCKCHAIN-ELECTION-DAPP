import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from './candidateReducer';
import electionTimeCounterReducer from './electionTimeCounter';
import partyReducer from './partyReducer';
import voterReducer from './voterReducer';

export default configureStore({
  reducer: {
    candidateReducer,
    voterReducer,
    partyReducer,
    electionTimeCounterReducer,
  },
})