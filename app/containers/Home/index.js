/**
 * Created by sandershan on 2019/1/30
 * @Description:
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View,Image,FlatList,TouchableOpacity} from 'react-native';
import {styles} from "./Styles";
import SDHeader from "../../components/SDHeader";
import Title from "../../components/Title";
import OtherFunctionModal from "./OtherFunctionModal";

export default class Home extends PureComponent {

  functionList(){
    return [
      {
        title: "一键加粉神器",
        image:require("../../img/ico_function_1.png"),
        tapFunction:()=>{
          console.log("点击了");
          this.props.navigation.navigate("filterController");
        }
      },
      {
        title: "文章植入广告",
        image:require("../../img/ico_function_2.png"),
        tapFunction:()=>{
          console.log("点击了");
          this.setState({
            otherFunctionVisible: true,
          })
        }
      },
      {
        title: "视频植入广告",
        image:require("../../img/ico_function_3.png"),
        tapFunction:()=>{
          console.log("点击了");
          this.setState({
            otherFunctionVisible: true,
          })
        }
      },
      {
        title: "商品海报制作",
        image:require("../../img/ico_function_4.png"),
        tapFunction:()=>{
          console.log("点击了");
          this.setState({
            otherFunctionVisible: true,
          })
        }
      },
      {
        title: "AI智能名片",
        image:require("../../img/ico_function_5.png"),
        tapFunction:()=>{
          console.log("点击了");
          this.setState({
            otherFunctionVisible: true,
          })
        }
      },
      {
        title: "海量会员共享",
        image:require("../../img/ico_function_6.png"),
        tapFunction:()=>{
          console.log("点击了");
          this.setState({
            otherFunctionVisible: true,
          })
        }
      },
      {
        title: "亿店云平台",
        image:require("../../img/ico_function_7.png"),
        tapFunction:()=>{
          console.log("点击了");
          this.setState({
            otherFunctionVisible: true,
          })
        }
      },
      {
        title: "打造个人微网",
        image:require("../../img/ico_function_8.png"),
        tapFunction:()=>{
          console.log("点击了");
          this.setState({
            otherFunctionVisible: true,
          })
        }
      },
      {
        title: "客服技术支持",
        image:require("../../img/ico_function_9.png"),
        tapFunction:()=>{
          console.log("点击了");
          this.setState({
            otherFunctionVisible: true,
          })
        }
      },

    ];
  }

  constructor(props) {
    super(props);
    let list = this.functionList();
    this.state = {
      functionList: list,
      otherFunctionVisible: false,
    }
  }

  componentDidMount(){
    this.props.navigation.navigate("login");
  }
  _renderBanner(){
    return (
      <View>
        <Image source={require('../../img/home_banner.jpg')} style={styles.banner}/>
      </View>
    )
  }
  _renderUnitFunction(item){
    return (
      <TouchableOpacity onPress={()=>{item.tapFunction()}}>
        <View style={styles.functionUnitItem}>
          <Image source={item.image} style={styles.functionItemImage}/>
          <Text style={styles.functionItemTitleLabel}>{item.title}</Text>
        </View>
      </TouchableOpacity>

    );
  }
  _keyExtractor = (item, index) => index + "";

  _renderFunction(){
    return (
      <FlatList data={this.state.functionList}
                renderItem={({item})=>this._renderUnitFunction(item)}
                keyExtractor={this._keyExtractor}
                numColumns={3}/>
    )
  }
  _renderOtherFunctionModal(){
    return (
      <OtherFunctionModal visibility={this.state.otherFunctionVisible} closeModal={()=>{
        this.setState({
          otherFunctionVisible: false,
        })
      }}/>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderBanner()}
        {this._renderFunction()}
        {this._renderOtherFunctionModal()}
      </View>
    );
  }
}
Home.navigationOptions =  ({navigation}) => ({
  title: "首页",
  header: <SDHeader titleView={<Title title={"加粉神器"} noMargin/>}/>,
});

