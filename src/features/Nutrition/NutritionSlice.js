import { axiosClient } from './apiClient';

const initialState = {
  data: [],
  mealTypeRecipes: [],
};

export default function nutritionReducer(state = initialState, action) {
  switch (action.type) {
    case 'nutrition/getOverview':
      return { ...state, dummy: state.dummy + action.payload };

    case 'nutrition/getMealTypeRecipes':
      return {
        ...state,
        mealTypeRecipes: action.payload,
      };

    default:
      return state;
  }
}

export function getMealTypeRecipes(code) {
  return async function (dispatch) {
    try {
      const res = await axiosClient.get('/mealTypes', {
        params: { type: code },
      });
      // const res = await axiosClient.get('/mealTypes');

      console.log('mealTypes', res.data);
      dispatch({
        type: 'questionnaire/getMealTypeRecipes',
        payload: res.data,
      });
      return res.data; // return the data so you can use it in the .then() block
    } catch (err) {
      console.log(err, 'ERROR');
      // dispatch(error(err.message));
      throw err; // throw the error so you can catch it in the .catch() block
    }
  };
}

export function getOverview() {
  return async function (dispatch) {
    try {
      const res = await axiosClient.get('/overview');
      console.log('getOverview', res.data);
      dispatch({
        type: 'nutrition/getOverview',
        payload: res.data,
      });
      return res.data;
    } catch (err) {
      console.log(err, 'ERROR');
      // dispatch(error(err.message));
      throw err;
    }
  };
}
