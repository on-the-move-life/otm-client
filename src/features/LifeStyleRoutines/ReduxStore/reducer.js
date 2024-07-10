// reducer.js
import {
  FETCH_INITIAL_STATE_REQUEST,
  FETCH_INITIAL_STATE_SUCCESS,
  FETCH_INITIAL_STATE_FAILURE,
  UPDATE_COMPLETION_PERCENTAGE,
  TOGGLE_TASK_COMPLETION,
  CHANGE_MOOD_ICON,
  SUBMIT_REFLECTION_FEEDBACK,
  UPDATE_MEALINFO,
  UPDATE_MEALURL
} from './actionTypes';

const initialState = {
  isLoading: false,
  error: null,
  success: false,
  completionHistory: [],
  lifeStyleDetails: {
    _id: '',
    circles: [],
    memberCode: '',
    completionPercentage: 0
  },
  streak: null,
  streakMessage: null,
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
        lifeStyleDetails: {
          ...state.lifeStyleDetails,
          circles: state.lifeStyleDetails.circles.map(circle =>
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
        lifeStyleDetails: {
          ...state.lifeStyleDetails,
          circles: state?.lifeStyleDetails?.circles.map(circle =>
            circle.name === action.payload.circleName
              ? {
                ...circle,
                tasks: circle.tasks.map(task =>
                  task.taskId === action.payload.taskId
                    ? { ...task, completed: task?.completed === undefined ? true : !task?.completed }
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
        lifeStyleDetails: {
          ...state.lifeStyleDetails,
          circles: state?.lifeStyleDetails?.circles.map(circle =>
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

    case SUBMIT_REFLECTION_FEEDBACK:
      return {
        ...state,
        lifeStyleDetails: {
          ...state.lifeStyleDetails,
          circles: state?.lifeStyleDetails?.circles.map(circle =>
            circle.name === action.payload.circleName
              ? {
                ...circle,
                tasks: circle?.tasks.map(task =>
                  task.taskId === action.payload?.taskId
                    ? { ...task, feedback: action.payload?.feedbackValue }
                    : task
                )
              }
              : circle
          )
        }
      }

    // MEALINFO UPDATE
    case UPDATE_MEALINFO:
      return {
        ...state,
        lifeStyleDetails: {
          ...state.lifeStyleDetails,
          circles: state?.lifeStyleDetails?.circles.map(circle =>
            circle.name === action.payload.circleName
              ? {
                ...circle,
                tasks: circle?.tasks.map(task =>
                  task.taskId === action.payload?.taskId
                    ? { ...task, mealInfo: action.payload?.mealInfo }
                    : task
                )
              }
              : circle
          )
        }
      }

    // MEALURL UPDATE
    case UPDATE_MEALURL:
      return {
        ...state,
        lifeStyleDetails: {
          ...state.lifeStyleDetails,
          circles: state?.lifeStyleDetails?.circles.map(circle =>
            circle.name === action.payload.circleName
              ? {
                ...circle,
                tasks: circle?.tasks.map(task =>
                  task.taskId === action.payload?.taskId
                    ? { ...task, mealUrl: action.payload?.mealUrl }
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
