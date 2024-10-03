import { createSlice } from '@reduxjs/toolkit';

const communitySlice = createSlice({
  name: 'community',
  initialState: {
    personalDetail: null,
    loading: false,
    allLoading: false,
    allDetail: null,
  },
  reducers: {
    community_personal_detail: (state, action) => {
      state.personalDetail = action.payload.detail;
    },
    community_personal_loading: (state, action) => {
      state.loading = action.payload.loading;
    },
    community_all_loading: (state, action) => {
      state.allLoading = action.payload.loading;
    },
    community_all_detail: (state, action) => {
      state.allDetail = action.payload.allCommunityDetail;
    },
  },
});

export const {
  community_personal_detail: communityPersonalDetail,
  community_personal_loading: communityPersonalLoading,
  community_all_loading: communityAllLoading,
  community_all_detail: communityAllDetail,
} = communitySlice.actions;
export default communitySlice.reducer;
