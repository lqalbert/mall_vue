<template>
    <div >
        <el-row>
            <el-col>
                <el-form :inline="true" ref="searchForm" class="demo-form-inline"  :model="searchForm">
                    <el-form-item style="width:170px" prop="name">
                        <el-input v-model="searchForm.name" size="small" placeholder="客户姓名"></el-input>
                    </el-form-item>

                    <el-form-item style="width:170px" prop="contact">
                        <el-input v-model="searchForm.contact" size="small" placeholder="手机|qq|微信号"></el-input>
                    </el-form-item>

                    <el-form-item prop="department_id">
                        <el-select size="small" placeholder="销售部门" v-model="searchForm.department_id">
                            <el-option v-for=" v in departments" :value="v.id" :label="v.name" :key="v.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="group_id">
                        <el-select size="small" placeholder="销售团队" v-model="searchForm.group_id">
                            <el-option v-for=" v in groups" :value="v.id" :label='v.name' :key="v.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <br/>
                    <el-form-item prop="user_id">
                        <el-select size="small" placeholder="销售员工" v-model="searchForm.user_id" >
                            <el-option v-for="v in users" :value="v.id" :label='v.name' :key="v.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="range">
                        <el-date-picker v-model="searchForm.range" type="daterange" placeholder="选择日期范围">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item prop="state">
                        <el-select size="small" v-model="searchForm.state" placeholder="审核状态">
                            <el-option value="0" label="待审核"></el-option>
                            <el-option value="1" label="通过"></el-option>
                            <el-option value="-1" label="未通过"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="info" size="small" icon="search" @click="searchToolChange('searchForm')">查询</el-button>
                        <el-button type="info" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                        <el-tooltip content="点击刷新当前页面" placement="right" style="margin-left:15px;">
                            <el-button  size="small" type="danger">刷新</el-button>
                        </el-tooltip>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col>
                <el-table :data="tableData" v-loading="dataLoad" border style="width: 100%">
                    <el-table-column label="序号" align="center"  type="index" width="65"></el-table-column>
                    <el-table-column prop="name" label="客户姓名" align="center" width="200"></el-table-column>
                    <el-table-column prop="type_text" label="客户类型" align="center" width="200"></el-table-column>
                    <el-table-column prop="phone" label="手机" align="center" width="200"></el-table-column>
                    <el-table-column prop="qq" label="QQ" align="center" width="200"></el-table-column>
                    <el-table-column prop="weixin" label="微信" align="center" width="200"></el-table-column>
                    <el-table-column prop="address" label="地址" align="center" width="200"></el-table-column>
                    <el-table-column prop="id_card" label="身份证" align="center" width="200"></el-table-column>
                    <el-table-column prop="user" label="跟踪员工" align="center" width="200"></el-table-column>
                    <el-table-column prop="user_phone" label="员工手机" align="center" width="200"></el-table-column>
                    <el-table-column prop="state_text" label="审核审查" align="center" width="200"></el-table-column>
                    <el-table-column prop="time_text" label="处理时间" align="center" width="200"></el-table-column>
                    <el-table-column prop="type" label="购买类型" align="center" width="200"></el-table-column>
                    <el-table-column prop="product_name" label="商品" align="center" width="200"></el-table-column>
                    <el-table-column prop="product_money" label="费用" align="center" width="200"></el-table-column>
                    <el-table-column prop="buy_time" label="购买时间" align="center" width="200"></el-table-column>
                    <el-table-column prop="dis_time" label="分配时间" align="center" width="200"></el-table-column>
                    <el-table-column prop="qq2" label="QQ号2" align="center" width="200"></el-table-column>
                    <el-table-column prop="qq_nickname2" label="QQ昵称2" align="center" width="200"></el-table-column>
                    <el-table-column prop="phone2" label="手机2" align="center" width="200"></el-table-column>
                    <el-table-column prop="weixin2" label="微信号2" align="center" width="200"></el-table-column>
                    <el-table-column prop="weixin_nickname2" label="微信昵称2" align="center" width="200"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <br>
        <el-row >
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-button size="small" type="primary">录入跟踪</el-button>
                    <el-button size="small" type="primary">客户投诉</el-button>
                    <el-button size="small" type="primary">审核</el-button>
                    <el-button size="small" type="primary">聊天记录</el-button>
                </div>
            </el-col>
            <div class="pull-right">
                <el-col :span="12">
                    <el-pagination
                            :current-page="currentPage4"
                            :page-size="100"
                            layout="total, prev, pager, next, jumper"
                            :total="total"
                            @current-change="currentChange">
                    </el-pagination>
                </el-col>
            </div>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-tabs  type="border-card">
                    <el-tab-pane label="跟踪记录">
                        <el-table :data="tableData1" empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                            <el-table-column prop="user" label="操作员工" header-align="center">
                            </el-table-column>
                            <el-table-column prop="content" label="内容" header-align="center">
                            </el-table-column>
                            <el-table-column prop="created_at" label="跟踪时间" width="180" align="center">
                            </el-table-column>
                            <el-table-column prop="track_text" label="跟踪类型" header-align="center">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="购买纪录">
                        <el-table :data="tableData2" empty-text="请点击客户显示其客户资料" border style="width: 100%">
                            <el-table-column label="产品金额" prop="product_money" header-align="center">
                            </el-table-column>
                            <el-table-column label="产品名称" prop="product_name" header-align="center">
                            </el-table-column>
                            <el-table-column label="产品周期" prop="product_t" header-align="center">
                            </el-table-column>
                            <el-table-column label="购买时间" prop="buy_time" align="center">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="投诉记录">
                        <el-table :data="tableData3"  empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                            <el-table-column prop="user" label="操作员工" header-align="center">
                            </el-table-column>
                            <el-table-column prop="content"  label="投诉内容" header-align="center">
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
</template>
      
