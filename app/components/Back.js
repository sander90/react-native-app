import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity,Image,Platform, View} from 'react-native';

const styles = StyleSheet.create({
	title: {
		justifyContent: 'center',
		marginLeft: 0,
		width:60,
		height:Platform.OS === 'android' ? 50: 44,
}
});
/* 返回按钮的 统一控件
* navigation ： 传入的 navigation ，为了在 goBack是nil的时候，能够自行操作返回的事件
* goBack：func类型，自定义返回事件
* backStyle ：自定义返回按钮的 外部样式*/
const Back = ({ navigation, goBack, backStyle, backViewBackGroupStyle}) => {
	const onPress =
		typeof goBack === 'function' ? goBack : () => {navigation.goBack(null)};
  return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.8}
			style={[styles.title, backStyle]}
		>
			{/*<Icon name="back" color={constants.lightGrey} fontSize={18} />*/}
			{backViewBackGroupStyle? <View style={backViewBackGroupStyle}>
        <Image source={require('../img/ico_back.png')}
               style={{width:10,height: 20,resizeMode: 'contain'}}/>
      </View> : <Image source={require('../img/ico_back.png')}
                       style={{width:10,height: 20,resizeMode: 'contain',marginLeft:15}}/>}

		</TouchableOpacity>
	);
};

Back.propTypes = {
	goBack: PropTypes.func,
	backStyle: PropTypes.object, //eslint-disable-line
	backViewBackGroupStyle : PropTypes.object,
};

export default Back;
