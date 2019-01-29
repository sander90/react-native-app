/**
 * Created by macbookair on 2018/10/24.
 * @Description: 导航栏上的Title(两个标题)
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import PropTypes from 'prop-types';
import Title from "./Title";
import {dFont, dSize, screen} from "./screen";

export default class DoubleTitle extends Component{

  constructor(props){
    super(props);
    this.selectedIndex = 0;
    // this.state = {
    //   selectedIndex: selectedIndex,
    // }
  }

  titleClick(index){
      console.log("点击了 == >" + index);
      this.setState({
          selectedIndex: index
      },function () {
        if (this.props.onPress){
          this.props.onPress(index);
        }
      })
    }
  static defaultProps = {
    noMargin : false,
    marginLeft: 0,
    marginRight: 60,
  };

  render() {
    const {titles,style,noMargin,marginRight,marginLeft} = this.props;
    let rightMargin = marginRight;
    let leftMargin = marginLeft;
    if (noMargin){
      rightMargin = 0;
      leftMargin = 0;
    }
    // console.log('doubleTitle ===itemStyle :',this.props);
    // console.log('doubleTitle ===itemStyle :',itemStyle,itemWidth);
    this.selectedIndex = this.props.selectedIndex !== undefined? this.props.selectedIndex:0;
    return (
      <View style={[styles.container, {marginRight: rightMargin,marginLeft: leftMargin}, style ]}>
        {
          titles.map((item, index) => {
            return(
              <TitleItem
                key={index}
                title={item}
                index={index}
                selectedIndex={this.selectedIndex}
                onPress={()=>this.titleClick(index)}
              />
            )

          })
        }
      </View>
    );
  }
}

DoubleTitle.protoType = {
  // titles : PropTypes.,
  noMargin: PropTypes.boolean, // 正对right有没有 60的偏差值
  marginRight: PropTypes.number,
  itemStyle:PropTypes.style,
};

class TitleItem extends Component{

  static defaultProps = {
    title: '',
    index: 0,
  };


  render(){
    // console.log("DoubleTitle => TitleItem == " + this.props.index);
    return(
      <TouchableWithoutFeedback onPress={()=>this.props.onPress()}>
        <View style={[styles.titleItemContainer]}>
          <Text style={this.props.index === this.props.selectedIndex ? styles.titleSelectedText: styles.titleNormalText}>{this.props.title}</Text>
        </View>
      </TouchableWithoutFeedback>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // alignSelf: 'center',
    // backgroundColor:'red',
  },
  mainTitleText:{
    fontSize: dFont(34),
    color: '#ffffff',
    fontWeight: 'bold',
  },
  titleItemContainer:{
    // backgroundColor:'blue',
    width: (screen.width - 180) * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSelectedText:{
    fontSize: dFont(34),
    color: '#ffffff',
    fontWeight: 'bold',
  },
  titleNormalText:{
    fontSize: dFont(34),
    color: 'rgba(255,255,255,0.7)',
    fontWeight: 'bold',
  }


});