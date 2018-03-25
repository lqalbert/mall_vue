import RestfulProxy from './RestfulProxy';

const URL = '/orderbasic';
const proxy = new RestfulProxy(URL);
proxy.updateCheckStatus = function(id, model){
    return this.getAxios().put("/updateCheckStatus/" + id, model);
}


export default proxy;