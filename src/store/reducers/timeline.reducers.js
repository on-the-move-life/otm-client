import { createSlice } from '@reduxjs/toolkit';

const timelineSlice = createSlice({
  name: 'timeline',
  initialState: {
    personalDetail: null,
    personalLoading: false,
    communityLoading: false,
    communityDetail: null,
  },
  reducers: {
    timeline_personal_detail: (state, action) => {
      state.personalDetail = action.payload.detail;
    },
    timeline_personal_loading: (state, action) => {
      state.personalLoading = action.payload.loading;
    },
    timeline_community_loading: (state, action) => {
      state.communityLoading = action.payload.loading;
    },
    timeline_community_detail: (state, action) => {
      state.communityDetail = action.payload.detail;
    },
  },
});

export const {
  timeline_personal_detail: timelinePersonalDetail,
  timeline_personal_loading: timelinePersonalLoading,
  timeline_community_loading: timelineCommunityLoading,
  timeline_community_detail: timelineCommunityDetail,
} = timelineSlice.actions;
export default timelineSlice.reducer;
