import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import {
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
    console.log('yyuu', action);
    yield put(timelinePersonalLoading({ loading: true }));
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
    //   yield put(setAggregationsLoading({ loading: true }));

    const response = yield call(fetchAllCommumity, action.payload);
    console.log('090909090990909090', response.data);
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
