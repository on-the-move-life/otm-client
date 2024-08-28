import * as Actions from './actionTypes';

export const updateQuestions = (questions) => {
  return (dispatch) => {
    dispatch({
      type: Actions.UPDATE_QUESTIONS,
      payload: questions,
    });
  };
};

export const updateNutritionPlan = (nutritionPlan) => {
  return (dispatch) => {
    dispatch({
      type: Actions.UPDATE_NUTRITION_PLAN,
      payload: nutritionPlan,
    });
  };
};

export const updateSuggestedIngredients = (suggestedIngredients) => {
  return (dispatch) => {
    dispatch({
      type: Actions.UPDATE_SUGGESTED_INGREDIENTS,
      payload: suggestedIngredients,
    });
  };
};

export const updateWeeklyPlan = (weeklyPlan) => {
  return (dispatch) => {
    dispatch({
      type: Actions.UPDATE_WEEKLY_PLAN,
      payload: weeklyPlan,
    });
  };
};

export const updateResponse = (response) => {
  return (dispatch) => {
    dispatch({
      type: Actions.UPDATE_RESPONSE,
      payload: response,
    });
  };
};

export const addResponse = (responseId, responseValue) => {
  return (dispatch) => {
    dispatch({
      type: Actions.ADD_RESPONSE,
      payload: {
        responseId,
        responseValue,
      },
    });
  };
};

export const deleteResponse = (responseId) => {
  return (dispatch) => {
    dispatch({
      type: Actions.DELETE_RESPONSE,
      payload: responseId,
    });
  };
};

export const addSelectedIngredient = (ingredientId) => {
  return (dispatch) => {
    dispatch({
      type: Actions.ADD_SELECTED_INGREDIENT,
      payload: ingredientId,
    });
  };
};

export const deleteSelectedIngredient = (ingredientId) => {
  return (dispatch) => {
    dispatch({
      type: Actions.DELETE_SELECTED_INGREDIENT,
      payload: ingredientId,
    });
  };
};

export const updateSectionName = (sectionName) => {
  // Possible section names = ['Get Started', 'Questions', 'Ingredients', 'Weekly Plan']

  console.log('xxxxxx', sectionName);
  return (dispatch) => {
    dispatch({
      type: Actions.UPDATE_SECTION_NAME,
      payload: sectionName,
    });
  };
};

export const updateQuestionSectionInfo = (info) => {
  return (dispatch) => {
    // these 3 fields are required in the info object
    const { screen, currentScreenQuestions, totalScreens } = info;
    dispatch({
      type: Actions.UPDATE_QUESTION_SECTION_INFO,
      payload: {
        screen,
        currentScreenQuestions,
        totalScreens,
      },
    });
  };
};

export const resetToDefault = () => {
  return (dispatch) => {
    dispatch({
      type: Actions.RESET_TO_DEFAULT,
    });
  };
};
