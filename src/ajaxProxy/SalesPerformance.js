import RestfulProxy from './RestfulProxy';

const URL = '/salesperformance';
const proxy = new RestfulProxy(URL);
proxy.selectOrder = function(param){
    return this.getAxios().get(this.url + '-selectorder/' ,param);
};
export default proxy;