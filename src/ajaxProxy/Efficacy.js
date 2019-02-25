import RestfulProxy from './RestfulProxy';

const URL = '/efficacy';
const proxy = new RestfulProxy(URL);

proxy.depositDetail = function (plan_id){
  return this.getAxios().get("/efficacy-deposit-detail/" + plan_id);
}

proxy.efficacyDetail = function (param){
  return this.getAxios().post("/efficacy-detail", param);
}

proxy.efficacyPlan = function (param){
  return this.getAxios().post("/efficacy-plan", param);
}

proxy.addOrder = function (param){
  return this.getAxios().post("/addOrder", param);
}

export default proxy;