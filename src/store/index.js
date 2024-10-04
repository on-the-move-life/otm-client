import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import rootSaga from './sagas';
import workoutReducer from '../features/Workout/WorkoutSlice';
import workoutFlexReducer from '../features/Workout/FlexSlice';
import timelineReducers from './reducers/timeline.reducers';
import leaderboardReducers from './reducers/leaderboard.reducers';

// import { configureStore } from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();

const { createStore, combineReducers, applyMiddleware } = require('redux');

const rootReducer = combineReducers({
  timeline: timelineReducers,
  leaderboard: leaderboardReducers,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development
});
// const store = configureStore({
//   reducer: {
//     quetionnaire: questionnaireReducer,
//     feature2: reducer2
//   }
// })

sagaMiddleware.run(rootSaga);

export default store;
