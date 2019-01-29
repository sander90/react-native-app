/**
 * Created by sandershan on 2018/12/27
 * @Description:
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View,ViewPropTypes} from 'react-native';
import PropTypes from "prop-types";

export default class SDDefalutTabbarRender extends PureComponent {

  _renderContentView(){
    let textList = this.props.titles;
    
  }

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

SDDefalutTabbarRender.protoTypes={
  titles: PropTypes.array, // 文字数组，
  style: ViewPropTypes.style,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
  }
});
