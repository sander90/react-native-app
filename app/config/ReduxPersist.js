import { AsyncStorage } from 'react-native';
import immutablePersistenceTransform from '../store/ImmutablePersistenceTransform';

import {persistentStoreBlacklist} from '../reducer';
const REDUX_PERSIST = {
  active: true, // 是否采用持久化策略
  reducerVersion: '1',  // reducer版本，如果版本不一致，将刷新整个持久化仓库
  storeConfig: {

  }
};

export default REDUX_PERSIST;