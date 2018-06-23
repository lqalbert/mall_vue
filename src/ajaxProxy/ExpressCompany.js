import RestfulProxy from './RestfulProxy';

const URL = '/expresscompany';
const proxy = new RestfulProxy(URL);

proxy.getAddress = function(id){
    return this.getAxios().get(this.url+"-address/"+id);
}

proxy.updateAddress = function(id, model){
    return this.getAxios().put(this.url+"-address/"+id, model);
}

export default proxy;