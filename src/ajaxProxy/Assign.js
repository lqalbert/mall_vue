import RestfulProxy from './RestfulProxy';

const URL = '/order-assign';
const proxy = new RestfulProxy(URL);


proxy.check = function(id, model){
    return this.getAxios().put(this.url + "-check/" + id, model);
};

proxy.repeat = function(id, model){
    return this.getAxios().put(this.url + "-repeat/" + id, model);
};

proxy.stop = function(id, model){
    return this.getAxios().put(this.url + "-stop/" + id, model);
};


proxy.waybillPrint = function(id){
    return this.getAxios().post('/assign-waybill-print/'+id);
}

proxy.goodsPrint = function(id){
    return this.getAxios().post('/assign-goods-print/'+id);
}

proxy.getByExpressSn = function(express_sn, param){
    return this.getAxios().get('/assign-expresssn/'+express_sn, {params:param});
}

export default proxy;