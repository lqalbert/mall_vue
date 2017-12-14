<template>
        <div >
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item  prop="Keyword">
                    <el-input v-model="searchForm.Keyword" placeholder="请输入标题关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="search"  @click="searchToolChange('searchForm')">查询</el-button>
                    <el-button type="primary" @click="searchToolReset('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>

        <el-row>
            <el-col>
                <el-table :data="tableData" border v-loading.body="dataLoad" style="width: 100%">
                    <el-table-column label="序号" align="center"  type="index" width="65">
                    </el-table-column>

                    <el-table-column label="总结标题" prop="title" align="center">
                    </el-table-column>

                    <el-table-column label="总结内容" prop="content" align="center">
                    </el-table-column>

                    <el-table-column label="总结类型" prop="type" align="center">
                    </el-table-column>

                    <el-table-column label="总结员工" prop="su_user" align="center">
                    </el-table-column>

                    <el-table-column label="总结时间" prop="su_time" align="center">
                    </el-table-column>

                    <el-table-column label="回复员工" prop="re_user" align="center">
                    </el-table-column>

                    <el-table-column label="回复时间" prop="re_time" align="center">
                    </el-table-column>

                    <el-table-column label="回复内容" prop="reply" align="center">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-tooltip content="发表总结或日志" placement="right">
                        <el-button size="small" @click="addDialog = true" type="info"  icon="edit">填写总结
                        </el-button>
                    </el-tooltip>

                    <el-tooltip content="选择一条总结并回复" placement="right">
                        <el-button size="small" @click="replyDialog = true" type="primary"  icon="plus">经理回复
                        </el-button>
                    </el-tooltip>
                </div>
            </el-col>
            <div class="pull-right">
                <el-col :span="12">
                    <el-pagination
                            :current-page="currentPage4"
                            :page-size="100"
                            layout="total, prev, pager, next, jumper"
                            :total="total"
                            @current-change="currentChange">
                    </el-pagination>
                </el-col>
            </div>
        </el-row>

        <!--添加公告 -->


        <addDialog :add-open="addDialog" @add-window-close="handleAddWindow"/>


        <replyDialog :add-open="replyDialog" @add-window-close="handleAddWindow"/>

        <!-- / 添加公告 -->

    </div>




</template>

<script>
import addDialog from './addDialog';
import replyDialog from './replyDialog';

import PageMix from '../../mix/Page';
import DataProxy from '../../packages/DataProxy';
import SearchTool from '../../mix/SearchTool';

export default {
    name: 'WorkSummary',
    pageTitle:"工作总结",
    mixins: [PageMix,SearchTool],
    components: {
        addDialog,
        replyDialog

    },
    data () {
        return {
            addDialog:false,
            replyDialog:false,
            searchForm:{
                 Keyword:'',
            },
            total:100,
            dataLoad:false,
            currentPage4:1,
            tableData:[
            {title:'工作总结',content:'后台建议',type:'每周总结',su_user:'王姣姣',su_time:'2017-06-30 09:53:13',re_user:'系统管理员',re_time:'2017-06-30 09:53:50',reply:'表现不错'},
            {title:'工作总结',content:'后台建议',type:'每周总结',su_user:'王姣姣',su_time:'2017-06-30 09:53:13',re_user:'系统管理员',re_time:'2017-06-30 09:53:50',reply:'表现不错'},
            {title:'工作总结',content:'后台建议',type:'每周总结',su_user:'王姣姣',su_time:'2017-06-30 09:53:13',re_user:'系统管理员',re_time:'2017-06-30 09:53:50',reply:'表现不错'},

            ]
        }
    },
    methods:{
        dataReload:function(){
          console.log(this.searchForm.Keyword);
        },
        searchReset:function(){
          this.searchForm.Keyword='';
        },
        handleEdit:function(index,row){
            this.replyDialog =true;
          this.searchForm.Keyword='';
        },
        handleDelete:function(index,row){
          this.searchForm.Keyword='';
        },
         openAddDialog:function(){
          this.searchForm.Keyword='';
        },
         closeDialog:function(){
          this.searchForm.Keyword='';
        },
         addFormSubmit:function(){
          console.log(this.addForm);
        },

        handleAddWindow(){
             this.addDialog = false;
             this.replyDialog =false;
        },
        mainTableLoad(data){
            this.toggleTableLoad();
            this.tableData = data.items;
            this.total = data.total;
        },
        currentChange(v){
            this.toggleTableLoad();
            this.mainProxy.setPage(v).load();
        },
        toggleTableLoad(){
            this.dataLoad = !this.dataLoad;
        },

        onSearchChange(param){
            this.toggleTableLoad();
            this.mainProxy.setExtraParam(param).load();
        }

    },
    created(){
        this.toggleTableLoad();
        let mainProxy = new DataProxy("/worksummary", this.pageSize, this.mainTableLoad, this);
        this.mainProxy = mainProxy;
        this.mainProxy.load();
        this.$on('search-tool-change', this.onSearchChange);

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
