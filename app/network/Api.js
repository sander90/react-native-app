
import Request from './Request';
import {apiConfig} from "../config";
import appAPI from "../config/appAPI";
// import UserInfo from "../services/UserManager";
const opts = {
  method: 'GET',
  headers: {
    //'Accept': 'application/json',
    //表单
    //'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0'  //坑啊，花了三小时,提示服务端，我是网页端(骗他) //https://zhidao.baidu.com/question/1767408752449075980.html
  },
  //body: formData
};

//const baseURl = "http://121.41.101.63:8088/edu-web";
// const baseURl = "http://192.168.1.200:8081/edu-web";
const baseURl = apiConfig.baseURL;

export function getRequestParams(params,method) {
  var paramsBody = "";
  if (params){
    paramsBody = Object.keys(params)
      .reduce((a, k) => {
        if (params[k] !== "" || params[k] !== undefined) {
          a.push(k + "=" + encodeURIComponent(params[k]));
        }
        return a;
      }, [])
      .join('&');
  }
  // if (UserInfo().getaccess_token()){
  //   if (paramsBody.length > 0 ){
  //     paramsBody += "&access_token=" + UserInfo().getaccess_token();
  //   }else{
  //     if (method === 'GET'){
  //       paramsBody += "?access_token=" + UserInfo().getaccess_token();
  //     }else if (method === 'POST'){
  //       paramsBody += "access_token=" + UserInfo().getaccess_token();
  //     }
  //   }
  // }
  console.log("params body = " + paramsBody);
  return paramsBody;
}
// Post 请求
export function post(url,params) {
  var requestUrl = url;
  var paramsBody = getRequestParams(params, 'POST');
  if (requestUrl.indexOf(appAPI.orderPreOrder.url) !== -1 ||
    requestUrl.indexOf(appAPI.submitOrderGoods.url) !== -1 ||
    requestUrl.indexOf(appAPI.suborderOrder.url) !==-1 ||
  requestUrl.indexOf(appAPI.submitShopCartOrder.url) !== -1){
    paramsBody = JSON.stringify(params);
  }

  return Request.post(requestUrl, paramsBody);
}

// get 请求
export function get(url, params) {
  console.log('get 请求 参数------->');
  console.log(params);
  var requestUrl = url;
  var paramsBody = getRequestParams(params, 'GET');
  requestUrl += "?" + paramsBody;
  return Request.get(requestUrl);
}

export function loadFile(config , file) {
  let requestURL = baseURl + config.url;
  return Request.upload(config.method, requestURL, file);
}

export function loadFiles(config, params) {
  let requestURL = baseURl + config.url;
  return Request.updateFile(config.method, requestURL, params);
}
// 对外统一的接口
export default function fetchSend (config,params) {
  if (!config || typeof config != 'object'){
    throw new TypeError("urls 有问题");
  }
  let requestURL = baseURl + config.url;
  if (config.method === 'GET'){
    return get(requestURL,params);
  }else if (config.method === 'POST'){
    return post(requestURL,params);
  }
}