import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet,Platform,View} from 'react-native';



/*cell 中出现的底部 那条细线，这里综合统一的控件
* lineStyle：细线的style，主要要传入marginLeft，marginRight之类的*/
export default class BottomLineView extends React.PureComponent{
  render(){
    const {lineStyle} = this.props;
    return (
      <View style={[styles.bottom_line_view,lineStyle]}>
      </View>
    )
  }
}
BottomLineView.propTypess={
  lineStyle: PropTypes.style,
};
const styles = StyleSheet.create({
  bottom_line_view:{
    height:1,
    backgroundColor:'#eeeeee',
    position:'absolute',
    bottom : 0,left:0,right:0
  }
});
