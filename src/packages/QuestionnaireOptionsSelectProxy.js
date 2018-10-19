import SelectProxy from './SelectProxy';
import QuestionnaireOptions from '../ajaxProxy/QuestionnaireOptions';

const QuestionnaireOptionsSelectProxy = function (param, callback, scope) {
    this.extraParm = param || null;
    this.CategoryProxy = new SelectProxy(QuestionnaireOptions.getUrl(), callback, scope);

    if (this.extraParm) {
      this.setParam(this.extraParm);
    }
};

QuestionnaireOptionsSelectProxy.prototype.setParam = function (param) {
    this.CategoryProxy.setExtraParam(param);
    return this;
};

QuestionnaireOptionsSelectProxy.prototype.load = function () {
    this.CategoryProxy.load();
};


export default QuestionnaireOptionsSelectProxy;