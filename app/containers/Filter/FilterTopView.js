/**
 * Created by sandershan on 2019/1/31
 * @Description:
 */
import React, {PureComponent} from 'react';
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {styles} from "./Styles";
import SDHeader from "../../components/SDHeader";
import PropTypes from "prop-types";

export default class FilterTopView extends PureComponent {
  FilterList(){
    return [
      {
        name:"地区",
        isSelected:false,
        TapFun:()=>{
          console.log("选择了地区");
          let item = this.filterList[0];
          if (this.props.CanTap){
            item.isSelected = !item.isSelected;
            this.setState({
              reflash: !this.state.reflash,
            });
            return;
          }
          if (this.props.TapFunction){
            this.props.TapFunction(0,item.isSelected);
          }
        }
      },
      {
        name:"行业",
        isSelected:false,
        TapFun:()=>{
          console.log("选择了行业");
          let item = this.filterList[1];
          if (this.props.CanTap){
            item.isSelected = !item.isSelected;
            this.setState({
              reflash: !this.state.reflash,
            });
            return;
          }
          if (this.props.TapFunction){
            this.props.TapFunction(1,item.isSelected);
          }
        }
      },
      {
        name:"筛选",
        isSelected:false,
        TapFun:()=>{
          let item = this.filterList[2];
          if (this.props.CanTap){
            item.isSelected = !item.isSelected;
            this.setState({
              reflash: !this.state.reflash,
            });
            return;
          }
          if (this.props.TapFunction){
            this.props.TapFunction(2,item.isSelected);
          }
        }
      }
    ]
  }
  constructor(props) {
    super(props);
    this.filterList = this.FilterList();
    this.resetProps = false;
    if (props.selectedValue >= 0){
      let item1 = this.filterList[0];
      item1.isSelected = false;
      let item2 = this.filterList[1];
      item2.isSelected = false;
      let item3 = this.filterList[2];
      item3.isSelected = false;
      let item = this.filterList[props.selectedValue];
      item.isSelected = true;
    }
    this.state ={
      reflash: true,
    }
  }
  componentWillReceiveProps(props){
    if (props.selectedValue >= 0){
      let item1 = this.filterList[0];
      item1.isSelected = false;
      let item2 = this.filterList[1];
      item2.isSelected = false;
      let item3 = this.filterList[2];
      item3.isSelected = false;
      let item = this.filterList[props.selectedValue];
      item.isSelected = true;
      this.setState({
        reflash: !this.state.reflash,
      })
    }
    if (props.reset === this.resetProps){

    }else {
      let item1 = this.filterList[0];
      item1.isSelected = false;
      let item2 = this.filterList[1];
      item2.isSelected = false;
      let item3 = this.filterList[2];
      item3.isSelected = false;
      this.resetProps = props.reset;
      this.setState({
        reflash: !this.state.reflash,
      })
    }
    
  }
  _renderFilerUnitView(item,index){
    return (
      <TouchableWithoutFeedback onPress={()=>{item.TapFun()}} key={index}>
        <View style={styles.top_filter_unit_view}>
          {item.isSelected ?  <Text style={styles.filter_title_selected_label}>{item.name}</Text> : <Text style={styles.filter_title_label}>{item.name}</Text>}
          {item.isSelected ? <Image source={require('../../img/ico_filter_up.png')} style={styles.filter_ico_image}/>: <Image source={require('../../img/ico_filter_down.png')} style={styles.filter_ico_image}/>}
        </View>
      </TouchableWithoutFeedback>
    )
  }
  render() {
    return (
      <View style={styles.top_filter_view}>
        {this.filterList.map((item,index)=>this._renderFilerUnitView(item,index))}
      </View>
    );
  }
}

FilterTopView.propTypes = {
  TapFunction : PropTypes.func,
  reset: PropTypes.bool,
  CanTap: PropTypes.bool,
  selectedValue: PropTypes.number,
};
