import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  communityTimelinePageNumber,
  personalTimelinePageNumber,
  timelineCommunityDetail,
  timelineCommunityLoading,
  timelinePersonalDetail,
  timelinePersonalLoading,
} from '../reducers/timeline.reducers';
import {
  fetchPersonalCommumity,
  fetchAllCommumity,
} from '../../api/communityApi';
import { toast } from 'react-toastify';
import { timelineType } from '../actions/action.constants';

// Worker saga: perform increment asynchronously
function* fetchPersonalTimelineData(action) {
  try {
    yield put(timelinePersonalLoading({ loading: true }));
    yield put(personalTimelinePageNumber({ page: action.payload.page }));
    const response = yield call(fetchPersonalCommumity, action.payload);
    yield put(timelinePersonalDetail({ detail: response.data }));
  } catch (error) {
    toast.error('Something went wrong');
  } finally {
    yield put(timelinePersonalLoading({ loading: false }));
  }
}

function* fetchCommunityTimelineData(action) {
  try {
    yield put(timelineCommunityLoading({ loading: true }));
    console.log();
    yield put(communityTimelinePageNumber({ page: action.payload.page }));
    //   yield put(setAggregationsLoading({ loading: true }));

    const response = yield call(fetchAllCommumity, action.payload);

    yield put(timelineCommunityDetail({ detail: response.data }));
  } catch (error) {
    toast.error('Something went wrong');
  } finally {
    yield put(timelineCommunityLoading({ loading: false }));
  }
}

// Watcher saga: spawn a new incrementAsync task on each `INCREMENT_ASYNC`
export default function* timelineSagaWatcher() {
  yield takeEvery(
    timelineType.FETCH_PERSONAL_DETAIL,
    fetchPersonalTimelineData,
  );
  yield takeEvery(
    timelineType.FETCH_COMMUNITY_DETAIL,
    fetchCommunityTimelineData,
  );
}
