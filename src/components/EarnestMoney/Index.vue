<template>
    <div>
      <!-- search bar -->
        <el-row>
            <el-col :span="12">
                <el-form :inline="true"  ref="searchForm" :model="searchForm" >
                    <el-form-item prop="department_id" >
                        <el-select size="small" placeholder="请选择单位"  v-model="searchForm.department_id" @change="onDepartChange">
                            <el-option v-for="v in departments" 
                                :label="v.name" 
                                :value="v.id" 
                                :key="v.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="start">
                        <el-date-picker
                            size="small"
                            v-model="range"
                            type="daterange"
                            placeholder="选择日期范围"
                            @change="rangeChange">
                        </el-date-picker>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button size="small" type="primary" icon="search" @click="searchToolChange('searchForm')" >查询</el-button>
                        <el-button size="small" @click="searchToolReset('searchForm')" type="primary">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
      <!-- / search bar -->

      <!-- data table -->
        <el-row>
            <el-col>
                <TableProxy
                :url="mainurl"
                :param="mainparam"
                :reload="dataTableReload" :page-size="15">
                    <el-table-column label="序号" align="center"  type="index" width="65">
                    </el-table-column>
                    <el-table-column label="部门" prop="department_name" width="170"></el-table-column>
                    <el-table-column label="操作" prop="type_text" width="140"></el-table-column>
                    <el-table-column label="金额" prop="money" width="140"></el-table-column>
                    <el-table-column label="撤销状态" prop="revoke_status" width="140">
                        <template slot-scope="scope">
                            <div v-if="scope.row.revoke_status == 1">已经撤销</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="记录时间" prop="created_at" width="190"></el-table-column>
                    <!-- <el-table-column label="修改时间" prop="updated_at" width="190"></el-table-column> -->
                    <el-table-column label="操作员工" prop="creator" width="140"></el-table-column>
                    <el-table-column label="备注" prop="remark" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column align="center" width="180" fixed="right" label="操作">
                        <template slot-scope="scope">
                            <!-- <el-button type="danger" @click="revoke(scope.row)" size="small">撤销</el-button> -->
                            <!-- <el-button type="info" @click="openEdit(scope.row)" size="small">编辑</el-button> -->
                            <!-- <el-button type="danger"  @click="handleDelete(scope.row.id)"   size="small" >删除</el-button> -->
                        </template>
                    </el-table-column>
                    <!-- buttonbar -->
                    <div slot="buttonbar">
                        <el-button size="small" type="primary" v-if="isAdmin" @click="showAdd">充值</el-button>
                        <el-button size="small" type="primary" v-if="isAdmin" @click="showSet">设置</el-button>
                    </div>
                    <!-- / buttonbar -->
                </TableProxy>
            </el-col>
        </el-row>
      <!-- / data table -->

      <!-- 弹窗 -->
            <Add name='add-deposit'
             :ajax-proxy="ajaxProxy"
             @submit-success="handleReload"/>
            <Set name='deposti-set' :ajax-proxy="ajaxProxy"></Set>
      <!-- / 弹窗 -->
    </div>
  </template>
  
  <script>
  import PageMix from '@/mix/Page';
  import DataTable from '@/mix/DataTable';
  import Add from './Add';
  import Set from './Set';
  import SearchTool from '@/mix/SearchTool';
  import DepositAjaxProxy from  '@/ajaxProxy/Deposit';
  import DepartSelectProxy from '@/packages/DepartSelectProxy';
  import { mapGetters } from 'vuex';

  export default {
    name: 'EarnestMoney',
    pageTitle:"预充值管理",
    mixins:[PageMix,DataTable,SearchTool],
    components:{
        Add,
        Set
    },
    data () {
        return {
            ajaxProxy:DepositAjaxProxy,
            departments:[],
            groups:[],
            users:[],
            range:"",
            searchForm:{
                department_id:"",
                start:"",
                end:"",
            },
            mainurl:DepositAjaxProxy,
            mainparam:"",
        }
    },
    computed:{
        ...mapGetters({
            "isAdmin":"isAdmin"
        })
    },
    methods:{
        showAdd(){
            this.$modal.show('add-deposit');
        },
        showSet(){
            this.$modal.show('deposti-set');
        },
        onSearchChange(param) {
            param['append'] = ['type_text'];
            this.mainparam = JSON.stringify(param);
        },
        loadDepartment(data){
            this.departments = data.items;
        },
        onDepartChange(pid){
            this.groups=[];
            this.users=[];
            this.searchForm.group_id='';
            this.searchForm.user_id='';
            if(pid){
                this.getGroupsAjax(pid);
            }
        },
        // onGroupChange(gid){
        //     this.users=[];
        //     this.searchForm.user_id='';
        //     if(gid){
        //         this.getUsersAjax(gid);
        //     }
        // },
        rangeChange(v){
            if (v.length != 0) {
                let vdate = v.split(" - ");
                this.searchForm.start = vdate[0];
                this.searchForm.end = vdate[1];
            } else {
                this.searchForm.start = "";
                this.searchForm.end = "";
            }
        },
        resetRange(){
            this.range = "";
        },
        openEdit(row){
            this.$modal.show('edit-deposit', {model: row});
        },
        revoke(row){
            // console.log(row);
            let vmThis = this;
            if(row.revoke_status == 0){
                this.$confirm('确定撤销, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ajaxProxy.revoke(row.id,{money:row.money}).then((response) => {
                        if (response.data.status==0) {
                            vmThis.$message.error(response.data.msg);
                        } else {
                            vmThis.$message.info('撤销成功');
                            vmThis.handleReload();
                        }
                    }).catch((response)=>{
                        vmThis.$message.error('出错了');
                    })
                }).catch(()=>{

                });
            }else{
                this.$confirm('已经撤销过，不能再撤销', '提示', {
                    type: 'warning'
                })
            }
        }
    },
    created(){
        let departProxy = new DepartSelectProxy(null, this.loadDepartment, this);
        this.departProxy = departProxy;
        this.departProxy.load();
        this.$on('search-tool-change', this.onSearchChange);
        this.onSearchChange(this.searchForm);
    },
    mounted(){
        this.$refs['searchForm'].$on('reset', this.resetRange);
        // console.log(this.$refs)
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  