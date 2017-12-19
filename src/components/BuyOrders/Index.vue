<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
                <el-form-item prop="cus_name">
                  <el-input v-model="searchForm.cus_name" placeholder="客户名称" size="small"></el-input>
                </el-form-item>

                <el-form-item prop="sale_name">
                  <el-input v-model="searchForm.sale_name" placeholder="销售员工" size="small"></el-input>
                </el-form-item>

                <el-form-item prop="pdt_name">
                  <el-input v-model="searchForm.pdt_name" placeholder="产品名称" size="small"></el-input>
                </el-form-item>

                <el-form-item prop="buy_time">
                  <el-date-picker size="small" v-model="searchForm.buy_time"
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
						<el-table :data="tableData"  v-loading.body="dataLoad" empty-text="请录入客户信息" 
            highlight-current-row border ref="select" style="width: 100%">
							<el-table-column label="序号" width="65" type="index" align="center"></el-table-column>
              <el-table-column label="产品类型" prop="pdt_type" align="center" width="150"></el-table-column>
              <el-table-column label="产品名称" prop="pdt_name" align="center" width="150"></el-table-column>
              <el-table-column label="客户姓名" prop="cus_name"></el-table-column>
              <el-table-column label="销售员工" prop="sale_name"></el-table-column>
              <el-table-column label="数量" prop="pdt_num"></el-table-column>
              <el-table-column label="购买时间" prop="buy_time"></el-table-column>
              <el-table-column label="操作" align="center" width="155" >
                <template slot-scope="scope">
                    <el-button type="info" size="small" @click="showRow(scope.row)">查看</el-button>
                    <el-button type="warning" size="small" @click="handleCheck(scope.row)">审核</el-button>
                </template>
              </el-table-column>
						</el-table>
					</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <!-- <div>
              <el-button type="info" size="small">审核</el-button>
            </div> -->
          </el-col>
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
        </el-row>
        
        <showRowDialog name="showRow"/>
        <checkDialog name="check"/>
    </div>
    
</template>
      
<script>
import showRowDialog from "./showRow";
import checkDialog from "./check";

import PageMix from '../../mix/Page';
import DataProxy from '../../packages/DataProxy';
import SearchTool from '../../mix/SearchTool';

export default {
    name: 'BuyOrders',
    pageTitle:"订单审核",
    mixins: [PageMix,SearchTool],
    components:{
      showRowDialog,
      checkDialog
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        searchForm:{
          cus_name:'',
          sale_name:'',
          pdt_name:'',
          buy_time:'',
        },
          total:100,
          dataLoad:false,
        currentPage4:1,
        tableData:[
          {
            pdt_type:'保健品',
            pdt_name:'强力雄兽丸',
            cus_name:'萎缩哥',
            sale_name:'威哥',
            pdt_num:'10',
            buy_time:'2017-12-18',
          },
          {
            pdt_type:'保健品',
            pdt_name:'强力雄兽丸',
            cus_name:'萎缩哥',
            sale_name:'威哥',
            pdt_num:'10',
            buy_time:'2017-12-18',
          },
          {
            pdt_type:'保健品',
            pdt_name:'强力雄兽丸',
            cus_name:'萎缩哥',
            sale_name:'威哥',
            pdt_num:'10',
            buy_time:'2017-12-18',
          },
          {
            pdt_type:'保健品',
            pdt_name:'强力雄兽丸',
            cus_name:'萎缩哥',
            sale_name:'威哥',
            pdt_num:'10',
            buy_time:'2017-12-18',
          },
          {
            pdt_type:'保健品',
            pdt_name:'强力雄兽丸',
            cus_name:'萎缩哥',
            sale_name:'威哥',
            pdt_num:'10',
            buy_time:'2017-12-18',
          },
          {
            pdt_type:'保健品',
            pdt_name:'强力雄兽丸',
            cus_name:'萎缩哥',
            sale_name:'威哥',
            pdt_num:'10',
            buy_time:'2017-12-18',
          },


        ],
      }
    },
    methods:{
      showRow(row){
        this.$modal.show('showRow',{row:row});
      },
      handleCheck(row){
        this.$modal.show('check',{row:row});
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
      onSearchChange(param) {
              this.toggleTableLoad();
              this.mainProxy.setExtraParam(param).load();
      },
      buyTimeDateChange(v){
        this.searchForm.buy_time = v;
      }
      
    },

    // created(){
    //     this.toggleTableLoad();
    //     let mainProxy = new DataProxy("/counselarticle", this.pageSize, this.mainTableLoad, this);
    //     this.mainProxy = mainProxy;
    //     this.mainProxy.load();
    //
    //
    // },
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
