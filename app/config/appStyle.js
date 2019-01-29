
import {Platform, StyleSheet} from 'react-native';
import DeviceInfo from "react-native-device-info";
import {dFont, navigationBarH, screen} from "../components/screen";

export const appColor = {
  appMainColor : "#15ae3f",
  // inactiveTintColor : '#fff',
  inactiveTintColor : '#818181',
  // activeTintColor: '#fff',
  activeTintColor: '#15ae3f',
  white: '#ffffff',
  gray: '#333333',
  gray2: '#222222',
  gray3: '#333333',
  gray9: '#999999',
  gray6:'#666666',
  blue: '#5285EB',
  gray_bgColor : '#F4F4F4',
};

export function randomColor(num){
  let n = num % 10;
  let colorValue = '#FF0000';
  switch (n) {
    case 0:
      colorValue = '#c71585';
      break;

    case 1:
      colorValue = '#FF0000';
      break;

    case 2:
      colorValue = '#00ced1';
      break;

    case 3:
      colorValue = '#6a5acd';
      break;

    case 4:
      colorValue = '#4169e1';
      break;

    case 5:
      colorValue = '#d2691e';
      break;

    case 6:
      colorValue = '#ff00ff';
      break;

    case 7:
      colorValue = '#87cefa';
      break;

    case 8:
      colorValue = '#ffa500';
      break;

    case 9:
      colorValue = '#adff2f';
      break;
  }

  return colorValue;
}

export const AppStyles = StyleSheet.create({
  // app 顶部导航栏的布局设置
  navigationHeaderContainer:{
    backgroundColor: appColor.appMainColor,
  },
  safeAreaTopView:{
    marginTop: Platform.OS === 'ios' ? (parseInt(DeviceInfo.getSystemVersion()) < 11 ? 20: 0) : 0,
  },
  navigtaionContentView:{
    flexDirection: 'row',
    height: Platform.OS === 'android' ? 50 : 44,
    alignItems: 'center',
  },
  tabbarIconImageStyle:{
    width: 20,height: 20,resizeMode: 'contain'
  },
  topNavigationRightAddView:{
    justifyContent: 'center',
    alignItems:'center',
    width:60,
    height:Platform.OS === 'android' ? 50: 44,
  },
  single_label:{
    fontSize: dFont(28),
  },
  normal_label:{
    fontSize: dFont(30),
  },
  bgWhiteColor:{
    backgroundColor: appColor.white,
  },

});