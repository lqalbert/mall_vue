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

              <el-form-item prop="type" style="width:100px" >
                <el-select v-model="searchForm.type" clearable size="small" placeholder="客户类型">
                  <el-option v-for="(key,type) in customerType" :value="type" :label="key" :key="type"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item prop="recommend">
                <el-checkbox v-model="searchForm.recommend">已推荐</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" @click="searchToolChange('searchForm')">查询</el-button>
                <el-button type="primary" size="small">高级查询</el-button>
                <el-button type="primary" size="small"  @click="searchToolReset('searchForm')">重置</el-button>
                <el-button type="danger" size="small" @click="refresh">刷新</el-button>
              </el-form-item>
            </el-form>
        </el-row>  
        <el-row>
					<el-col>
						<el-table :data="tableData" v-loading.body="dataLoad" empty-text="请录入客户信息" 
            highlight-current-row border ref="select" style="width: 100%">
							<el-table-column label="序号" width="65" type="index" align="center"></el-table-column>

              <el-table-column prop="name" label="客户姓名" width="150"></el-table-column>

              <el-table-column prop="type" label="客户类型" sortable='customer' width="150" header-align="center">
              </el-table-column>

              <el-table-column prop="lock_name" label="锁定员工" width="150" >
              </el-table-column>

              <el-table-column prop="realname" label="跟踪员工" width="150">
              </el-table-column>

              <el-table-column prop="recommend" label="是否推荐" width="150" >
              </el-table-column>

              <el-table-column prop="qq" label="QQ号" width="170" header-align="center">
              </el-table-column>

              <el-table-column prop="qq_nickname" label="QQ昵称" width="170" header-align="center"></el-table-column>

              <el-table-column prop="phone" label="手机" align="center" width="130"></el-table-column>

              <el-table-column prop="weixin" label="微信号" header-align="center" width="170">
              </el-table-column>

              <el-table-column prop="weixin_nickname" label="微信昵称" header-align="center" width="170">
              </el-table-column>

              <el-table-column prop="province_name" header-align="center" label="地区" width="135">
              </el-table-column>

              <el-table-column prop="sex" label="性别" width="80" header-align="center">
              </el-table-column>
						</el-table>
					</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <el-button type="info" size="small">添加客户</el-button>
              <el-button type="info" size="small">修改客户</el-button>
              <el-button type="info" size="small">推荐</el-button>
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
        <div id="app2" class="b" style="margin-top:5px;">
          <el-row >
          <el-col :span="24">
              <el-tabs  type="border-card">
                <el-tab-pane label="跟踪记录">
                  <el-table :data="tableData1"  empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                    <el-table-column prop="user" label="操作员工" header-align="center">
                    </el-table-column>

                    <el-table-column prop="type" label="客户类型(当前)" header-align="center">
                    </el-table-column>

                    <el-table-column prop="name" label="客户姓名" header-align="center">
                    </el-table-column>
                    
                    <el-table-column label="内容" header-align="center">
                      <template slot-scope="scope">
                        {{scope.row.content | handleString}}
                      </template>
                    </el-table-column>

                    <el-table-column prop="created_at" label="跟踪时间" width="180" align="center">
                    </el-table-column>

                    <el-table-column prop="track_text" label="跟踪类型" header-align="center">
                    </el-table-column>

                  </el-table>
                </el-tab-pane>

                <!-- <el-tab-pane label="软件账号">软件账号</el-tab-pane>
                <el-tab-pane label="通话记录">通话记录</el-tab-pane> -->
                <el-tab-pane label="投诉记录">
                  <el-table :data="tableData2"  empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                    <el-table-column prop="user" label="操作员工" header-align="center">
                    </el-table-column>
                    
                    <el-table-column label="投诉内容" header-align="center">
                      <template slot-scope="scope">
                        {{scope.row.content | handleString}}
                      </template>
                    </el-table-column>

                    <el-table-column prop="created_at" label="投诉时间" width="180" align="center">
                    </el-table-column>

                    <el-table-column prop="type_text" label="投诉类型" align="center">
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
          </el-col>
          </el-row>
        </div>
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
    name: 'DistributeCustomerB',
    pageTitle:"推广客户",
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
          name:'',
          contact:'',
          type:'',
          recommend:'',
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

          {name:'efggerg',type:'C.一般客户',lock_name:'系统管理员',realname:'qq800800',recommend:'是',qq:'1231231231',qq_nickname:'aaaaaaa',phone:'15987452136',weixin:'15987452136',weixin_nickname:'15987452136',province_name:'河北-石家庄',sex:'女',},
          {name:'efggerg',type:'C.一般客户',lock_name:'系统管理员',realname:'qq800800',recommend:'是',qq:'1231231231',qq_nickname:'aaaaaaa',phone:'15987452136',weixin:'15987452136',weixin_nickname:'15987452136',province_name:'河北-石家庄',sex:'女',},
        ],
        tableData1:[

          {user:'推广H部-王姣姣',type:'C.一般客户',name:'44N4D',content:'手机号冲突:15642104241',created_at:'2017-11-27 14:50:36',track_text:'预查冲突'}
        ],
        tableData2:[
          {user:'KFC-CFK',content:'这个鸡腿太好吃了',created_at:'2017-09-29 12:28:07',type_text:'味道问题'},

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
          this.tableData1 = data.items1;
          this.tableData2 = data.items2;
          this.total = data.total;
      },
      currentChange(v){
          this.toggleTableLoad();
          this.mainProxy.setPage(v).load();
      },
      toggleTableLoad(){
          this.dataLoad = !this.dataLoad;
      },onSearchChange(param) {
          this.toggleTableLoad();
          this.mainProxy.setExtraParam(param).load();
      }
    },
    created(){
        this.toggleTableLoad();
        let mainProxy = new DataProxy("/distributecustomerb", this.pageSize, this.mainTableLoad, this);
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
