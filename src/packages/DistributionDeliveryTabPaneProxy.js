import SelectProxy from './SelectProxy';
import DistributionDeliveryTabPane from '../ajaxProxy/DistributionDeliveryTabPane';

const DistributionDeliveryTabPaneSelectProxy = function(param, callback, scope){
    this.extraParm = param || null;
    this.departProxy = new SelectProxy(DistributionDeliveryTabPane, callback, scope);

    if (this.extraParm){
        this.setParam(this.extraParm);
    }
}

DistributionDeliveryTabPaneSelectProxy.prototype.setParam = function(param){
    this.departProxy.setExtraParam(param);
    return this;
}

DistributionDeliveryTabPaneSelectProxy.prototype.load = function(){
    this.departProxy.load();
}

DistributionDeliveryTabPaneSelectProxy.prototype.find = function(){
    this.departProxy.find();
}

export default DistributionDeliveryTabPaneSelectProxy;