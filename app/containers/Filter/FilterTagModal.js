/**
 * Created by sandershan on 2019/1/31
 * @Description:
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, Modal,FlatList,TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import {styles} from "./Styles";
import PropTypes from "prop-types";
import FilterTopView from "./FilterTopView";
import {area} from "../../img/city";
import {dSize, navigationBarH} from "../../components/screen";

export default class FilterTagModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      filterType: -1, // 是地区选择，1是行业，2是筛选
      filterModalList: [],
      reflash: true,
      filterTapSelectedReset: false,
    }
  }
  componentWillReceiveProps(props){
    this.setState({
      modalVisible:props.visibility,
      filterType: props.filterType,
      filterModalList: props.filterModalList,
    })
  }
  
  onTapSelected(item, row){
    if (this.state.filterType === 0){
      for (let i = 0; i < this.state.filterModalList.length; i++) {
        let area = this.state.filterModalList[i];
        let childs = area.childs;
        if (childs){
          for (let j = 0; j < childs.length; j++) {
            let unit = childs[j];
            unit.isSelected = false;
          }
        }
      }
      item.isSelected = true;
    }else if (this.state.filterType === 1){
      for (let i = 0; i < this.state.filterModalList.length; i++) {
        let insdustry = this.state.filterModalList[i];
        let childs = insdustry.secondIndustryList;
        if (childs){
          for (let j = 0; j < childs.length; j++) {
            let unit = childs[j];
            unit.isSelected = false;
          }
        }
      }
      item.isSelected = true;
    }else if (this.state.filterType === 2){
      let filter = this.state.filterModalList[row];
      console.log(row + " --- ", this.state.filterModalList);
      let childs = filter.list;
      if (childs){
        for (let j = 0; j < childs.length; j++) {
          let unit = childs[j];
          unit.isSelected = false;
        }
      }
      item.isSelected = true;
    }

    this.setState({
      reflash: !this.state.reflash,
    })
  }
  onTapReset=()=>{
    console.log("重置");
    if (this.state.filterType === 0){
      for (let i = 0; i < this.state.filterModalList.length; i++) {
        let area = this.state.filterModalList[i];
        let childs = area.childs;
        if (childs){
          for (let j = 0; j < childs.length; j++) {
            let unit = childs[j];
            unit.isSelected = false;
          }
        }
      }
    }else if (this.state.filterType === 1){
      for (let i = 0; i < this.state.filterModalList.length; i++) {
        let insdustry = this.state.filterModalList[i];
        let childs = insdustry.secondIndustryList;
        if (childs){
          for (let j = 0; j < childs.length; j++) {
            let unit = childs[j];
            unit.isSelected = false;
          }
        }
      }
    }else if (this.state.filterType === 2){
      for (let i = 0; i < this.state.filterModalList.length; i++) {
        let filter = this.state.filterModalList[i];
        let childs = filter.list;
        if (childs){
          for (let j = 0; j < childs.length; j++) {
            let unit = childs[j];
            unit.isSelected = false;
          }
        }
      }
    }
    this.setState({
      reflash: !this.state.reflash,
    })
  };
  onTapFinish=()=>{
    this.setState({
      modalVisible:false,
    });

    let params = {};
    if (this.state.filterType === 0){
      let filterItem = null;
      for (let i = 0; i < this.state.filterModalList.length; i++) {
        let area = this.state.filterModalList[i];
        let childs = area.childs;
        if (childs){
          for (let j = 0; j < childs.length; j++) {
            let unit = childs[j];
            if (unit.isSelected ){
              filterItem = unit;
              break;
            }
          }
        }
      }
      if (filterItem){
        params = {"regionId": filterItem.id};
      }else {
        params = {"regionId": ""};
      }
    }else if (this.state.filterType === 1){
      let filterItem = null;
      for (let i = 0; i < this.state.filterModalList.length; i++) {
        let insdustry = this.state.filterModalList[i];
        let childs = insdustry.secondIndustryList;
        if (childs){
          for (let j = 0; j < childs.length; j++) {
            let unit = childs[j];
            if (unit.isSelected ){
              filterItem = unit;
              break;
            }
          }
        }
      }
      if (filterItem) {
        params = {"industryId": filterItem.id};
      }else {
        params = {"industryId": ""};
      }
    }else if (this.state.filterType === 2){
      let filterItem = null;
      for (let i = 0; i < this.state.filterModalList.length; i++) {
        let area = this.state.filterModalList[i];
        if (i === 0 ){
          let childs = area.list;
          if (childs){
            for (let j = 0; j < childs.length; j++) {
              let unit = childs[j];
              if (unit.isSelected ){
                filterItem = unit;
                break;
              }
            }
            if (filterItem){
              params = {...params, "gender":filterItem.id}
            }else {
              params = {...params, "gender":""}
            }
            filterItem = null;
          }
        }else if (i === 1){
          let childs = area.list;
          if (childs){
            for (let j = 0; j < childs.length; j++) {
              let unit = childs[j];
              if (unit.isSelected ){
                filterItem = unit;
                break;
              }
            }
            if (filterItem){
              params = {...params, "ageSection":filterItem.age}
            }else {
              params = {...params, "ageSection":""}
            }
          }
        }
      }
    }

    if (this.props.finishFilter){
      this.props.finishFilter(params);
    }
  };
  _renderTagView(item,index,row){
    if (item.isSelected){
      return (
        <TouchableWithoutFeedback key={index} onPress={()=>{this.onTapSelected(item, row)}}>
          <View style={styles.filterTagContentSelectedView}>
            <Text style={styles.filterTagSelectedTitleLabel}>{item.name}</Text>
          </View>
        </TouchableWithoutFeedback>

      );
    }
    return (
      <TouchableWithoutFeedback key={index} onPress={()=>{this.onTapSelected(item,row)}}>
        <View style={styles.filterTagContentNormalView}>
          <Text style={styles.filterTagNormalTitleLabel}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>

    );
  }
  _renderFilterTagItem(item, tIndex){
    if (this.state.filterType === 0){
      return (
        <View style={styles.filterContentUnitView}>
          <Text style={styles.filterSectionTitleLabel}>{item.name}</Text>
          <View style={styles.filterTagListView}>
            {item.childs.map((item, index)=>this._renderTagView(item,index, tIndex))}
          </View>
        </View>
      )
    }else if (this.state.filterType === 1){
      return (
        <View style={styles.filterContentUnitView}>
          <Text style={styles.filterSectionTitleLabel}>{item.name}</Text>
          <View style={styles.filterTagListView}>
            {item.secondIndustryList.map((item, index)=>this._renderTagView(item,index,tIndex))}
          </View>
        </View>
      )
    }else if (this.state.filterType === 2){
      return (
        <View style={styles.filterContentUnitView}>
          <Text style={styles.filterSectionTitleLabel}>{item.name}</Text>
          <View style={styles.filterTagListView}>
            {item.list.map((item, index)=>this._renderTagView(item,index,tIndex))}
          </View>
        </View>
      )
    }
    return (
      <View/>
    )
  }

  _renderBottomButton(){
    return (

      <View style={styles.filterBottomView}>
        <TouchableOpacity onPress={this.onTapReset}>
          <View style={styles.filterBottomLeftbgView}>
            <Text style={styles.filterLeftButtonTitleLabel}>重置</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onTapFinish}>
          <View style={styles.filterBottomRightBgView}>
            <Text style={styles.filterRightButtonTitleLabel}>完成</Text>
          </View>
        </TouchableOpacity>

      </View>
    )
  }
  _keyExtractor = (item, index) => index + "";

  _renderFilterTopView() {
    console.log("--->", this.state.filterType);
    if (this.state.filterType >= 0){
      return (
        <FilterTopView TapFunction={(index, isSelected) => {
          console.log("点击了" + index + " 状态是 " + isSelected);
          if (index === 0){
            if (this.props.closeTagSelected){
              this.props.closeTagSelected(0);
            }
          }else if (index === 1){
            if (this.props.closeTagSelected){
              this.props.closeTagSelected(1);
            }
          }else if (index === 2){
            if (this.props.closeTagSelected){
              this.props.closeTagSelected(2);
            }
          }
        }} reset={this.state.filterTapSelectedReset} CanTap={false} selectedValue={this.state.filterType}/>
      )
    }else {
      return (
        <View/>
      )
    }


    console.log("filter top index = " + this.state.filterType);
    return (
      <FilterTopView TapFunction={(index, isSelected) => {
        console.log("点击了" + index + " 状态是 " + isSelected);
        if (index === 0){
          if (this.props.closeTagSelected){
            this.props.closeTagSelected(0);
          }
        }else if (index === 1){
          if (this.props.closeTagSelected){
            this.props.closeTagSelected(1);
          }
        }else if (index === 2){
          if (this.props.closeTagSelected){
            this.props.closeTagSelected(2);
          }
        }
      }} reset={this.state.filterTapSelectedReset} CanTap={false} selectedValue={this.state.filterType}/>
    )
  }
  render() {
    return (
      <Modal animationType={'none'}
             transparent={true}
             visible={this.state.modalVisible}
             onRequestClose={() => {}}
      >
        <View style={styles.FilterModalView}>
          <View style={{height: navigationBarH}}>
            <TouchableWithoutFeedback onPress={()=>{
              if (this.props.finishFilter){
                this.props.finishFilter({});
              }
            }}>
              <View style={{width: 60, height: navigationBarH}}>
              </View>
            </TouchableWithoutFeedback>

          </View>
          <View style={styles.filterContentBgView}>
            {this._renderFilterTopView()}
            <FlatList data={this.state.filterModalList}
                      renderItem={({item,index})=>this._renderFilterTagItem(item,index)}
                      keyExtractor={this._keyExtractor}
                      extraData={this.state}
                      showsVerticalScrollIndicator={false}
            style={{marginTop:dSize(41)}}/>
            {this._renderBottomButton()}
          </View>
          <TouchableWithoutFeedback onPress={()=>{
            if (this.props.finishFilter){
              this.props.finishFilter({});
            }
          }}>
            <View style={styles.filterSpaceView}/>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    );
  }
}
FilterTagModal.propTypes = {
  visibility:PropTypes.bool,
  filterType: PropTypes.number,
  filterModalList: PropTypes.array,
  finishFilter:PropTypes.func,
  closeTagSelected:PropTypes.func,
}
