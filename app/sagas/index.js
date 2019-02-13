import { call, put, takeEvery, takeLatest,fork, take } from 'redux-saga/effects'

import {IndustrySaga} from "./IndustrySaga";


export default function * mySaga() {
  yield fork(IndustrySaga().watcher);
}