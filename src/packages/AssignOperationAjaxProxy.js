import SelectProxy from './SelectProxy';
import AssignOperation from '../ajaxProxy/AssignOperation';

const AssignOperationAjaxProxy = function (param, callback, scope) {
    this.extraParm = param || null;
    this.AssignOperationProxy = new SelectProxy(AssignOperation.getUrl(), callback, scope);

    if (this.extraParm) {
        this.setParam(this.extraParm);
    }
}

AssignOperationAjaxProxy.prototype.setParam = function (param) {
    this.AssignOperationProxy.setExtraParam(param);
    return this;
}

AssignOperationAjaxProxy.prototype.load = function () {
    this.AssignOperationProxy.load();
    return this;
}


export default AssignOperationAjaxProxy;