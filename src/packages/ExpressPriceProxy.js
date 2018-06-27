import SelectProxy from './SelectProxy';
import ExpressPrice from '../ajaxProxy/ExpressPrice';

const ExpressPriceProxy = function (param, callback, scope) {
    this.extraParm = param || null;
    this.partProxy = new SelectProxy(ExpressPrice.getUrl(), callback, scope);
    if (this.extraParm) {
        this.setParam(this.extraParm);
    }
}

ExpressPriceProxy.prototype.setParam = function (param) {
    this.partProxy.setExtraParam(param);
    return this;
},
    ExpressPriceProxy.prototype.setPageSize = function (pageSize) {
    this.partProxy.setPageSize(pageSize);
    return this;
},
ExpressPriceProxy.prototype.setPage = function (page) {
    this.partProxy.setPage(page);
    return this;
},

ExpressPriceProxy.prototype.load = function () {
    this.partProxy.load();
}

export default ExpressPriceProxy;