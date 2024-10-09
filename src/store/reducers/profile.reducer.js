import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileDetail: null,
    profileLoading: false,
  },
  reducers: {
    profile_detail: (state, action) => {
      state.profileDetail = action.payload.detail;
    },
    profile_loading: (state, action) => {
      state.profileLoading = action.payload.loading;
    },
  },
});

export const {
  profile_detail: profilelDetail,
  profile_loading: profileLoading,
} = profileSlice.actions;
export default profileSlice.reducer;
