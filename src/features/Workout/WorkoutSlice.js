import { axiosClient } from './apiClient';

const initialState = {
  workout: {},
  workoutSummary: {},
  answers: [],
  status: '',
  inputValues: {},
  index: 0,
};

export default function workoutReducer(state = initialState, action) {
  switch (action.type) {
    case 'workout/setWorkout':
      const workoutData = {
        ...action.payload[0],
        program: action.payload[0].program.slice(1),
      };
      return {
        ...state,
        workout: workoutData,
        status: 'success',
      };

    case 'workout/updateWorkout':
      const updateData = {
        ...action.payload[0],
        program: action.payload[0].program.slice(1),
      };
      return {
        ...state,
        workout: updateData,
        status: 'success',
      };

    case 'workout/setLoading':
      return {
        ...state,
        status: 'loading',
      };

    case 'workout/updateInput':
      return {
        ...state,
        inputValues: {
          ...state.inputValues,
          [action.payload.inputId]: action.payload.value,
        },
      };

    case 'workout/getWorkoutSummary':
      return {
        ...state,
        workoutSummary: action.payload,
        status: 'success',
      };

    case 'workout/setStatus':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
}

export function setLoading() {
  return { type: 'workout/setLoading' };
}

export function dataReceived() {
  return { type: 'workout/dataReceived' };
}

export function getWorkout(code) {
  return async function (dispatch) {
    dispatch(setStatus('loading'));

    axiosClient
      .get('/', {
        params: {
          memberCode: code,
        },
      })
      .then((res) => {
        if (res.data) {
          dispatch({ type: 'workout/setWorkout', payload: res.data });
          dispatch(setStatus('success'));
        }
      })
      .catch((err) => {
        console.log(err.message, 'ERROR');
        dispatch(setStatus('error'));
        console.log(err.message, 'ERRORRRRRRRR');
      });
  };
}

export function updateWorkout(reqBody) {
  return async function (dispatch) {
    dispatch(setStatus('loading'));
    axiosClient
      .put('/', reqBody)
      .then((res) => {
        console.log('workout', res.data);
        dispatch({ type: 'workout/updateWorkout', payload: res.data });
        dispatch(setStatus('success'));
      })
      .catch((err) => {
        console.log(err.message, 'ERROR');
        dispatch(setStatus('error'));
      });
  };
}

export function updateInput(inputId, value) {
  return { type: 'workout/updateInput', payload: { inputId, value } };
}

export function setStatus(status) {
  return { type: 'workout/setStatus', payload: status };
}
