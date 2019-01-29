import fetchSend from "../network/Api";

5/**
 * Created by macbookair on 2018/11/19.
 * @Description: 处理用户token
 */
import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import appAPI from "../config/appAPI";


export const access_token_key = "access_token_user_key";
export const user_info_key = "user_info_key";


let instance = null;

class UserManager {

  // access_token 缓存 本地
  access_token = null;
  // 用户相关信息
  userInfo = null;
  refreshToken = null;

  static getIntance(){
    return new UserManager();
  }

  constructor(){
    if (!instance) {
      instance = this;
      this.configStorage();
    }
    return instance;
  }

  configStorage(){
    console.log("-----> 布局 userInfo");
    this.getInfo();
  }

  clearToken(){
    this.saveToken("");
    this.saveUserInfo("");
  }

  saveInfoCallBacK = (error)=>{
    if (error){
      console.log("保存失败 " + error );
    }else{
      console.log("保存成功");
    }
  }


}

export function UserInfo() {
  return UserManager.getIntance();
}

export default UserInfo;

