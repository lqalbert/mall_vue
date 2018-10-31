import RestfulProxy from './RestfulProxy';

const URL = '/deposits';
const proxy = new RestfulProxy(URL);

proxy.revoke = function (id,model) {
    return this.getAxios().put("/deposit-revoke/" + id,model);
}


proxy.getSet = function () {
    return this.getAxios().get("/deposit-set");
}

proxy.saveSet = function (model) {
    return this.getAxios().put("/deposit-set", model);
}


export default proxy;