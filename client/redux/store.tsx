import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from './candidateReducer';
import electionTimeCounterReducer from './electionTimeCounter';

export default configureStore({
  reducer: { candidateReducer, electionTimeCounterReducer },
})