<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true"  ref="searchForm" :model="searchForm">
                <el-form-item prop="qq" style="width:150px">
                    <el-input v-model="searchForm.qq" size="small" placeholder="注册人QQ"></el-input>
                </el-form-item>

                <el-form-item prop="phone" style="width:150px">
                    <el-input v-model="searchForm.phone" size="small" placeholder="注册人手机"></el-input>
                </el-form-item>

                <el-form-item prop="wx" style="width:150px">
                    <el-input v-model="searchForm.wx" size="small" placeholder="注册人微信"></el-input>
                </el-form-item>

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

                <el-form-item>
                    <el-tooltip content="填写或者选择好筛选条件后点击此按钮" placement="bottom-start">
                        <el-button type="info" size="small" icon="search" @click="searchToolChange('searchForm')">查询</el-button>
                    </el-tooltip>
                </el-form-item>

                <el-form-item>
                    <el-tooltip content="清空搜索框并刷新表格数据" placement="bottom-start">
                        <el-button size="small" type="primary" @click="searchToolReset('searchForm')">重置</el-button>
                    </el-tooltip>
                </el-form-item>

                <el-form-item>
                    <el-tooltip content="点击刷新当前页面" placement="right">
                        <el-button @click="refresh" size="small" type="danger">刷新</el-button>
                    </el-tooltip>
                </el-form-item>
            </el-form>
        </el-row>

        <el-row>
            <el-col>
                <el-table :data="tableData" v-loading.body="dataLoad" border style="width: 100%">
                    <el-table-column label="序号" align="center"  type="index" width="65">
                    </el-table-column>

                    <el-table-column prop="qq" label="注册人QQ" align="center">
                    </el-table-column>

                    <el-table-column prop="wx" label="注册人微信" align="center">
                    </el-table-column>

                    <el-table-column prop="phone" label="注册人手机" align="center">
                    </el-table-column>

                    <el-table-column prop="ip" label="网络IP" align="center">
                    </el-table-column>

                    <el-table-column prop="location" label="地理位置" align="center">
                    </el-table-column>

                    <el-table-column prop="lock" label="锁定状态(注册时)" show-overflow-tooltip align="center">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.lock == '0'" type="danger">QQ、电话和微信均被锁定</el-tag>
                            <el-tag v-else-if="scope.row.lock == '1'" type="primary">未被锁定</el-tag>
                            <el-tag v-else-if="scope.row.lock == '2'" type="danger">QQ已被锁定</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column prop="reg_time" label="注册时间" align="center">
                    </el-table-column>

                    <el-table-column prop="leadin" label="导入状态" align="center">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.leadin == '0'" type="primary">未导入</el-tag>
                            <el-tag v-else-if="scope.row.leadin == '1'" >已导入</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作"  align="center" width="180">
                        <template slot-scope="scope">
                            <el-button type="info" @click="addDialog = true"  size="small">导入客户</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row >
            <div class="pull-right">
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
            </div>
        </el-row>

        <!--添加公告 -->


        <addDialog :add-open="addDialog" @add-window-close="handleAddWindow"/>

        <!-- / 添加公告 -->

    </div>

</template>

<script>
    import addDialog from './addDialog';
    import PageMix from '../../mix/Page';
    import DataProxy from '../../packages/DataProxy';
    import SearchTool from '../../mix/SearchTool';

    export default {
    name: 'RegisterInfo',
    pageTitle:"注册信息",
    mixins: [PageMix,SearchTool],
    components: {
        addDialog

    },
    data () {
        return {
            addDialog:false,
            searchForm:{
                 qq:'',
                phone:'',
                wx:'',
                start:'',
                end:'',

            },
            total:100,
            dataLoad:false,
            currentPage4:1,
            tableData:[
            {qq:'111111',wx:'222222',phone:'333333333',ip:'192.168.10.15',location:'四川省成都市电信',lock:'0',reg_time:'2017-06-30 09:53:13',leadin:'0'},
            {qq:'111111',wx:'222222',phone:'333333333',ip:'192.168.10.15',location:'四川省成都市电信',lock:'1',reg_time:'2017-06-30 09:53:13',leadin:'0'},
            {qq:'111111',wx:'222222',phone:'333333333',ip:'192.168.10.15',location:'四川省成都市电信',lock:'2',reg_time:'2017-06-30 09:53:13',leadin:'0'},

            ]
        }
    },
    methods:{
        dataReload:function(){
          console.log(this.searchForm);
        },
        searchReset:function(){
            this.$refs['searchForm'].resetFields();
        },
        refresh:function(){
            this.$refs['searchForm'].resetFields();
        },
        handleEdit:function(){
            this.editDialog =true;
          this.searchForm='';
        },
        handleDelete:function(){
          this.searchForm='';
        },
         openAddDialog:function(){
          this.searchForm='';
        },
         closeDialog:function(){
          this.searchForm='';
        },
         addFormSubmit:function(){
          console.log(this.searchForm);
        },
        startDateChange:function(v){
            this.searchForm.start = v;
        },
        endDateChange:function(v){
            this.searchForm.end = v;
        },

        handleAddWindow(){
             this.addDialog = false;

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

        onSearchChange(param){
            this.toggleTableLoad();
            this.mainProxy.setExtraParam(param).load();
        }


    },
    created(){
        this.toggleTableLoad();
        let mainProxy = new DataProxy("/registerinfo", this.pageSize, this.mainTableLoad, this);
        this.mainProxy = mainProxy;
        this.mainProxy.load();
        this.$on('search-tool-change', this.onSearchChange);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
