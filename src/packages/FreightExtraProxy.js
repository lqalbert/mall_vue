import SelectProxy from './SelectProxy';
import ExpressPrice from '@/ajaxProxy/FreightExtra';

const DepartSelectProxy = function(param, callback, scope){
    this.extraParm = param || null;
    this.departProxy = new SelectProxy(ExpressPrice, callback, scope);

    if (this.extraParm){
        this.setParam(this.extraParm);
    }
}

DepartSelectProxy.prototype.setParam = function(param){
    this.departProxy.setExtraParam(param);
    return this;
}

DepartSelectProxy.prototype.load = function(){
    this.departProxy.load();
}

export default DepartSelectProxy;