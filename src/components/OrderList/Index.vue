<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" ref="searchForm" :model="searchForm">
                <el-form-item prop="start" >
                    <el-date-picker size="small" v-model="searchForm.start"
                                    placeholder="下单开始时间"
                                    @change="startDateChange"
                                    :editable="false">
                    </el-date-picker>
                </el-form-item>

                <el-form-item prop="goods_name">
                    <el-input size="small" v-model="searchForm.goods_name" placeholder="请输入商品名称"></el-input>
                </el-form-item>

                <el-form-item prop="sale_name">
                    <el-input size="small" v-model="searchForm.sale_name" placeholder="员工名称"></el-input>
                </el-form-item>

                <el-form-item prop="consignee">
                    <el-input size="small" v-model="searchForm.consignee" placeholder="客户名称"></el-input>
                </el-form-item>

                <el-form-item prop="end">
                    <el-date-picker size="small" v-model="searchForm.end"
                                    placeholder="下单截止时间"
                                    @change="endDateChange"
                                    :editable="false">
                    </el-date-picker>
                </el-form-item>

                <el-form-item prop="order_sn">
                    <el-input size="small" v-model="searchForm.order_sn" placeholder="请输入订单编号"></el-input>
                </el-form-item>
                <br>
                <el-form-item prop="type">
                    <el-button size="small" @click="show_all"         type="info" >全部</el-button>
                    <el-button size="small" @click="typesearch('pre_pay')"  v-model="searchForm.type"   type="info" >待付款</el-button>
                    <el-button size="small" @click="typesearch('pre_affirm')"  type="info" >待确认</el-button>
                    <el-button size="small" @click="delivesearch('pre_deliver')" type="info" >待发货</el-button>
                    <el-button size="small" @click="delivesearch('delivered')"   type="info" >已发货</el-button>
                    <el-button size="small" @click="delivesearch('received')"    type="info" >已收货</el-button>
                    <el-button size="small" @click="typesearch('done')"        type="info" >已完成</el-button>
                    <el-button size="small" @click="typesearch('closed')"      type="info" >已关闭</el-button>
                    <el-button size="small" @click="typesearch('refund')"      type="info" >退款中</el-button>
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
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload">
                    <el-table-column type="selection" align="center" width="50"></el-table-column>
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
                            <el-button type="info" size="small" @click="showRowData(scope.row)">查看</el-button>
                            <el-button type="danger" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </TableProxy>
            </el-col>
        </el-row>

        <!--<div class="pull-right" style="float:right;margin-top: 5px" >-->
            <!--<el-col :span="12">-->
                <!--<el-pagination-->
                        <!--:current-page="currentPage4"-->
                        <!--:page-size="100"-->
                        <!--layout="total, prev, pager, next, jumper"-->
                        <!--:total="total"-->
                        <!--@current-change="currentChange">-->
                <!--</el-pagination>-->
            <!--</el-col>-->

        <!--</div>-->

        <rowInfoDialog name="rowInfo"/>
        <div id="app2" class="b" style="margin-top:5px;">
            <el-row>
                <el-col :span="24">
                    <el-tabs type="border-card">
                        <el-tab-pane label="订单商品明细">
                            <el-table  empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                                <el-table-column prop="user" label="操作员工" align="center">
                                </el-table-column>

                                <el-table-column prop="type" label="客户类型(当前)" align="center">
                                </el-table-column>

                                <el-table-column prop="name" label="客户姓名" align="center">
                                </el-table-column>

                                <el-table-column label="内容" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.content | handleString}}
                                    </template>
                                </el-table-column>

                                <el-table-column prop="created_at" label="跟踪时间" width="180" align="center">
                                </el-table-column>

                                <el-table-column prop="track_text" label="跟踪类型" align="center">
                                </el-table-column>

                            </el-table>
                        </el-tab-pane>

                        <!-- <el-tab-pane label="软件账号">软件账号</el-tab-pane>
                        <el-tab-pane label="通话记录">通话记录</el-tab-pane> -->
                        <el-tab-pane label="订单客户资料">
                            <el-table empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                                <el-table-column prop="user" label="操作员工" align="center">
                                </el-table-column>

                                <el-table-column label="投诉内容" align="center">
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

                        <el-tab-pane label="订单消费详情">
                            <el-table empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                                <el-table-column prop="user" label="操作员工" align="center">
                                </el-table-column>

                                <el-table-column label="投诉内容" align="center">
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

                        <el-tab-pane label="订单操作记录">
                            <el-table empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                                <el-table-column prop="user" label="操作员工" align="center">
                                </el-table-column>

                                <el-table-column label="投诉内容" align="center">
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

                        <el-tab-pane label="订单收件人">
                            <el-table empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                                <el-table-column prop="user" label="操作员工" align="center">
                                </el-table-column>

                                <el-table-column label="投诉内容" align="center">
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

                        <el-tab-pane label="订单发货信息">
                            <el-table empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                                <el-table-column prop="user" label="操作员工" align="center">
                                </el-table-column>

                                <el-table-column label="投诉内容" align="center">
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

                        <el-tab-pane label="订单快递信息">
                            <el-table empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                                <el-table-column prop="user" label="操作员工" align="center">
                                </el-table-column>

                                <el-table-column label="投诉内容" align="center">
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

                        <el-tab-pane label="订单成交员工">
                            <el-table empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                                <el-table-column prop="user" label="操作员工" align="center">
                                </el-table-column>

                                <el-table-column label="投诉内容" align="center">
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

                        <el-tab-pane label="成交比例">
                            <el-table empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                                <el-table-column prop="user" label="操作员工" align="center">
                                </el-table-column>

                                <el-table-column label="投诉内容" align="center">
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
        <rowInfoDialog name="rowInfo"/>
    </div>
