<template>
    <div >
        <el-row >
            <el-col :span="24">
                <el-form :inline="true" ref="searchForm" :model="searchForm" >
                    <el-form-item prop="start">
                        <el-date-picker size="small" v-model="searchForm.start"
                                        placeholder="开始时间"
                                        @change="startDateChange" style="width: 130px">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item prop="end">
                        <el-date-picker size="small" v-model="searchForm.end"
                                        placeholder="截止时间"
                                        @change="endDateChange" style="width: 130px">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item prop="condition">
                        <el-dropdown trigger="click" menu-align="start" @command="typeChange" >
                            <el-button type="primary" size="small">
                                {{typeName}}<i class="el-icon-caret-bottom el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="(item,index) in conditions" 
                                :key="index" :command="index.toString()" v-text="item"></el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-form-item>

                    <el-form-item prop="condition">
                        <el-dropdown trigger="click" menu-align="start" @command="departmentNameChange" >
                            <el-button type="primary" size="small">
                                {{departmentName}}<i class="el-icon-caret-bottom el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="(item,index) in departmentNames" 
                                :key="index" :command="index.toString()" v-text="item"></el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-form-item>

                    <el-form-item prop="condition">
                        <el-dropdown trigger="click" menu-align="start" @command="groupNameChange" >
                            <el-button type="primary" size="small">
                                {{groupName}}<i class="el-icon-caret-bottom el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="(item,index) in groupNames" 
                                :key="index" :command="index.toString()" v-text="item"></el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-form-item>

                    <el-form-item prop="condition">
                        <el-dropdown trigger="click" menu-align="start" @command="userNameChange" >
                            <el-button type="primary" size="small">
                                {{userName}}<i class="el-icon-caret-bottom el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="(item,index) in userNames" 
                                :key="index" :command="index.toString()" v-text="item"></el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-form-item>

                    <el-form-item prop="phone" style="width:100px" >
                        <el-input v-model="searchForm.phone" size="small"  placeholder="请输入手机号"></el-input>
                    </el-form-item>

                    <el-form-item prop="qq" style="width:100px" >
                        <el-input v-model="searchForm.qq" size="small"  placeholder="请输入qq号"></el-input>
                    </el-form-item>

                    <el-form-item prop="weixin" style="width:100px" >
                        <el-input v-model="searchForm.weixin" size="small"  placeholder="请输入微信号"></el-input>
                    </el-form-item>

                    <el-form-item prop="customer_name" style="width:120px" >
                        <el-input v-model="searchForm.customer_name" size="small" placeholder="请输入客户姓名"></el-input>
                    </el-form-item>

                    <el-form-item prop="field" v-show="false">
                        <input type="hidden" size="small" v-model="searchForm.field"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="info" @click="setField('lastWeek')">上周</el-button>
                        <el-button size="small" type="info" @click="setField('lastMonth')">上月</el-button>
                        <el-button size="small" type="info" @click="setField('week')">本周</el-button>
                        <el-button size="small" type="info" @click="setField('month')">本月</el-button>
                    </el-form-item>

                    <el-form-item label-width="5px">
                        <el-button type="info" size="small" icon="search"  @click="searchToolChange('searchForm')">查询</el-button>
                        <el-tooltip content="清空搜索条件" placement="bottom-start" style="margin-left:10px;">
                            <el-button  size="small" @click="searchReset" type="warning">重置</el-button>
                        </el-tooltip>
                        <el-tooltip content="点击刷新当前页面" placement="right" style="margin-left:10px;">
                            <el-button  size="small" type="danger" >刷新</el-button>
                        </el-tooltip>
                    </el-form-item>

                </el-form>

            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <el-table :data="tableDataDep" v-loading="dataLoad" border  highlight-current-row stripe fit>
                    <el-table-column label="序号"  align="center" width="100"  type="index"></el-table-column>

                    <el-table-column  prop="customer_name" label="客户姓名" align="center" width="100"></el-table-column>

                    <el-table-column  prop="sex" label="性别" align="center">
                    </el-table-column>

                    <el-table-column  prop="qq" label="QQ" align="center" width="150">
                    </el-table-column>

                    <el-table-column  prop="weixin" label="微信" align="center" width="180">
                    </el-table-column>

                    <el-table-column  prop="phone" label="联系电话" align="center" width="150">
                    </el-table-column>

                    <el-table-column  prop="lock_name" label="锁定员工" align="center" width="150">
                    </el-table-column>

                    <el-table-column  prop="track_name" label="跟踪员工" align="center" width="150">
                    </el-table-column>

                    <el-table-column  prop="server_name" label="服务客服" align="center" width="100">
                    </el-table-column>

                    <el-table-column sortable prop="created_time" label="录入时间" align="center" width="200">
                    </el-table-column>

                    <el-table-column sortable prop="deal_time" label="成交时间" align="center" width="200">
                    </el-table-column>

                    <el-table-column sortable prop="money" label="资金量" align="center" width="100">
                    </el-table-column>

                    <el-table-column  prop="remark" label="备注" align="center" show-overflow-tooltip>
                    </el-table-column>

                    <el-table-column  prop="address" label="住址" align="center" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row >
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
    </div>
