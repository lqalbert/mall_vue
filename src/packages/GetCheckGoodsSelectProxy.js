import SelectProxy from './SelectProxy';

const GetCheckGoodsSelectProxy = function (param, callback, scope) {
    this.extraParm = param || null;
    this.partProxy = new SelectProxy('/get-check-goods', callback, scope);

    if (this.extraParm) {
        this.setParam(this.extraParm);
    }
}

GetCheckGoodsSelectProxy.prototype.setParam = function (param) {
    // this.extraParm = param;
    if (!param.fields) {
        param.fields = ['*'];
    }

    // if (!param.business) {
    //     param.business = 'select';
    // }
    this.partProxy.setExtraParam(param);
    return this;
}

GetCheckGoodsSelectProxy.prototype.load = function () {
    this.partProxy.load();
}

export default GetCheckGoodsSelectProxy;