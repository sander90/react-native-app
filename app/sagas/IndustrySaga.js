import { call, put, takeEvery, takeLatest,fork, take } from 'redux-saga/effects'
import Types from "../actions/Types";
import actions from '../actions/Creators';
import fetchSend from "../network/Api";
import appAPI from "../config/appAPI";
import UserInfo from "../services/UserManager";

export function IndustrySaga() {
  function * dealData(action) {
    const res = yield call(fetchSend,appAPI.industry_list,{});
    if (res.code === 0 ){
      yield put(actions.industrySuccess(res.industry));
    }else {
      yield put(actions.Faile(res.code,res.msg));
    }
  }
  function * watcher() {
    yield takeEvery(Types.IndustryREQUEST, dealData);
  }
  return {
    watcher,
    dealData,
  }
}