</template>
      
<script>
    import PageMix from '../../mix/Page';
    import DataProxy from '../../packages/DataProxy';
    import SearchTool from "../../mix/SearchTool";
export default {
    name: 'TradeCustomers',
    pageTitle:"成交客户",
    mixins: [PageMix,SearchTool],
    data () {
        return {
            total:100,
            dataLoad:false,
            typeName:'请选择部门类型',
            departmentName:'请选择部门',
            groupName:'请选择团队',
            userName:'请选择员工',
            conditions:["推广部", "销售部"],
            departmentNames:["销售二部", "销售八部", "销售十部"],
            groupNames:["超越队", "飞虎队", "冲锋队"],
            userNames:["张三", "李四", "王五"],
            searchForm:{
                start:'',
                end:'',
                condition:'',
                phone:'',
                qq:'',
                weixin:'',
                customer_name:'',
                field:'',
            },
            currentPage4:1,
            tableDataDep:[
                {address: "是丰仕达服饰答复发斯蒂芬", created_time: "2017-11-28 14:26:27", customer_name: "罗大力", deal_time: "2017-11-28 14:31:04", lock_name: "成都部 李曼曼", money: "5W-10W", phone: "15633322565",qq: "84829994", remark: "", server_id: "0", server_name: "", sex: "男", track_name: "成都部 李曼曼", weixin: "as2423424234"},
                {address: "是丰仕达服饰答复发斯蒂芬", created_time: "2017-11-28 14:26:27", customer_name: "罗大力", deal_time: "2017-11-28 14:31:04", lock_name: "成都部 李曼曼", money: "5W-10W", phone: "15633322565",qq: "84829994", remark: "", server_id: "0", server_name: "", sex: "男", track_name: "成都部 李曼曼", weixin: "as2423424234"},
                {address: "是丰仕达服饰答复发斯蒂芬", created_time: "2017-11-28 14:26:27", customer_name: "罗大力", deal_time: "2017-11-28 14:31:04", lock_name: "成都部 李曼曼", money: "5W-10W", phone: "15633322565",qq: "84829994", remark: "", server_id: "0", server_name: "", sex: "男", track_name: "成都部 李曼曼", weixin: "as2423424234"},
                {address: "是丰仕达服饰答复发斯蒂芬", created_time: "2017-11-28 14:26:27", customer_name: "罗大力", deal_time: "2017-11-28 14:31:04", lock_name: "成都部 李曼曼", money: "5W-10W", phone: "15633322565",qq: "84829994", remark: "", server_id: "0", server_name: "", sex: "男", track_name: "成都部 李曼曼", weixin: "as2423424234"},
                {address: "是丰仕达服饰答复发斯蒂芬", created_time: "2017-11-28 14:26:27", customer_name: "罗大力", deal_time: "2017-11-28 14:31:04", lock_name: "成都部 李曼曼", money: "5W-10W", phone: "15633322565",qq: "84829994", remark: "", server_id: "0", server_name: "", sex: "男", track_name: "成都部 李曼曼", weixin: "as2423424234"},
            ],

        }
    },
    methods:{
        typeChange:function(v){

            this.typeName=this.conditions[v];
        },
        departmentNameChange:function(v){

            this.departmentName=this.departmentNames[v];
        },groupNameChange:function(v){

            this.groupName=this.groupNames[v];
        },
        userNameChange:function(v){

            this.userName=this.userNames[v];
        },
        startDateChange:function(v){
            this.searchForm.start = v;
        },
        endDateChange:function(v){
            this.searchForm.end = v;
        },
        mainTableLoad(data){
            this.toggleTableLoad();
            this.tableDataDep = data.items;
            this.total = data.total;
        },
        currentChange(v){
            this.toggleTableLoad();
            this.mainProxy.setPage(v).load();
        },
        toggleTableLoad(){
            this.dataLoad = !this.dataLoad;
        },
        onSearchChange(param){
            this.toggleTableLoad();
            this.mainProxy.setExtraParam(param).load();
            this.toggleTableLoad();
        },
        searchReset:function(){
            this.$refs['searchForm'].resetFields();
            this.typeName = '请选择部门类型';
            this.groupName = '请选择团队';
            this.departmentName = '请选择部门';
            this.userName = '请选择员工';
            this.mainProxy.setExtraParam(null).load();
            this.toggleTableLoad();
        },
        setField(field){
            let param = {};
            switch (field) {
                case 'lastWeek':
                    param.start = '2017-11-27';
                    param.end = '2017-12-03';
                    break;
                case 'lastMonth':
                    param.start = '2017-11-01';
                    param.end = '2017-11-30';
                    break;
                case 'week':
                    param.start = '2017-12-04';
                    param.end = '2017-12-10';
                    break;
                case 'month':
                    param.start = '2017-12-01';
                    param.end = '2017-12-31';
                    break;
                default:
                    break;
            }
            
            this.$emit('search-tool-change',param);
        }

    },
    created(){
        this.toggleTableLoad();
        let mainProxy = new DataProxy("/tradecustomers", this.pageSize, this.mainTableLoad, this);
        this.mainProxy = mainProxy;
        this.mainProxy.load();

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
