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

                    <el-table-column label="标题" prop="title" align="center" show-overflow-tooltip></el-table-column>

                    <el-table-column label="开始时间" prop="start_time" align="center"></el-table-column>

                    <el-table-column label="截止时间" prop="end_time" align="center"></el-table-column>

                    <el-table-column label="发布时间" prop="created_at" align="center"></el-table-column>

                    <el-table-column label="发布人" prop="user_name" align="center"></el-table-column>

                    <el-table-column width="300" fixed="right"  label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="showEdit(scope.row)" size="small">编 辑</el-button>
                            <el-button type="primary" @click="showUrl(scope.row)" size="small">地址跳转</el-button>
                            <el-button type="primary" @click="showQuestionnaireDetails2(scope.row)"  size="small" >详 情</el-button>
                            <el-button type="danger"  @click="handleDelete(scope.row.id,false)" size="small" >删 除</el-button>
                        </template>
                    </el-table-column>
                    <div slot="buttonbar">
                        <el-button size="small" type="primary" @click="showAdd" >新建问卷</el-button>
                        <el-button size="small" type="primary" @click="copy" >复制问卷</el-button>
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
                    <el-table-column label="明细" prop="" width="240px" align="center">
                        <template slot-scope="scope">
                            <el-button type="success"   size="small" @click="editOptions(scope.row)">编 辑</el-button>
                            <el-button type="primary"   size="small" @click="showInfo(scope.row)">查 看</el-button>
                            <el-button type="danger"   size="small" @click="handleDelete(scope.row.questionnaire_options_id,true)">删 除</el-button>
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
        <Edit
                name="edit-article"
                :ajax-proxy="ajaxProxy"
                @submit-success="handleReload">
        </Edit>
        <EditOption
                name="edit-option"
                :ajax-proxy="questionnaireOptionsAjaxProxy"
                @submit-success="handleReload">
        </EditOption>
        <Url
            name="url"
            :ajax-proxy="ajaxProxy"
            :questionnaire_url="questionnaire_url"
            @submit-success="handleReload">
        </Url>
        <QuestionnaireDetails
            name="questionnaire-details"
            @submit-success="handleReload">
        </QuestionnaireDetails>

        <QuestionnaireDetails2
            name="QuestionnaireDetails2"
            @submit-success="handleReload">
        </QuestionnaireDetails2>

        <Info
            name="info"
            @submit-success="handleReload">
        </Info>
    </div>
</template>

<script>
    import Add from './Add.vue';
    import Edit from './Edit.vue';
    import Url from './Url.vue';
    import EditOption from './EditOption.vue';
    import QuestionnaireDetails from './QuestionnaireDetails.vue';
    import QuestionnaireDetails2 from './QuestionnaireDetails2.vue';
    import Info from './Info.vue';
    import PageMix from '@/mix/Page';
    import SearchTool from '@/mix/SearchTool';
    import DataTable from '@/mix/DataTable';

    import QuestionnaireManagement from '@/ajaxProxy/QuestionnaireManagement';
    import QuestionnaireOptions from '@/ajaxProxy/QuestionnaireOptions';
    import QuestionnaireManagementSelect from '@/packages/QuestionnaireManagementSelectProxy';
    import QuestionnaireSurveyResultsSelectProxy from '@/packages/QuestionnaireSurveyResultsSelectProxy'
    import DepartSelectProxy from '@/packages/DepartSelectProxy';

    export default {
        name: 'QuestionnaireManagement',
        pageTitle: "问卷管理",
        mixins: [PageMix, SearchTool,DataTable],
        components: {
            Add,
            Edit,
            Url,
            EditOption,
            QuestionnaireDetails,
            Info,
            QuestionnaireDetails2
        },
        data() {
            return {
                ajaxProxy: QuestionnaireManagement,
                questionnaireOptionsAjaxProxy: QuestionnaireOptions,
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
                model: null,
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
                if(res.status){
                    this.searchToolReset('searchForm');
                }
            },
            loadDepartment(res) {
                console.log(res);
            },
            showAdd(){
                this.$modal.show('add-article');
            },
            hasCurrentRow(){
                if (this.model) {
                    return true;
                } else {
                    return false;
                }
            },
            selectRowCheck(){
                if (!this.hasCurrentRow()) {
                    this.$alert('请选择一行', '警告', {
                        confirmButtonText: '确定',
                    });
                    return false;
                } else {
                    return true;
                }
            },
            copy(){
                if (this.selectRowCheck()) {
                    this.questionnaireSurveyResults.setParam({
                        questionnaire_managements_id:this.model.id,
                        type:'copy',
                    });
                    this.questionnaireSurveyResults.load();
                }
            },
            showEdit: function (row) {
                this.$modal.show('edit-article', {model:row});
            },
            editOptions: function (row) {
                this.$modal.show('edit-option', {model:row});
            },
            handleDelete(id,is_delete){
                let vmthis = this;
                let ajaxProxy = this.getAjaxProxy();
                if(is_delete){
                     ajaxProxy = QuestionnaireOptions;
                }
                if(!ajaxProxy){
                    return ;
                }
                this.$confirm('确定删除?', '警告',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    ajaxProxy.delete(id).then(function(response){
                        let data = response.data;
                        if (data.status == 1) {
                            vmthis.$message.success("操作成功");
                            vmthis.$emit('delete-success');
                        }else {
                            vmthis.$message.error(data.msg);
                            vmthis.$emit('delete-error');
                        }
                        // vmthis.handleReload();
                    }).catch(function(error){
                        vmthis.$message.error("出错了")
                    });
                });
            },
            showUrl: function (row) {
                this.$modal.show('url', {model:row});
            },
            showQuestionnaireDetails: function (row) {
                this.$modal.show('questionnaire-details', {model:row});
            },

            showQuestionnaireDetails2: function (row) {
                this.$modal.show('QuestionnaireDetails2', {model:row});
            },
            getAjaxPromise(model){
                return this.ajaxProxy.getSurveyResults(model.id);
            },
            doubleClick(row){
                this.rowData = row;
                this.model = row;
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
        },
        beforeDestroy(){
            this.questionnaireSurveyResults = null;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
