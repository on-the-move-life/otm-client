import { createSlice } from '@reduxjs/toolkit';

const timelineSlice = createSlice({
  name: 'timeline',
  initialState: {
    personalDetail: null,
    personalLoading: false,
    personalTimelinePage: 1,
    communityLoading: false,
    communityDetail: null,
    communityTimelinePage: 1,
  },
  reducers: {
    timeline_personal_detail: (state, action) => {
      state.personalDetail = action.payload.detail;
    },
    timeline_personal_loading: (state, action) => {
      state.personalLoading = action.payload.loading;
    },
    personal_timeline_page: (state, action) => {
      state.personalTimelinePage = action.payload.page;
    },
    timeline_community_loading: (state, action) => {
      state.communityLoading = action.payload.loading;
    },
    timeline_community_detail: (state, action) => {
      state.communityDetail = action.payload.detail;
    },
    community_timeline_page: (state, action) => {
      state.communityTimelinePage = action.payload.page;
    },
  },
});

export const {
  timeline_personal_detail: timelinePersonalDetail,
  timeline_personal_loading: timelinePersonalLoading,
  timeline_community_loading: timelineCommunityLoading,
  timeline_community_detail: timelineCommunityDetail,
  personal_timeline_page: personalTimelinePageNumber,
  community_timeline_page: communityTimelinePageNumber,
} = timelineSlice.actions;
export default timelineSlice.reducer;
