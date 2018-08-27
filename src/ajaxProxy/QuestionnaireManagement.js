import RestfulProxy from './RestfulProxy';

const URL = '/questionnairemanagement';
const proxy = new RestfulProxy(URL);
proxy.getSurveyResults = function (questionnaire_managements_id) {
    return this.getAxios().get("/getSurveyResults/" + questionnaire_managements_id);
};
export default proxy;