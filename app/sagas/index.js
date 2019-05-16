import { call, put, takeEvery, takeLatest,fork, take } from 'redux-saga/effects'

import {RootSaga} from "./RootSaga";

export default function * mySaga() {
  yield fork(RootSaga().watcher);

}