/**
 * Created by macbookair on 2018/10/23.
 * @Description: 屏幕相关
 */
import {
  Dimensions,
  Platform,
  PixelRatio,
  NativeModules,
} from 'react-native';

let screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

console.info("当前屏幕的尺寸 width = %d, height = %d",screen.width, screen.height);
let fontScale = PixelRatio.getFontScale();                      //返回字体大小缩放比例
console.info("当前字体大小缩放 ：" + fontScale);

let pixelRatio = PixelRatio.get();      //当前设备的像素密度
console.info("当前设备的像素密度 ：" + pixelRatio);

const defaultPixel = 2;                           //iphone6的像素密度
//px转换成dp
const w2 = 750 / defaultPixel;
const h2 = 1334 / defaultPixel;
const scale = screen.width / w2;   //获取缩放比例

console.info("屏幕要缩放的比例 ： " + scale);

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;
// iPhoneX max
const X_MAX_WIDTH = 414;
const X_MAX_HEIGHT = 896;

/*判断是不是IPhone*/
function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    ((screen.height === X_HEIGHT && screen.width === X_WIDTH) ||
      (screen.height === X_MAX_HEIGHT && screen.width === X_MAX_WIDTH))
  )
}
console.info("现在跑的是iphone x 吗？" + isIphoneX() );
// 字体大小对屏幕的自适应
function dFont(fontSize) {
  // console.log('字体自适应 ===== scale='+scale +" pixelRatio="+pixelRatio + " fontScale="+fontScale);
  // let size = Math.round((fontSize * scale + 0.5) * pixelRatio / fontScale);
  let size = Math.round(fontSize * scale + 0.5 /** pixelRatio / fontScale*/);
  let font = size / defaultPixel ;

  return Platform.OS === 'ios'? font: font - 1;

}
// 尺寸对屏幕的自适应
function dSize(size) {
  let dsize = Math.round(size * scale + 0.5);
  return dsize / defaultPixel;
}
// iphone X 底部的 安全距离
const SAFE_BOTTOM_DISTANCE = isIphoneX() ? 34 : 0;

//导航条高度
const navigationBarH = (Platform.OS === 'ios'?(isIphoneX()?88:64):50);
const statusBarH = (Platform.OS === 'ios'?(isIphoneX()?44:20):0);

function getContentHeight () {
  if (Platform.OS === 'ios'){
    return screen.height - navigationBarH - statusBarH;
  }else {
    let RNContentHeight = NativeModules.DeviceContentHeight;
    RNContentHeight.getContentHeight((height)=>{
      console.log("屏幕的实际高度是 " + screen.height - height);
    })
  }
}

getContentHeight();

export {screen, isIphoneX , dFont, dSize,navigationBarH, SAFE_BOTTOM_DISTANCE,statusBarH};

