import Types from './Types';

const Request = () => ({type: Types.REQUEST});
const Sucess = (info) => ({type: Types.SUCCESS, info});
const Faile =(err_code,err_msg)=>({type: Types.Error, error});
export default {

};
