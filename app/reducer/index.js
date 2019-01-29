

import { combineReducers } from 'redux';


import RootReducer from './RootReducer';
export default combineReducers({
  rootd: RootReducer,
})

// 添加persist黑名单，以下这些reducer不需要持久化
export const persistentStoreBlacklist = [

];
// 添加persist白名单，下面的这些reducer需要持久化处理
export const persistentStoreWhiteList = [

];
