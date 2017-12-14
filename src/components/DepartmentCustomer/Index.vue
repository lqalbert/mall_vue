<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" ref="searchForm" :model="searchForm">
              <el-form-item prop="name" >
                <el-input v-model="searchForm.name" size="small" placeholder="客户姓名"></el-input>
              </el-form-item>

              <el-form-item prop="phone" >
                <el-input v-model="searchForm.phone" size="small" placeholder="手机号"></el-input>
              </el-form-item>

              <el-form-item prop="qq" >
                <el-input v-model="searchForm.qq" size="small" placeholder="qq号"></el-input>
              </el-form-item>

              <el-form-item prop="weixin" >
                <el-input v-model="searchForm.weixin" size="small" placeholder="微信号"></el-input>
              </el-form-item>

              <el-form-item prop="type" >
                <el-select v-model="searchForm.type" clearable  size="small" placeholder="请选择客户类型" >
                    <el-option v-for="(type, key) in customerType" :label="type" :value="key" :key="type"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item prop="group_id" >
                <el-select v-model="searchForm.group_id" size="small" clearable  placeholder="请选择小组">
                  <el-option v-for="v in groups" :label="v.name" :value="v.id" :key="v.id"></el-option>

                </el-select>
              </el-form-item>

              <el-form-item prop="user_id" >
                <el-select v-model="searchForm.user_id" size="small" clearable  placeholder="请选择队员">
                  <el-option v-for="v in users" :label="v.name" :value="v.id" :key="v.id"></el-option>

                </el-select>
              </el-form-item>

              <el-form-item prop="start" label="锁定起始时间">
                <el-date-picker v-model="searchForm.start" size="small" placeholder="请选择起日期">
                </el-date-picker>
              </el-form-item>

              <el-form-item prop="end" label="锁定截止时间">
                    <el-date-picker v-model="searchForm.end" size="small" placeholder="请选择止日期">
                    </el-date-picker>
                  </el-form-item>

              <el-form-item prop="track_start" label="最后跟踪起始时间">
                    <el-date-picker v-model="searchForm.track_start" size="small" placeholder="请选择起日期">
                    </el-date-picker>
                  </el-form-item>

              <el-form-item prop="track_end" label="最后跟踪截止时间">
                  <el-date-picker v-model="searchForm.track_end" size="small" placeholder="请选择止日期">
                  </el-date-picker>
              </el-form-item>
            </el-form>
        </el-row>  
        <el-row>
          <el-col :span="24">
              <el-button type="primary" size="small"  @click="searchToolChange('searchForm')">查询</el-button>
              <el-button type="primary" size="small"  @click="searchToolReset('searchForm')">重置</el-button>
              <el-button type="danger" size="small" @click="refresh">刷新</el-button>

              <el-tooltip content="跟踪的客户" placement="bottom-start">
                  <el-button type="info" size="small" @click="typeOption('track')">跟踪</el-button>
              </el-tooltip>

              <el-tooltip content="没有跟踪的客户" placement="bottom-start" style="margin-left:10px;">
                  <el-button type="info" size="small" @click="typeOption('no_track')">未跟踪</el-button>
              </el-tooltip>

              <el-tooltip content="计划跟踪的客户" placement="bottom-start" style="margin-left:10px;">
                  <el-button type="info" size="small" @click="typeOption('plan')">计划</el-button>
              </el-tooltip>

              <el-tooltip content="成交了的客户" placement="bottom-start" style="margin-left:10px;">
                  <el-button type="primary" size="small" @click="typeOption('server')">服务</el-button>
              </el-tooltip>

              <el-tooltip content="被冲突" placement="bottom-start" style="margin-left:10px;">
                  <el-button size="small" type="danger" @click="typeOption('conflict')">冲突</el-button>
              </el-tooltip>

              <el-tooltip content="客户预查" placement="right" style="margin-left:10px;">
                  <el-button size="small" type="primary" @click="typeOption('before')">客户预查</el-button>
              </el-tooltip>

              <el-tooltip content="离职员工客户资料" style="margin-left:10px;">
                <el-button  size="small"  type="primary" @click="typeOption('leave')">离职客户资料</el-button>
              </el-tooltip>
          </el-col>
        </el-row>
        <el-row>
					<el-col>
						<el-table :data="tableData" v-loading.body="dataLoad" empty-text="请录入客户信息" highlight-current-row border ref="select" style="width: 100%">
							<el-table-column label="序号" width="65" type="index" align="center"></el-table-column>
              <el-table-column prop="name" header-align="center" label="客户姓名" width="140" ></el-table-column>

              <el-table-column prop="type" header-align="center" label="客户类型" width="180" >
              </el-table-column>

              <el-table-column  prop="realname" header-align="center" label="跟踪员工"  width="200"></el-table-column>

              <el-table-column prop="qq" label="QQ号" header-align="center" width="160">
              </el-table-column>

              <el-table-column prop="qq_nickname" header-align="center" label="QQ昵称"  width="140"></el-table-column>

              <el-table-column prop="phone" label="手机" align="center" width="140"></el-table-column>

              <el-table-column  prop="last_track" sortable="custom" label="最后跟踪时间" align="center" width="180">
              </el-table-column>

              <el-table-column prop="share_benefit" label="分成比例" align="center" width="180"></el-table-column>

              <el-table-column  prop="plan" label="计划跟踪时间" align="center" width="180"></el-table-column>

              <el-table-column  prop="conflict" label="最后冲突时间" align="center" width="180"></el-table-column>

              <el-table-column prop="province_name" label="地区" header-align="center" width="135">
              </el-table-column>

              <el-table-column prop="sex" header-align="center" label="性别" width="80" >
              </el-table-column>

              <el-table-column fixed="right"  align="center" label="操作" width="160">
                <template slot-scope="scope">
                    <el-button  size="small" type="danger">放入回收站</el-button>
                </template>
              </el-table-column>
						</el-table>
					</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <el-button type="info" size="small">录入跟踪</el-button>
              <el-button type="info" size="small">客户投诉</el-button>
              <el-button type="warning" size="small">转让</el-button>
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
import GroupSelectProxy from '../../packages/GroupSelectProxy';
import EmployeeSelectProxy from '../../packages/EmployeeSelectProxy';
import SearchTool from '../../mix/SearchTool';


