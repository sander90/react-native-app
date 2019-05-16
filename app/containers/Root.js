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
  PermissionsAndroid,} from 'react-native';

// 第三方插件
import {
  createStackNavigator,
  createBottomTabNavigator, createAppContainer,
} from 'react-navigation'; // 更多的配置查看 https://reactnavigation.org/docs/en/getting-started.html


import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import NavigationService from '../components/NavigationService'


import {appColor} from "../config/appStyle";
import {dFont} from "../components/screen";

import {TabPages,tab_orders, navigationPages} from "./pages";

const TabBar = createBottomTabNavigator(TabPages, {
  lazy: true,
  swipeEnabled: false, //是否允许tabBar手势切换
  order: tab_orders,
  tabBarOptions: {
    animationEnabled: false,
    swipeEnabled: false,
    showIcon: true,
    inactiveTintColor: appColor.inactiveTintColor,
    activeTintColor: appColor.activeTintColor,
    style: {
      backgroundColor: 'rgba(241,2,2,0)',
    },
    labelStyle: {
      fontSize: dFont(24),
    },
  }
});

const pageView = {
  Tab: {screen: TabBar},
  ...navigationPages,
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
  },
  initialRouteName: "Tab",
});

const AppContainer = createAppContainer(RootController);

const {store} = configureStore();


export default class Root extends PureComponent {

  constructor(props) {
    super(props);

  }
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar backgroundColor={appColor.appMainColor}></StatusBar>
          <AppContainer ref={navigatorRef=>{
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}/>
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
