/**
 * Created by sandershan on 2019/1/31
 * @Description:
 */
import React, {PureComponent} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View,Image,TouchableWithoutFeedback} from 'react-native';
import {styles} from "./Styles";
import PropTypes from "prop-types";
import AddFenSetpOneDescriptionModal from "./AddFenSetpOneDescriptionModal";
import {dSize} from "../../components/screen";

export default class AddFenStepNextDescriptionModal extends PureComponent {
  constructor(props) {
    super(props);
    this.desction = "1.已经成功向您的通讯录中导入50个联系人。\n\n2.请打开微信app，找到“通讯录>新的朋友>添加手机联系人”，即可完成加粉。\n\n3.加粉完成后，返回加粉神器，一键删除通讯录数据，再次执行立即加粉即可。";
    this.state = {
      modalVisible: false,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      modalVisible: props.modalVisible,
    })
  }
  onClose=()=>{
    if (this.props.finishClose) {
      this.props.finishClose(1);
    }
  }
  render() {
    return (
      <Modal animationType={'none'}
             transparent={true}
             visible={this.state.modalVisible}
             onRequestClose={() => {
             }}
      >
        <TouchableWithoutFeedback onPress={()=>{
          if (this.props.finishClose) {
            this.props.finishClose(0);
          }
        }}>
          <View style={styles.fenDescriptionContetnView}>
            <View style={styles.fensiContenView}>
              <Text style={[styles.desctionLabel,{marginTop:dSize(180)}]}>{this.desction}</Text>
              <View style={styles.addButtonView}>
                <TouchableOpacity onPress={this.onClose}>
                  <View style={styles.addButtonBgImageView}>
                    <Text style={styles.addButtonTitleLabel}>确定</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Image source={require('../../img/ico_export_success.png')} style={styles.exportSuccessIcoImage}/>
            </View>
          </View>
        </TouchableWithoutFeedback>

      </Modal>
    );
  }
}
AddFenStepNextDescriptionModal.propTypes = {
  modalVisible: PropTypes.bool,
  finishClose: PropTypes.func,
}
