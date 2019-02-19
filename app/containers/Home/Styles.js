/**
 * Created by sandershan on 2019/1/30
 * @Description: 布局
 */
import {StyleSheet} from 'react-native';
import {dFont, dSize, screen} from "../../components/screen";
import {appColor} from "../../config/appStyle";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:"#F4F4F4",
  },
  banner:{
    width: screen.width,
    height:dSize(250),
  },
  functionView:{
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  functionUnitItem:{
    width: screen.width / 3.0,
    height: screen.width / 3.0,
    backgroundColor: appColor.white,
    borderBottomWidth:1,
    borderBottomColor:'#F4F4F4',
    borderRightWidth:1,
    borderRightColor:'#F4F4F4',
    justifyContent:'center',
    alignItems: 'center',
  },
  functionItemImage:{
    width: dSize(64),
    height: dSize(64),
    resizeMode: 'contain',
  },
  functionItemTitleLabel:{
    fontSize: dSize(24),
    marginTop:dSize(50)
  },
  ModalView:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  centerContentView:{
    width: dSize(561),
    height: dSize(733),
    backgroundColor: appColor.white,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalTitleLabel:{
    color: appColor.gray2,
    fontSize: dFont(28),
    textAlign: 'center',
    marginTop: dSize(66),
  },
  quaryImageView:{
    width: dSize(380),
    height: dSize(380),
    marginTop: dSize(41),
  },
  sure_ok_button:{
    width: dSize(360),
    height: dSize(70),
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: dSize(30),
    marginTop: dSize(58),
  },
  sure_title_label:{
    color: appColor.white,
    fontSize: dSize(28),
  }
});