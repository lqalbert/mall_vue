import RestfulProxy from './RestfulProxy';

const URL = '/goodsdetails';
const proxy = new RestfulProxy(URL);

proxy.frontDetach = function(id){
    return this.getAxios().put(this.url + "-front-detach/" + id);
}

export default proxy;