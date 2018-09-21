import RestfulProxy from './RestfulProxy';

const URL = '/sales-goods-statistics';
const proxy = new RestfulProxy(URL);

proxy.getDepSale = function (sku,model){
     return this.getAxios().put(this.url + "-dep/" + sku, model);
}
export default proxy;