import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '../actions/Types';

export const INITIAL_STATE = Immutable({
  response: null,
  err_code: null,
  err_msg: null,
  fetching: true,
});
const request = (state,action) =>{
  return {
    fetching: true,
  }
};
const success = (state, action) =>{
  return {
    fetching: false,
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
  [Types.REQUEST]:request,
  [Types.SUCCESS]:success,
  [Types.Error]:failure
};
export default createReducer(INITIAL_STATE,HANDLERS);