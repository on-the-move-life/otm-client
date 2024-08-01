import { createSelector } from 'reselect';

// Simple selectors
const getQuestions = (state) => state.questions;
const getResponses = (state) => state.responses;
const getNutritionPlan = (state) => state.nutritionPlan;
const getSuggestedIngredients = (state) => state.suggestedIngredients;
const getSelectedIngredients = (state) => state.selectedIngredients;
const getWeeklyPlan = (state) => state.weeklyPlan;
const getSectionName = (state) => state.sectionName;
const getQuestionSectionInfo = (state) => state.questionSectionInfo;

// Memoized selectors
export const makeGetQuestions = () => createSelector(
    [getQuestions],
    (questions) => questions
);

export const makeGetResponses = () => createSelector(
    [getResponses],
    (responses) => responses
);

export const makeGetNutritionPlan = () => createSelector(
    [getNutritionPlan],
    (nutritionPlan) => nutritionPlan
);

export const makeGetSuggestedIngredients = () => createSelector(
    [getSuggestedIngredients],
    (suggestedIngredients) => suggestedIngredients
);

export const makeGetSelectedIngredients = () => createSelector(
    [getSelectedIngredients],
    (selectedIngredients) => selectedIngredients
);

export const makeGetWeeklyPlan = () => createSelector(
    [getWeeklyPlan],
    (weeklyPlan) => weeklyPlan
);

export const makeGetSectionName = () => createSelector(
    [getSectionName],
    (sectionName) => sectionName
);

export const makeGetQuestionSectionInfo = () => createSelector(
    [getQuestionSectionInfo],
    (questionSectionInfo) => questionSectionInfo
);
