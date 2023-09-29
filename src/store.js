import questionnaireReducer from "./features/Questionnaire/QuestionnaireSlice";
import reducer2 from "./features/feature2/featureSlice2";

const { createStore, combineReducers } = require("redux");

const rootReducer = combineReducers({
  questionnaireReducer,
  reducer2,
});
const store = createStore(rootReducer);

export default store;
