<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true"  ref="searchForm" :model="searchForm">
                <el-form-item style="display: none;" prop="id">
                    <el-input  v-model="searchForm.id">
                    </el-input>
                </el-form-item>

                <el-form-item prop="name" >
                    <el-input size="small" placeholder="请输入单位名"  v-model="searchForm.name">
                    </el-input>
                </el-form-item>

                <el-form-item prop="contact" >
                    <el-input size="small" placeholder="请输入联系人"  v-model="searchForm.contact">
                    </el-input>

                </el-form-item>
                <el-form-item prop="tel" >
                    <el-input size="small" placeholder="联系人电话"  v-model="searchForm.tel">
                    </el-input>
                </el-form-item>

                <el-form-item prop="type">
                    <el-dropdown trigger="click" menu-align="start" @command="depTypeChange">
                        <el-button type="primary" size="small">
                            {{depTypeName}}<i class="el-icon-caret-bottom el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(key,index) in typeList" :key="index" :command="index.toString()">{{key}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-form-item>

                <el-form-item>
                    <el-button size="small" type="primary" icon="search" @click="searchToolChange('searchForm')" >查询</el-button>
                    <el-tooltip content="清空搜索框并刷新表格数据" placement="bottom-start">
                        <el-button size="small" @click="searchToolReset('searchForm')" type="primary" style="margin-left:10px;">重置</el-button>
                    </el-tooltip>
                    <!-- <el-button  @click="openDialog('advancedSearch')" icon="search">高级查询</el-button>  -->
                </el-form-item>
                <el-form-item>
                    <el-tooltip content="点击刷新当前页面" placement="right">
                        <el-button @click="refresh" size="small" type="danger">刷新</el-button>
                    </el-tooltip>
                </el-form-item>
            </el-form>
        </el-row>

        <el-row>
            <el-col>
                <el-table :data="tableData" v-loading="dataLoad" border style="width: 100%">
                    <el-table-column label="序号" align="center"  type="index" width="65">
                    </el-table-column>

                    <el-table-column label="单位名"  prop="name" align="center">
                    </el-table-column>

                    <el-table-column prop="typeText" label="类型" align="center">
                    </el-table-column>

                    <el-table-column label="联系人"  prop="contact" align="center">
                    </el-table-column>

                    <el-table-column prop="tel" label="联系电话" align="center">
                    </el-table-column>

                    <el-table-column label="是否启用" :context="_self" align="center" prop="status">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.switch"
                                    on-color="#13ce66"
                                    off-color="#ff4949"
                                    @change="switchHandle(scope.$index, scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="remark" label="备注" align="center">
                    </el-table-column>

                    <el-table-column  :context="_self"  align="center" width="250" fixed="right"  label="操作"  >
                        <template slot-scope="scope">
                            <el-button type="success" @click="editDialog = true"     size="small">编辑</el-button>
                            <el-button type="danger"  @click="handleDelete()"   size="small" >删除</el-button>
                            <el-button type="info"  size="small"> 导出人员 </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-row >
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-tooltip content="点击填写公告并发布" placement="right">
                        <el-button size="small" icon="plus" type="info" @click="addDialog = true" >添加</el-button>
                    </el-tooltip>

                    <el-button size="small" type="info" >人事专员</el-button>
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

        <!--&lt;!&ndash; / 添加公告 &ndash;&gt;-->
        <!--&lt;!&ndash;修改公告 &ndash;&gt;-->


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
    name: 'Department',
    pageTitle:"组织单位",
    mixins: [PageMix,SearchTool],
    components: {
        addDialog,
       editDialog
    },
    data () {
        return {
            depTypeName:"选择单位类型",
            typeList:["销售部", "客服部", "风控部", "人事部", "推广部", "投顾部"],
            total:100,
            dataLoad:false,
            addDialog:false,
            editDialog:false,
            searchForm:{
                name:"",
                id:"0",
                sortFiled:"id",
                sortWay:"asc",
                contact:"",
                tel:"",
                type:""
            },

            currentPage4:1,
            tableData:[
            {name:'推广二部',typeText:'推广部',contact:'李青',tel:'13526458712',status:'0',switch:true,remark:'推广部王牌'},
            {name:'推广二部',typeText:'推广部',contact:'李青',tel:'13526458712',status:'0',switch:true,remark:'推广部王牌'},
            {name:'推广二部',typeText:'推广部',contact:'李青',tel:'13526458712',status:'0',switch:true,remark:'推广部王牌'},
            {name:'推广二部',typeText:'推广部',contact:'李青',tel:'13526458712',status:'0',switch:true,remark:'推广部王牌'},

            ]
        }
    },
    methods:{
        dataReload:function(){
          console.log(this.searchForm);
        },
        searchReset:function(){
            this.$refs['searchForm'].resetFields();
        },
        refresh:function(){
            this.$refs['searchForm'].resetFields();
        },
        depTypeChange:function(v){
            this.searchForm.type=v;
            this.depTypeName = this.typeList[v];
        },
        handleEdit:function(){
            this.editDialog =true;

        },
        handleDelete:function(index,row){

        },
        switchHandle:function(index,row){

        },
         openAddDialog:function(){

        },
         closeDialog:function(){

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
        }

    },
    created(){
        this.toggleTableLoad();
        let mainProxy = new DataProxy("/department", this.pageSize, this.mainTableLoad, this);
        this.mainProxy = mainProxy;
        this.mainProxy.load();
        this.$on('search-tool-change', this.onSearchChange);

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
