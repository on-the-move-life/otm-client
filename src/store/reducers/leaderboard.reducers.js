import { createSlice } from '@reduxjs/toolkit';

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    fitnessScoreDetail: null,
    fitnessScoreLoading: false,
    consistencyLoading: false,
    consistencyDetail: null,
  },
  reducers: {
    leaderboard_fitnessScore_detail: (state, action) => {
      state.fitnessScoreDetail = action.payload.detail;
    },
    leaderboard_fitnessScore_loading: (state, action) => {
      state.fitnessScoreLoading = action.payload.loading;
    },
    leaderboard_consistency_loading: (state, action) => {
      state.consistencyLoading = action.payload.loading;
    },
    leaderboard_consistency_detail: (state, action) => {
      state.consistencyDetail = action.payload.detail;
    },
  },
});

export const {
  leaderboard_fitnessScore_detail: leaderboardFitnessScoreDetail,
  leaderboard_fitnessScore_loading: leaderboardFitnessScoreLoading,
  leaderboard_consistency_loading: leaderboardConsistencyLoading,
  leaderboard_consistency_detail: leaderboardConsistencyDetail,
} = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
