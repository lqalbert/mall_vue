<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" ref="searchForm" :model="searchForm">
              <el-form-item prop="qq" >
                <el-input v-model="searchForm.qq" size="small" placeholder="QQ号" ></el-input>
              </el-form-item>

              <el-form-item prop="phone" >
                <el-input v-model="searchForm.phone" size="small"  placeholder="手机号" ></el-input>
              </el-form-item>

              <el-form-item prop="weixin" >
                <el-input v-model="searchForm.weixin" size="small"  placeholder="微信号" ></el-input>
              </el-form-item>

              <el-form-item prop="name" >
                <el-input v-model="searchForm.name" size="small" placeholder="姓名" ></el-input>
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
						<el-table :data="tableData" v-loading.body="dataLoad" empty-text="请录入客户信息" 
            highlight-current-row border ref="select" style="width: 100%">
							<el-table-column label="序号" width="65" type="index" align="center"></el-table-column>
              
              <el-table-column prop="name" label="客户姓名" width="140">
              </el-table-column>

              <el-table-column prop="spread_name" label="锁定员工"  >
              </el-table-column>

              <el-table-column prop="user_name" label="跟踪员工"  >
              </el-table-column>

              <el-table-column prop="created_at" label="录入时间" align="center" >
              </el-table-column>

              <el-table-column prop="type" label="状态" >
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.type!='V' && scope.row.type!='F'" type="gray">已冲突</el-tag>
                  <el-tag v-if="scope.row.type=='V'" type="warning">已成交</el-tag>
                  <el-tag v-if="scope.row.type=='F'" type="danger">黑名单</el-tag>
                </template>
              </el-table-column>
              
              <el-table-column  label="操作" align="center" :context="_self">
                <template slot-scope="scope">
                  <el-button type="primary" size="small">不可以索取</el-button>
                </template>
              </el-table-column>
						</el-table>
					</el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <div>
              
            </div>
          </el-col>
					<el-col :span="9" :offset="9">
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
    name: 'PreCheck',
    pageTitle:"客户预查",
    mixins: [PageMix, SearchTool],
    components:{
      //advancedQuery
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        searchForm:{
          qq:'',
          phone:'',
          weixin:'',
          name:'',
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
          {name:'12.29张杰',spread_name:'销售十部- 杨莉莉',user_name:'销售十部- 杨莉莉',created_at:'2015-12-29 16:27:00',type:'C',},
          {name:'12.29张杰',spread_name:'销售十部- 杨莉莉',user_name:'销售十部- 杨莉莉',created_at:'2015-12-29 16:27:00',type:'C',},
          {name:'12.29张杰',spread_name:'销售十部- 杨莉莉',user_name:'销售十部- 杨莉莉',created_at:'2015-12-29 16:27:00',type:'V',},
          {name:'12.29张杰',spread_name:'销售十部- 杨莉莉',user_name:'销售十部- 杨莉莉',created_at:'2015-12-29 16:27:00',type:'V',},
          {name:'12.29张杰',spread_name:'销售十部- 杨莉莉',user_name:'销售十部- 杨莉莉',created_at:'2015-12-29 16:27:00',type:'F',},
          {name:'12.29张杰',spread_name:'销售十部- 杨莉莉',user_name:'销售十部- 杨莉莉',created_at:'2015-12-29 16:27:00',type:'V',},
          {name:'12.29张杰',spread_name:'销售十部- 杨莉莉',user_name:'销售十部- 杨莉莉',created_at:'2015-12-29 16:27:00',type:'V',},
          {name:'12.29张杰',spread_name:'销售十部- 杨莉莉',user_name:'销售十部- 杨莉莉',created_at:'2015-12-29 16:27:00',type:'F',},
          {name:'12.29张杰',spread_name:'销售十部- 杨莉莉',user_name:'销售十部- 杨莉莉',created_at:'2015-12-29 16:27:00',type:'F',},
          {name:'12.29张杰',spread_name:'销售十部- 杨莉莉',user_name:'销售十部- 杨莉莉',created_at:'2015-12-29 16:27:00',type:'V',},
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
    created(){
        this.toggleTableLoad();
        let mainProxy = new DataProxy("/precheck", this.pageSize, this.mainTableLoad, this);
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
