/**
 * Created by sandershan on 2019/1/30
 * @Description: 布局
 */
import {StyleSheet} from 'react-native';
import {dFont, dSize, navigationBarH, SAFE_BOTTOM_DISTANCE, screen} from "../../components/screen";
import {appColor} from "../../config/appStyle";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  top_filter_view:{
    height:dSize(81),
    width: screen.width,
    backgroundColor: "#ff0000",
    flexDirection:"row",
  },
  top_filter_unit_view:{
    flex:1,
    backgroundColor: appColor.white,
    justifyContent:'center',
    alignItems:'center',
    flexDirection: 'row',
  },
  filter_ico_image:{
    width: dSize(14),
    height: dSize(9),
    marginLeft:dSize(10),
  },
  filter_title_label:{
    fontSize: dSize(26),
    color: appColor.gray6
  },
  filter_title_selected_label:{
    fontSize: dSize(26),
    color: "#7205DB",
  },
  FilterModalView:{
    flex:1,
  },
  filterContentBgView:{
    maxHeight:dSize(902),
    paddingRight:dSize(20),
    backgroundColor: appColor.white,
  },
  filterContentUnitView:{


  },
  filterSectionTitleLabel:{
    fontSize: dSize(26),
    color: appColor.gray9,
    marginLeft: dSize(28),
    marginTop: dSize(40),
  },
  filterTagListView:{
    flexDirection: "row",
    flexWrap: 'wrap'
  },
  filterTagContentNormalView:{
    backgroundColor: "#F6F6F6",
    paddingLeft: dSize(20),
    paddingRight: dSize(20),
    paddingBottom: dSize(20),
    paddingTop: dSize(20),
    borderRadius: 5,
    marginTop: dSize(28),
    marginLeft: dSize(28),
    minWidth: dSize(138),
    justifyContent:'center',
    alignItems:'center',

  },
  filterTagContentSelectedView:{
    backgroundColor: appColor.white,
    paddingLeft: dSize(20),
    paddingRight: dSize(20),
    paddingBottom: dSize(20),
    paddingTop: dSize(20),
    marginTop: dSize(28),
    marginLeft: dSize(28),
    borderRadius: 5,
    borderColor: "#7205DB",
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
    minWidth: dSize(138),
  },
  filterTagNormalTitleLabel:{
    fontSize: dSize(24),
    color: appColor.gray2,
  },
  filterTagSelectedTitleLabel:{
    fontSize: dSize(24),
    color: "#7205DB"
  },
  filterSpaceView:{
    flex:1,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  filterBottomView:{
    width: screen.width,
    height: dSize(131),
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBottomLeftbgView:{
    height: dSize(81),
    width: dSize(346),
    borderTopLeftRadius: dSize(42),
    borderBottomLeftRadius: dSize(42),
    backgroundColor: "#F6F6F6",
    justifyContent:'center',
    alignItems:'center',

  },
  filterBottomRightBgView:{
    height: dSize(81),
    width: dSize(346),
    borderTopRightRadius: dSize(42),
    borderBottomRightRadius: dSize(42),
    backgroundColor: "#7205DB",
    justifyContent:'center',
    alignItems:'center',
  },
  filterLeftButtonTitleLabel:{
    color: appColor.gray6,
    fontSize: dSize(32),
  },
  filterRightButtonTitleLabel:{
    color:appColor.white,
    fontSize: dSize(32),
  },
  filterCellView:{
    height: dSize(170),
  },
  filterCellContentView:{
    height: dSize(140),
    marginTop: dSize(30),
    marginLeft: dSize(30),
    marginRight: dSize(30),
    backgroundColor: appColor.white,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterAvatarImage:{
    width: dSize(100),
    height: dSize(100),
    borderRadius: 5,
    marginLeft: dSize(20),
  },
  filterContentLineView:{
    flex: 1,
    marginLeft: dSize(20),
  },
  filterTitleLabel:{
    color:appColor.gray2,
    fontSize: dFont(30),
  },
  fitlerDestionLabel:{
    color: appColor.gray6,
    fontSize: dFont(26),
    marginTop: dSize(20),
  },
  filterCellNameLineView:{
    flexDirection: 'row',
  },
  sexTagContextView:{
    flexDirection: 'row',
    alignItems:'center',
    marginLeft: dSize(21),
    borderRadius: 3,
    borderColor: "#7205DB",
    borderWidth: 1,
    paddingLeft: dSize(10),
    paddingRight: dSize(10),
    height: dSize(28),
  },
  sexTagTitleLabel:{
    fontSize: dSize(20),
    color: "#7205DB",
    marginLeft: dSize(10)
  },
  sexTagIconImage:{
    width: dSize(12),
    height: dSize(18),
    resizeMode: 'contain',
  },
  tagBgView:{
    height:dSize(40),
    paddingLeft: dSize(18),
    paddingRight: dSize(18),
    justifyContent:"center",
    alignItems: 'center',
    backgroundColor: '#ff0000',
  },
  tagTitleLabel:{
    fontSize:dSize(20),
    color: appColor.white,
  },
  fitlerAddButtonBgView:{
    height: dSize(136) + SAFE_BOTTOM_DISTANCE,
    width: screen.width,
    paddingBottom: SAFE_BOTTOM_DISTANCE,
    alignItems: 'center',
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
  fenDescriptionContetnView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  fensiContenView:{
    width: dSize(560),
    backgroundColor: appColor.white,
    borderRadius:5,
    alignItems:'center',
    paddingLeft:dSize(32),
    paddingRight: dSize(32),
  },
  desctionTitleLabel:{
    color: appColor.gray2,
    fontSize: dSize(30),
    marginTop: dSize(52),
    fontWeight: 'bold'
  },
  desctionLabel:{
    color: appColor.gray2,
    fontSize: dSize(26),
    lineHeight: dSize(36),
  },
  addButtonView:{
    height:dSize(183),
    justifyContent:"center",
    alignItems:'center',
  },
  addButtonBgImageView:{
    width: dSize(361),
    height: dSize(70),
    justifyContent:"center",
    alignItems:'center',
    backgroundColor: "#7205DB",
    borderRadius:dSize(35),
  },
  addButtonTitleLabel:{
    fontSize:dSize(28),
    color: appColor.white,
  },
  exportSuccessIcoImage:{
    width: dSize(337),
    height: dSize(224),
    position:'absolute',
    top: dSize(-100),
  },
  space_define_view:{
    justifyContent:'center',
    alignItems:'center',
  },
  space_define_font:{
    fontSize: dFont(28),
    color: appColor.gray2,
  }

});

