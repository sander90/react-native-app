// import {UserInfo} from "../services/UserManager";
// import {Toast} from "../components/Toast";

import UserInfo from "../services/UserManager";
import appAPI from "../config/appAPI";
import  {DeviceEventEmitter} from 'react-native';
import {Toast} from "../components/Toast";
import {Loading} from "../components/Loading";

export default class Request {
  // get 请求
  static get(url){
    return Request.customFetch('GET',url);
  }

  // post 请求
  static post(url, params){
    return Request.customFetch("POST",url, params);
  }


  static updateFile(method,uri,params){

    const fetchOptions ={
      method,
      headers: {
        'Content-Type':'multipart/form-data',
      },
      body: params,
    };
    return new Promise(async (resolve, reject) =>{
      let fetchStatus = 200;
      try {
        const res = await Request.fetchWithTimeout(
          fetch(uri, fetchOptions)
        );
        const { status } = res;
        fetchStatus = status;
        let response = null;
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1){
          response = await res.json();
        }else{
          const error = {
            status: fetchStatus,
            message:
              'respone body is not valid format, it should be application/json !',
            data: res
          };
          // reject(error);
          console.log("上传error1 === ",error);
          if (error){
            Loading.hidden();
            if (error.status === 413){
              Toast.show(error.message);
            }
          }

        }
        if (fetchStatus === 200){
          console.log("uri = " + uri + "  response = " + JSON.stringify(response));
          resolve(response);
        }else{
          const error = {
            status: fetchStatus,
            ...response
          };
          // reject(error);
          console.log("上传error2 === ",error);
        }
      }catch (error) {
        // reject(error);
        console.log("上传error3 === ",error);
      }

    });
  }
  // 上传图片
  static upload(method, uri, file){
    const data = new FormData();
    data.append("file", file);
    // if (UserInfo().getaccess_token()) {
    //   data.append("access_token",UserInfo().getaccess_token())
    // }
    console.log('上传-upload----------------->');
    console.log(method + "   " + uri + "   " + file);
    const fetchOptions ={
      method,
      headers: {
        'Content-Type':'multipart/form-data',
      },
      body: data,
    };
    return new Promise(async (resolve, reject) =>{
      let fetchStatus = 200;
      try {
        const res = await Request.fetchWithTimeout(
          fetch(uri, fetchOptions)
        );
        const { status } = res;
        fetchStatus = status;
        let response = null;
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1){
          response = await res.json();
        }else{
          const error = {
            status: fetchStatus,
            message:
              'respone body is not valid format, it should be application/json !',
            data: res
          };
          // reject(error);
        }
        if (fetchStatus === 200){
          console.log("uri = " + uri + "  response = " + JSON.stringify(response));
          resolve(response);
        }else{
          const error = {
            status: fetchStatus,
            ...response
          };
          // reject(error);
        }
      }catch (error) {
        // reject(error);
      }

    });
  }
  // 自定义 Fetch
  static customFetch(
    method,
    uri,
    data="",
    saveToCache=false)
  {

    var token = "";

    let access_token = UserInfo().getToken();

    console.log('请求数据----customFetch ---获取token');
    console.log(access_token);
    // let userInfo = UserInfo().getUserInfo();
    // console.log("--UserInfo---->");
    // console.log(userInfo);

    let fetchOptions ={
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token':access_token,
      },
    };

    if (uri.indexOf(appAPI.orderPreOrder.url) !== -1 ||
      uri.indexOf(appAPI.submitOrderGoods.url) !== -1 ||
      uri.indexOf(appAPI.suborderOrder.url) !== -1 ||
      uri.indexOf(appAPI.submitShopCartOrder.url) !== -1){
      fetchOptions ={
        method,
        headers: {
          'Content-Type': 'application/json',
          'token':access_token,
        },
      };
    }

    if (data && data.length > 0){
      fetchOptions.body = data;
    }
    console.log("method = " + method + "   uri = " + uri  + " body = " + fetchOptions.body);
    return new Promise(async (resolve, reject)=>{
      let fetchStatus = 200;
      try {
        const res = await Request.fetchWithTimeout(
          fetch(uri, fetchOptions)
        );
        const { status } = res;
        fetchStatus = status;
        let response = null;
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1){
          response = await res.json();
        }else{
          const error = {
            status: fetchStatus,
            message:
              'respone body is not valid format, it should be application/json !',
            data: res
          };

          // reject(error);
          console.log(error);
          // Toast.show("服务器异常 " + error.status);
        }
        if (fetchStatus === 200){
          // console.log('这里是Request 请求成功结果============》');
          console.log("uri = " + uri);
          console.log(response);
          if (response.code === 401){
            //token 过期=====>
            //调用事件通知
            DeviceEventEmitter.emit('TokenExpiredNotification');
          }
          resolve(response);
        }else{
          const error = {
            status: fetchStatus,
            ...response
          };
          Loading.hidden();
          console.log('请求失败===========》');
          Toast.showLong('status:'+error.status + " message:" + error.message);
          // reject(error);
          console.log(error);
        }
      }catch (error) {
        // reject(error);
        console.log(error);
      }

    });
  }
  static fetchWithTimeout(promise){
    return new Promise((resolve, reject)=>{
      const error = {
        status: 408,
        message: "requst time out",
      };
      setTimeout(()=>{
        reject(error);
      },300000);
      promise.then(resolve,reject);
    });
  }
}