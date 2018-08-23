import RestfulProxy from './RestfulProxy';

const URL = '/order-after-sale';
const proxy = new RestfulProxy(URL);

proxy.check = function (id, model) {
    return this.getAxios().put(this.url + "-check/" + id, model);
};

proxy.sure = function (id, model) {
    return this.getAxios().put(this.url + "-sure/" + id, model);
};

proxy.getCusInfo = function (id) {
    return this.getAxios().get("/cus-all-info/" + id);
};

proxy.inventory = function(id) {
    return this.getAxios().put('/order-after-inventory/' + id);
}

proxy.rxinventory = function(id, model) {
    return this.getAxios().put('/order-after-in-inventory/' + id, model);
}

proxy.outinventory = function(id, model) {
    return this.getAxios().put('/order-after-out-inventory/' + id, model);
}

export default proxy;