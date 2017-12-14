<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
                <el-form-item prop="realname" style="width: 120px">
                    <el-input v-model="searchForm.realname" size="small" placeholder="请输入员工姓名"></el-input>
                </el-form-item>
                <el-form-item prop="mphone" style="width: 120px">
                    <el-input v-model="searchForm.mphone" size="small" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="qq" style="width: 120px">
                    <el-input v-model="searchForm.qq" size="small" placeholder="请输入QQ号"></el-input>
                </el-form-item>
                <el-form-item prop="weixin" style="width: 120px">
                    <el-input v-model="searchForm.weixin" size="small" placeholder="请输入微信号"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="small" @click="searchToolChange('searchForm')">查询</el-button>
                  <el-button type="primary" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                  <el-button type="danger" size="small" @click="refresh">刷新</el-button>
                </el-form-item>
            </el-form>
        </el-row>  
        <el-row>
					<el-col >
						<el-table :data="tableData"  v-loading.body="dataLoad" empty-text="请录入客户信息" 
            highlight-current-row border ref="select" style="width: 100%">
							<el-table-column label="序号" width="65" type="index" align="center"></el-table-column>

              <el-table-column prop="realname" label="员工姓名"></el-table-column>

              <el-table-column prop="department_name" label="部门"></el-table-column>

              <el-table-column prop="mphone" label="手机" align="center"></el-table-column>

              <el-table-column prop="qq" label="QQ号" align="center"></el-table-column>

              <el-table-column prop="qq_nickname" label="QQ昵称" align="center"></el-table-column>

              <el-table-column prop="weixin" label="微信号" align="center"></el-table-column>
              
              <el-table-column prop="weixin_nikname" label="微信昵称" align="center"></el-table-column>
						</el-table>
					</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div>

            </div>
          </el-col>
					<el-col :span="8" :offset="8">
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
import SearchTool from '../../mix/SearchTool';

export default {
    name: 'EmployeeSelect',
    pageTitle:"员工查询",
    mixins: [PageMix, SearchTool],
    components:{
      //advancedQuery
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        searchForm:{
          realname:'',
          mphone:'',
          qq:'',
          weixin:'',
        },
          total:100,
          dataLoad:false,
        currentPage4:1,
        tableData:[
          {realname:'张三李四',department_name:'推广M部',mphone:'13888888888',qq:'13123123',qq_nickname:'123123',weixin:'12312312',weixin_nikname:'123123',},
          {realname:'张三李四',department_name:'推广M部',mphone:'13888888888',qq:'13123123',qq_nickname:'123123',weixin:'12312312',weixin_nikname:'123123',},
          {realname:'张三李四',department_name:'推广M部',mphone:'13888888888',qq:'13123123',qq_nickname:'123123',weixin:'12312312',weixin_nikname:'123123',},
          {realname:'张三李四',department_name:'推广M部',mphone:'13888888888',qq:'13123123',qq_nickname:'123123',weixin:'12312312',weixin_nikname:'123123',},
          {realname:'张三李四',department_name:'推广M部',mphone:'13888888888',qq:'13123123',qq_nickname:'123123',weixin:'12312312',weixin_nikname:'123123',},
          {realname:'张三李四',department_name:'推广M部',mphone:'13888888888',qq:'13123123',qq_nickname:'123123',weixin:'12312312',weixin_nikname:'123123',},
          {realname:'张三李四',department_name:'推广M部',mphone:'13888888888',qq:'13123123',qq_nickname:'123123',weixin:'12312312',weixin_nikname:'123123',},
          {realname:'张三李四',department_name:'推广M部',mphone:'13888888888',qq:'13123123',qq_nickname:'123123',weixin:'12312312',weixin_nikname:'123123',},
          {realname:'张三李四',department_name:'推广M部',mphone:'13888888888',qq:'13123123',qq_nickname:'123123',weixin:'12312312',weixin_nikname:'123123',},
          {realname:'张三李四',department_name:'推广M部',mphone:'13888888888',qq:'13123123',qq_nickname:'123123',weixin:'12312312',weixin_nikname:'123123',},
        ],
      }
    },
    methods:{
      refresh(){
        window.location.reload();
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
      }, onSearchChange(param) {
          this.toggleTableLoad();
          this.mainProxy.setExtraParam(param).load();
      }
    },
    created(){
        this.toggleTableLoad();
        let mainProxy = new DataProxy("/employeeselect", this.pageSize, this.mainTableLoad, this);
        this.mainProxy = mainProxy;
        this.mainProxy.load();
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
