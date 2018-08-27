import SelectProxy from './SelectProxy';
import QuestionnaireSurveyResults from '../ajaxProxy/QuestionnaireSurveyResults';

const QuestionnaireSurveyResultsSelectProxy = function (param, callback, scope) {
    this.extraParm = param || null;
    this.CategoryProxy = new SelectProxy(QuestionnaireSurveyResults.getUrl(), callback, scope);

    if (this.extraParm) {
      this.setParam(this.extraParm);
    }
};

QuestionnaireSurveyResultsSelectProxy.prototype.setParam = function (param) {
    this.CategoryProxy.setExtraParam(param);
    return this;
};

QuestionnaireSurveyResultsSelectProxy.prototype.load = function () {
    this.CategoryProxy.load();
};
QuestionnaireSurveyResultsSelectProxy.prototype.setPage = function (v) {
    this.CategoryProxy.setPage(v);
};
QuestionnaireSurveyResultsSelectProxy.prototype.setPageSize = function (pageSize) {
    this.CategoryProxy.setPageSize(pageSize);
};

export default QuestionnaireSurveyResultsSelectProxy;