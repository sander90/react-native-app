/**
 * Created by sandershan on 2018/10/23
 * @Description: 专门用来做 提示
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Loading} from "../components/Loading";
import {Toast} from '../components/Toast';
// var Toast = require('react-native-xsy-toast');

export default function WithAlert(WrappedComponent,	setOrientationToDefault = true) {
  return class extends PureComponent {
    // 必须的，获取上一个视图的 顶部布局
    static navigationOptions = WrappedComponent.navigationOptions;

    constructor(props){
      super(props);
      this.showLoading = this.showLoading.bind(this);
      this.showToast = this.showToast.bind(this);

      this.state={
        showLoading:false,
      }
    }
    componentWillUnmount(){
      Loading.hidden();
    }

    showLoading(showLoading = false){
      console.log('showLoading==>'+showLoading);
      if (showLoading){
        Loading.show();
      } else {
        Loading.hidden();
      }
    }

    showToast(message){
      console.log("toast ===> ", Toast);
      // Toast.showShortBottom.bind(null, message);
      Toast.show(message);
    }

    render(){

      return(
        <View style={{flex: 1}}>
          <WrappedComponent
            showLoading={this.showLoading}
            showToast={this.showToast}
            {...this.props}
          />

        </View>
      )
    }
  }
}
