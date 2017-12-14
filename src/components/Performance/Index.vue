<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" ref="searchForm" :model="searchForm" >
                <el-form-item prop="start">
                    <el-date-picker size="small" v-model="searchForm.start"
                                    placeholder="时间区间开始"
                                    @change="startDateChange">
                    </el-date-picker>
                </el-form-item>

                <el-form-item prop="end">
                    <el-date-picker size="small" v-model="searchForm.end"
                                    placeholder="时间区间截止"
                                    @change="endDateChange">
                    </el-date-picker>
                </el-form-item>

                <el-form-item prop="condition">
                    <el-dropdown trigger="click" menu-align="start" @command="searchType" >
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
                            <el-dropdown-item v-for="(item,index) in departments" 
                            :key="index" :command="index.toString()" v-text="item.name"></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-form-item>
                <el-form-item prop="condition">
                    <el-dropdown trigger="click" menu-align="start" @command="groupNameChange" >
                        <el-button type="primary" size="small">
                            {{groupName}}<i class="el-icon-caret-bottom el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item,index) in groups" 
                            :key="index" :command="index.toString()" v-text="item.name"></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
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
        </el-row>

        <el-row>
            <el-col :span="24">
                <el-table :data="tableDataDep" v-loading="dataLoad" border highlight-current-row empty-text="暂无数据">
                    <el-table-column label="序号"  align="center" width="65" type="index">
                    </el-table-column>

                    <el-table-column align="center" prop="name" label="部门/小组/员工" width="200">
                    </el-table-column>

                    <el-table-column align="center" sortable="custom" prop="self_num" label="自锁成交单数" width="200">
                    </el-table-column>

                    <el-table-column align="center" sortable="custom" prop="self_amount" label="自锁成交金额" width="200">
                    </el-table-column>

                    <el-table-column align="center" sortable="custom" prop="spread_num" label="推广成交单数" width="200">
                    </el-table-column>

                    <el-table-column align="center" sortable="custom" prop="spread_amount" label="推广成交金额" width="200">
                    </el-table-column>

                    <el-table-column sortable="custom" align="center" prop="order_num" label="业绩总数(个)">
                    </el-table-column>

                    <el-table-column sortable="custom" align="center" prop="sale_amount" label="成交金额总数(元)">
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
        <el-row>
            <el-col :span="24">
                <el-table :data="sumData" :show-header="false" border>
                    <el-table-column align="center" width="65" ></el-table-column>
                    <el-table-column prop="name" align="center" width="200"></el-table-column>
                    <el-table-column prop="sum_self_num" align="center" width="200"></el-table-column>
                    <el-table-column prop="sum_self_amount" align="center" width="200"></el-table-column>
                    <el-table-column prop="sum_spread_num" align="center" width="200"></el-table-column>
                    <el-table-column prop="sum_spread_amount" align="center" width="200"></el-table-column>
                    <el-table-column prop="sum_order_num" align="center"></el-table-column>
                    <el-table-column prop="sum_sale_amount" align="center"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
      
<script>
    import PageMix from '../../mix/Page';
    import DataProxy from '../../packages/DataProxy';
    import DepartSelectProxy from '../../packages/DepartSelectProxy';
    import GroupSelectProxy from '../../packages/GroupSelectProxy';
    import SearchTool from "../../mix/SearchTool";
export default {
    name: 'Performance',
    pageTitle:"销售业绩报表",
    mixins: [PageMix,SearchTool],
    data () {
        return {
            groups:[],
            departments:[],
            typeName:'按部门查询',
            departmentName:'请选择部门',
            groupName:'请选择小组',
            conditions:["按队员查询", "按团队查询", "按部门查询"],
            departmentNames:["销售二部", "销售八部", "销售十部"],
            groupNames:["超越队", "飞虎队", "冲锋队"],
            searchForm:{
                start:'',
                department_id:'',
                end:'',
                condition:'',
                department:'1'
            },
            total:100,
            dataLoad:false,
            currentPage4:1,
            tableDataDep:[
                {name:'新乡部',self_num:'10',self_amount:'100.0',spread_num:'10',spread_amount:'20',order_num:'30',sale_amount:'10000'},
                {name:'新乡部',self_num:'10',self_amount:'100.0',spread_num:'10',spread_amount:'20',order_num:'30',sale_amount:'10000'},
                {name:'新乡部',self_num:'10',self_amount:'100.0',spread_num:'10',spread_amount:'20',order_num:'30',sale_amount:'10000'},
                {name:'新乡部',self_num:'10',self_amount:'100.0',spread_num:'10',spread_amount:'20',order_num:'30',sale_amount:'10000'},
                {name:'新乡部',self_num:'10',self_amount:'100.0',spread_num:'10',spread_amount:'20',order_num:'30',sale_amount:'10000'},

            ],
            sumData:[
                {name:'汇总',sum_self_num:'50',sum_self_amount:'5000.0',sum_spread_num:'50',sum_spread_amount:'100',sum_order_num:'150',sum_sale_amount:'50000'},

            ],




        }
    },
    methods:{
        dataReload:function(){
          console.log(this.searchForm);
        },
        searchType:function(v){

            this.typeName=this.conditions[v];
        },
        departmentNameChange:function(v){

            this.departmentName=this.departments[v]['name'];
        },groupNameChange:function(v){

            this.groupName=this.groups[v]['name'];
        },
        startDateChange:function(v){
            this.searchForm.start = v;
        },
        endDateChange:function(v){
            this.searchForm.end = v;
        }, mainTableLoad(data){
            this.toggleTableLoad();
            this.tableDataDep = data.items;
            this.sumData = data.items1;
            this.total = data.total;
        },
        currentChange(v){
            this.toggleTableLoad();
            this.mainProxy.setPage(v).load();
        },
        toggleTableLoad(){
            this.dataLoad = !this.dataLoad;
        },
        loadDepartment(data){
            this.departments = data.items;
        },
        loadGroup(data){
            this.groups = data.items;
        },
        onSearchChange(param){
            this.toggleTableLoad()
            this.mainProxy.setExtraParam(param).load();
        },
        searchReset:function(){
            this.$refs['searchForm'].resetFields();
            this.typeName = '按部门查询';
            this.departmentName = '请选择部门';
            this.groupName = '请选择小组';
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
        let mainProxy = new DataProxy("/performance", this.pageSize, this.mainTableLoad, this);
        this.mainProxy = mainProxy;
        this.mainProxy.load();

        let departProxy = new DepartSelectProxy({'type': 'sale'}, this.loadDepartment, this);
        this.departProxy = departProxy;
        this.departProxy.load();

        let groupProxy = new GroupSelectProxy({'depart_id':1}, this.loadGroup, this);
        this.groupProxy = groupProxy;
        this.groupProxy.load();
        
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
