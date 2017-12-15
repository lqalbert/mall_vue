<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
                <el-form-item prop="title">
                  <el-input v-model="searchForm.title" placeholder="请输入标题关键字" size="small"></el-input>
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

              <el-table-column label="类型" prop="type_text" align="center" width="150"></el-table-column>

              <el-table-column label="标题" prop="title"></el-table-column>

              <el-table-column label="内容(点击查看详细)" prop="content" >
                <template slot-scope="scope">
                  {{ scope.row.content | delHtmlTag | handleString }}
                </template>
              </el-table-column>

              <el-table-column label="发布人" prop="creator"></el-table-column>

              <el-table-column :context="_self"  fixed="right"  label="操作" align="center" width="155" >
                <template slot-scope="scope">
                  <span>
                    <el-button type="info" size="small">编辑</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                  </span>
                </template>
              </el-table-column>
						</el-table>
					</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <el-button type="info" size="small">添加</el-button>
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
import SearchTool from '../../mix/SearchTool';

export default {
    name: 'BuyOrders',
    pageTitle:"购买订单",
    mixins: [PageMix,SearchTool],
    components:{
      //advancedQuery
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        searchForm:{
          title:''
        },
          total:100,
          dataLoad:false,
        currentPage4:1,
        tableData:[
          {type_text:'股票推荐',title:'oioiooo',content:'我们不是纯生意人，我们追求利润，但不追求利润最大化',creator:'系统管理员'},
          {type_text:'股票推荐',title:'oioiooo',content:'我们不是纯生意人，我们追求利润，但不追求利润最大化',creator:'系统管理员'},
          {type_text:'股票推荐',title:'oioiooo',content:'我们不是纯生意人，我们追求利润，但不追求利润最大化',creator:'系统管理员'},

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
      onSearchChange(param) {
              this.toggleTableLoad();
              this.mainProxy.setExtraParam(param).load();
      },
      
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
