import { createStore,applyMiddleware,compose} from 'redux';
import {AsyncStorage} from 'react-native'
import createSagaMiddleware from 'redux-saga';
import reconciler from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { persistStore, persistReducer} from 'redux-persist'

import mySaga from "../sagas";

import reducers, {persistentStoreBlacklist} from '../reducer';
// import {persistentStoreBlacklist} from '../reducer';
import {persistentStoreWhiteList} from '../reducer';
import ReduxPersist from '../config/ReduxPersist';

import RehydrationServices from '../services/RehydrationServices';
import immutablePersistenceTransform from "./ImmutablePersistenceTransform";

const sagaMiddleware = createSagaMiddleware();
const middleWares = [
  sagaMiddleware,
];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,  // 采用本地异步存储，react-native必须
  blacklist: persistentStoreBlacklist,
  whitelist: persistentStoreWhiteList,  // 从根reducer获取黑名单，黑名单中的reducer不进行持久化保存
  transforms: [immutablePersistenceTransform],  // 重要，因为redux是immutable不可变的，此处必须将常规数据做变形，否则会失败
  stateReconciler: reconciler, //合并模式
};

const persistedReducer = persistReducer(persistConfig, reducers);
const enhances = [applyMiddleware(...middleWares)];

export default function (initialState = {}) {
  let store = {};
  if (ReduxPersist.active){
    // 配置 要使用持久化
    store = createStore(persistedReducer,initialState,compose(...enhances));
    //启动 持久化
    RehydrationServices.updateReducers(store);
  }else {
    store = createStore(persistedReducer,initialState,compose(...enhances));
  }
  sagaMiddleware.run(mySaga);
  return {store};
}