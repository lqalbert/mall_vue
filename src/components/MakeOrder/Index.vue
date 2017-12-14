<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" ref="searchForm" :model="searchForm">
              <el-form-item prop="name" style="width:170px">
                <el-input v-model="searchForm.name" size="small" placeholder="客户姓名"></el-input>
              </el-form-item>
              <el-form-item prop="contact" style="width:170px">
                <el-input v-model="searchForm.contact" size="small" placeholder="手机|qq|微信号"></el-input>
              </el-form-item>
            <!-- 开单状态， -->
              <el-form-item prop="status" style="width:170px">
                <el-select v-model="searchForm.status" size="small"  >
                    <el-option label="未开单" value="0"></el-option>
                    <el-option label="已开单" value="1"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item prop="semaster_id" style="width: 170px">
                <el-select v-model="searchForm.semaster_id" size="small" placeholder="客服主管">
                  <el-option label="张三1" value="1"></el-option>
                  <el-option label="张三2" value="2"></el-option>
                  <el-option label="张三3" value="3"></el-option>
                </el-select>
              </el-form-item>

            <!-- 开单账号 -->
              <el-form-item prop="account" style="width:170px">
                <el-input v-model="searchForm.account" size="small" placeholder="开单账号"></el-input>
              </el-form-item>
            <!-- 购买类型 -->
              <el-form-item prop="type" style="width:170px">
                  <el-select v-model="searchForm.type" placeholder="购买类型" size="small">
                      <el-option label="购买" value="0"></el-option>
                      <el-option label="升级" value="2"></el-option>
                      <el-option label="续费" value="1"></el-option>
                  </el-select>
              </el-form-item>

              <!-- 销售员工 -->
              <el-form-item style="width:170px" prop="department_id">
                <el-select clearable size="small" placeholder="销售部门"v-model="searchForm.department_id">

                  <el-option v-for=" v in departments" :value="v.id" :label="v.name" 
                  :key="v.id"></el-option>

                </el-select>
              </el-form-item>
              <el-form-item style="width:170px" prop="group_id">
                <el-select clearable size="small" placeholder="销售团队" v-model="searchForm.group_id">

                  <el-option v-for=" v in groups" :value="v.id" :label='v.name' 
                  :key="v.id"></el-option>

                </el-select>
              </el-form-item>
              <el-form-item style="width:170px" prop="user_id">
                <el-select clearable size="small" placeholder="销售员工" v-model="searchForm.user_id" >

                  <el-option v-for="v in users" :value="v.id" :label='v.name' 
                  :key="v.id"></el-option>
                </el-select>
              </el-form-item>
              <!-- / 销售员工 -->

              <el-form-item style="width:170px" prop="range">
                <el-date-picker size="small" v-model="searchForm.range" type="daterange" placeholder="选择成交时间范围">
                </el-date-picker>
              </el-form-item>
              <el-form-item style="margin-left:50px">
                <el-button type="primary" size="small" @click="searchToolChange('searchForm')" >查询</el-button>
                <el-button type="primary" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                <el-button type="danger" size="small" @click="refresh">刷新</el-button>
              </el-form-item>
            </el-form>
        </el-row>  
        <el-row>
					<el-col>
						<el-table :data="tableData" v-loading.body="dataLoad" empty-text="请录入客户信息" 
            highlight-current-row border ref="select" style="width: 100%">
							<el-table-column label="序号" width="65" type="index" align="center"></el-table-column>
              
              <el-table-column label="客户姓名" prop="cus_name" width="100">
              </el-table-column>

              <el-table-column label="类型" prop="type">
              </el-table-column>

              <el-table-column label="操作员工" prop="realname" header-align="center" width="180">
              </el-table-column>
              
              <el-table-column prop="semaster" label="客服主管" header-align="left" width="100"></el-table-column>

              <el-table-column prop="semaster_time" label="分配给主管时间" header-align="center" width="140"></el-table-column>
              
              <el-table-column prop="order_time" label="开单时间" header-align="left" width="130"></el-table-column>

              <el-table-column prop="buy_time" label="客户成交时间" header-align="left" width="130"></el-table-column>

              <el-table-column prop="mphone" label="销售人员手机" header-align="left" width="160"></el-table-column>

              <el-table-column label="购买版本" header-align="center" prop="product_name" width="200" >
              </el-table-column>
             
              <el-table-column label="付款方式" header-align="center" prop="pay_info" width="200" >
              </el-table-column>

              <el-table-column label="操作" width="280" header-align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button size="small" type="info">查看客户</el-button>
                    <el-button size="small" type="primary">开单</el-button>
                    <el-button size="small" type="info" >订单详情</el-button>
                </template>
              </el-table-column>
						</el-table>
					</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <el-button type="info" size="small">聊天记录</el-button>
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
import EmployeeSelectProxy from '../../packages/EmployeeSelectProxy';
import DepartSelectProxy from '../../packages/DepartSelectProxy';
import GroupSelectProxy from '../../packages/GroupSelectProxy';
import SearchTool from '../../mix/SearchTool';

