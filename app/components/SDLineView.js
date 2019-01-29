
import React,{PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {dSize, screen} from "./screen";
import SDHeader from "./SDHeader";
import {appColor} from "../config/appStyle";


export default class SDLineView extends React.PureComponent{
  static defaultProps = {
    marginLeft : 0,
    marginRight: 0,
    height: 1,
    backgroundColor: appColor.gray_bgColor,
  };
  render(){
    const {marginLeft, marginRight,height, backgroundColor} = this.props;
    return (
      <View style={{marginLeft: marginLeft, marginRight: marginRight, height : height, backgroundColor: backgroundColor, width: screen.width}}/>
    )
  }
}

SDLineView.protoTypes = {
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  height: PropTypes.number,
  backgroundColor: PropTypes.any,
};