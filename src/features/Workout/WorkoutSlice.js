import axios from 'axios';
import { axiosClient } from './apiClient';

const initialState = {
  workout: {},
  workoutId: '',
  workoutSummary: {},
  answers: [],
  status: '', //['error', 'loading', 'success']
  swapMovementSectionStatus: '', //['error', 'loading', 'success']
  inputValues: {},
  index: 0,
  swapMovementsList: [],
  oldSwapMovementCode: '',
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
        workoutId: action.payload[0]._id,
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
        workoutId: action.payload[0]._id,
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
    case 'swapMovement/status':
      return {
        ...state,
        swapMovementSectionStatus: action.payload,
      };
    case 'workout/setIndex':
      return {
        ...state,
        index: action.payload,
      };
    case 'updateSection':
      return {
        ...state,
        workout: {
          ...state.workout,
          program: [...state.workout.program].map(prg => {
            if (prg.code === action.payload.code) {
              return action.payload;
            }
            return prg;
          })
        }
      }
    case 'updateSwapMovementsList':
      return {
        ...state,
        swapMovementsList: [...action.payload],
        oldSwapMovementCode: action.oldSwapMovementCode,
      }
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
      });
  };
}

export function updateWorkout(reqBody) {
  return async function (dispatch) {
    dispatch(setStatus('loading'));
    axiosClient
      .put('/', reqBody)
      .then((res) => {
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

export function setMovementSwapSectionStatus(status) {
  return { type: 'swapMovement/status', payload: status };
}

export function setIndex(index) {
  return { type: 'workout/setIndex', payload: index };
}

export function updateSectionWorkout(oldMvmt, newMvmt, sectionCode, workoutID) {
  return async function (dispatch) {
    try {
      dispatch(setMovementSwapSectionStatus('loading'));
      const res = await axiosClient.put(`/section?workoutId=${workoutID}&sectionCode=${sectionCode}&oldMvmt=${oldMvmt}&newMvmt=${newMvmt}`);
      console.log("movement Swap Section : ", res.data.section);
      dispatch(setMovementSwapSectionStatus('success'));
      dispatch({ type: 'updateSection', payload: res?.data?.section });
    }
    catch (err) {
      console.log(err.message, 'ERROR');
      dispatch(setMovementSwapSectionStatus('error'));
    }
  }
}

export function fetchSwapMovementList(movementCode) {
  return async function (dispatch) {
    try {
      dispatch(setStatus('loading'));
      const res = await axios.get(`https://otm-main-production.up.railway.app/api/v1/workout/movement/alternate?mvmt=${movementCode}`);
      console.log("Movement Swap Movements List : ", res?.data?.mvmtList);
      dispatch(setStatus('success'));
      dispatch({ type: 'updateSwapMovementsList', payload: res?.data?.mvmtList, oldSwapMovementCode: movementCode });
    }
    catch (err) {
      console.log(err.message, "ERROR");
      dispatch({ type: 'updateSwapMovementsList', payload: [] })
      dispatch(setStatus('error'))
    }
  }
}
