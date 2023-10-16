import { axiosClient } from './apiClient';

const initialState = {
  sections: [],
  questions: [],
  status: 'loading', // ['loading', 'error', 'ready', 'active', 'finished']
  index: 0, //to keep track of sections
  error: null,
};

export default function questionnaireReducer(state = initialState, action) {
  switch (action.type) {
    case 'questionnaire/getSections':
      return {
        ...state,
        sections: action.payload,
        status: 'ready',
        error: null,
      };

    case 'questionnaire/setLoading':
      return {
        ...state,
        status: 'loading',
        error: null,
      };

    case 'questionnaire/getQuestions':
      return {
        ...state,
        questions: action.payload,
        status: 'active',
        error: null,
      };
    case 'questionnaire/start':
      return {
        ...state,
        status: 'active',
        error: null,
      };
    case 'questionnaire/error':
      return {
        ...state,
        status: 'error',
        error: action.payload,
      };
    case 'questionnaire/nextSection':
      if (state.index === 5) return state;

      return {
        ...state,
        index: state.index + 1,
        error: null,
      };

    case 'questionnaire/finish':
      return {
        ...state,
        status: 'finish',
        error: null,
      };

    default:
      return state;
  }
}

export function getQuestions(code) {
  return async function (dispatch) {
    // axiosClient.get('/', { params: { section: code } }).then((res) => {
    //   console.log('QUESTIONS', res.data);
    //   dispatch({ type: 'questionnaire/getQuestions', payload: res.data });
    // })
    // .catch((err)=> {
    //   console.log(err, "ERROR");
    // })

    try {
      const res = await axiosClient.get('/', { params: { section: code } });
      // const res = await axiosClient.get('/questions');

      console.log('QUESTIONS', res.data);
      dispatch({ type: 'questionnaire/getQuestions', payload: res.data });
      return res.data; // return the data so you can use it in the .then() block
    } catch (err) {
      console.log(err, 'ERROR');
      dispatch(error(err.message));
      throw err; // throw the error so you can catch it in the .catch() block
    }
  };
}

export function getSections() {
  return function (dispatch) {
    axiosClient
      .get('/section')
      .then((res) => {
        console.log('SECTIONS', res.data);
        dispatch({ type: 'questionnaire/getSections', payload: res.data.data });
        // dispatch({ type: 'questionnaire/getSections', payload: res.data });
      })
      .catch((err) => {
        console.log(err.message, 'ERROR');
        dispatch(error(err.message));
      });
  };
}

export function error(errorMessage) {
  return { type: 'questionnaire/error', payload: errorMessage };
}

export function setLoading() {
  return { type: 'questionnaire/setLoading' };
}

export function start() {
  return { type: 'questionnaire/start' };
}

export function nextSection(reqBody) {
  return function (dispatch) {
    axiosClient.put('/', reqBody).then((res) => {
      dispatch({ type: 'questionnaire/nextSection' });
    });
  };
}

export function finish() {
  return { type: 'questionnaire/finish' };
}
