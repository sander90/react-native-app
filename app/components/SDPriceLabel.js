
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {dFont, dSize} from "./screen";
import {TextUtil} from "./TextUtil";

export default class SDPriceLabel extends React.PureComponent {
  render(){
    const {color, text, mainStyle,minStyle} = this.props;

    console.log("price = " + text);
    if (TextUtil().isEmpty(text)){
      return (<View/>)
    }
    let price = text+"";
    let lastprice = ".00";
    let firstPrice = "¥ ";
    if (price.indexOf("¥") === 0){
      price = price.substr(1,price.length - 1);
    }else{
      firstPrice = "￥";
    }
    let pricePoint_index = price.indexOf(".");
    if (pricePoint_index !== -1){
      lastprice = price.substr(pricePoint_index, price.length - pricePoint_index);
      price = price.substr(0, pricePoint_index);
    }

    return (
      <View style={styles.priceContentView}>
        <Text style={[styles.priceTypeLabelStyle, {color: color,marginBottom: dSize(1)}, minStyle]}>{firstPrice}</Text>
        <Text style={[styles.priceContentLabelStyle, {color:color}, mainStyle]}>{price}</Text>
        <Text style={[styles.priceTypeLabelStyle, {color: color}, minStyle]}>{lastprice}</Text>
      </View>
    )
  }
}
SDPriceLabel.protoTypes = {
  color: PropTypes.any,
  text: PropTypes.string,
  mainStyle: PropTypes.any,
  minStyle: PropTypes.any,
};
const styles = StyleSheet.create({
  priceContentView :{
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  priceTypeLabelStyle:{
    fontSize: dFont(26),
    // marginBottom:  2,
  },
  priceContentLabelStyle:{
    fontSize: dFont(28),
  }
});

