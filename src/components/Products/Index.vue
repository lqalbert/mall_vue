<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
                <el-form-item prop="name">
                  <el-input placeholder="请输入产品名称关键字" size="small" v-model="searchForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询
                    </el-button>
                    <el-button type="primary" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                  <el-button type="danger" size="small" @click="refresh">刷新</el-button>
                </el-form-item>
            </el-form>
        </el-row>  
        <el-row>
		<el-col>

						<el-table :data="tableData" v-loading="dataLoad" empty-text="请录入客户信息" 
                          highlight-current-row border ref="select" style="width: 100%">

                            <el-table-column label="序号" width="65" type="index" align="center"></el-table-column>

                            <el-table-column prop="name" label="产品名称" header-align="center"></el-table-column>

                            <el-table-column prop="price" label="产品价格" header-align="center">
                            </el-table-column>

                            <el-table-column prop="service_cycle" label="服务周期" header-align="center">
                            </el-table-column>

                            <el-table-column prop="upgrade" label="升级时限" header-align="center">
                            </el-table-column>

                            <el-table-column prop="mark" label="产品说明" header-align="center">
                            </el-table-column>

                            <el-table-column prop="status" label="状态" align="center">
                            <template slot-scope="scope">
                            <span v-if="scope.row.status==1">正常</span>
                            <span v-else-if="scope.row.status==-1">停售</span>
                            </template>
                            </el-table-column>

              <el-table-column prop="operator" label="发布人员" header-align="center"></el-table-column> 

              <el-table-column prop="time" label="发布时间" align="center"></el-table-column>

              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="info" size="small">编辑</el-button>
                  <el-button type="danger" size="small" >停售</el-button>
                </template>
              </el-table-column>
						</el-table>
					</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <el-button type="info" size="small" icon="plus">添加产品</el-button>
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
    name: 'Products',
    pageTitle:"产品管理",
    mixins: [PageMix, SearchTool],
    components:{
      //advancedQuery
    },
    data () {
      return {
          total:100,
          dataLoad:false,
        msg: 'Welcome to Your Vue.js App',
        searchForm:{
          name:''
        },
        currentPage4:1,
        tableData:[
          {name:'点金金手指皇帝版',price:'88888 元',service_cycle:'64 个月',upgrade:'132月',mark:'嗯 很好！',status:'-1',operator:'周华健',time:'2017-09-20 15:18:00',},
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
        },
    }, created(){
        this.toggleTableLoad();
        let mainProxy = new DataProxy("/products", this.pageSize, this.mainTableLoad, this);
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
