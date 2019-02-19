import Types from './Types';

const Request = () => ({type: Types.REQUEST});
const Sucess = (info) => ({type: Types.SUCCESS, info});
const Faile =(err_code,err_msg)=>({type: Types.Error, error});

const FilterRequest = (page,params) => ({type: Types.FilterREQUEST,page, params});
const FilterSuccess = (page,fList)=>({type: Types.FilterSUCCESS,page,fList});
const industryRquest = () =>({type: Types.IndustryREQUEST});
const industrySuccess = (industry) => ({type: Types.IndustrySUCCESS,industry});

export default {
  FilterRequest,
  FilterSuccess,
  industrySuccess,
  industryRquest,
  Faile,
};
