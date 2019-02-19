import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '../actions/Types';

export const INITIAL_STATE = Immutable({
  page: 1,
  fList: null,
  err_code: null,
  err_msg: null,
  fetching: true,
});
const request = (state,action) =>{
  if (action.page ===  1){
    return {
      fetching: true,
    }
  }else {
    return {
      fetching: false,
    }
  }

};
const success = (state, action) =>{
  console.log("reducer = ",action);
  return {
    fetching: false,
    page: action.page,
    fList: action.fList,
  }
};
const failure = (state, action)=>{
  return state.merge({
    err_code: action.err_code,
    err_msg: action.err_msg,
    fetching: false,
  });
};
export const HANDLERS = {
  [Types.FilterREQUEST]:request,
  [Types.FilterSUCCESS]:success,
  [Types.Error]:failure
};
export default createReducer(INITIAL_STATE,HANDLERS);