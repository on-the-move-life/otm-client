import { leaderboardAxiosClient } from './leaderboardApiClient';

export const fetchPersonalCommumity = (params) =>
  leaderboardAxiosClient.get(
    `?type=personal&page=${params.page}&email=${params.user.email}`,
  );

export const fetchAllCommumity = (params) =>
  leaderboardAxiosClient.get(
    `?type=community&page=${params.page}&email=${params.user.email}`,
  );
