import { all } from 'redux-saga/effects';
import timelineSagaWatcher from './timeline.saga';
import leaderboardSagaWatcher from './leaderboard.saga';

// Root saga
export default function* rootSaga() {
  yield all([
    timelineSagaWatcher(),
    leaderboardSagaWatcher(),
    // Add more sagas here
  ]);
}
