import { axiosClient } from './apiClient';

const initialState = {
  workoutData: [],
  answers: [],
  status: 'loading',
  inputValues: {},
  index: 0, //to keep track of sections
};

export default function workoutReducer(state = initialState, action) {
  switch (action.type) {
    case 'workout/getWorkout':
      return {
        ...state,
        workout: action.payload,
        status: 'ready',
        error: null,
      };

    case 'workout/setLoading':
      return {
        ...state,
        status: 'loading',
        error: null,
      };

    case 'workout/updateInput':
      console.log(state.inputValues);
      return {
        ...state,
        inputValues: {
          ...state.inputValues,
          [action.payload.inputId]: action.payload.value,
        },
      };

    case 'workout/next':
      break;

    case 'workout/previous':
      break;

    case 'workout/finish':
      return {
        ...state,
        status: 'finish',
        error: null,
      };

    default:
      return state;
  }
}

export function setLoading() {
  return { type: 'workout/setLoading' };
}

export function getWorkout() {
  return async function (dispatch) {
    axiosClient
      .get('/?memberCode=KU')
      .then((res) => {
        console.log('workout', res.data);
        dispatch({ type: 'workout/getWorkout', payload: res.data });
        return res.data;
      })
      .catch((err) => {
        console.log(err.message, 'ERROR');
        // dispatch(error(err.message));
      });
  };
}

export function startWorkout() {
  return { type: 'workout/start' };
}

export function nextWorkoutSection() {
  return { type: 'workout/next' };
}

export function updateInput(inputId, value) {
  return { type: 'workout/updateInput', payload: { inputId, value } };
}

export function previousWorkoutSection() {
  return { type: 'workout/previous' };
}

export function finishWorkout() {
  console.log('workout fiised')
  return async function (dispatch, getState) { // Add getState as a parameter
    const state = getState().workoutReducer; // Get the current state
    console.log(state.inputValues)
    axiosClient
      .post('/score', state.inputValues)
      .then((res) => {
        console.log('submit workout', res.data);
        dispatch({ type: 'workout/finishWorkout', payload: res.data });
        return res.data;
      })
      .catch((err) => {
        console.log(err.message, 'ERROR');
        // dispatch(error(err.message));
      });
  };
  return { type: 'workout/finish' };
}

