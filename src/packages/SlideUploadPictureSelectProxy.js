import SelectProxy from './SelectProxy';
import SlideUploadPicture from '../ajaxProxy/SlideUploadPicture';

const SlideUploadPictureSelectProxy = function (param, callback, scope) {
    this.extraParm = param || null;
    this.CategoryProxy = new SelectProxy(SlideUploadPicture.getUrl(), callback, scope);

    if (this.extraParm) {
      this.setParam(this.extraParm);
    }
};

SlideUploadPictureSelectProxy.prototype.setParam = function (param) {
    this.CategoryProxy.setExtraParam(param);
    return this;
};
SlideUploadPictureSelectProxy.prototype.setPageSize = function(pageSize){
    this.pageSize = pageSize;
    return this;
};

SlideUploadPictureSelectProxy.prototype.load = function () {
    this.CategoryProxy.load();
};


export default SlideUploadPictureSelectProxy;