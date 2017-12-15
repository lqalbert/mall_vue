<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" ref="searchForm" :model="searchForm" >
                <el-form-item prop="start" >
                    <el-date-picker size="small" v-model="searchForm.start"
                                    placeholder="下单开始时间"
                                    @change="startDateChange"
                                    :editable="false">
                    </el-date-picker>
                </el-form-item>

                <el-form-item prop="end">
                    <el-date-picker size="small" v-model="searchForm.end"
                                    placeholder="下单截止时间"
                                    @change="endDateChange"
                                    :editable="false">
                    </el-date-picker>
                </el-form-item>

                <el-form-item prop="number">
                    <el-input size="small" v-model="searchForm.number" placeholder="请输入订单编号"></el-input>
                </el-form-item>


                <el-form-item>
                    <el-button size="small" type="info" >全部</el-button>
                    <el-button size="small" type="info" >待付款</el-button>
                    <el-button size="small" type="info" >待确认</el-button>
                    <el-button size="small" type="info" >待发货</el-button>
                    <el-button size="small" type="info" >已发货</el-button>
                    <el-button size="small" type="info" >已收货</el-button>
                    <el-button size="small" type="info" >已完成</el-button>
                    <el-button size="small" type="info" >已关闭</el-button>
                    <el-button size="small" type="info" >退款中</el-button>
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
            <el-col>
                <el-table :data="tableData" v-loading="dataLoad" border style="width: 100%">
                    <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>
                    <el-table-column prop="order_sn" label="订单编号" width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="goods_name" label="商品名称" align="center">
                    </el-table-column>
                    <el-table-column prop="consignee" label="收货人信息" align="center">
                    </el-table-column>
                    <el-table-column prop="order_all_money" label="总金额" align="center" width="100">
                    </el-table-column>
                    <el-table-column prop="order_pay_money" label="应付金额" align="center" width="100">
                    </el-table-column>
                    <el-table-column prop="order_status" label="订单状态" align="center">
                    </el-table-column>
                    <el-table-column prop="pay_name" label="支付方式" align="center" width="100">
                    </el-table-column>
                    <el-table-column prop="shipping_status" label="发货状态" align="center" width="100">
                    </el-table-column>
                    <el-table-column prop="shipping_name" label="配送方式" align="center" width="100">
                    </el-table-column>
                    <el-table-column prop="order_time" label="下单时间" align="center">
                    </el-table-column>
                    <el-table-column  label="操作" align="center" width="140">
                        <template slot-scope="scope">
                            <el-button type="info"    size="small">查看</el-button>
                            <el-button type="danger"  size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <div class="pull-right" style="float:right;margin-top: 5px" >
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
                number:'',
                end:'',
                condition:'',
                department:'1'
            },
            currentPage4:1,
            tableData:[
                {
                    order_sn:'201710281532582903',
                    goods_name:'华硕笔记本电脑',
                    consignee:'张三:18236521452',
                    order_all_money:'5999.00',
                    order_pay_money:'5999.00',
                    order_status:'待确认',
                    pay_name:'支付宝',
                    shipping_status:'待发货',
                    shipping_name:'顺丰',
                    order_time:'2017-10-28 15:32:24',
                },
                {
                    order_sn:'201710281532582903',
                    goods_name:'华硕笔记本电脑',
                    consignee:'张三:18236521452',
                    order_all_money:'5999.00',
                    order_pay_money:'5999.00',
                    order_status:'待确认',
                    pay_name:'支付宝',
                    shipping_status:'待发货',
                    shipping_name:'顺丰',
                    order_time:'2017-10-28 15:32:24',
                },
                {
                    order_sn:'201710281532582903',
                    goods_name:'华硕笔记本电脑',
                    consignee:'张三:18236521452',
                    order_all_money:'5999.00',
                    order_pay_money:'5999.00',
                    order_status:'待确认',
                    pay_name:'支付宝',
                    shipping_status:'待发货',
                    shipping_name:'顺丰',
                    order_time:'2017-10-28 15:32:24',
                },
                {
                    order_sn:'201710281532582903',
                    goods_name:'华硕笔记本电脑',
                    consignee:'张三:18236521452',
                    order_all_money:'5999.00',
                    order_pay_money:'5999.00',
                    order_status:'待确认',
                    pay_name:'支付宝',
                    shipping_status:'待发货',
                    shipping_name:'顺丰',
                    order_time:'2017-10-28 15:32:24',
                },
                {
                    order_sn:'201710281532582903',
                    goods_name:'华硕笔记本电脑',
                    consignee:'张三:18236521452',
                    order_all_money:'5999.00',
                    order_pay_money:'5999.00',
                    order_status:'待确认',
                    pay_name:'支付宝',
                    shipping_status:'待发货',
                    shipping_name:'顺丰',
                    order_time:'2017-10-28 15:32:24',
                },
                {
                    order_sn:'201710281532582903',
                    goods_name:'华硕笔记本电脑',
                    consignee:'张三:18236521452',
                    order_all_money:'5999.00',
                    order_pay_money:'5999.00',
                    order_status:'待确认',
                    pay_name:'支付宝',
                    shipping_status:'待发货',
                    shipping_name:'顺丰',
                    order_time:'2017-10-28 15:32:24',
                },
            ],
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
            this.toggleTableLoad()
            this.mainProxy.setExtraParam(param).load();
        },
        searchReset:function(){
            this.$refs['searchForm'].resetFields();
            this.typeName = '请选择排名方式';
            this.mainProxy.setExtraParam(null).load();
            this.toggleTableLoad();
        },


    },
    created(){
        // this.toggleTableLoad();
        // let mainProxy = new DataProxy("/orderlist", this.pageSize, this.mainTableLoad, this);
        // this.mainProxy = mainProxy;
        // this.mainProxy.load();

        // this.$on('search-tool-change',this.onSearchChange);

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-form-item {
      margin-bottom: 2px;
  }
</style>
