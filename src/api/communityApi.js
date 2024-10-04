import { timelineAxiosClient } from './timelineApiClient';

export const fetchPersonalCommumity = (params) =>
  timelineAxiosClient.get(
    `?type=personal&page=${params.page}&email=${params.user.email}`,
  );

export const fetchAllCommumity = (params) =>
  timelineAxiosClient.get(
    `?type=community&page=${params.page}&email=${params.user.email}`,
  );
