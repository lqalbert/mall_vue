<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" size="small">
                <el-form-item prop="Keyword">
                    <el-input v-model="formInline.Keyword" placeholder="请输入标题关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="searchToolChange('formInline')">查询</el-button>
                    <el-button type="primary" size="small" @click="searchToolReset('formInline')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>

        <el-row>
            <el-col>
                <el-table :data="tableData" border v-loading.body="dataLoad" style="width: 100%">
                    <el-table-column label="序号" align="center"  type="index" width="65"></el-table-column>
                    <el-table-column prop="type" label="公告类型" align="center">
                    </el-table-column>

                    <el-table-column prop="title" label="公告标题" align="center">
                    </el-table-column>

                    <el-table-column prop="content" label="公告内容(点击查看详细)" align="center">
                    </el-table-column>

                    <el-table-column prop="start" label="开始日期" align="center">
                    </el-table-column>

                    <el-table-column prop="end" label="截止日期" align="center">
                    </el-table-column>

                    <el-table-column prop="user" label="发布人" align="center">
                    </el-table-column>

                    <el-table-column label="操作"  align="center" width="180">
                       <template slot-scope="scope">
                          <el-button type="info" @click.stop="handleEdit()" size="small">编辑</el-button>
                          <el-button type="danger"  @click.stop="handleDelete()" size="small">删除</el-button>
                       </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-tooltip content="点击填写公告并发布" placement="right">
                    <el-button size="small" type="info" @click="addDialog = true" icon="edit">发布公告
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
                    :total=total
                    @current-change="currentChange">
                    </el-pagination>
                </el-col>
            </div>
        </el-row>
        <!--添加公告 -->
        <addDialog :add-open.sync="addDialog" @update:add-open="val=> addDialog = val"/>

        <!-- / 添加公告 -->
        <!--修改公告 -->


        <editDialog :edit-open="editDialog" @add-window-close="handleAddWindow"/>

        <!-- / 修改公告 -->

    </div>




</template>

<script>
import addDialog from './addDialog';
import editDialog from './editDialog';
import PageMix from '../../mix/Page';
import DataProxy from '../../packages/DataProxy';
import SearchTool from '../../mix/SearchTool';

export default {
    name: 'SysNotice',
    pageTitle:"系统公告",
    mixins: [PageMix,SearchTool],
    components: {
        addDialog,
        editDialog
    },
    data () {
        return {
            addDialog:false,
            editDialog:false,
            total:100,
            dataLoad:false,
            formInline:{
                 Keyword:'',
            },

            currentPage4:1,
            tableData:[
            {type:'系统维护',title:'索取功能暂时关闭',content:'由于员工反应系统索取功能问题，目前将此功能关闭，对您造成的不便在这里我们深表歉意。',start:'2017-06-06 09:53:07',end:'2017-06-30 09:53:13',user:'王姣姣'},
            {type:'功能升级',title:'关于使用问题(单击我！)',content:'关于新CRM的使用以及数据问题，请联系部门经理或者系统管理员。联系系统管理员请到《创智学院港澳crm反馈群》里面！感谢您的支持！',start:'2017-06-06 09:53:07',end:'2017-06-30 09:53:13',user:'王姣姣'},
            {type:'系统维护',title:'索取功能暂时关闭',content:'由于员工反应系统索取功能问题，目前将此功能关闭，对您造成的不便在这里我们深表歉意。',start:'2017-06-06 09:53:07',end:'2017-06-30 09:53:13',user:'王姣姣'},

            ]
        }
    },
    methods:{
        dataReload:function(){
          console.log(this.formInline.Keyword);
        },
        searchReset:function(){
          this.formInline.Keyword='';
        },
        handleEdit:function(index,row){
            this.editDialog =true;
          this.formInline.Keyword='';
        },
        handleDelete:function(index,row){
          this.formInline.Keyword='';
        },
         openAddDialog:function(){
          this.formInline.Keyword='';
        },
         closeDialog:function(){
          this.formInline.Keyword='';
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
        let mainProxy = new DataProxy("/sysnotice", this.pageSize, this.mainTableLoad, this);
        this.mainProxy = mainProxy;
        this.mainProxy.load();

        this.$on('search-tool-change', this.onSearchChange);

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
