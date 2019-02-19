import { call, put, takeEvery, takeLatest,fork, take } from 'redux-saga/effects'
import Types from "../actions/Types";
import actions from '../actions/Creators';
import fetchSend from "../network/Api";
import appAPI from "../config/appAPI";
import UserInfo from "../services/UserManager";

export function FilterSaga() {
  function * dealData(action) {
    let token = UserInfo().getToken();
    let page = action.page;
    let params = action.params;
    params.page = page;
    params.token = token;
    const res = yield call(fetchSend,appAPI.fansLibrary,params);
    if (res.code === 0 ){
      let list = [];
      if (res.page.data){
        list =res.page.data;
      }
      yield put(actions.FilterSuccess(res.page.page,list));
    }else {
      yield put(actions.Faile(res.code,res.msg));
    }
  }
  function * watcher() {
    yield takeEvery(Types.FilterREQUEST, dealData);
  }
  return {
    watcher,
    dealData,
  }
}