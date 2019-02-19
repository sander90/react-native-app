/**
 * Created by sandershan on 2019/1/29
 * @Description:
 */
import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  PermissionsAndroid} from 'react-native';

// 第三方插件
import {
  createStackNavigator,
  createBottomTabNavigator, createAppContainer,
} from 'react-navigation'; // 更多的配置查看 https://reactnavigation.org/docs/en/getting-started.html
import * as WeChat from 'react-native-wechat';


import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import NavigationService from '../components/NavigationService'
//page
import Login from './Login';
import Home from './Home';
import SDFilterController from './Filter';

import {appColor} from "../config/appStyle";
import {apiConfig} from "../config";


const pageView = {
  Home: {screen: Home},
  login: {screen: Login},
  filterController: {screen: SDFilterController}
};



const RootController = createStackNavigator(pageView, {
  navigationOptions: ({navigation} = 0) => {
    return {
      headerStyle: {
        backgroundColor: appColor.appMainColor,
      },
      headerTitleStyle: {
        color: '#ffffff',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerTintColor: '#ffffff',
      headerBackTitle: null,
      gesturesEnabled: false,
    }
  }
}, {initialRouteName: 'Home',});
const AppContainer = createAppContainer(RootController);

const {store} = configureStore();


export default class Root extends PureComponent {


  constructor(props) {
    super(props);
    this.requestContactsPermission();
    console.log("-----> " + apiConfig.weCahtAppId);
    WeChat.registerApp(apiConfig.weCahtAppId).then(isgistr=>{
      console.log("已经注册成功了 " + isgistr);
    })
  }


  async requestContactsPermission(){
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use read contacts');
      } else {
        console.log('read contacts permission denied');
      }
      const w_granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS);

      if (w_granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use writed contacts');
      } else {
        console.log('writed contacts permission denied');
      }
    }catch (e) {

    }
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppContainer/>
        </View>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:appColor.appMainColor,
  }
});
