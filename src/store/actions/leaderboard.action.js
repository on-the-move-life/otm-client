import { leaderboardType } from './action.constants';

export const fetchLeaderboardFitnessDetails = (payload) => ({
  type: leaderboardType.FETCH_FITNESS_SCORE,
  payload,
});

export const fetchLeaderboardConsistencyDetails = (payload) => ({
  type: leaderboardType.FETCH_CONSISTENCY,
  payload,
});
