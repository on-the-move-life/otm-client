import { axiosClient } from './apiClient';

const initialState = {
  sections: [],
  answers: [],
  index: 0, //to keep track of sections
};

export default function workoutReducer(state = initialState, action) {
  switch (action.type) {
    case 'workout/getWorkout':
      return {
        ...state,
        status: 'ready',
        error: null,
      };

    case 'workout/setLoading':
      return {
        ...state,
        status: 'loading',
        error: null,
      };

    case 'workout/next':
      break;

    case 'workout/previous':
      break;

    case 'workout/finish':
      break;

    default:
      break;
  }
}

export function setLoading() {
  return { type: 'workout/setLoading' };
}

export function getWorkout() {}

export function startWorkout() {}

export function nextWorkoutSection() {}

export function previousWorkoutSection() {}

export function finishWorkout() {
  return { type: 'workout/finish' };
}
