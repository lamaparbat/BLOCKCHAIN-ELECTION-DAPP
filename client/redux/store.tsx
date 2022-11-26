import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from './candidateReducer';

export default configureStore({
 reducer: { candidateReducer },
})