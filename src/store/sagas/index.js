import { all } from 'redux-saga/effects';
import timelineSagaWatcher from './timeline.saga';
import leaderboardSagaWatcher from './leaderboard.saga';
import profileSagaWatcher from './profile.saga';

// Root saga
export default function* rootSaga() {
  yield all([
    timelineSagaWatcher(),
    leaderboardSagaWatcher(),
    profileSagaWatcher(),
    // Add more sagas here
  ]);
}
