# react-native-app
快速创建react-native 基础模块

脱离了项目的业务逻辑层，只是单纯的框架，

> 使用的基础SDK

* react-navigation 
* react-native-gesture-handler
* react-redux
* redux
* redux-saga
* redux-persist
* reduxsauce
* prop-types
* react-native-root-toast
* react-native-vector-icons
* react-native-device-info
* seamless-immutable
* ramda

> 使用

1. 将根目录下的app文件移植到新建的react-native项目的根目录下。
2. 依次安装使用到的第三方SDK，例如 
`npm install react-navigation --save`
3. 在根目录下的index.js文件下，修改 
```
import {AppRegistry} from 'react-native';
import Root from './app/containers/Root';
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => Root); 

```
4. 在containers文件下创键对应的页面，撸起来。


> 执行脚本

` ./index.sh `

根据提示输入项目的绝对路径，和项目的名称就好了，

> 说明

* 请求的接口说明

```
const login = { 
  name : "登陆", //接口的说明
  url : "api/member/login", // 对应的api地址
  method: "POST", // 请求的地址//
};
```
在app/config/appAPI.js中有例子

* 使用说明

```
async request(){
	const res = await fetchSend(login, {});
}
```





