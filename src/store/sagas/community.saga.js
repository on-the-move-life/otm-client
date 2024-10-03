import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { communityType } from '../actions/action.constants';
import {
  communityPersonalLoading,
  communityPersonalDetail,
  communityAllLoading,
  communityAllDetail,
} from '../reducers/community.reducers';
import {
  fetchPersonalCommumity,
  fetchAllCommumity,
} from '../../api/communityApi';
import { toast } from 'react-toastify';

// Worker saga: perform increment asynchronously
function* fetchPersonalCommunityData(action) {
  try {
    console.log('yyuu', action);
    yield put(communityPersonalLoading({ loading: true }));
    const response = yield call(fetchPersonalCommumity, action.payload);
    yield put(communityPersonalDetail({ detail: response.data }));
  } catch (error) {
    toast.error('Something went wrong');
  } finally {
    yield put(communityPersonalLoading({ loading: false }));
  }
}

function* fetchAllCommunityData(action) {
  try {
    yield put(communityAllLoading({ loading: true }));
    //   yield put(setAggregationsLoading({ loading: true }));
    const response = yield call(fetchAllCommumity, action.payload);
    yield put(communityAllDetail({ detail: response.data }));
  } catch (error) {
    toast.error('Something went wrong');
  } finally {
    yield put(communityAllLoading({ loading: false }));
  }
}

// Watcher saga: spawn a new incrementAsync task on each `INCREMENT_ASYNC`
export default function* communitySagaWatcher() {
  yield takeEvery(
    communityType.FETCH_PERSONAL_DETAIL,
    fetchPersonalCommunityData,
  );
  yield takeEvery(communityType.FETCH_ALL_DETAIL, fetchAllCommunityData);
}
