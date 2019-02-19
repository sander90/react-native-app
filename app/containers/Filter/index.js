/**
 * Created by sandershan on 2019/1/30
 * @Description:
 */
import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  ImageBackground,
  TouchableOpacity, Platform, NativeModules,Linking,Alert
} from 'react-native';
import {styles} from "./Styles";
import SDHeader from "../../components/SDHeader";
import Title from "../../components/Title";
import WithAlert from "../../HOC";
import {connect} from "react-redux";
import action from "../../actions/Creators";
import FilterTopView from "./FilterTopView";
import FilterTagModal from "./FilterTagModal";
import {area} from "../../img/city";
import fetchSend from "../../network/Api";
import appAPI from "../../config/appAPI";
import UserInfo from "../../services/UserManager";
import AddFenSetpOneDescriptionModal from "./AddFenSetpOneDescriptionModal";
import AddFenStepNextDescriptionModal from "./AddFenStepNextDescriptionModal";
import Contacts from 'react-native-contacts';
import Back from "../../components/Back";
import LinearGradient from 'react-native-linear-gradient';
import * as WeChat from "react-native-wechat";

class SDFilterController extends PureComponent {

  getFilterSelectedList = () => {
    let sex_1 = {name: "不限", id: ""};
    let sex_2 = {name: "男", id: "1"};
    let sex_3 = {name: "女", id: "2"};
    let sex_list = [sex_1, sex_2, sex_3];
    let sex_section = {name: "性别", list: sex_list};
    let age_1 = {name: "不限", id: 0, age: ""};
    let age_2 = {name: "25岁以下", id: 1, age: "0-25"};
    let age_3 = {name: "25~35岁", id: 2, age: "25-35"};
    let age_4 = {name: "35~40岁", id: 3, age: "35-40"};
    let age_5 = {name: "40~45岁", id: 4, age: "40-45"};
    let age_6 = {name: "45~50岁", id: 5, age: "45-50"};
    let age_7 = {name: "50岁以上", id: 6, age: "50-?"};
    let age_list = [age_1, age_2, age_3, age_4, age_5, age_6, age_7];
    let age_section = {name: "年龄", list: age_list};
    return [sex_section, age_section];
  }

  getLinerGradientColors = [['#835bff', '#9954fe'], ['#fd9536', '#ffc12e',], ['#1ce2a5', '#01bdac',], ['#2edafe', '#2fb5fe',], ['#f86091', '#fd6c6f',]];

  constructor(props) {
    super(props);
    this.props.getFilter(1, {});
    this.props.getIndustry();
    this.industry = null;
    this.filterList = this.getFilterSelectedList();
    this.filterParams = {};
    this.currentPage = 1;
    this.hasAddPresion = [];
    this.state = {
      filterModalVisibility: false,
      filterType: 0,
      filterModalList: [],
      filterTapSelectedReset: false,
      fList: [],
      desctionOnemodalVisible: false,
      desctionNextmodalVisible: false,
      sureDeleteButton: false,
    }
  }

  componentWillReceiveProps(props) {
    if (props.industry) {
      this.industry = props.industry;
    }
    if (props.fList) {
      if (props.page === 1) {
        this.setState({
          fList: props.fList,
        })
      } else if (props.page > 1) {
        this.currentPage = props.page;
        if (props.fList.length === 0) {
          this.currentPage -= 1;
        } else {
          this.setState({
            fList: [...this.state.fList, ...props.fList],
          })
        }
      }
    }
  }

  onAddF = () => {
    if (this.state.sureDeleteButton) {
      this.setState({
        sureDeleteButton: false,
      }, function () {
        this.deleteContact();
      })
    } else {
      this.setState({
        desctionOnemodalVisible: true,
      })
    }


  }

