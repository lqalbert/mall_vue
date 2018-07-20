import RestfulProxy from './RestfulProxy';

const URL = '/deposits';
const proxy = new RestfulProxy(URL);

proxy.revoke = function (id,model) {
    return this.getAxios().put("/deposit-revoke/" + id,model);
}

export default proxy;