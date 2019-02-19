/**
 * Created by sandershan on 2019/2/13
 * @Description:
 */
import React, {PureComponent} from 'react';
import {Modal, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {styles} from "./Styles";
import PropTypes from "prop-types";
import LinearGradient from "react-native-linear-gradient";

export default class OtherFunctionModal extends PureComponent {

  title_info = "该功能仅限公众号使用\n扫码关注“小肥猫”微信公众号";
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    }
  }
  componentWillReceiveProps(props){
    this.setState({
      modalVisible:props.visibility,
    })
  }
  render() {
    return (
      <Modal animationType={'none'}
             transparent={true}
             visible={this.state.modalVisible}
             onRequestClose={() => {}}
      >
        <View style={styles.ModalView}>
            <View style={styles.centerContentView}>
              <Text style={styles.modalTitleLabel}>{this.title_info}</Text>
              <Image style={styles.quaryImageView} source={require('../../img/ico_quary.png')}/>
              <TouchableOpacity onPress={()=>{
                  if (this.props.closeModal){
                    this.props.closeModal();
                  }
              }}>
                <LinearGradient colors={['#835bff', '#9954fe']} style={styles.sure_ok_button}>
                  <Text style={styles.sure_title_label}>确认</Text>
                </LinearGradient>
              </TouchableOpacity>

            </View>
        </View>
      </Modal>
    );
  }
}
OtherFunctionModal.propTypes = {
  visibility:PropTypes.bool,
  closeModal: PropTypes.func,
}
