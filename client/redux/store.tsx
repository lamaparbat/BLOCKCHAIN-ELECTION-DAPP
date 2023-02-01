import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from './candidateReducer';
import electionTimeCounterReducer from './electionTimeCounter';
import walletDetailsReducer from './WalletDetailsReducer';

export default configureStore({
  reducer: { candidateReducer, electionTimeCounterReducer, walletDetailsReducer },
})