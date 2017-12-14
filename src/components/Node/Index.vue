
<template>
    <div >
        <el-row>
            <el-col>
                <el-table :data="tableData" v-loading.body="dataLoad" border style="width: 100%">
                    <el-table-column align="center" type="index"   label="序号" width="100"></el-table-column>
                    <el-table-column align="center" prop="type"    label="节点分类"></el-table-column>
                    <el-table-column align="center" prop="name"  label="节点名称"></el-table-column>
                    <el-table-column align="center" prop="remark"  label="节点说明"></el-table-column>
                    <el-table-column align="center"  label="当前状态" width="100" >
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.switch" on-color="#13ce66" off-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" >
                        <template slot-scope="scope">
                            <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row >
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

            <!--添加公告 -->


            <!--<addDialog :add-open="addDialog" @add-window-close="handleAddWindow"/>-->

            <!--&lt;!&ndash; / 添加公告 &ndash;&gt;-->
            <!--&lt;!&ndash;修改公告 &ndash;&gt;-->


        <editDialog :edit-open="editDialog" @add-window-close="handleAddWindow"/>

            <!-- / 修改公告 -->

    </div>




</template>

<script>
//import addDialog from './addDialog';
import editDialog from './editDialog';
import PageMix from '../../mix/Page';
import DataProxy from '../../packages/DataProxy';
export default {
    name: 'Node',
    pageTitle:"权限管理",
    mixins: [PageMix],
    components: {
        //addDialog,
       editDialog
    },
    data () {
        return {
            depTypeName:"选择单位类型",
            typeList:["销售部", "客服部", "风控部", "人事部", "推广部", "投顾部"],

            addDialog:false,
            editDialog:false,

            total:100,
            dataLoad:false,
            currentPage4:1,
            tableData:[
            {type:'集思信箱',name:'集思信箱',switch:true,remark:'收集员工想法'},
            {type:'',name:'列表',switch:true,remark:'展示员工想法'},
            {type:'',name:'发表',switch:true,remark:'发表员工想法'},
            {type:'',name:'回复',switch:true,remark:'回复员工想法'},
            {type:'公共客户信息',name:'公共客户信息',switch:true,remark:'公共获取客户信息'},
            {type:'',name:'获取跟踪信息',switch:true,remark:'获取客户跟踪信息'},
            {type:'',name:'获取客户资料',switch:true,remark:'获取客户资料信息'},
            {type:'',name:'获取账号信息',switch:true,remark:'获取软件账号信息'},


            ],

        }
    },
    methods:{

        handleEdit:function(){
            this.editDialog =true;

        },
        handleAuthoriz:function(){
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
        }

    },
    created(){
        this.toggleTableLoad();
        let mainProxy = new DataProxy("/node", this.pageSize, this.mainTableLoad, this);
        this.mainProxy = mainProxy;
        this.mainProxy.load();

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
