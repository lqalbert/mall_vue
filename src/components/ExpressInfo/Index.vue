<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="Keyword">
                    <el-input v-model="searchForm.Keyword" placeholder="请输入标题关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询</el-button>
                    <el-button type="primary" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>

        <el-row>
            <el-col>
                <el-table :data="tableData" v-loading.body="dataLoad" border style="width: 100%">
                    <el-table-column label="序号" align="center"  type="index" width="65"></el-table-column>

                    <el-table-column prop="type" label="公告类型" align="center">
                    </el-table-column>

                    <el-table-column prop="title" label="公告标题" align="center">
                    </el-table-column>

                    <el-table-column prop="content" label="公告内容(点击查看详细)" align="center">
                    </el-table-column>

                    <el-table-column prop="user" label="发布人" align="center">
                    </el-table-column>
                  </el-table>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="12">
            </el-col>
            <div class="pull-right">
                 <el-col :span="12" :offset="12">
                     <div style="float:right">
                         <el-pagination
                                 :current-page="currentPage4"
                                 :page-size="100"
                                 layout="total, prev, pager, next, jumper"
                                 :total="total"
                                 @current-change="currentChange">
                         </el-pagination>
                     </div>
                 </el-col>
            </div>
        </el-row>


    </div>

</template>

<script>
    import PageMix from '../../mix/Page';
    import DataProxy from '../../packages/DataProxy';
    import SearchTool from '../../mix/SearchTool';

    export default {
    name: 'ExpressInfo',
    pageTitle:"物流信息",
    mixins: [PageMix,SearchTool],
    data () {
        return {
            searchForm:{
                 Keyword:'',
            },
            dataLoad:false,
            currentPage4:1,
            total:100,
            tableData:[
            {type:'系统维护',title:'索取功能暂时关闭',content:'由于员工反应系统索取功能问题，目前将此功能关闭，对您造成的不便在这里我们深表歉意。',user:'王姣姣'},
            {type:'功能升级',title:'关于使用问题(单击我！)',content:'关于新CRM的使用以及数据问题，请联系部门经理或者系统管理员！',user:'王姣姣'},
            {type:'系统维护',title:'索取功能暂时关闭',content:'由于员工反应系统索取功能问题，目前将此功能关闭，对您造成的不便在这里我们深表歉意。',user:'王姣姣'},

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
        },mainTableLoad(data){
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
        let mainProxy = new DataProxy("/departmentnotice", this.pageSize, this.mainTableLoad, this);
        this.mainProxy = mainProxy;
        this.mainProxy.load();
        this.$on('search-tool-change', this.onSearchChange);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
