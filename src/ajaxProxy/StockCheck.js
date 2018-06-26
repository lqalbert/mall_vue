import RestfulProxy from './RestfulProxy';

const URL = '/stock-check';
const proxy = new RestfulProxy(URL);

proxy.getGoodsPrice = function (sku) {
    return this.getAxios().get("/get-goods-price/" + sku);
};

export default proxy;