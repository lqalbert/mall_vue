<template>
        <div >
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item  prop="Keyword">
                    <el-input v-model="searchForm.Keyword" placeholder="请输入标题关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询</el-button>
                    <el-button type="primary" size="small"@click="searchToolReset('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>

        <el-row>
            <el-col>
                <el-table :data="tableData" v-loading.body="dataLoad" border style="width: 100%">
                    <el-table-column label="序号" align="center"  type="index" width="65">
                    </el-table-column>

                    <el-table-column prop="type" label="类型" align="center">
                    </el-table-column>

                    <el-table-column prop="title" label="标题" align="center">
                    </el-table-column>

                    <el-table-column prop="advice" label="建议内容" align="center">
                    </el-table-column>

                    <el-table-column prop="ad_user" label="发表人" align="center">
                    </el-table-column>

                    <el-table-column prop="time" label="时间" align="center">
                    </el-table-column>

                    <el-table-column prop="reply" label="回复内容" align="center">
                    </el-table-column>

                    <el-table-column prop="re_user" label="回复人" align="center">
                    </el-table-column>

                    <el-table-column prop="re_time" label="回复时间" align="center">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-tooltip content="点击填写公告并发布" placement="right">
                        <el-button size="small" type="info" @click="addDialog = true" icon="edit">发表建议
                        </el-button>
                    </el-tooltip>

                    <el-tooltip content="选择一条建议并回复" placement="right">
                        <el-button size="small" type="primary" icon="plus">建议回复
                        </el-button>
                    </el-tooltip>

                    <el-tooltip content="选择多条建议" placement="right">
                        <el-button size="small" type="danger" icon="circle-close">删除
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

        <!-- / 添加公告 -->



    </div>




</template>

<script>
import addDialog from './addDialog';

import PageMix from '../../mix/Page';
import DataProxy from '../../packages/DataProxy';
import SearchTool from '../../mix/SearchTool';

export default {
    name: 'GatherAdvice',
    pageTitle:"集思信箱",
    mixins: [PageMix,SearchTool],
    components: {
        addDialog,

    },
    data () {
        return {
            addDialog:false,
            editDialog:false,
            searchForm:{
                 Keyword:'',
            },
            total:100,
            dataLoad:false,
            currentPage4:1,
            tableData:[
            {type:'系统制度',title:'后台建议',advice:'由于员工反应系统索取功能问题，目前将此功能关闭，对您造成的不便在这里我们深表歉意。',ad_user:'王姣姣',time:'2017-06-30 09:53:13',reply:'考虑修改',re_user:'系统管理员',re_time:'2017-09-14'},
            {type:'系统制度',title:'后台建议',advice:'由于员工反应系统索取功能问题，目前将此功能关闭，对您造成的不便在这里我们深表歉意。',ad_user:'王姣姣',time:'2017-06-30 09:53:13',reply:'考虑修改',re_user:'系统管理员',re_time:'2017-09-14'},
            {type:'系统制度',title:'后台建议',advice:'由于员工反应系统索取功能问题，目前将此功能关闭，对您造成的不便在这里我们深表歉意。',ad_user:'王姣姣',time:'2017-06-30 09:53:13',reply:'考虑修改',re_user:'系统管理员',re_time:'2017-09-14'},

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
            this.editDialog =true;
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
             this.editDialog =false;
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
        },

    },
    created(){
        this.toggleTableLoad();
        let mainProxy = new DataProxy("/gatheradvice", this.pageSize, this.mainTableLoad, this);
        this.mainProxy = mainProxy;
        this.mainProxy.load();
        this.$on('search-tool-change', this.onSearchChange);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
