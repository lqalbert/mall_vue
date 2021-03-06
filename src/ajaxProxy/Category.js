import RestfulProxy from './RestfulProxy';

const URL = '/categorys';
const proxy = new RestfulProxy(URL);
proxy.getAll = function(){
    return this.getAxios().get("/tree");
}

export default proxy;