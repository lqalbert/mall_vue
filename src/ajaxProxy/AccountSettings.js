import RestfulProxy from './RestfulProxy';

const URL = '/accountsettings';
const proxy = new RestfulProxy(URL);
proxy.updates =function(model){
    return this.getAxios().put("/accountsettingsupdate", model);
};
export default proxy;