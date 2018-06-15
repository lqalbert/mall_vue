import SelectProxy from './SelectProxy';
import PurchaseOrderGoods from '../ajaxProxy/PurchaseOrderGoods';

const PurchaseOrderGoodsSelectProxy = function (param, callback, scope) {
  this.extraParm = param || null;
  this.DcProxy = new SelectProxy(PurchaseOrderGoods.getUrl(), callback, scope);

  if (this.extraParm) {
    this.setParam(this.extraParm);
  }
}

PurchaseOrderGoodsSelectProxy.prototype.setParam = function (param) {
  this.DcProxy.setExtraParam(param);
  return this;
}

PurchaseOrderGoodsSelectProxy.prototype.load = function () {
  this.DcProxy.load();
}

export default PurchaseOrderGoodsSelectProxy;