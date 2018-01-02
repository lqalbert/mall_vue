<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="Keyword">
                    <el-input v-model="searchForm.keyword" size="small" placeholder="请输入订单号"></el-input>
                </el-form-item>
                <el-form-item prop="express_no">
                    <el-input v-model="searchForm.express_no" size="small" placeholder="请输入快递单号"></el-input>
                </el-form-item>
                <el-form-item prop="express_status">
                    <el-select size="small" placeholder="物流状态" v-model="searchForm.express_status">
                        <el-option value="1" label="未运输"></el-option>
                        <el-option value="2" label="运输中"></el-option>
                        <el-option value="3" label="待签收"></el-option>
                        <el-option value="4" label="已签收"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="express_time">
                    <el-date-picker v-model="searchForm.express_time" size="small" type="datetime" placeholder="选择发货时间" 
                                @change="outTimeDateChange" :editable="false">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询</el-button>
                    <el-button type="primary" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-col>
                <el-table :data="tableData" v-loading.body="dataLoad" border style="width: 100%">
                    <el-table-column label="序号" align="center"  type="index" width="65"></el-table-column>
                    <el-table-column prop="order_number" label="订单号" align="center">
                    </el-table-column>
                    <el-table-column prop="express_no" label="快递单号" align="center">
                    </el-table-column>
                    <el-table-column prop="express" label="配送物流" align="center">
                    </el-table-column>
                    <el-table-column prop="express_status" label="物流状态" align="center">
                    </el-table-column>
                    <el-table-column prop="express_time" label="发货时间" align="center">
                    </el-table-column>
                    <el-table-column prop="express_name" label="联系人" align="center">
                    </el-table-column>
                    <el-table-column prop="express_phone" label="联系电话" align="center">
                    </el-table-column>
                    <el-table-column prop="address" label="地址" align="center">
                    </el-table-column>
                  </el-table>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="12">
            </el-col>
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


    </div>

</template>

<script>
    import PageMix from '../../mix/Page';
    import DataProxy from '../../packages/DataProxy';
    import SearchTool from '../../mix/SearchTool';

    export default {
    name: 'ExpressInfo',
    pageTitle:"物流信息",
    mixins: [PageMix,SearchTool],
    data () {
        return {
            searchForm:{
                keyword:'',
                express_no:'',
                express_status:'',
                express_time:'',
            },
            dataLoad:false,
            currentPage4:1,
            total:100,
            tableData:[
                {
                    order_number:'354628754',
                    express_no:'8008208820',
                    express:'顺丰',
                    express_status:'运送中',
                    express_time:'2017-12-15',
                    express_name:'李四',
                    express_phone:'13562478625',
                    address:'四川成都青羊区'
                },
                {
                    order_number:'354628754',
                    express_no:'8008208820',
                    express:'顺丰',
                    express_status:'运送中',
                    express_time:'2017-12-15',
                    express_name:'李四',
                    express_phone:'13562478625',
                    address:'四川成都青羊区'
                },
                {
                    order_number:'354628754',
                    express_no:'8008208820',
                    express:'顺丰',
                    express_status:'运送中',
                    express_time:'2017-12-15',
                    express_name:'李四',
                    express_phone:'13562478625',
                    address:'四川成都青羊区'
                },
                {
                    order_number:'354628754',
                    express_no:'8008208820',
                    express:'顺丰',
                    express_status:'运送中',
                    express_time:'2017-12-15',
                    express_name:'李四',
                    express_phone:'13562478625',
                    address:'四川成都青羊区'
                },
                {
                    order_number:'354628754',
                    express_no:'8008208820',
                    express:'顺丰',
                    express_status:'运送中',
                    express_time:'2017-12-15',
                    express_name:'李四',
                    express_phone:'13562478625',
                    address:'四川成都青羊区'
                },
                {
                    order_number:'354628754',
                    express_no:'8008208820',
                    express:'顺丰',
                    express_status:'运送中',
                    express_time:'2017-12-15',
                    express_name:'李四',
                    express_phone:'13562478625',
                    address:'四川成都青羊区'
                },
            ]
        }
    },
    methods:{
        dataReload:function(){
          console.log(this.searchForm.Keyword);
        },
        searchReset:function(){
          this.searchForm.Keyword='';
        },
        handleEdit:function(index,row){
            this.editDialog =true;
          this.searchForm.Keyword='';
        },
        handleDelete:function(index,row){
          this.searchForm.Keyword='';
        },
         openAddDialog:function(){
          this.searchForm.Keyword='';
        },
         closeDialog:function(){
          this.searchForm.Keyword='';
        },
         addFormSubmit:function(){
          console.log(this.addForm);
        },

        handleAddWindow(){
             this.addDialog = false;
             this.editDialog =false;
        },mainTableLoad(data){
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
        },
        outTimeDateChange(v){
            this.searchForm.express_time = v;
        },



    },
    created(){
        // this.toggleTableLoad();
        // let mainProxy = new DataProxy("/expressinfo", this.pageSize, this.mainTableLoad, this);
        // this.mainProxy = mainProxy;
        // this.mainProxy.load();
        // this.$on('search-tool-change', this.onSearchChange);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
