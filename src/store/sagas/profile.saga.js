import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import { ProfileType } from '../actions/action.constants';
import { fetchProfileApi } from '../../api/profileApi';
import { profilelDetail, profileLoading } from '../reducers/profile.reducer';

// Worker saga: perform increment asynchronously
function* fetchProfileData(action) {
  try {
    yield put(profileLoading({ loading: true }));
    console.log('44554455', action.payload);
    const response = yield call(fetchProfileApi, action.payload);

    yield put(profilelDetail({ detail: response.data }));
  } catch (error) {
    toast.error('Something went wrong');
  } finally {
    yield put(profileLoading({ loading: false }));
  }
}

// Watcher saga: spawn a new incrementAsync task on each `INCREMENT_ASYNC`
export default function* profileSagaWatcher() {
  yield takeEvery(ProfileType.FETCH_PROFILE_DETAIL, fetchProfileData);
}
