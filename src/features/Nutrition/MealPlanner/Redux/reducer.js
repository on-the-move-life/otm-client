import * as Actions from "./actionTypes";

const initialState = {
    questions: [],
    responses: {},
    nutritionPlan: {},
    suggestedIngredients: [],
    selectedIngredients: [],
    weeklyPlan: [],
    sectionName: '', // Possible section names = ['Get Started', 'Questions', 'Ingredients', 'Weekly Plan']
    questionSectionInfo: {
        totalScreens: 0,
        screen: 1,
        currentScreenQuestions: []
    }
};

const reducer = (state = initialState, action) => {
    console.log(action, state);
    if (!action || !action.type) {
        return state;
    }

    switch (action.type) {
        case Actions.UPDATE_QUESTIONS:
            return {
                ...state,
                questions: action.payload || []
            };
        case Actions.UPDATE_NUTRITION_PLAN:
            return {
                ...state,
                nutritionPlan: action.payload || {}
            }
        case Actions.UPDATE_SUGGESTED_INGREDIENTS:
            return {
                ...state,
                suggestedIngredients: action.payload || []
            }
        case Actions.UPDATE_WEEKLY_PLAN:
            return {
                ...state,
                weeklyPlan: action.payload || []
            }
        case Actions.UPDATE_RESPONSE:
            return {
                ...state,
                responses: action.payload || {}
            }
        case Actions.ADD_RESPONSE:
            if (!action.payload || !action.payload.responseId || !action.payload.responseValue) {
                return state;
            }
            return {
                ...state,
                responses: {
                    ...state.responses,
                    [action.payload.responseId]: action.payload.responseValue
                }
            };
        case Actions.DELETE_RESPONSE:
            if (!action.payload) {
                return state;
            }
            const updatedResponses = { ...state.responses };
            delete updatedResponses[action.payload];
            return {
                ...state,
                responses: updatedResponses
            };
        case Actions.ADD_SELECTED_INGREDIENT:
            if (!action.payload) {
                return state;
            }
            return {
                ...state,
                selectedIngredients: [...state.selectedIngredients, action.payload]
            }
        case Actions.DELETE_SELECTED_INGREDIENT:
            if (!action.payload) {
                return state;
            }
            const updatedSelectedIngredients = state.selectedIngredients.filter(item => item !== action.payload);
            return {
                ...state,
                selectedIngredients: updatedSelectedIngredients
            }
        case Actions.UPDATE_SECTION_NAME:
            return {
                ...state,
                sectionName: action.payload || ''
            }
        case Actions.UPDATE_QUESTION_SECTION_INFO:
            if (!action.payload) {
                return state;
            }
            else{
                return {
                    ...state,
                    questionSectionInfo: {
                        screen: action.payload.screen ? action.payload.screen : state.questionSectionInfo.screen,
                        currentScreenQuestions: action.payload.currentScreenQuestions ? action.payload.currentScreenQuestions : state.questionSectionInfo.currentScreenQuestions,
                        totalScreens: action.payload.totalScreens ? action.payload.totalScreens : state.questionSectionInfo.totalScreens
                    }
                }
            }
        case Actions.RESET_TO_DEFAULT:
            return {
                questions: [],
                responses: {},
                nutritionPlan: {},
                suggestedIngredients: [],
                selectedIngredients: [],
                weeklyPlan: [],
                sectionName: '',
                questionSectionInfo: {
                    totalScreens: 0,
                    screen: 1,
                    currentScreenQuestions: []
                }
            };
        default:
            return state;
    }
};

export default reducer;