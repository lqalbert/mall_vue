import SelectProxy from './SelectProxy';
import ActualDeliveryGoods from '../ajaxProxy/ActualDeliveryGoods';

const ActualDeliveryGoodsSelectProxy = function (param, callback, scope) {
  this.extraParm = param || null;
  this.DcProxy = new SelectProxy(ActualDeliveryGoods.getUrl(), callback, scope);

  if (this.extraParm) {
    this.setParam(this.extraParm);
  }
}

ActualDeliveryGoodsSelectProxy.prototype.setParam = function (param) {
  this.DcProxy.setExtraParam(param);
  return this;
}

ActualDeliveryGoodsSelectProxy.prototype.load = function () {
  this.DcProxy.load();
}

export default ActualDeliveryGoodsSelectProxy;