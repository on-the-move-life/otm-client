import { leaderboardAxiosClient } from './leaderboardApiClient';

export const fetchLeaderboardApi = (params) => {
  return leaderboardAxiosClient.get(`/${params}`);
};
