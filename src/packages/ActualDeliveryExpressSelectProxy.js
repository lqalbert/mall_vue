import SelectProxy from './SelectProxy';
import ActualDeliveryExpresses from '../ajaxProxy/ActualDeliveryExpress';

const ActualDeliveryExpressSelectProxy = function (param, callback, scope) {
  this.extraParm = param || null;
  this.DcProxy = new SelectProxy(ActualDeliveryExpresses.getUrl(), callback, scope);

  if (this.extraParm) {
    this.setParam(this.extraParm);
  }
}

ActualDeliveryExpressSelectProxy.prototype.setParam = function (param) {
  this.DcProxy.setExtraParam(param);
  return this;
}

ActualDeliveryExpressSelectProxy.prototype.load = function () {
  this.DcProxy.load();
}

export default ActualDeliveryExpressSelectProxy;