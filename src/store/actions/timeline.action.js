import { timelineType } from './action.constants';

export const fetchTimelinePersonalDetails = (payload) => ({
  type: timelineType.FETCH_PERSONAL_DETAIL,
  payload,
});

export const fetchTimelineCommunityDetails = (payload) => ({
  type: timelineType.FETCH_COMMUNITY_DETAIL,
  payload,
});
