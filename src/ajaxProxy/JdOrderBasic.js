import RestfulProxy from './RestfulProxy';

const URL = '/jd-order-list';
const proxy = new RestfulProxy(URL);

proxy.matchUser = function(flag){
    return this.getAxios().put("/match-user/" + flag);
}

proxy.getMatch = function () {
  return this.getAxios().get("/get-match");
}

proxy.minusInventory = function (flag,entrepot_id) {
  return this.getAxios().put("/minus-inventory/" + flag + "/" + entrepot_id);
}

export default proxy;