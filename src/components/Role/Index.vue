
<template>
    <div >
        <el-row>
            <el-col>
                <el-table :data="tableData" v-loading.body="dataLoad" border style="width: 100%">
                    <el-table-column align="center" type="index" label="序号" width="100"></el-table-column>
                    <el-table-column align="center" prop="name" label="角色名称"></el-table-column>
                    <el-table-column align="center" prop="remark" label="角色说明"></el-table-column>
                    <el-table-column align="center"  label="当前状态" width="100" >
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.switch" on-color="#13ce66" off-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作" >
                        <template slot-scope="scope">
                            <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="primary" @click="handleAuthoriz(scope.$index, scope.row)">授权</el-button>
                            <el-button size="small" type="danger" >删除</el-button>
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
    name: 'Role',
    pageTitle:"角色管理",
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
            {remark:'报表查看员',name:'报表查看员',switch:true},
            {remark:'投顾组长',name:'投顾组长',switch:true},
            {remark:'材料组长',name:'材料组长',switch:true},
            {remark:'回访组长',name:'回访组长',switch:true},

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
        let mainProxy = new DataProxy("/role", this.pageSize, this.mainTableLoad, this);
        this.mainProxy = mainProxy;
        this.mainProxy.load();

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
