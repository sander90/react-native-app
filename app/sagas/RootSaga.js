import { call, put, takeEvery, takeLatest,fork, take } from 'redux-saga/effects'
import Types from "../actions/Types";
import actions from '../actions/Creators';
import fetchSend from "../network/Api";
import appAPI from "../config/appAPI";
import UserInfo from "../services/UserManager";

export function RootSaga() {
  function * dealData(action) {

  }
  function * watcher() {
    yield takeEvery(Types.REQUEST, dealData);
  }
  return {
    watcher,
    dealData,
  }
}