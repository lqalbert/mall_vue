<template>
    <div>
        <el-row>
            <el-form :inline="true"  ref="searchForm" class="demo-form-inline" :model="searchForm">
                <el-form-item prop="title">
                    <el-input v-model="searchForm.title" placeholder="请输入标题关键字" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询
                    </el-button>
                    <el-button size="small" type="primary" @click="searchToolReset('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-col>
                <TableProxy 
                    :url="mainurl" 
                    :param="mainparam"
                    @dbclick="doubleClick"
                    :reload="dataTableReload" :page-size="15">
                    <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>

                    <el-table-column label="标题" prop="title" align="center"></el-table-column>

                    <el-table-column label="开始时间" prop="start_time" align="center"></el-table-column>

                    <el-table-column label="截止时间" prop="end_time" align="center"></el-table-column>

                    <el-table-column label="发布时间" prop="created_at" align="center"></el-table-column>

                    <el-table-column label="发布人" prop="user_name" align="center"></el-table-column>

                    <el-table-column width="180" fixed="right"  label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="showEdit(scope.row)" size="small">地址跳转</el-button>
                            <el-button type="primary" @click="showQuestionnaireDetails(scope.row)"  size="small" >详 情</el-button>
                            <!--<el-button type="danger"  @click="handleDelete(scope.row.id)" size="small" >删除</el-button>-->
                        </template>
                    </el-table-column>
                    <div slot="buttonbar">
                        <el-button size="small" type="primary" @click="showAdd" >新建问卷</el-button>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>
        <br>
   <el-row>
       <el-col>
           <el-table :data="resultList" border>
               <!--<el-table-column label="题号" align="center" type="index" width="65"></el-table-column>-->
               <el-table-column label="题号" align="center" prop="questionnaire_options_id" width="65"></el-table-column>

               <el-table-column label="题型" prop="problem_type" align="center">
                   <template slot-scope="scope">
                       <span v-if="scope.row.problem_type==1">单项选择型</span>
                       <span v-if="scope.row.problem_type==2">多项选择型</span>
                       <span v-if="scope.row.problem_type==3">文字填写型</span>
                   </template>
               </el-table-column>

               <el-table-column label="题目" prop="topic_name" align="center" show-overflow-tooltip></el-table-column>
               <el-table-column label="A(占比)"  align="center">
                   <template slot-scope="scope">
                       <span v-if="!scope.row.answer">{{scope.row.a_total}} ({{scope.row.a_ratio}})</span>
                       <span v-else> </span>
                   </template>
               </el-table-column>
               <el-table-column label="B(占比)"  align="center">
                   <template slot-scope="scope">
                       <span v-if="!scope.row.answer">{{scope.row.b_total}} ({{scope.row.b_ratio}})</span>
                       <span v-else> </span>
                   </template>
               </el-table-column>
               <el-table-column label="C(占比)"  align="center">
                   <template slot-scope="scope">
                       <span v-if="!scope.row.answer">{{scope.row.c_total}} ({{scope.row.c_ratio}})</span>
                       <span v-else> </span>
                   </template>
               </el-table-column>
               <el-table-column label="D(占比)"  align="center">
                   <template slot-scope="scope">
                       <span v-if="!scope.row.answer">{{scope.row.d_total}} ({{scope.row.d_ratio}})</span>
                       <span v-else> </span>
                   </template>
               </el-table-column>
               <el-table-column label="E(占比)"  align="center">
                   <template slot-scope="scope">
                       <span v-if="!scope.row.answer">{{scope.row.e_total}} ({{scope.row.e_ratio}})</span>
                       <span v-else> </span>
                   </template>
               </el-table-column>
               <el-table-column label="明细" prop="" align="center">
                   <template slot-scope="scope">
                       <el-button type="primary"   size="small" @click="showInfo(scope.row)">查 看</el-button>
                   </template>
               </el-table-column>
           </el-table>
       </el-col>
   </el-row>
        <Add 
            name="add-article"
            :ajax-proxy="ajaxProxy"
            @submit-success="handleReload">
        </Add>

        <Copy
            name="copy"
            :ajax-proxy="ajaxProxy"
            :questionnaire_url="questionnaire_url"
            @submit-success="handleReload">
        </Copy>
        <QuestionnaireDetails
            name="questionnaire-details"
            @submit-success="handleReload">
        </QuestionnaireDetails>
        <Info
            name="info"
            @submit-success="handleReload">
        </Info>

    </div>


</template>

<script>
    import Add from './Add.vue';
    import Copy from './Copy.vue';
    import QuestionnaireDetails from './QuestionnaireDetails.vue';
    import Info from './Info.vue';
    import PageMix from '../../mix/Page';
   
    import SearchTool from '../../mix/SearchTool';
    import DataTable from '../../mix/DataTable';

    import QuestionnaireManagement from '../../ajaxProxy/QuestionnaireManagement';
    import QuestionnaireManagementSelect from '../../packages/QuestionnaireManagementSelectProxy';
    import QuestionnaireSurveyResultsSelectProxy from '../../packages/QuestionnaireSurveyResultsSelectProxy'
    import DepartSelectProxy from '../../packages/DepartSelectProxy';

    export default {
        name: 'QuestionnaireManagement',
        pageTitle: "问卷管理",
        mixins: [PageMix, SearchTool,DataTable],
        components: {
            Add,
            Copy,
            QuestionnaireDetails,
            Info
        },
        data() {
            return {
                ajaxProxy: QuestionnaireManagement,
                mainurl:QuestionnaireManagement.getUrl(),
                mainparam:"",
                searchForm: {
                    title: "",
                },
                currentRow:null,
                rowData:null,
                questionnaire_url:null,
                questionnaireSurveyResults:null,
                resultList: [],
            }
        },
        methods: {
            getAjaxProxy(){
                return  this.ajaxProxy;
            },
            onSearchChange(param) {
                this.mainparam = JSON.stringify(param);
            },
            showInfo(row) {
                this.$modal.show('info', {model:row});
            },
            getQuestionnaireSurveyResults(res) {
                if(res.data){
                    this.resultList = res.data;
                }
                if(res.questionnaire_url){
                    this.questionnaire_url = res.questionnaire_url;
                }
            },
            loadDepartment(res) {
                console.log(res);
            },
            showAdd(){
                this.$modal.show('add-article');
            },
            showEdit: function (row) {
                this.$modal.show('copy', {model:row});
            },
            showQuestionnaireDetails: function (row) {
                this.$modal.show('questionnaire-details', {model:row});
            },
            getAjaxPromise(model){
                return this.ajaxProxy.getSurveyResults(model.id);
            },
            doubleClick(row){
                this.rowData = row;
                this.questionnaireSurveyResults.setParam({
                    questionnaire_managements_id:this.rowData.id,
                    type:'results_ratio',
                });
                this.questionnaireSurveyResults.load();
            },
        },
        created() {
            this.$on('search-tool-change', this.onSearchChange);
            let NewObj = new QuestionnaireSurveyResultsSelectProxy({}, this.getQuestionnaireSurveyResults, this);
            this.questionnaireSurveyResults = NewObj;
            this.questionnaireSurveyResults.load();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
