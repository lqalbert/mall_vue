<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
                <el-form-item prop="users">
                  <el-input v-model="searchForm.consignee" placeholder="客户名称" size="small"></el-input>
                </el-form-item>

                <el-form-item prop="employee">
                  <el-input v-model="searchForm.sale_name" placeholder="销售员工" size="small"></el-input>
                </el-form-item>

                <el-form-item prop="goods_name">
                  <el-input v-model="searchForm.goods_name" placeholder="产品名称" size="small"></el-input>
                </el-form-item>

                <el-form-item prop="start">
                  <el-date-picker size="small" v-model="searchForm.start"
                                  placeholder="购买起始时间"
                                  @change="buyTimeDateChange"
                                  :editable="false">
                  </el-date-picker>
                </el-form-item>
                <el-form-item prop="end">
                    <el-date-picker size="small" v-model="searchForm.end"
                                    placeholder="购买结束时间"
                                    @change="buyTimeDateChange"
                                    :editable="false">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询</el-button>
                  <el-button type="primary" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                  <el-button type="primary" size="small" @click="searchToolReset('searchForm')">刷新</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
					<el-col>
                        <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload">
                            <el-table-column type="selection" align="center" width="50"></el-table-column>
                            <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>
                            <!--<el-table-column prop="id" label="订单号" width="200" align="center">-->
                            <!--</el-table-column>-->
                            <el-table-column prop="order_all_money" label="总金额" align="center" width="100">
                            </el-table-column>
                            <el-table-column prop="order_pay_money" label="应付金额" align="center" width="100">
                            </el-table-column>
                            <el-table-column prop="cus_name" label="购买顾客" align="center" width="200">
                            </el-table-column>
                            <el-table-column prop="user_name" label="成交员工" align="center" width="200">
                            </el-table-column>
                            <el-table-column prop="order_status" label="订单状态" align="center">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.order_status==0">待付款</span>
                                    <span v-else-if="scope.row.order_status==1" >待确认</span>
                                    <span v-else-if="scope.row.order_status==2">已完成</span>
                                    <span v-else-if="scope.row.order_status==2">已关闭</span>
                                    <span v-else-if="scope.row.order_status==2">退货中</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="check_status" label="审核状态" align="center" width="100">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.check_status==0">未审核</span>
                                    <span v-else-if="scope.row.check_status==1" >通过</span>
                                    <span v-else-if="scope.row.check_status==2">未通过</span>
                                </template>
                            </el-table-column>
                            <el-table-column  label="操作" align="center" width="140">
                                <template slot-scope="scope">
                                    <el-button type="info" size="small" @click="showRow(scope.row)">查看</el-button>
                                    <el-button type="warning" size="small" @click="handleCheck(scope.row)">审核</el-button>
                                </template>
                            </el-table-column>

                        </TableProxy>
					</el-col>
        </el-row>


        <showRowDialog name="showRow"
                       :buyer="buyer"
                       :users="users"
                       :ajax-proxy="orderBasicAjaxProxy"
        />
        <checkDialog name="check" :ajax-proxy="orderBasicAjaxProxy"/>
    </div>

</template>

<script>
import showRowDialog from "./showRow";
import checkDialog from "./check";

import PageMix from '../../mix/Page';
import DataProxy from '../../packages/DataProxy';
import SearchTool from '../../mix/SearchTool';
import BuyOrderAjaxProxy from '../../ajaxProxy/BuyOrder';
import UsersSelectProxy from '../../packages/UsersSelectProxy';
import OrderBasic from '../../ajaxProxy/OrderBasic';
import TableProxy from '../common/TableProxy';
import DataTable from '../../mix/DataTable';
import config from '../../mix/Delete';
import BuyerAjaxProxy from '../../ajaxProxy/Buyer';
import SelectProxy from  '../../packages/SelectProxy';

export default {
    name: 'BuyOrders',
    pageTitle:"订单审核",
    mixins: [PageMix,SearchTool,DataTable,config,BuyOrderAjaxProxy],
    components:{
      showRowDialog,
      checkDialog
    },
    data () {
      return {
        ajaxProxy:OrderBasic,
        orderBasicAjaxProxy:OrderBasic,
        mainurl:OrderBasic.getUrl(),
        mainparam:"",
        msg: 'Welcome to Your Vue.js App',
        searchForm:{
            users:'',
            employee:'',
            goods_name:'',
            pay_name:'',
        },
          total:100,
          buyer:[],
          users:[],
          dataLoad:false,
          currentPage4:1,
          tableData:'',
      }
    },
    methods:{
      getAjaxProxy(){
          return  this.ajaxProxy;
      },
      showRow(row){
//        this.$modal.show('showRow',{row:row});
          this.$modal.show('showRow',{rowData:row});
      },
      handleCheck(row){
        this.$modal.show('check',{row:row});
      },
      mainTableLoad(data){
          this.toggleTableLoad();
          this.tableData = data.items;
          this.total = data.total;
          console.log(this.mainurl);return;
      },
      currentChange(v){
          this.toggleTableLoad();
          this.mainProxy.setPage(v).load();
      },
      loadbuyer(data) {
          this.buyer = data.items;
      },
      loadUsers(data) {
          this.users = data.items;
      },
      toggleTableLoad(){
          this.dataLoad = !this.dataLoad;
      },
//      onSearchChange(param) {
//              this.toggleTableLoad();
//              this.mainProxy.setExtraParam(param).load();
//      },
        onSearchChange(param){
            console.log(param);
            this.mainparam = JSON.stringify(param);
        },
      buyTimeDateChange(v){
        this.searchForm.buy_time = v;
      },
      initOrderlist(data){
          this.tableData = data.items;
          this.mainData = data.items;
          console.log(this.mainurl);
      },
      buyorderInit(business){
          let selectProxy = new SelectProxy(this.ajaxProxy.getUrl(), this.initOrderlist, this);
          selectProxy.setExtraParam({business:business}).load();
      },
      mainTableLoad(data){
          this.toggleTableLoad();
          this.tableData = data.items;
          this.total = data.total;
      },
      toggleTableLoad(){
          this.dataLoad = !this.dataLoad;
      },

    },

     created(){
         let selectProxy = new SelectProxy(BuyerAjaxProxy.getUrl(), this.loadbuyer, this);
         selectProxy.load();
         let orderProxy = new UsersSelectProxy(null, this.loadUsers, this);
         this.orderProxy = orderProxy;
         this.orderProxy.load();
         this.$on('search-tool-change', this.onSearchChange);

         this.buyorderInit('BuyOrder');

//         let formData = $(this.$el).find('.hello').serialize();
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