export default {
    name: 'MakeOrder',
    pageTitle:"待开单客户",
    mixins: [PageMix, SearchTool],
    components:{
      //advancedQuery
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
          users:[],
          groups:[],
          departments:[],
          total:100,
          dataLoad:false,
        searchForm:{
          name:'',
          contact:'',
          status:'',
          semaster_id:'',
          account:'',
          type:'',
          department_id:'',
          group_id:'',
          user_id:'',
          range:'',
        },
        customerType:{
    	    "A":"A.准客户",
          "B":"B.意向客户",
          "C":"C.一般客户",
          "D":"D.未有意向客户",
          "E":"本地化客户",
          "F":"F.黑名单（同行）",
          "N":"N.无效客户",
          "V":"V.成交客户",
          "VX":"VX.审核未通过",
          "VT":"VT.有意见并投诉"
        },
        currentPage4:1,
        tableData:[
          {cus_name:'陈启汕',type:'购买',realname:'沈阳部 程文敬',semaster:'丁倩',semaster_time:'2017-11-01 17:33:35',order_time:'2017-11-01 17:33:35',buy_time:'2017-11-01 17:33:35',mphone:'13888888888',product_name:'点金手高端版(季度)',pay_info:'2017-01-01 建行 368000',},
          {cus_name:'陈启汕',type:'购买',realname:'沈阳部 程文敬',semaster:'丁倩',semaster_time:'2017-11-01 17:33:35',order_time:'2017-11-01 17:33:35',buy_time:'2017-11-01 17:33:35',mphone:'13888888888',product_name:'点金手高端版(季度)',pay_info:'2017-01-01 建行 368000',},
          {cus_name:'陈启汕',type:'购买',realname:'沈阳部 程文敬',semaster:'丁倩',semaster_time:'2017-11-01 17:33:35',order_time:'2017-11-01 17:33:35',buy_time:'2017-11-01 17:33:35',mphone:'13888888888',product_name:'点金手高端版(季度)',pay_info:'2017-01-01 建行 368000',},
          {cus_name:'陈启汕',type:'购买',realname:'沈阳部 程文敬',semaster:'丁倩',semaster_time:'2017-11-01 17:33:35',order_time:'2017-11-01 17:33:35',buy_time:'2017-11-01 17:33:35',mphone:'13888888888',product_name:'点金手高端版(季度)',pay_info:'2017-01-01 建行 368000',},
          {cus_name:'陈启汕',type:'购买',realname:'沈阳部 程文敬',semaster:'丁倩',semaster_time:'2017-11-01 17:33:35',order_time:'2017-11-01 17:33:35',buy_time:'2017-11-01 17:33:35',mphone:'13888888888',product_name:'点金手高端版(季度)',pay_info:'2017-01-01 建行 368000',},
          {cus_name:'陈启汕',type:'购买',realname:'沈阳部 程文敬',semaster:'丁倩',semaster_time:'2017-11-01 17:33:35',order_time:'2017-11-01 17:33:35',buy_time:'2017-11-01 17:33:35',mphone:'13888888888',product_name:'点金手高端版(季度)',pay_info:'2017-01-01 建行 368000',},
          {cus_name:'陈启汕',type:'购买',realname:'沈阳部 程文敬',semaster:'丁倩',semaster_time:'2017-11-01 17:33:35',order_time:'2017-11-01 17:33:35',buy_time:'2017-11-01 17:33:35',mphone:'13888888888',product_name:'点金手高端版(季度)',pay_info:'2017-01-01 建行 368000',},
          {cus_name:'陈启汕',type:'购买',realname:'沈阳部 程文敬',semaster:'丁倩',semaster_time:'2017-11-01 17:33:35',order_time:'2017-11-01 17:33:35',buy_time:'2017-11-01 17:33:35',mphone:'13888888888',product_name:'点金手高端版(季度)',pay_info:'2017-01-01 建行 368000',},
          {cus_name:'陈启汕',type:'购买',realname:'沈阳部 程文敬',semaster:'丁倩',semaster_time:'2017-11-01 17:33:35',order_time:'2017-11-01 17:33:35',buy_time:'2017-11-01 17:33:35',mphone:'13888888888',product_name:'点金手高端版(季度)',pay_info:'2017-01-01 建行 368000',},
          {cus_name:'陈启汕',type:'购买',realname:'沈阳部 程文敬',semaster:'丁倩',semaster_time:'2017-11-01 17:33:35',order_time:'2017-11-01 17:33:35',buy_time:'2017-11-01 17:33:35',mphone:'13888888888',product_name:'点金手高端版(季度)',pay_info:'2017-01-01 建行 368000',},
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
      },
      loadEmployee(data){
          this.users = data.items;
      },
      loadDepartment(data){
          this.departments = data.items;
      },
      loadGroup(data){
          this.groups = data.items;
      },
      onSearchChange(param) {
          this.toggleTableLoad();
          this.mainProxy.setExtraParam(param).load();
      },
    },
    created(){
        this.toggleTableLoad();
        let mainProxy = new DataProxy("/makeorder", this.pageSize, this.mainTableLoad, this);
        this.mainProxy = mainProxy;
        this.mainProxy.load();



        let departProxy = new DepartSelectProxy({'type': 'sale'}, this.loadDepartment, this);
        this.departProxy = departProxy;
        this.departProxy.load();

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
