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

                <el-form-item prop="department" label="请选择部门:"  label-width="100px">
                    <el-radio-group v-model="searchForm.department" >
                        <el-radio label="1" >推广部</el-radio>
                        <el-radio label="2" >销售部</el-radio>
                    </el-radio-group>
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

        <el-row :gutter="20" type="flex" v-loading="dataLoad">
            <el-col :span="8">
                <el-card class="box-card" style="border: 1px solid #ff4949;">
                    <div slot="header">
                        <el-alert :closable="false" title="部门/单位排名" type="error"></el-alert>
                    </div>
                    <div class="text item">
                        <el-table :data="tableDataDep"  height="401" highlight-current-row empty-text="暂无数据,请录入客户！" :show-header="false">
                            <el-table-column prop="name" label="名称"></el-table-column>
                            <el-table-column label="序号"  align="center" type="index" width="65"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" >
                <el-card class="box-card"  style="border: 1px solid #50bfff;">
                    <div slot="header">
                        <el-alert :closable="false" title="团队/小组排名" type="info"></el-alert>
                    </div>
                    <div class="text item">
                        <el-table :data="tableDataGroup" height="401" highlight-current-row empty-text="暂无数据,请录入客户！" :show-header="false">
                            <el-table-column prop="name" label="名称"></el-table-column>
                            <el-table-column label="序号"  align="center" type="index" width="65"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" >
                <el-card class="box-card"  style="border: 1px solid #f7ba2a;">
                    <div slot="header">
                        <el-alert :closable="false" title="个人排名" type="warning"></el-alert>
                    </div>
                    <div class="text item">
                        <el-table :data="tableDataUser"  height="401" highlight-current-row empty-text="暂无数据,请录入客户！" :show-header="false">
                            <el-table-column prop="name" label="名称"></el-table-column>
                            <el-table-column label="序号"  align="center" type="index" width="65"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <div class="pull-right" hidden>
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
    </div>
</template>
      
<script>
    import PageMix from '../../mix/Page';
    import DataProxy from '../../packages/DataProxy';
    import SearchTool from "../../mix/SearchTool";
export default {
    name: 'OrderList',
    pageTitle:"订单列表",
    mixins: [PageMix,SearchTool],
    data () {
        return {
            total:100,
            dataLoad:false,
            typeName:'请选择排名方式',
            conditions:["录入个数", "成交金额", "成交个数"],
            searchForm:{
                start:'',
                department_id:'',
                end:'',
                condition:'',
                department:'1'
            },
            currentPage4:1,
            tableDataDep:[{name:'新乡部'}, {name:'周口二部'}, {name:'许昌部'}, {name:'信阳部'},],
            tableDataGroup:[{name:'新乡部-胜利队'}, {name:'周口二部-超越队'}, {name:'许昌部-亮剑队'}, {name:'信阳部-猛虎队'},],
            tableDataUser:[{name:'周口一部-超越队-王宁'}, {name:'平顶山部-启航队-王鹏瑞'}, {name:'新乡部-突击队-赵康'}, {name:'新乡部-胜利队-何落落'},]

        }
    },
    methods:{
        dataReload:function(){
          console.log(this.searchForm);
        },
        typeChange:function(v){
            console.log(v);
            this.typeName=this.conditions[v];
        },
        startDateChange:function(v){
            this.searchForm.start = v;
        },
        endDateChange:function(v){
            this.searchForm.end = v;
        }, mainTableLoad(data){
            this.toggleTableLoad();
            this.tableDataDep = data.items;
            this.tableDataGroup = data.items1;
            this.tableDataUser = data.items2;
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
            this.toggleTableLoad()
            this.mainProxy.setExtraParam(param).load();
        },
        searchReset:function(){
            this.$refs['searchForm'].resetFields();
            this.typeName = '请选择排名方式';
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
        let mainProxy = new DataProxy("/achievementrank", this.pageSize, this.mainTableLoad, this);
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
