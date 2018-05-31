import RestfulProxy from './RestfulProxy';

const URL = '/order-assign';
const proxy = new RestfulProxy(URL);


proxy.check = function(id, model){
    return this.getAxios().put(this.url + "-check/" + id, model);
};

proxy.repeat = function(id, model){
    return this.getAxios().put(this.url + "-repeat/" + id, model);
};

proxy.stop = function(id, model){
    return this.getAxios().put(this.url + "-stop/" + id, model);
};

export default proxy;