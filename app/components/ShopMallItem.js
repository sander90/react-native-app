/**
 * Created by macbookair on 2018/10/23.
 * @Description: 首页商城小模块
 */
import React,{PureComponent} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';

import {dFont, screen} from './screen';

const itemW = screen.width * 0.98 / 3;
const itemH = screen.width * 0.46 * 0.65;

export default class ShopMallItem extends PureComponent{

  static defaultProps = {
    title: '',
    subTitle: '',
    icon: '',

  }

  render(){
    return(
      <View style={styles.itemContainer}>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <View style={styles.itemView}>
            <Image style={styles.iconView} source={this.props.icon} resizeMode={'center'}/>
            <Text style={styles.titleText}>{this.props.title}</Text>
            <Text style={styles.subTitleText}>{this.props.subTitle}</Text>
          </View>
        </TouchableWithoutFeedback>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer:{
    width: itemW,
    height: itemH,
    alignItems: 'center',
  },
  itemView:{
    width: itemW - 10,
    height:itemH,
    backgroundColor:'white',
    alignItems: 'center',
  },
  iconView:{
    marginTop:6,
    width: (itemW - 10) * 0.55,
    height: (itemW - 10) * 0.55,
    // backgroundColor: 'red',

  },
  titleText:{
    marginTop: 6,
    color:'#414141',
    fontSize:dFont(21),
  },
  subTitleText:{
    marginTop:5,
    color: '#999999',
    fontSize: dFont(19),
  }
});