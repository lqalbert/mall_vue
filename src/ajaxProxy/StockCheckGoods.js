import RestfulProxy from './RestfulProxy';

const URL = '/stock-check-goods';
const proxy = new RestfulProxy(URL);

proxy.updateEntrepot = function(id){
    return this.getAxios().put(this.url + '-entrepot/' + id);
}


export default proxy;