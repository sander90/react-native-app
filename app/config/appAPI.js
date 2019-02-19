

const login = {
  name : "登陆",
  url : "api/member/login",
  method: "POST",
};
const industry_list = {
  name: "获取所有行业",
  url: "api/industry/list",
  method:"GET"
};
const fansLibrary = {
  name: "粉丝列表",
  url:"api/fansLibrary/pageList",
  method: "POST",
};
const exportFansLibrary ={
  name: "导出粉丝",
  url:"api/fansLibrary/importsList",
  method: "POST",
};
const wechatLogin = {
  name: "微信登录",
  url: "api/member/login/wechat",
  method: 'POST',
}
export default {
  login,
  industry_list,
  fansLibrary,
  exportFansLibrary,
  wechatLogin,
}