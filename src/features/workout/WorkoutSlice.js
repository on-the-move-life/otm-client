import { axiosClient } from './apiClient';

const initialState = {
  workout: {},
  workoutSummary: {},
  answers: [],
  status: 'loading',
  inputValues: {},
  index: 0, //to keep track of sections
};

export default function workoutReducer(state = initialState, action) {
  switch (action.type) {
    case 'workout/getWorkout':
      const workoutData= {
        ...action.payload[0], program:action.payload[0].program.slice(1) 
      }
      console.log(workoutData)
      return {
        ...state,
        workout: workoutData,
        status: 'ready',
        error: null,
      };

    case 'workout/updateWorkout':
      const updateData= {
        ...action.payload[0], program:action.payload[0].program.slice(1) 
      }
      return {
        ...state,
        workout: updateData,
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
      // console.log(state.inputValues);
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
        workoutSummary: action.payload,
        status: 'finish',
        error: null,
      };
    case 'workout/getWorkoutSummary':
      return {
        ...state,
        workoutSummary: action.payload,
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
      })
      .catch((err) => {
        console.log(err.message, 'ERROR');
        // dispatch(error(err.message));
      });
  };
}

export function updateWorkout() {
  return async function (dispatch, getState) {
    const { inputValues } = getState().workoutReducer; // Get the current state
    console.log(inputValues);
    const { customTheme, customEquipments, customDuration } = inputValues;
    const reqBody = {
      memberCode: 'KU',
      theme: customTheme,
      equipment: customEquipments,
      isLite: customDuration !== 'Regular',
    };
    axiosClient
      .put('/', reqBody)
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
  console.log('workout finished');
  return async function (dispatch, getState) {
    const state = getState().workoutReducer;
    console.log(state.inputValues);
    return { type: 'workout/finishWorkout', payload: state.inputValues };
  };
}

