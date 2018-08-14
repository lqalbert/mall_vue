<template>
        <div >
            <MyDialog title="详细信息" :name="name" :width="width" :height="height" @before-open="onOpen">
                <div v-if="infos">
                    <p v-for=" (v,index) in infos" >{{index+1}}、{{v.answer}}</p>
                </div>
                <div v-if="options">
                    <p v-for=" v in options">{{v.name}}、{{v.comment}}</p>
                </div>
            </MyDialog>
        </div>
    </template>
    
    <script>
    
        import DialogForm from '../../mix/DialogForm';
        import APP_CONST from '../../config';
        import QuestionnaireSurveyResultsSelectProxy from '../../packages/QuestionnaireSurveyResultsSelectProxy'

        export default {
            name: 'info',
            mixins:[DialogForm],
            components:{
            },
            data () {
                return {
                    dialogThis:this,
                    labelPosition:"right",
                    Width:'80px',
                    questionnaireSurveyResults:null,
                    model:null,
                    infos:[],
                    options:[],
                }
            },
            methods:{
                onOpen(param){
                    this.model = param.params.model;
                    this.getInfo();
                },
                getAjaxPromise(model){
                    return this.ajaxProxy.update(model.id, model);
                } ,
                getInfo(){
                    this.infos = [];
                    this.options = [];
                    this.questionnaireSurveyResults.setParam({
                        questionnaire_managements_id:this.model.questionnaire_managements_id,
                        questionnaire_options_id:this.model.questionnaire_options_id,
                        problem_type:this.model.problem_type,
                        type:'info',
                    });
                    this.questionnaireSurveyResults.load();
                },
                getQuestionnaireSurveyResults(res) {
                    if(res.info){
                        this.infos = this.infos.concat(res.info);
                    }
                    if(res.option){
                        this.options = this.options.concat(res.option);
                    }

                },

            },
            created(){
                let NewObj = new QuestionnaireSurveyResultsSelectProxy({}, this.getQuestionnaireSurveyResults, this);
                this.questionnaireSurveyResults = NewObj;
            }
            
        }
    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
        .name-input{
            max-width: 217px;
        }
        .avatar{
            max-width: 250px;
            max-height: 250px;
        }
    </style>
    
    