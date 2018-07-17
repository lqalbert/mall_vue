import SelectProxy from './SelectProxy';
import SalesPerformanceOrderInfo from '../ajaxProxy/SalesPerformanceOrderInfo';

const SalesPerformanceOrderInfoProxy = function (param, callback, scope) {
    this.extraParm = param || null;
    this.partProxy = new SelectProxy(SalesPerformanceOrderInfo.getUrl(), callback, scope);
    if (this.extraParm) {
        this.setParam(this.extraParm);
    }
};

SalesPerformanceOrderInfoProxy.prototype.setParam = function (param) {
    this.partProxy.setExtraParam(param);
    return this;
},
    SalesPerformanceOrderInfoProxy.prototype.setPageSize = function (pageSize) {
    this.partProxy.setPageSize(pageSize);
    return this;
},
    SalesPerformanceOrderInfoProxy.prototype.setPage = function (page) {
    this.partProxy.setPage(page);
    return this;
},

    SalesPerformanceOrderInfoProxy.prototype.load = function () {
    this.partProxy.load();
}

export default SalesPerformanceOrderInfoProxy;