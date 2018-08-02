import RestfulProxy from './RestfulProxy';

const URL = '/mail';
const proxy = new RestfulProxy(URL);


proxy.getWayBill = function(model){
    return this.getAxios().put(this.url + "/waybill" , model);
    //return this.getAxios().put(this.url + "-check", model);
}

proxy.goodsPrint = function(ids){
    return this.getAxios().get(this.url +'/print/', {params:{ids:ids}} );
};
export default proxy;