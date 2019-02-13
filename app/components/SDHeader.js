import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView
} from 'react-native';

import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info';
import {appColor} from "../config/appStyle";

export default class SDHeader extends Component {
  render() {
    const {headerStyle, style,leftView,rightView,titleView} = this.props;
    // console.log("deviceInfo systemVersion 然后得到的 距离底部的高度，是iOS11以下的系统下获取的 ----> " + navigation_margion_top);
    return (
      <View style={[styles.container,headerStyle]}>
          <SafeAreaView style={styles.safeAreaTopView}>
            <View style={[styles.navigtaionContentView, style]}>
              {leftView? leftView: null}
              {titleView? titleView: null}
              {rightView? rightView: null}
            </View>
          </SafeAreaView>
      </View>
    );
  }
}
SDHeader.propTypes = {
  headerStyle:PropTypes.object,
  style : PropTypes.object,
  leftView: PropTypes.object,
  rightView: PropTypes.object,
  titleView: PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColor.appMainColor,
  },
  safeAreaTopView:{
    marginTop: Platform.OS === 'ios' ? (parseInt(DeviceInfo.getSystemVersion()) < 11 ? 20: 0) : 0,
  },
  navigtaionContentView:{
    flexDirection: 'row',
    height: Platform.OS === 'android' ? 50 : 44,
    alignItems: 'center',
  }
});
