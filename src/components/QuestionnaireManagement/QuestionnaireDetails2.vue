<template>
        <div >
            <MyDialog title="编辑" :name="name" :width="width" :height="height" @before-open="onOpen">
                <el-form :model="searchForm" :inline="true"  :label-width="labelWidth"  ref="searchForm" :label-position="labelPosition">
                    <el-form-item label="" prop="name" >
                        <el-input class="name-input" size="small" v-model="searchForm.name" placeholder="请输入用户姓名" auto-complete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="phone" >
                        <el-input class="name-input" size="small" v-model="searchForm.phone" placeholder="请输入手机号" auto-complete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="weixin_nickname" >
                        <el-input class="name-input" size="small" v-model="searchForm.weixin_nickname" placeholder="请输入微信号" auto-complete="off" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" icon="search" @click="searchData">查询</el-button>
                        <el-button type="primary" size="small" icon="search" @click="resetData('searchForm')">重置</el-button>
                    </el-form-item>
                </el-form>
                <!--<el-row type="flex" justify="space-between">-->
                    <!--<el-col :span="4">客户列表</el-col>-->
                <!--</el-row>-->
                <el-row>
                    <el-col :span="12">
                        <el-table :data="users" border :height="400" @row-dblclick="getAnswers">
                            <el-table-column label="用户姓名" align="center" prop="name" ></el-table-column>
                            <el-table-column label="手机号" align="center" prop="phone" ></el-table-column>
                            <el-table-column label="微信" align="center" prop="weixin_nickname" ></el-table-column>
                        </el-table>
                        <el-row type="flex" justify="end">
                            <el-col :span="12">
                                <slot name="buttonbar"></slot>
                            </el-col>
                            <el-col :span="12" >
                                <div class="pull-right">
                                    <el-pagination
                                            :current-page="currentPage"
                                            :page-size="dpagesize"
                                            layout="total,prev,pager,next,jumper"
                                            :total="users_total"
                                            @current-change="currentChange"
                                    >
                                    </el-pagination>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <div  style="overflow:scroll; width:450px; height:400px;">
                           <div v-for="(v,index) in answers">
                            <p> 题目{{index + 1}}: {{v.topic_name}}</p>
                            <p v-if="v.option">答案: {{v.option}} ({{v.choice_answer}}) </p>
                            <p v-else="v.fill_answer">答案: {{v.fill_answer}} </p>
                           </div>
                        </div>
                    </el-col>
                </el-row>
                

            </MyDialog>
        </div>
    </template>
    
    <script>
    
        import DialogForm from '../../mix/DialogForm';
        import APP_CONST from '../../config';
        import QuestionnaireSurveyResultsSelectProxy from '../../packages/QuestionnaireSurveyResultsSelectProxy'

        export default {
            name: 'QuestionnaireDetails',
            mixins:[DialogForm],
            props:{
            },
            components:{

            },
            data () {
                return {
                    dialogThis:this,
                    labelPosition:"right",
                    labelWidth:'200px',
                    imageUrl:"",
                    dpagesize :10,
                    users_total :0,
                    currentPage:1,
                    searchForm:{
                        name:"",
                        phone:"",
                        weixin_nickname:"",
                    },
                    editorOption:{},
                    checkForm:{},
                    model:null,
                    questionnaireSurveyResults:null,
                    users:[],
                    answers:[],
                }
            },
            computed:{

            },
            methods:{
                currentChange(v){
                    this.questionnaireSurveyResults.setPage(v);
                    this.getUsers();
                },
                resetData(name){
                    this.$refs[name].resetFields();
                    this.getUsers();
                },
                getUsers(){
                    this.users = [];
                    this.answers = [];
                    this.questionnaireSurveyResults.setParam({
                        questionnaire_managements_id:this.model.id,
                        type:'users',
                    });
                    this.questionnaireSurveyResults.load();
                },
                onOpen(param){
                    this.model = param.params.model;
                    this.getUsers();
                },
                searchData(){
                    this.users = [];
                    this.answers = [];
                    this.questionnaireSurveyResults.setParam({
                        questionnaire_managements_id:this.model.id,
                        type:'users',
                        name:this.searchForm.name,
                        phone:this.searchForm.phone,
                        weixin_nickname:this.searchForm.weixin_nickname,
                    });
                    this.questionnaireSurveyResults.load();
                },
                getAjaxPromise(model){
                    return this.ajaxProxy.update(model.id, model);
                },
                getAnswers(row){
                    this.answers =[];
                    this.questionnaireSurveyResults.setParam({
                        questionnaire_managements_id:this.model.id,
                        cus_id:row.cus_id,
                        type:'user_answer',
                    });
                    this.questionnaireSurveyResults.load();
                },
                getQuestionnaireSurveyResults(res) {
                    if(res.users){
                        this.users = this.users.concat(res.users);
                        this.users_total = res.total;
                    }
                    if(res.answers){
                        this.answers = this.answers.concat(res.answers);
                    }
                },

            },
            created(){
                let NewObj = new QuestionnaireSurveyResultsSelectProxy({}, this.getQuestionnaireSurveyResults, this);
                this.questionnaireSurveyResults = NewObj;
                this.questionnaireSurveyResults.setPageSize(this.dpagesize);
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
    
    