</template>
      
<script>
    import rowInfoDialog from "./rowInfo";
    import DataTable from '../../mix/DataTable';
    import PageMix from '../../mix/Page';
    import config from '../../mix/Delete';
    import DataProxy from '../../packages/DataProxy';
    import SelectProxy from  '../../packages/SelectProxy';
    import OrderlistAjaxProxy from '../../ajaxProxy/Orderlist';
    import TableProxy from '../common/TableProxy';
    import SearchTool from "../../mix/SearchTool";
export default {
    name: 'OrderList',
    pageTitle:"订单详情",
    mixins: [PageMix,SearchTool,DataTable,config,OrderlistAjaxProxy],
    components:{
        rowInfoDialog
    },
    data () {
        return {
            ajaxProxy:OrderlistAjaxProxy,
            mainurl:OrderlistAjaxProxy.getUrl(),
            mainparam:"",
            dataLoad:false,
            typeName:'请选择排名方式',
            conditions:["录入个数", "成交金额", "成交个数"],
            searchForm:{
                start:'',
                goods_name:'',
                consignee:'',
                order_sn:'',
                sale_name:'',
                end:'',
                condition:'',
                department:'1',
                type:'',
                deliver:'',

            },
            currentPage4:1,
            tableData: '',
//            tableData:[
//                {
//                    order_sn:'201710281532582903',
//                    goods_name:'华硕笔记本电脑',
//                    consignee:'张三:18236521452',
//                    order_all_money:'5999.00',
//                    order_pay_money:'5999.00',
//                    order_status:'待确认',
//                    pay_name:'支付宝',
//                    shipping_status:'待发货',
//                    shipping_name:'顺丰',
//                    order_time:'2017-10-28 15:32:24',
//                },
//                {
//                    order_sn:'201710281532582903',
//                    goods_name:'华硕笔记本电脑',
//                    consignee:'张三:18236521452',
//                    order_all_money:'5999.00',
//                    order_pay_money:'5999.00',
//                    order_status:'待确认',
//                    pay_name:'支付宝',
//                    shipping_status:'待发货',
//                    shipping_name:'顺丰',
//                    order_time:'2017-10-28 15:32:24',
//                },
//                {
//                    order_sn:'201710281532582903',
//                    goods_name:'华硕笔记本电脑',
//                    consignee:'张三:18236521452',
//                    order_all_money:'5999.00',
//                    order_pay_money:'5999.00',
//                    order_status:'待确认',
//                    pay_name:'支付宝',
//                    shipping_status:'待发货',
//                    shipping_name:'顺丰',
//                    order_time:'2017-10-28 15:32:24',
//                },
//                {
//                    order_sn:'201710281532582903',
//                    goods_name:'华硕笔记本电脑',
//                    consignee:'张三:18236521452',
//                    order_all_money:'5999.00',
//                    order_pay_money:'5999.00',
//                    order_status:'待确认',
//                    pay_name:'支付宝',
//                    shipping_status:'待发货',
//                    shipping_name:'顺丰',
//                    order_time:'2017-10-28 15:32:24',
//                },
//                {
//                    order_sn:'201710281532582903',
//                    goods_name:'华硕笔记本电脑',
//                    consignee:'张三:18236521452',
//                    order_all_money:'5999.00',
//                    order_pay_money:'5999.00',
//                    order_status:'待确认',
//                    pay_name:'支付宝',
//                    shipping_status:'待发货',
//                    shipping_name:'顺丰',
//                    order_time:'2017-10-28 15:32:24',
//                },
//                {
//                    order_sn:'201710281532582903',
//                    goods_name:'华硕笔记本电脑',
//                    consignee:'张三:18236521452',
//                    order_all_money:'5999.00',
//                    order_pay_money:'5999.00',
//                    order_status:'待确认',
//                    pay_name:'支付宝',
//                    shipping_status:'待发货',
//                    shipping_name:'顺丰',
//                    order_time:'2017-10-28 15:32:24',
//                },
//            ],
        }
    },
    methods:{
        showRowData(row){
            this.$modal.show('rowInfo',{rowData:row});
        },
        dataReload:function(){
          console.log(this.searchForm);
        },
        All:function(){
            this.orderlistInit();
        },
        typesearch:function($criteria){
            this.searchForm.type=$criteria;
           // console.log(this.searchForm);
            this.searchToolChange('searchForm');
            this.searchReset();
//            this.orderlistInit($criteria);
        },
        show_all:function(){
//            this.searchReset();
            this.searchToolChange('searchForm');
        },
        delivesearch:function($criteria){
            this.searchForm.deliver=$criteria;
            this.searchToolChange('searchForm');
            this.searchReset();
//            this.orderlistInit($criteria);
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
            console.log(param);
            this.mainparam = JSON.stringify(param);
        },
        searchReset:function(){
            this.$refs['searchForm'].resetFields();
            this.typeName = '请选择排名方式';
            this.mainProxy.setExtraParam(null).load();
            this.toggleTableLoad();
        },
        initOrderlist(data){

            this.tableData = data.items;
            //console.log(this.tableData);
            this.mainData = data.items;
        },
        orderlistInit($busuness){
            let selectProxy = new SelectProxy(OrderlistAjaxProxy.getUrl(), this.initOrderlist, this);
             selectProxy.setExtraParam({business:$busuness}).load();
        },


    },
    created(){
        this.$on('search-tool-change', this.onSearchChange);

        this.orderlistInit('Orderlist');
        let formData = $(this.$el).find('.hello').serialize();
        console.log();
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
