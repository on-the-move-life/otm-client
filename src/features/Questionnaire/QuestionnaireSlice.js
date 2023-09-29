const initialState = {
  questions: [],
  status: "loading", // ['loading', 'error', 'ready', 'active', 'finished']
  index: 0,//to keep track of questions
  answer: null,
};

export default function questionnaireReducer(state = initialState, action) {
  switch (action.type) {

    case "questionnaire/dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "questionnaire/dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "questionnaire/start":
      return {
        ...state,
        status: "active",
      };
    case "questionnaire/response":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "questionnaire/nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "questionnaire/finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    default:
      return state;
  }
}

export function dataReceived(data) {
  return { type: "questionnaire/dataReceived", payload: data };
}

export function dataFailed(error) {
  return { type: "questionnaire/dataFailed", payload: error };
}

export function start() {
  return { type: "questionnaire/start" };
}

export function response(response) {
  return { type: "questionnaire/response", payload: response };
}

export function nextQuestion() {
  return { type: "questionnaire/nextQuestion" };
}

export function finish() {
  return { type: "questionnaire/finish"};
}
