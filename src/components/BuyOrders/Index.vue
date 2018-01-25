<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
                <el-form-item prop="users">
                  <el-input v-model="searchForm.users" placeholder="客户名称" size="small"></el-input>
                </el-form-item>

                <el-form-item prop="employee">
                  <el-input v-model="searchForm.employee" placeholder="销售员工" size="small"></el-input>
                </el-form-item>

                <el-form-item prop="goods_name">
                  <el-input v-model="searchForm.goods_name" placeholder="产品名称" size="small"></el-input>
                </el-form-item>

                <el-form-item prop="pay_name">
                  <el-date-picker size="small" v-model="searchForm.pay_name"
                                  placeholder="购买时间"
                                  @change="buyTimeDateChange"
                                  :editable="false">
                  </el-date-picker>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" size="small" @click="searchToolChange('searchForm')">查询</el-button>
                  <el-button type="primary" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                  <el-button type="primary" size="small" @click="refresh">刷新</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
					<el-col>
                        <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload">
                            <el-table-column type="selection" align="center" width="50"></el-table-column>
                            <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>
                            <el-table-column prop="id" label="订单号" width="200" align="center">
                            </el-table-column>
                            <el-table-column prop="order_all_money" label="总金额" align="center" width="80">
                            </el-table-column>
                            <el-table-column prop="order_pay_money" label="应付金额" align="center" width="80">
                            </el-table-column>
                            <el-table-column prop="cus_name" label="购买顾客" align="center">
                            </el-table-column>
                            <el-table-column prop="user_name" label="成交员工" align="center">
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
                                    <span v-if="scope.row.check_status==0">未通过</span>
                                    <span v-else-if="scope.row.check_status==1" >通过</span>
                                    <span v-else-if="scope.row.check_status==2">未审核</span>
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


        <showRowDialog name="showRow"/>
        <checkDialog name="check" :ajax-proxy="ajaxProxy"/>
    </div>

</template>

<script>
import showRowDialog from "./showRow";
import checkDialog from "./check";

import PageMix from '../../mix/Page';
import DataProxy from '../../packages/DataProxy';
import SearchTool from '../../mix/SearchTool';
import BuyOrderAjaxProxy from '../../ajaxProxy/BuyOrder';
import OrderBasic from '../../ajaxProxy/OrderBasic';
import TableProxy from '../common/TableProxy';
import DataTable from '../../mix/DataTable';
import config from '../../mix/Delete';
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
          dataLoad:false,
          currentPage4:1,
          tableData:'',
      }
    },
    methods:{
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
          let selectProxy = new SelectProxy(ajaxProxy.getUrl(), this.initOrderlist, this);
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