<script>
    import PageMix from '../../mix/Page';
    import DataProxy from '../../packages/DataProxy';
    import EmployeeSelectProxy from '../../packages/EmployeeSelectProxy';
    import DepartSelectProxy from '../../packages/DepartSelectProxy';
    import GroupSelectProxy from '../../packages/GroupSelectProxy';
    import SearchTool from '../../mix/SearchTool';
export default {
    name: 'RiskCheck',
    pageTitle:"审核审查",
    mixins: [PageMix,SearchTool],
    data () {
        return {
            users:[],
            groups:[],
            departments:[],
            total:100,
            dataLoad:false,
            searchForm:{
                name:'',
                contact:'',
                department_id:'',
                group_id:'',
                user_id:'',
                range:'',
                state:'',
            },
            currentPage4:1,
            tableData:[
                {
                    name:'张三',
                    type_text:'普通客户',
                    phone:'1352123542',
                    qq:'654123552',
                    weixin:'fdsfsd',
                    address:'成都市',
                    id_card:'15645555555555',
                    user:'李四',
                    user_phone:'1374542445',
                    state_text:'通过',
                    time_text:'2016-10-23 17:30:14',
                    type:'精品',
                    product_name:'23',
                    product_money:'30000',
                    buy_time:'2016-10-23 17:30:14',
                    dis_time:'2016-10-23 17:30:14',
                    qq2:'3465465465',
                    qq_nickname2:'规定发给',
                    phone2:'1344646548',
                    weixin2:'sgs',
                    weixin_nickname2:'好地方'},
            ],
            tableData1:[],
            tableData2:[],
            tableData3:[],
        }
    },
    methods:{
        dataReload:function(){
          console.log(this.searchForm);
        },
        searchReset:function(){
          //this.$refs.searchForm.resetFields();
        },
        handleDeletes:function(){

        },
        mainTableLoad(data){
            this.toggleTableLoad();
            this.tableData = data.items;
            this.tableData1 = data.items1;
            this.tableData2 = data.items2;
            this.tableData3 = data.items3;
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
        onSearchChange(param){
          this.toggleTableLoad();
          this.mainProxy.setExtraParam(param).load();
          this.toggleTableLoad();
        }

    },
    created(){
        this.toggleTableLoad();
        let mainProxy = new DataProxy("/riskcheck", this.pageSize, this.mainTableLoad, this);
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

        this.$on('search-tool-change',this.onSearchChange);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-form-item {
      margin-bottom: 2px;
  }
</style>
