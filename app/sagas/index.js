import { call, put, takeEvery, takeLatest,fork, take } from 'redux-saga/effects'
import {FilterSaga} from "./FilterSaga";
import {IndustrySaga} from "./IndustrySaga";

export default function * mySaga() {
  yield fork(FilterSaga().watcher);
  yield fork(IndustrySaga().watcher);
}