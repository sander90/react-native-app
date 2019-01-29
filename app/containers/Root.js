/**
 * Created by sandershan on 2019/1/29
 * @Description:
 */
import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar} from 'react-native';

// 第三方插件
import {
  createStackNavigator,
  createBottomTabNavigator, createAppContainer,
} from 'react-navigation'; // 更多的配置查看 https://reactnavigation.org/docs/en/getting-started.html


import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import NavigationService from '../components/NavigationService'
//page
import Login from './Login';
import {appColor} from "../config/appStyle";


const pageView = {
  login: {screen: Login},
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
}, {initialRouteName: 'login',});
const AppContainer = createAppContainer(RootController);

const {store} = configureStore();

export default class Root extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar backgroundColor={appColor.appMainColor}></StatusBar>
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
