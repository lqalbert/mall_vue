import RestfulProxy from './RestfulProxy';

const URL = '/customers';
const proxy = new RestfulProxy(URL);

proxy.quitTransfer = function(model){
    return this.getAxios().put(URL+"-quit-transfer", model);
};

proxy.frontLedIn = function(){
    return this.getAxios().get(URL + '-front-ledin');
}

proxy.transferFrontLedIn = function(model){
    return this.getAxios().put(URL + '-transfer-front-ledin', model);
}

proxy.getAllow = function(param){
    return this.getAxios().get(URL + '-get-allow', {params:param});
}

proxy.allocateToUser = function(param){
    return this.getAxios().put(URL + '-allocate-user', model);
}

export default proxy;