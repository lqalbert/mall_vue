import RestfulProxy from './RestfulProxy';

const URL = '/front-category';
const proxy = new RestfulProxy(URL);
proxy.getTree = function(){
    return this.getAxios().get(URL+"-all");
}

export default proxy;