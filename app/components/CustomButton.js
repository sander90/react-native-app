/**
 * Created by macbookair on 2018/10/23.
 * @Description: 自定义Button(上图片，下Title)
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

export default class CustomButton extends PureComponent {

  static defaultProps = {
    btnIcon: '',
    btnTitle: '',

  }

  render(){
    console.log("====22===>" + this.props.btnIcon);

    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={styles.btnContainer}>
          <View style={styles.btnItemView}>
            <Image style={styles.iconImg } source={this.props.btnIcon} resizeMode={'contain'}/>
            <Text style={styles.titleText}>{this.props.btnTitle}</Text>
          </View>

        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  btnContainer:{
    width: (screen.width - dSize(42)) / 4,
    height: screen.width * 0.23,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: dSize(80),
  },
  btnItemView:{
    width:(screen.width - dSize(42)) * 0.23,
    // backgroundColor: 'red',
    alignItems: 'center',
  },

  iconImg:{
    width: dSize(100),
    height: dSize(100),
    // backgroundColor:'yellow',

  },
  titleText:{
    marginTop: dSize(12),
    fontSize: dFont(24),
  }
});