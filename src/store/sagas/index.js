import { all } from 'redux-saga/effects';
import communitySagaWatcher from './community.saga';

// Root saga
export default function* rootSaga() {
  yield all([
    communitySagaWatcher(),
    // Add more sagas here
  ]);
}
