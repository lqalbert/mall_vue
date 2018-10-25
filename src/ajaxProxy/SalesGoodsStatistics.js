import RestfulProxy from './RestfulProxy';

const URL = '/sales-goods-statistics';
const proxy = new RestfulProxy(URL);

proxy.getDepSale = function (sku,model){
    return this.getAxios().put(this.url + "-dep/" + sku, model);
}

proxy.downloadExcel = function(param){
    return this.getAxios().get(this.url + '-download-excel', param)
}

proxy.downRouter = function(){
    const url = this.url + '-download-excel';
    return url.indexOf("//") ==0 ? url.substring(1) : url ;
}
export default proxy;