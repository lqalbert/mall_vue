import SelectProxy from './SelectProxy';

const InventoryGoodsSelectProxy = function (param, callback, scope) {
    this.extraParm = param || null;
    this.partProxy = new SelectProxy('/stock-check-goods', callback, scope);

    if (this.extraParm) {
        this.setParam(this.extraParm);
    }
}

InventoryGoodsSelectProxy.prototype.setParam = function (param) {
    // this.extraParm = param;
    if (!param.fields) {
        param.fields = ['id', 'name'];
    }

    // if (!param.business) {
    //     param.business = 'select';
    // }
    this.partProxy.setExtraParam(param);
    return this;
}

InventoryGoodsSelectProxy.prototype.load = function () {
    this.partProxy.load();
}

export default InventoryGoodsSelectProxy;