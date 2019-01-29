/**
 * Created by sandershan on 2019/1/29
 * @Description:
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {styles} from "./Styles";

export default class Login extends PureComponent {
  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}
Login.navigationOptions =  ({navigation}) => ({
  title: "登录",
  header: null,
});

