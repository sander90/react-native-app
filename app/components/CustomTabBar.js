import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  NativeModules,
  Platform,
} from 'react-native';
import {appColor, AppStyles} from "../config/appStyle";
import {dFont, dSize, SAFE_BOTTOM_DISTANCE, screen} from "./screen";
import UserInfo from "../services/UserManager";
import {MUI} from "../containers/home/MUIPush";
let pushModule = NativeModules.SDPushControllerModule;

export default class CustomTabBar extends React.PureComponent{

  onPushScanController=()=>{
    console.log("on push scan ");
    MUI().push("TwoCode");
  };
  onPushLeaseController = ()=>{
    UserInfo().getMuiUserInfo((info)=>{

      UserInfo().getRefashToken((mInfo)=>{
        let userInfo = JSON.parse(mInfo);
        let userId = UserInfo().getUserInfo().userUniqueId;
        let tap = "LeaseIndex";
        let token = userInfo.hisenToken;
        let runPage = {userid: userId,token:token,info: userInfo, tap: tap};
        let runPageString = JSON.stringify(runPage);
        console.log("run page = " + runPageString);
        pushModule.pushViewControllerWithcontrollerType(runPageString);
      })
    });
  };

  renderTabbarItem = (route, index) => {
    const { navigation, jumpTo, activeTintColor, inactiveTintColor , renderIcon, getLabelText} = this.props;
    // state.index: 选中某个tabItem后, state.index角标值会改变; index: 每个tabItem都有对应一个角标值; 是否是焦点
    const focused = (index === navigation.state.index);
    // 根据状态设置 文字颜色
    const color = focused ? activeTintColor : inactiveTintColor;
    // 函数renderIcon(TabScene), getLabelText(TabScene)
    const TabScene = {
      focused,
      route,
      color,
    };
    if (index == 2){
      return (
        <SafeAreaView key={route.key}>

          <View style={styles.centerTabItemStyle} >
            {/*自定义的图片作为背景，或者是整体的使用*/}
            {/*<View style={{height:5}}></View>*/}
            <TouchableOpacity
              style={[styles.scanBackImageStyle,{height:70,width:screen.width * 0.19,marginTop:-20}]}
              activeOpacity={1}
              onPress={()=>{
                this.onPushScanController();
              }}>
              <ImageBackground  style={[styles.scanBackImageStyle]}>
                <Image source={require('../img/tabbar_scan.png')} style={[styles.scanIconImageStyle]}/>
                <Text style={{color, fontSize: dFont(24), marginTop: 8}}>
                  扫一扫
                </Text>
              </ImageBackground>
            </TouchableOpacity>

          </View>

        </SafeAreaView>
      )
    }else {
      return (
        <SafeAreaView key={route.key}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={()=>{
              jumpTo(route.key);
            }}
            style={[styles.tabItemStyle]}
          >
            <View style={[styles.tabItemStyle,{marginTop: 0,}]}>
              {/*渲染item的图片*/}
              {renderIcon(TabScene)}
              {/*item文字 */}
              <Text style={{color, fontSize: dFont(24), marginTop: 8}}>
                {getLabelText(TabScene)}
              </Text>
              {/*<View style={styles.badgeStyle} />*/}
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      )
    }


  };

  render(){
    const { navigation:{state: {routes}} } = this.props;
    return (
      <View style={[styles.tabContainer,{height:49 + SAFE_BOTTOM_DISTANCE}]}>
        <View style={{height:80,marginTop:-31}}>
          <ImageBackground style={styles.tabBarBackStyle}
            // imageStyle={{marginTop:Platform.OS === 'ios'? 0: 2,backgroundColor:'rgba(0,0,0,0)'}}
                           source={require('../img/tabbar_bg1.png')}>
            <View style={[styles.tabContainer,{marginTop:31,height:49}]}>
              {routes.map(this.renderTabbarItem)}
            </View>
            <View style={{height:SAFE_BOTTOM_DISTANCE,backgroundColor:'#fff'}}></View>
          </ImageBackground>
        </View>


      </View>



    )
  }

}

const styles = StyleSheet.create({

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: 'rgba(0,0,0,0)',
    width:screen.width,
    // height:49,

  },
  tabBarBackStyle:{
    marginTop:2,
    width:screen.width,
    height:80,
    backgroundColor:'rgba(0,0,0,0)',

  },
  tabItemStyle: {
    height: 49,
    // width: 49,
    width:screen.width * 0.18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -5,
  },
  badgeStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute',
    right: 5,
    top: 5
  },
  centerTabItemStyle:{
    height: 60,
    width: 60,
    marginTop: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scanBackImageStyle:{
    height: 60,
    width: 60,
    alignItems: 'center',
    marginTop:-5,
  },
  scanIconImageStyle:{
    marginTop: 10,
    width:39,
    height:39,
  },


});
