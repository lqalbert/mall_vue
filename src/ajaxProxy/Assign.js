import RestfulProxy from './RestfulProxy';

const URL = '/order-assign';
const proxy = new RestfulProxy(URL);


proxy.check = function(model){
    return this.getAxios().put(this.url + "-check", model);
};

proxy.repeat = function(id, model){
    return this.getAxios().put(this.url + "-repeat/" + id, model);
};
proxy.editExpressFee = function(id, model){
    return this.getAxios().put(this.url + "-editexpressfee/" + id, model);
};

proxy.stop = function(id, model){
    return this.getAxios().put(this.url + "-stop/" + id, model);
};


proxy.waybillPrint = function(id){
    return this.getAxios().post('/assign-waybill-print/'+id);
};

proxy.waybillPrints = function(ids){
    return this.getAxios().post('/assign-waybill-prints', {params:{ids:ids}});
};



proxy.goodsPrint = function(id){
    return this.getAxios().post('/assign-goods-print/'+id);
};

proxy.goodsPrints = function(ids){
    return this.getAxios().get('/assign-goods-prints', {params:{ids:ids}});
};

proxy.getByExpressSn = function(express_sn, param){
    return this.getAxios().get('/assign-expresssn/'+express_sn, {params:param});
};

proxy.checkedGoods = function(id){
    return this.getAxios().put('/assign-checkgoods/'+id);
};
//称重发货
proxy.weightGoods = function(id, model){
    return this.getAxios().put('/assign-weight/'+id, model);
};

//assign-update-waybill 更新面单信息
proxy.updateWaybill = function(id){
    return this.getAxios().put('/assign-update-waybill/' +id);
};

proxy.parcelOn = function(id) {
    return this.getAxios().put('/assign-percelon/' +id);
}

proxy.orderSign = function(id, model) {
    return this.getAxios().put('/assign-sign/' + id, model);
}

export default proxy;