export default {
    name: 'DepartmentCustomer',
    pageTitle:"部门客户",
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
          name:'',
          phone:'',
          qq:'',
          weixin:'',
          type:'',
          group:'',
          user_id:'',
          start:'',
          end:'',
          track_start:'',
          track_end:'',
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
          {name:'efggerg',type:'C.一般客户',realname:'44N4D',qq:'qq800800',qq_nickname:'qq800800',phone:'	15987452136',last_track:'2017-11-22 14:55:36',share_benefit:'3/7',plan:'2017-11-23 14:55:36',conflict:'2017-11-23 14:55:36',province_name:'美国-东京',sex:'女',},
        ],
        tableData1:[
          {user:'销售H部-王姣姣',type:'C.一般客户',name:'44N4D',content:'手机号冲突:15642104241',created_at:'2017-11-27 14:50:36',track_text:'预查冲突'}
        ],
        tableData2:[
          {user:'KFC-CFK',content:'这个鸡腿太好吃了',created_at:'2017-09-29 12:28:07',type_text:'味道问题'}
        ],
      }
    },
    methods:{
      refresh(){
        window.location.reload();
      }, mainTableLoad(data){
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
        },
        loadEmployee(data){
            this.users = data.items;
        },
        loadGroup(data){
            this.groups = data.items;
        },
        onSearchChange(param) {
            this.toggleTableLoad();
            this.mainProxy.setExtraParam(param).load();
        },
        typeOption(name){
            console.log(name);
            let data={
                name:name
            }
            // this.mainProxy.setExtraParam(data).load();
            this.$emit('search-tool-change', data);
        }
    },
    created(){
        this.toggleTableLoad();
        let mainProxy = new DataProxy("/departmentcustomer", this.pageSize, this.mainTableLoad, this);
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
