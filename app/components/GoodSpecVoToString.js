function anaysis_specVo(specVos) {
  let specDetail_string = "";
  for (let i = 0; i < specVos.length; i++) {
    let specVo = specVos[i];
    let goodsSpecDetail = specVo.goodsSpecDetail;
    specDetail_string += "\"" + goodsSpecDetail.specDetailName + "\"";
    if (i < specVos.length - 1){
      specDetail_string += ",";
    }
  }
  return specDetail_string;
}

export {anaysis_specVo};