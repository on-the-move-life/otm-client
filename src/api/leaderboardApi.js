import { leaderboardAxiosClient } from './leaderboardApiClient';

export const fetchLeaderboardApi = (params) => {
  console.log('xx2454fsfsdfd', params);
  return leaderboardAxiosClient.get(`/${params}`);
};
