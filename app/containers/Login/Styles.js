/**
 * Created by sandershan on 2019/1/29
 * @Description: 布局
 */
import {StyleSheet} from 'react-native';
import {dFont, dSize, SAFE_BOTTOM_DISTANCE, screen} from "../../components/screen";
import {appColor} from "../../config/appStyle";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  logo_image:{
    width: dSize(307),
    height: dSize(200),
    marginTop: dSize(135),
  },
  input_content_view:{
    marginTop: dSize(150),
    paddingLeft:dSize(110),
    paddingRight:dSize(110),
    width:screen.width,
  },
  input_view:{
    height: dSize(100),
    flexDirection:'row',
    alignItems: "center",
  },
  input_logo_image:{
    width: dSize(30),
    height: dSize(30),
    resizeMode: 'contain',
  },
  textInput_view:{
    flex: 1,
    height: dSize(100),
    fontSize: dFont(30),
    marginLeft:dSize(30),
  },
  login_button_bg_view:{
    height: dSize(81),
    marginTop: dSize(113),
    width: screen.width,
    justifyContent:'center',
    alignItems:'center',
  },
  button_image_bg:{
    width:dSize(592),
    height:dSize(113),
    justifyContent:'center',
    alignItems:'center',
  },
  login_button_title_label:{
    fontSize: dSize(32),
    color: appColor.white,
  },
  third_login_view:{
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: screen.width,
    paddingLeft: dSize(110),
    paddingRight:dSize(110),
    paddingBottom: SAFE_BOTTOM_DISTANCE,
    alignItems:'center',
  },
  third_line_content_view:{
    flexDirection:'row',
    alignItems:'center',
  },
  third_line_view:{
    height: 1,
    backgroundColor: appColor.gray2,
    flex: 1,
  },
  third_line_info_text_label:{
    fontSize: dFont(24),
    color: appColor.gray9,
    marginLeft: dSize(30),
    marginRight: dSize(30),
  },
  third_login_button:{
    width: dSize(60),
    height: dSize(49),
    resizeMode: 'contain',
    marginTop:dSize(60),
    marginBottom:dSize(60),
  }
})