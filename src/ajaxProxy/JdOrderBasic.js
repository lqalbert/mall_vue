import RestfulProxy from './RestfulProxy';

const URL = '/jd-order-list';
const proxy = new RestfulProxy(URL);

proxy.matchUser = function(flag){
    return this.getAxios().put("/match-user/" + flag);
}

proxy.getMatch = function () {
    return this.getAxios().get("/get-match");
}

proxy.minusInventory = function (flag) {
    return this.getAxios().put("/minus-inventory/" + flag);
}

proxy.setBrusher = function (flag,order_sn) {
    return this.getAxios().put("/set-brusher/" + flag + "/" + order_sn);
}

proxy.manualMatch = function (data){
    return this.getAxios().post("/manual-match", data);
}

proxy.reMatch = function (data){
    return this.getAxios().post("/jd-re-match", data);
}

proxy.returnInventory = function (id){
    return this.getAxios().put("/jd-inventory-return/" + id);
}

proxy.returnDeposit = function (id){
    return this.getAxios().put("/jd-deposit-return/" + id);
}

proxy.depositDetail = function (id){
    return this.getAxios().get("/jd-deposit-detail/" + id);
}

proxy.cancelMatch = function(ids){
    return this.getAxios().put("/jd-order-cancel", ids)
}



export default proxy;