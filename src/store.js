import questionnaireReducer from './features/Questionnaire/QuestionnaireSlice';
import workoutReducer from './features/workout/WorkoutSlice';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { configureStore } from '@reduxjs/toolkit';

const { createStore, combineReducers, applyMiddleware } = require('redux');

const rootReducer = combineReducers({
  questionnaireReducer,
  workoutReducer,
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
