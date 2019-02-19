/**
 * Created by sandershan on 2019/1/31
 * @Description:
 */
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View, Modal, ImageBackground, TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import {styles} from "./Styles";
import PropTypes from "prop-types";
import callOnceInInterval from '../../components/CallOnceInInterval'

export default class AddFenSetpOneDescriptionModal extends PureComponent {
  constructor(props) {
    super(props);
    this.desction = "1.加粉神器为您每次默认筛选50名真实有效的用户信息，将其手机号导入您的通讯录。\n\n" +
      "2.请打开微信app，找到“通讯录>新的朋友>添加手机联系人”，即可完成加粉。" +
      "\n\n" + "4.您可在筛选条件中选择您想加的粉丝类型进行精准加粉。\n\n" +
      "5.加粉完成后，返回加粉神器，一键删除通讯录数据，重新获取新用户进行加粉。";
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
        <TouchableWithoutFeedback onPress={()=>callOnceInInterval(()=>{
          if (this.props.finishClose) {
            this.props.finishClose(0);
          }
        })}>
        <View style={styles.fenDescriptionContetnView}>
            <View style={styles.fensiContenView}>
              <Text style={styles.desctionTitleLabel}>使用说明</Text>
              <Text style={styles.desctionLabel}>{this.desction}</Text>
              <View style={styles.addButtonView}>
                <TouchableOpacity onPress={this.onClose}>
                  <View style={styles.addButtonBgImageView}>
                    <Text style={styles.addButtonTitleLabel}>一键加粉50人</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
AddFenSetpOneDescriptionModal.propTypes = {
  modalVisible: PropTypes.bool,
  finishClose: PropTypes.func,
}

