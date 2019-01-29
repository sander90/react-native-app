/**
 * Created by macbookair on 2018/11/2.
 * @Description: 日期选择二次封装
 */
import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Picker from 'react-native-picker';


class CustomDatePicker extends PureComponent{

   // _picker:null,

   static _createDateData(){
    let date = [];
    for(let i=2000;i<2100;i++){
      let month = [];
      for(let j = 1;j<13;j++){
        let day = [];
        if(j === 2){
          for(let k=1;k<29;k++){
            // day.push(k+'日');
            if (k < 10){
              k = "0"+k;
            }
            day.push(k);
          }
          //Leap day for years that are divisible by 4, such as 2000, 2004
          if(i%4 === 0 && i%100 !== 0 || i%400 === 0){
            // day.push(29+'日');
            day.push(29);
          }
        }
        else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
          for(let k=1;k<32;k++){
            // day.push(k+'日');
            if (k < 10){
              k = "0"+k;
            }
            day.push(k);
          }
        }
        else{
          for(let k=1;k<31;k++){
            // day.push(k+'日');
            if (k < 10){
              k = "0"+k;
            }
            day.push(k);
          }
        }
        let _month = {};
        // _month[j+'月'] = day;
        if (j < 10){
          j = "0"+j;
        }
        _month[j] = day;
        month.push(_month);
      }
      let _date = {};
      // _date[i+'年'] = month;
      _date[i] = month;
      date.push(_date);
    }
    return date;
  }

  static _getCurrentDate(){
    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    return [year,month,day]
  }

  static show = (isPublish,isToday,defaultDate,title,options) => {

     // if (defaultDate){
     //   let selectValue = defaultDate.split('-');
     //   console.log('切分日期：',selectValue);
     // }
     // let selectedDateValue = isToday ? CustomDatePicker._getCurrentDate():defaultDate.split('-');
     let selectedDateValue = CustomDatePicker._getCurrentDate();
     if (defaultDate){
       selectedDateValue = defaultDate.split('-');
     }


    Picker.init({
      pickerData: CustomDatePicker._createDateData(),
      // pickerFontColor: [255, 0 ,0, 1],
      pickerTitleText: title,
      pickerConfirmBtnText:'确定',
      pickerCancelBtnText:'取消',
      selectedValue:selectedDateValue,
      onPickerConfirm: (pickedValue, pickedIndex) => {
        console.log('confirmdate', pickedValue, pickedIndex);
        console.log(pickedValue.toString());

        var date = selectedDateValue[0]+"-"+selectedDateValue[1]+"-"+selectedDateValue[2];

        if (isPublish || defaultDate){
          if (parseInt(pickedValue[0]) < (selectedDateValue[0])){
            Picker.select(selectedDateValue);
          }else if(parseInt(pickedValue[0]) === parseInt(selectedDateValue[0])){
            if (parseInt(pickedValue[1]) < parseInt(selectedDateValue[1])){
              Picker.select(selectedDateValue);
            } else if (parseInt(pickedValue[1]) === parseInt(selectedDateValue[1])) {
              if (parseInt(pickedValue[2]) < parseInt(selectedDateValue[2])){
                Picker.select(selectedDateValue);
              }else {
                date = pickedValue[0]+"-"+pickedValue[1]+"-"+pickedValue[2];
              }

            }else {
              date = pickedValue[0]+"-"+pickedValue[1]+"-"+pickedValue[2];
            }

          }else {
            date = pickedValue[0]+"-"+pickedValue[1]+"-"+pickedValue[2];
          }
        }
        else {
          date = pickedValue[0]+"-"+pickedValue[1]+"-"+pickedValue[2];
        }


        typeof options === 'function' ? options && options(date): null
      },
      onPickerCancel: (pickedValue, pickedIndex) => {
        console.log('canceldate', pickedValue, pickedIndex);
      },
      onPickerSelect: (pickedValue, pickedIndex) => {
        console.log('selectdate', pickedValue, pickedIndex);
        console.log('defaultData', selectedDateValue);
        if (isPublish || defaultDate) {
          if (parseInt(pickedValue[0]) < parseInt(selectedDateValue[0])){
            Picker.select(selectedDateValue);
          }else if(parseInt(pickedValue[0]) === parseInt(selectedDateValue[0])){
            if (parseInt(pickedValue[1]) < parseInt(selectedDateValue[1])){
              Picker.select(selectedDateValue);
            } else if (parseInt(pickedValue[1]) === parseInt(selectedDateValue[1])) {
              if (parseInt(pickedValue[2]) < parseInt(selectedDateValue[2])){
                Picker.select(selectedDateValue);
              }
            }

          }
        }


      }
    });
    // this._picker = Picker;
    Picker.show();
  }


  static hide = ()=>{
     Picker.hide()
  }

};

export default CustomDatePicker;


