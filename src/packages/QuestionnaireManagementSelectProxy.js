import SelectProxy from './SelectProxy';
import QuestionnaireManagement from '../ajaxProxy/QuestionnaireManagement';

const QuestionnaireManagementSelectProxy = function (param, callback, scope) {
    this.extraParm = param || null;
    this.CategoryProxy = new SelectProxy(QuestionnaireManagement.getUrl(), callback, scope);

    if (this.extraParm) {
      this.setParam(this.extraParm);
    }
};

QuestionnaireManagementSelectProxy.prototype.setParam = function (param) {
    this.CategoryProxy.setExtraParam(param);
    return this;
};

QuestionnaireManagementSelectProxy.prototype.load = function () {
    this.CategoryProxy.load();
};


export default QuestionnaireManagementSelectProxy;