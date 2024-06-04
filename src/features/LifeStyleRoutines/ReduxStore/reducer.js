// reducer.js
import {
  FETCH_INITIAL_STATE_REQUEST,
  FETCH_INITIAL_STATE_SUCCESS,
  FETCH_INITIAL_STATE_FAILURE,
  UPDATE_COMPLETION_PERCENTAGE,
  TOGGLE_TASK_COMPLETION,
  CHANGE_MOOD_ICON
} from './actionTypes';

const initialState = {
  isLoading: false,
  error: null,
  success: false,
  completionHistory: [],
  lifeStyle: {
    _id: '',
    circles: [],
    memberCode: '',
    completionPercentage: 0
  }
};

const reducer = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case FETCH_INITIAL_STATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case FETCH_INITIAL_STATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.payload
      };

    case FETCH_INITIAL_STATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case UPDATE_COMPLETION_PERCENTAGE:
      return {
        ...state,
        lifeStyle: {
          ...state.lifeStyle,
          circles: state.lifeStyle.circles.map(circle =>
            circle.name === action.payload.circleName
              ? { ...circle, completionPercentage: action.payload.completionPercentage }
              : circle
          )
        }
      };

    // it will just mark it as done, reverse is not possible
    case TOGGLE_TASK_COMPLETION:
      return {
        ...state,
        lifeStyle: {
          ...state.lifeStyle,
          circles: state?.lifeStyle?.circles.map(circle =>
            circle.name === action.payload.circleName
              ? {
                ...circle,
                tasks: circle.tasks.map(task =>
                  task.taskId === action.payload.taskId
                    ? { ...task, completed: true }
                    : task
                )
              }
              : circle
          )
        }
      };

    case CHANGE_MOOD_ICON:
      return {
        ...state,
        lifeStyle: {
          ...state.lifeStyle,
          circles: state?.lifeStyle?.circles.map(circle =>
            circle.name === action.payload.circleName
              ? {
                ...circle,
                tasks: circle?.tasks.map(task =>
                  task.taskId === action.payload.taskId
                    ? { ...task, mood: action.payload.mood }
                    : task
                )
              }
              : circle
          )
        }
      }

    default:
      return state;
  }
};

export default reducer;
