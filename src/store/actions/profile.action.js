import { ProfileType } from './action.constants';

export const fetchProfileDetail = (payload) => ({
  type: ProfileType.FETCH_PROFILE_DETAIL,
  payload,
});
