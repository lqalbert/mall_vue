<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
                <el-form-item prop="field" v-show="false">
                  <input type="hidden" v-model="searchForm.field">
                </el-form-item>

                <el-form-item prop="name" >
                  <el-input v-model="searchForm.name" size="small" placeholder="客户姓名"></el-input>
                </el-form-item>

                <el-form-item prop="group_id" >
                  <el-select v-model="searchForm.group_id" size="small" clearable  placeholder="请选择小组" @change="groupChange">
                      <el-option v-for="v in groups" :label="v.name" :value="v.id" :key="v.id"></el-option>

                  </el-select>
                </el-form-item>

                <el-form-item prop="user_id" >
                  <el-select v-model="searchForm.user_id" size="small" clearable  placeholder="请选择队员">
                      <el-option v-for="v in users" :label="v.name" :value="v.id" :key="v.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询
                    </el-button>
                    <el-button type="primary" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                  <el-button type="primary" size="small">高级查询</el-button>
                  <el-button type="danger" size="small" @click="refresh">刷新</el-button>
                </el-form-item>
            </el-form>
        </el-row>  
        <el-row>
            <el-col>

                <el-table :data="tableData"  v-loading="dataLoad" empty-text="请录入客户信息"
                highlight-current-row border ref="select" style="width: 100%">


                    <el-table-column label="序号" width="65" type="index" align="center"></el-table-column>

                    <el-table-column prop="name" header-align="center" label="客户姓名" width="140" ></el-table-column>

                    <el-table-column prop="type" header-align="center" sortable="custom" label="客户类型" width="180" >
                    </el-table-column>

                    <el-table-column prop="lock_name" label="锁定员工"></el-table-column>

                    <el-table-column prop="realname" label="跟踪员工">
                    </el-table-column>

                    <el-table-column prop="qq" label="QQ号" header-align="center"></el-table-column>

                    <el-table-column prop="qq_nickname" header-align="center" label="QQ昵称"></el-table-column>

                    <el-table-column prop="phone" label="手机" align="center"></el-table-column>

                    <el-table-column prop="share_benefit" label="分成比例" align="center" width="150"></el-table-column>

                    <el-table-column prop="sex" header-align="center" label="性别" width="80">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <el-button type="info" size="small" icon="plus">添加客户</el-button>
              <el-button type="info" size="small" icon="plus">修改客户</el-button>
            </div>
          </el-col>
					<el-col :span="12">
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
        </el-row>
        <div>
          <!-- 添加 -->
          <!-- 编辑 -->
          <!-- 删除 -->
          
        </div>
    </div>
    
</template>
      
<script>
//import advancedQuery from "./advancedQuery";
import PageMix from '../../mix/Page';
import DataProxy from '../../packages/DataProxy';
import GroupSelectProxy from '../../packages/GroupSelectProxy';
import EmployeeSelectProxy from '../../packages/EmployeeSelectProxy';
import SearchTool from '../../mix/SearchTool';

export default {
    name: 'SpreadDepartmentCustomer',
    pageTitle:"推广部客户",
    mixins: [PageMix, SearchTool],
    components:{
      //advancedQuery
    },
    data () {
      return {
          total:100,
          dataLoad:false,
          users:[],
          groups:[],
        msg: 'Welcome to Your Vue.js App',
        searchForm:{
          field:'',
          name:'',
          group:'',
          user_id:'',
        },
        currentPage4:1,
        tableData:[
          {name:'ykykyk',type:'C.一般客户',lock_name:'张三',realname:'李四',qq:'1111111',qq_nickname:'1111111',phone:'13666666666',share_benefit:'3/7',sex:'女',},
        ],
      }
    },
    methods:{
      refresh(){
        window.location.reload();
      }, mainTableLoad(data){
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
        groupChange(){

        },
        loadEmployee(data){
            this.users = data.items;
        },
        loadGroup(data){
            this.groups = data.items;
        },  onSearchChange(param) {
            this.toggleTableLoad();
            this.mainProxy.setExtraParam(param).load();
        },

    },
    created(){
        this.toggleTableLoad();
        let mainProxy = new DataProxy("/spreaddepartmentcustomer", this.pageSize, this.mainTableLoad, this);
        this.mainProxy = mainProxy;
        this.mainProxy.load();



        let groupProxy = new GroupSelectProxy({'depart_id':1}, this.loadGroup, this);
        this.groupProxy = groupProxy;
        this.groupProxy.load();



        let employeeProxy = new EmployeeSelectProxy({'depart_id':1,'group_id':1}, this.loadEmployee, this);
        this.employeeProxy = employeeProxy;
        this.employeeProxy.load();
        this.$on('search-tool-change', this.onSearchChange);

    },
    filters: {
      handleString: function (v) {
        if(v.length > 16){
          return v.substring(0,6)+'......';   
        }else{
          return v;
        }
      },
      delHtmlTag:function(v){
        return v.replace(/<[^>]+>/g,"");
      }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-form-item {
      margin-bottom: 2px;
  }
</style>
