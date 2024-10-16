import workoutReducer from './features/Workout/WorkoutSlice';
import workoutFlexReducer from './features/Workout/FlexSlice';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { configureStore } from '@reduxjs/toolkit';

const { createStore, combineReducers, applyMiddleware } = require('redux');

const rootReducer = combineReducers({
  workoutReducer,
  workoutFlexReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
// const store = configureStore({
//   reducer: {
//     quetionnaire: questionnaireReducer,
//     feature2: reducer2
//   }
// })

export default store;
