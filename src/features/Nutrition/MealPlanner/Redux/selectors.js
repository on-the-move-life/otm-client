import { createSelector } from 'reselect';

// self selector
const selectSelf = (state) => state;

// Memoized selectors with minimal transformation to avoid the warning
export const makeGetQuestions = () =>
  createSelector(
    [selectSelf],
    (state) => state.questions.slice(), // Returning a shallow copy as a transformation
  );

export const makeGetResponses = () =>
  createSelector(
    [selectSelf],
    (state) => ({ ...state.responses }), // Returning a shallow copy as a transformation
  );

export const makeGetNutritionPlan = () =>
  createSelector(
    [selectSelf],
    (state) => ({ ...state.nutritionPlan }), // Returning a shallow copy as a transformation
  );

export const makeGetSuggestedIngredients = () =>
  createSelector(
    [selectSelf],
    (state) => ({ ...state.suggestedIngredients }), // Returning a shallow copy as a transformation
  );

export const makeGetSelectedIngredients = () =>
  createSelector(
    [selectSelf],
    (state) => state.selectedIngredients.slice(), // Returning a shallow copy as a transformation
  );

export const makeGetWeeklyPlan = () =>
  createSelector(
    [selectSelf],
    (state) => state.weeklyPlan.slice(), // Returning a shallow copy as a transformation
  );

export const makeGetSectionName = () =>
  createSelector(
    [selectSelf],
    (state) => {
      return state.sectionName;
    }, // No transformation needed here, just returning the string
  );

export const makeGetQuestionSectionInfo = () =>
  createSelector(
    [selectSelf],
    (state) => ({ ...state.questionSectionInfo }), // Returning a shallow copy as a transformation
  );
