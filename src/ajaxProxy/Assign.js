import RestfulProxy from './RestfulProxy';

const URL = '/order-assign';
const proxy = new RestfulProxy(URL);


proxy.check = function(id, model){
    return this.getAxios().put(this.url + "-check/" + id, model);
};
export default proxy;