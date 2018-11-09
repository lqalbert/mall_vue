import SelectProxy from './SelectProxy';
// let departProxy = new SelectProxy("/departments");
import JdOrderBasicAjax from '@/ajaxProxy/JdOrderBasic.js';

const inventorySelect = function(param, callback, scope){
    this.extraParm = param || null;
    this.departProxy = new SelectProxy(JdOrderBasicAjax, callback, scope);

    if (this.extraParm){
        this.setParam(this.extraParm);
    }
}

inventorySelect.prototype.setParam = function(param){
    this.departProxy.setExtraParam(param);
    return this;
}

inventorySelect.prototype.setPageSize = function(param){
    this.departProxy.setPageSize(param);
    return this;
}

inventorySelect.prototype.setPage = function(param){
    this.departProxy.setPage(param);
    return this;
}



inventorySelect.prototype.load = function(){
    this.departProxy.load();
}

export default inventorySelect;