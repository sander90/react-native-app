
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import PropTypes from 'prop-types';
import {dFont} from "./screen";

export default class Title extends Component {

  static defaultProps = {
    noMargin : false,
    marginLeft: 0,
    marginRight: 60,
  };
  render() {
    const { title,style,titleStyle,noMargin,marginRight,marginLeft} = this.props;
    let rightMargin = marginRight;
    let leftMargin = marginLeft;
    if (noMargin){
      rightMargin = 0;
      leftMargin = 0;
    }
    return (
      <View style={[styles.container, {marginRight: rightMargin,marginLeft: leftMargin}, style ]}>
        <Text style={[styles.mainTitleText, titleStyle]}>{title}</Text>
      </View>
    );
  }
}
Title.propTypes = {
  title : PropTypes.string,
  style : PropTypes.object,
  titleStyle: PropTypes.object,
  noMargin: PropTypes.bool, // 正对right有没有 60的偏差值
  marginRight: PropTypes.number,
  marginLeft: PropTypes.number,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  mainTitleText:{
    fontSize: dFont(34),
    color: '#000000',
    fontWeight: 'bold',
  }

});
