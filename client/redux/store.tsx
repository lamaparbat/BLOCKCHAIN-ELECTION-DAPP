import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from './reducers/candidateReducer';
import electionReducer from './reducers/electionReducer';
import partyReducer from './reducers/partyReducer';
import voterReducer from './reducers/voterReducer';
import loggedInUserReducer from './reducers/loggedInUserReducer';
import commonReducer from './reducers/commonReducer';

export default configureStore({
  reducer: {
    candidateReducer,
    voterReducer,
    partyReducer,
    electionReducer,
    loggedInUserReducer,
    commonReducer
  },
})
