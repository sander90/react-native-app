/**
 * Created by sandershan on 2019/1/29
 * @Description:
 */
import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  FlatList, Platform, NativeModules
} from 'react-native';
import {styles} from "./Styles";
import SDHeader from "../../components/SDHeader";
import Title from "../../components/Title";
import SDLineView from "../../components/SDLineView";
import {dSize, navigationBarH, SAFE_BOTTOM_DISTANCE, screen, statusBarH} from "../../components/screen";
import WithAlert from "../../HOC";
import fetchSend from "../../network/Api";
import appAPI from "../../config/appAPI";
import UserInfo from "../../services/UserManager";
import {TextUtil} from "../../components/TextUtil";
import OtherFunctionModal from "../Home/OtherFunctionModal";
import * as WeChat from 'react-native-wechat';
import RNExitApp from 'react-native-exit-app';


class Login extends PureComponent {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this.inputaccount = "";
    this.inputpassword = "";
    this.state = {
      screenHeight: (screen.height - statusBarH - 44 - SAFE_BOTTOM_DISTANCE),
      otherFunctionVisible: false,
      WeChatIsInstalled:true,
      paddingBottom : SAFE_BOTTOM_DISTANCE,
      userInfoAccount: "",
      userInfoPassWord: "",
    };
    this.getContentHeight();
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
    WeChat.isWXAppInstalled().then((isInstalled)=>{
      this.setState({
        WeChatIsInstalled: isInstalled,
      })
    });
    UserInfo().getAcccount((res)=>{
      console.log("获取到账号 ", res);
      let acc = res.acc;
      let pass = res.pas;
      this.setState({
        userInfoAccount: acc,
        userInfoPassWord: pass,
      })
    })

  }

  onBackButtonPressAndroid = () => {
    // 当前页面为root页面时的处理
    if (this.lastBackPressed && (this.lastBackPressed + 2000 >= Date.now())) {
      //最近2秒内按过back键，可以退出应用。
      RNExitApp.exitApp();
      return true;
    }
    this.lastBackPressed = Date.now();
      // ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    this.props.showToast("再按一次退出应用");
    return true;
  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  getContentHeight = () => {
    if (Platform.OS === 'ios') {

    } else {
      let RNContentHeight = NativeModules.DeviceContentHeight;
      RNContentHeight.getContentHeight((height) => {
        this.setState({
          screenHeight: screen.height - height / 2.0 - statusBarH,
        });
      })
    }
  }
  onInputAccount = (text, index) => {
    if (index === 1) {
      this.inputaccount = text;
    } else if (index === 2) {
      this.inputpassword = text;
    }
  }

  onLogin = () => {
    console.log("立即登录");

    // fetchSend(appAPI.login,{phone:this.inputaccount, password: this.inputpassword});
    this.inputaccount = "13312341234";
    this.inputpassword = "123456";
    if (TextUtil().isEmpty(this.inputaccount)) {
      this.props.showToast("请输入用户账号");
      return;
    }
    if (TextUtil().isEmpty(this.inputpassword)) {
      this.props.showToast("请输入用户密码");
      return;
    }
    this.props.showLoading(true);
    this.login();
  }

  async login() {
    const res = await fetchSend(appAPI.login, {phone: this.inputaccount, password: this.inputpassword});
    this.props.showLoading(false);
    if (res.code === 0) {
      // UserInfo()
      let userInfoPS = {acc: this.inputaccount, pas: this.inputpassword};
      UserInfo().saveAccount(JSON.stringify(userInfoPS));

      UserInfo().saveToken(res.data.accessToken);
      this.props.navigation.goBack();
    } else {
      this.setState({
        otherFunctionVisible: true,
      })
    }
  }
  onThirdLogin=()=>{
    let scope = 'snsapi_userinfo';
    let state = 'wechat_open_ddddd';
    WeChat.isWXAppSupportApi().then((isSupport)=>{
      console.log("是否支持微信 " + isSupport);
      if (isSupport){
        //发送授权请求
        WeChat.sendAuthRequest(scope, state)
          .then(responseCode => {
            //返回code码，通过code获取access_token
            console.log("获取 ", responseCode);
            let code = responseCode.code;
            this.loginThirdWeChat(code);


          })
          .catch(err => {
            console.log("----> ", err);
          });
      }else {

      }
    })
  }

  async loginThirdWeChat(code){
    const res = await fetchSend(appAPI.wechatLogin,{code: code,type: "3"});
    if (res.code === 0){
      UserInfo().saveToken(res.data.accessToken);
      this.props.navigation.goBack();
    }else {
      this.setState({
        otherFunctionVisible: true,
      })
    }
  }


  _renderLogoImageView() {
    return (
      <Image source={require('../../img/ico_logo.png')} style={styles.logo_image}/>
    )
  }

  _renderInputText(index) {
    let placeholder = "";
    let left_image = require('../../img/ico_account.png');
    if (index === 1) {
      placeholder = "账户";
      left_image = require('../../img/ico_account.png');
    } else if (index === 2) {
      placeholder = "密码";
      left_image = require('../../img/ico_password.png');
    }

    return (
      <View style={styles.input_view}>
        <Image source={left_image} style={styles.input_logo_image}/>
        <TextInput style={styles.textInput_view}
                   underlineColorAndroid={"transparent"}
                   placeholder={placeholder}
                   secureTextEntry={index !== 1}
                   onChangeText={(text) => {
                     this.onInputAccount(text, index)
                   }}
                   defaultValue={index === 1? this.state.userInfoAccount : this.state.userInfoPassWord}/>
      </View>
    )
  }

  _renderLogonButton() {
    return (
      <View style={styles.login_button_bg_view}>
        <TouchableOpacity onPress={this.onLogin}>
          <ImageBackground source={require('../../img/ico_login_button.png')} style={styles.button_image_bg}>
            <Text style={styles.login_button_title_label}>立即登录</Text>
          </ImageBackground>
        </TouchableOpacity>

      </View>
    )
  }

  _renderThirdLoginView() {
    if (this.state.WeChatIsInstalled){
      return (
        <View style={styles.third_login_view}>
          <View style={styles.third_line_content_view}>
            <View style={styles.third_line_view}/>
            <Text style={styles.third_line_info_text_label}>第三方登录</Text>
            <View style={styles.third_line_view}/>
          </View>
          <TouchableOpacity onPress={()=>{
            this.onThirdLogin();
          }}>
            <Image source={require('../../img/ico_weixin.png')} style={styles.third_login_button}/>
          </TouchableOpacity>
        </View>
      )
    }else {
      return (<View/>)
    }

  }

  _renderOtherFunctionModal() {
    return (
      <OtherFunctionModal visibility={this.state.otherFunctionVisible} closeModal={() => {
        this.setState({
          otherFunctionVisible: false,
        })
      }}/>
    )
  }

  render() {
    let sh = this.state.screenHeight;
    console.log("屏幕的实际高度 " + screen.height + '  ' + sh);
    return (
      <ScrollView style={styles.container}
                  showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center', flex: 1, width: screen.width, height: sh}}>
          {/*顶部的logo*/}
          {this._renderLogoImageView()}
          <View style={styles.input_content_view}>
            {this._renderInputText(1)}
            <SDLineView/>
            {this._renderInputText(2)}
            <SDLineView/>
          </View>
          {/*立即登录按钮*/}
          {this._renderLogonButton()}
          {this._renderThirdLoginView()}
          {this._renderOtherFunctionModal()}
        </View>
      </ScrollView>
    );
  }
}

Login.navigationOptions = ({navigation}) => ({
  title: "登录",
  header: <SDHeader titleView={<Title title={"加粉神器"} noMargin/>}/>,
});


export default WithAlert(Login);
