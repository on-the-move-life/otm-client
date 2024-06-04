// actions.js
import {
    FETCH_INITIAL_STATE_REQUEST,
    FETCH_INITIAL_STATE_SUCCESS,
    FETCH_INITIAL_STATE_FAILURE,
    TOGGLE_TASK_COMPLETION,
    CHANGE_MOOD_ICON
  } from './actionTypes';
  
  export const fetchInitialStateRequest = () => ({
    type: FETCH_INITIAL_STATE_REQUEST
  });
  
  export const fetchInitialStateSuccess = data => ({
    type: FETCH_INITIAL_STATE_SUCCESS,
    payload: data
  });
  
  export const fetchInitialStateFailure = error => ({
    type: FETCH_INITIAL_STATE_FAILURE,
    payload: error
  });
  
  export const fetchInitialState = (apiURL) => {
    return dispatch => {
      dispatch(fetchInitialStateRequest());
      fetch(apiURL)  // Replace with your actual API URL
        .then(response => response.json())
        .then(data => {
          dispatch(fetchInitialStateSuccess(data));
        })
        .catch(error => {
          dispatch(fetchInitialStateFailure(error));
        });
    };
  };

  export const toggleCompletion = (circleName, taskId) => {
    return (
      {
        type: TOGGLE_TASK_COMPLETION,
        payload: {
          circleName: circleName,
          taskId: taskId
        }
      }
    )
  }

  export const changeMoodIcon = (circleName, taskId, moodIconValue) => {
    return (
      {
        type: CHANGE_MOOD_ICON,
        payload: {
          circleName: circleName,
          taskId: taskId,
          mood: moodIconValue
        }
      }
    )
  }
  