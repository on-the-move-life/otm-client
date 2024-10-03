import { communityType } from './action.constants';

export const fetchCommunityPersonalDetails = (payload) => ({
  type: communityType.FETCH_PERSONAL_DETAIL,
  payload,
});

export const fetchCommunityAllDetails = (payload) => ({
  type: communityType.FETCH_ALL_DETAIL,
  payload,
});
