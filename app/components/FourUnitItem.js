/**
 * Created by macbookair on 2018/10/23.
 * @Description: 自定义模块
 */

import React,{PureComponent} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';

import {dFont, dSize, screen} from './screen';

export default class FourUnitItem extends PureComponent{

  static defaultProps = {
    title: '',
    subTitle: '',
    bgColor: '',
    icon:'',
  }

  render(){
    return (
      <View style={styles.itemContainer}>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <View style={[styles.itemView,{backgroundColor:this.props.bgColor}]}>
            <Image style={styles.iconImg} source={this.props.icon} resizeMode={'cover'}/>
            <View style={styles.itemTextView}>
              <Text style={{fontSize:dFont(26),color:'#222',marginTop:dSize(18),marginLeft: dSize(16)}}>{this.props.title}</Text>
              <Text style={{fontSize:dFont(24),color:'#666',marginTop: dSize(14),marginLeft: dSize(16)}}>{this.props.subTitle}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer:{
    // width: screen.width * 0.5,
    height: screen.width * 0.23,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  itemView:{
    width: screen.width * 0.47,
    height: screen.width * 0.22,
    marginTop:screen.width * 0.02,
    marginLeft:screen.width * 0.02,
  },
  itemTextView:{
    marginTop: dSize(10),
    marginLeft: dSize(10),
  },
  iconImg:{
    width:screen.width * 0.48 / 3,
    height:screen.width * 0.21 * 0.5,
    position:'absolute',
    bottom: dSize(8),
    right:dSize(8),
  }

});