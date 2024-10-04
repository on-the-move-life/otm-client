import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  leaderboardConsistencyDetail,
  leaderboardConsistencyLoading,
  leaderboardFitnessScoreDetail,
  leaderboardFitnessScoreLoading,
} from '../reducers/leaderboard.reducers';
import {
  fetchPersonalCommumity,
  fetchAllCommumity,
} from '../../api/communityApi';
import { toast } from 'react-toastify';
import { leaderboardType } from '../actions/action.constants';
import { fetchLeaderboardApi } from '../../api/leaderboardApi';

// Worker saga: perform increment asynchronously
function* fetchFitnessLeaderboardData(action) {
  try {
    yield put(leaderboardFitnessScoreLoading({ loading: true }));
    const response = yield call(fetchLeaderboardApi, action.payload);
    yield put(leaderboardFitnessScoreDetail({ detail: response.data }));
  } catch (error) {
    toast.error('Something went wrong');
  } finally {
    yield put(leaderboardFitnessScoreLoading({ loading: false }));
  }
}

function* fetchConsistencyLeaderboardData(action) {
  try {
    yield put(leaderboardConsistencyLoading({ loading: true }));
    //   yield put(setAggregationsLoading({ loading: true }));
    const response = yield call(fetchLeaderboardApi, action.payload);

    yield put(leaderboardConsistencyDetail({ detail: response.data }));
  } catch (error) {
    toast.error('Something went wrong');
  } finally {
    yield put(leaderboardConsistencyLoading({ loading: false }));
  }
}

// Watcher saga: spawn a new incrementAsync task on each `INCREMENT_ASYNC`
export default function* leaderboardSagaWatcher() {
  yield takeEvery(
    leaderboardType.FETCH_FITNESS_SCORE,
    fetchFitnessLeaderboardData,
  );
  yield takeEvery(
    leaderboardType.FETCH_CONSISTENCY,
    fetchConsistencyLeaderboardData,
  );
}