  async getCanAddFenList() {
    let token = UserInfo().getToken();
    let params = {...this.filterParams, token: token};
    this.props.showLoading(true);
    const res = await fetchSend(appAPI.exportFansLibrary, params);
    this.props.showLoading(false);
    if (res.code === 0) {
      let list = res.data;
      let contacts = [];
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        let newPersion = {
          givenName: item.name,
          phoneNumbers: [{
            label: "mobile",
            number: item.mobile,
          }],
        };
        contacts.push(item.mobile);
        // this.hasAddPresion.push(newPersion);
        if (Platform.OS === "ios") {
          Contacts.addContact(newPersion, (error) => {
            if (error) throw error;
            console.log("添加成功" + item.name);
            this.hasAddPresion.push(newPersion);
          });
        }
      }

      if (Platform.OS === "android") {
        contacts = ["13955449490", "18516760592"];
        let rn_add_contact = NativeModules.AddContactModule;
        let contacts_str = JSON.stringify(contacts);
        rn_add_contact.AddContact(contacts_str, (isOpen) => {
          if (isOpen) {
            WeChat.openWXApp().then(isOpen => {

            });
          }
        });
        return;
      }

      this.setState({
        desctionNextmodalVisible: true,
      })
    } else {
      this.props.showToast(res.msg);
    }
  }

  async deleteContact() {
    this.props.showLoading(true);
    Contacts.getAll((err, contacts) => {
      if (err) {
        this.props.showLoading(false);
      }
      console.log("-->", contacts);
      for (let i = 0; i < contacts.length; i++) {
        let con = contacts[i];
        for (let i = 0; i < this.hasAddPresion.length; i++) {
          let contact = this.hasAddPresion[i];

          if (this.checkoutContacts(con, contact)) {
            Contacts.deleteContact(con, (error) => {
              if (error) {
                this.props.showToast(error);
              }
              console.log("删除" + con.givenName);
            })
          }
          // Contacts.deleteContact(con,(error)=>{
          //   if (error) throw error;
          //   console.log("删除成功" );
          // })

        }
      }
      this.props.showLoading(false);
      this.props.showToast("数据已删除");
    })

  }

  checkoutContacts(con1, con2) {
    if (con1.givenName === con2.givenName) {
      if (con1.phoneNumbers.length === 1) {
        if (con1.phoneNumbers[0].number === con2.phoneNumbers[0].number) {
          return true;
        }
      }
    }
    return false;
  }

  onLoadMore = () => {
    this.currentPage += 1;
    this.props.getFilter(this.currentPage, this.filterParams);
  }

  _renderFilterTopView() {
    return (
      <FilterTopView TapFunction={(index, isSelected) => {
        console.log("点击了" + index + " 状态是 " + isSelected);
        if (index === 0) {
          this.setState({
            filterModalVisibility: true,
            filterType: index,
            filterModalList: area,
          })
        } else if (index === 1) {
          console.log(this.industry);
          this.setState({
            filterModalVisibility: true,
            filterType: index,
            filterModalList: this.industry,
          })
        } else if (index === 2) {
          this.setState({
            filterModalVisibility: true,
            filterType: index,
            filterModalList: this.filterList,
          })
        }
      }} reset={this.state.filterTapSelectedReset} CanTap={false} selectedValue={-1}/>
    )
  }

  _renderFilterModal() {
    return (
      <FilterTagModal visibility={this.state.filterModalVisibility}
                      filterType={this.state.filterType}
                      filterModalList={this.state.filterModalList}
                      finishFilter={(params) => {
                        this.filterParams = {...this.filterParams, ...params};
                        console.log(this.filterParams);
                        this.setState({
                          filterModalVisibility: false,
                        });
                        this.currentPage = 1;
                        this.props.getFilter(this.currentPage, this.filterParams);
                      }}
                      closeTagSelected={(index) => {
                        this.setState({
                          filterModalVisibility: false,
                        });
                        if (index === this.state.filterType) {
                          return;
                        }
                        if (index === 0) {
                          this.setState({
                            filterModalVisibility: true,
                            filterType: index,
                            filterModalList: area,
                          })
                        } else if (index === 1) {
                          console.log(this.industry);
                          this.setState({
                            filterModalVisibility: true,
                            filterType: index,
                            filterModalList: this.industry,
                          })
                        } else if (index === 2) {
                          this.setState({
                            filterModalVisibility: true,
                            filterType: index,
                            filterModalList: this.filterList,
                          })
                        }
                      }}/>
    )
  }

  _renderFilterCell(item, index) {
    let tagColor = "";
    let tagImage = "";
    if (item.gender === 0 || item.gender === 1) {
      tagColor = "#2599FA";
      tagImage = require('../../img/ico_man.png')
    } else if (item.gender === 2) {
      tagColor = "#F7427A";
      tagImage = require('../../img/ico_girl.png')
    }
    let row = index % 5;
    let colors = this.getLinerGradientColors[row];
    let tmp_mobile = "";
    if (item.mobile.length > 10) {
      tmp_mobile = item.mobile.slice(0, 4);
      tmp_mobile = tmp_mobile + "****";
      tmp_mobile = tmp_mobile + item.mobile.slice(item.mobile.length - 4, item.mobile.length - 1);
    }

    return (
      <View style={styles.filterCellView}>
        <View style={styles.filterCellContentView}>
          <Image source={{uri: item.avatar}} style={styles.filterAvatarImage}/>
          <View style={styles.filterContentLineView}>
            <View style={styles.filterCellNameLineView}>
              <Text style={styles.filterTitleLabel}>{item.name}</Text>
              <View style={[styles.sexTagContextView, {borderColor: tagColor}]}>
                <Image source={tagImage} style={styles.sexTagIconImage}/>
                <Text style={[styles.sexTagTitleLabel, {color: tagColor}]}>{item.age}</Text>
              </View>
            </View>
            <Text style={styles.fitlerDestionLabel}>{tmp_mobile}</Text>
          </View>
          <LinearGradient colors={colors} style={styles.tagBgView}>
            <Text style={styles.tagTitleLabel}>{item.industryName}</Text>
          </LinearGradient>
        </View>
      </View>
    )
  }

  _keyExtractor = (item, index) => index + "";

  _renderFilterList() {
    if (this.state.fList.length > 0) {
      return (
        <FlatList data={this.state.fList}
                  renderItem={({item, index}) => this._renderFilterCell(item, index)}
                  keyExtractor={this._keyExtractor}
                  onEndReachedThreshold={0.1}
                  extraData={this.state}
                  onEndReached={this.onLoadMore}
                  showsVerticalScrollIndicator={false}/>
      )
    }
    return (
      <View style={[styles.container, styles.space_define_view]}>
        <Text style={styles.space_define_font}> 没有数据！！！</Text>
      </View>
    )

  }

  _renderAddButton = () => {
    return (
      <View style={styles.fitlerAddButtonBgView}>
        <TouchableOpacity onPress={this.onAddF}>
          <ImageBackground source={require('../../img/ico_login_button.png')} style={styles.button_image_bg}>
            <Text style={styles.login_button_title_label}>{this.state.sureDeleteButton ? "删除通讯录数据" : "一键加粉"}</Text>
          </ImageBackground>
        </TouchableOpacity>

      </View>
    )
  }

  _renderDescriptionOneView() {
    return (
      <AddFenSetpOneDescriptionModal modalVisible={this.state.desctionOnemodalVisible}
                                     finishClose={(type) => {
                                       if (type === 0) {
                                         this.setState({
                                           desctionOnemodalVisible: false,
                                         });
                                         return;
                                       }
                                       this.setState({
                                         desctionOnemodalVisible: false,
                                       });
                                       if (Platform.OS === "android") {
                                         // 这里是测试如果是Android

                                         this.getCanAddFenList();
                                         return;
                                       }
                                       Contacts.checkPermission((err, permission) => {
                                         if (permission === 'undefined') {
                                           Contacts.requestPermission((err, permission) => {
                                             if (permission === 'authorized') {
                                               // yay!
                                               this.getCanAddFenList();
                                             }
                                             if (permission === 'denied') {
                                               // x.x
                                               console.log("申请的权限被拒绝了1");

                                               this.props.showToast("app需要申请通讯录的权限被拒绝了")
                                             }
                                           })
                                         }
                                         if (permission === 'authorized') {
                                           // yay!
                                           this.getCanAddFenList();
                                         }
                                         if (permission === 'denied') {
                                           // x.x

                                           Alert.alert("通知","app需要申请通讯录权限",[{"text":"取消"},{text:"去设置",onPress:()=>{
                                               Linking.openURL('app-settings:')
                                                 .catch(err => console.log('error', err))
                                             }}])


                                         }
                                       });
                                     }}/>
    )
  }

  _renderDescriptionnextView() {
    return (
      <AddFenStepNextDescriptionModal modalVisible={this.state.desctionNextmodalVisible}
                                      finishClose={(type) => {
                                        if (type === 0) {
                                          this.setState({
                                            desctionNextmodalVisible: false,
                                          });
                                          return;
                                        }
                                        this.setState({
                                          desctionNextmodalVisible: false,
                                          sureDeleteButton: true,
                                        })
                                      }}/>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderFilterTopView()}
        {this._renderFilterModal()}
        {this._renderFilterList()}
        {this._renderAddButton()}
        {this._renderDescriptionOneView()}
        {this._renderDescriptionnextView()}
      </View>
    );
  }
}

SDFilterController.navigationOptions = ({navigation}) => ({
  title: "登录",
  header: <SDHeader titleView={<Title title={"加粉神器"}/>}
                    leftView={<Back navigation={navigation}/>}/>,
});


// 获取 state 变化
const mapStateToProps = (state) => {
  return {
    ...state.filter,
    ...state.industry
  };
};
// 发送行为
const mapDispatchToProps = (dispatch) => {
  return {
    // 发送行为
    getFilter: (page, params) => dispatch(action.FilterRequest(page, params)),
    getIndustry: () => dispatch(action.industryRquest()),
  }
};
export default WithAlert(connect(mapStateToProps, mapDispatchToProps)(SDFilterController));

