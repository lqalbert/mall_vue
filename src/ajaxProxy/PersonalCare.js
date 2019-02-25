import RestfulProxy from './RestfulProxy';

const URL = '/personal-care';
const proxy = new RestfulProxy(URL);

proxy.showCare = function (id){
  return this.getAxios().get("/personal-care-show/" + id);
}

export default proxy;