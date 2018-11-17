<template>
    <div>
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="销售订单" name="First">
                    <el-table :data="salesmanOrder" border style="width: 100%">
                        <el-table-column prop="order_sn" label="订单号" align="center"></el-table-column>
                        <el-table-column prop="cus_name" label="成交客户" align="center"></el-table-column>
                        <el-table-column prop="cus_phone" label="客户固话" align="center"></el-table-column>
                        <el-table-column prop="telephone" label="客户手机" align="center"></el-table-column>
                        <el-table-column prop="trade_money" label="成交金额" align="center"></el-table-column>
                        <el-table-column prop="track_name" label="跟踪人员" align="center"></el-table-column>
                        <el-table-column prop="traded_at" label="成交时间" align="center"></el-table-column>
                        <el-table-column prop="freight" label="自付邮费" align="center"></el-table-column>
                    </el-table>
                    <br>
                    <el-row type="flex" justify="end">
                        <el-col :span="12" :offset="12">
                            <div class="pull-right">
                                <el-pagination
                                        :current-page="currentPage"
                                        :page-size="pageSize"
                                        layout="total, prev, pager, next, jumper"
                                        :total="salesmanOrderTotal"
                                        @current-change="salesmanOrderChange">
                                </el-pagination>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>

                <el-tab-pane label="内部订单" name="Second">
                   <el-table :data="internalOrder" border style="width: 100%">
                        <el-table-column prop="order_sn" label="订单号" align="center"></el-table-column>
                        <el-table-column prop="cus_name" label="成交客户" align="center"></el-table-column>
                        <el-table-column prop="cus_phone" label="客户固话" align="center"></el-table-column>
                        <el-table-column prop="telephone" label="客户手机" align="center"></el-table-column>
                        <el-table-column prop="trade_money" label="成交金额" align="center"></el-table-column>
                        <el-table-column prop="track_name" label="跟踪人员" align="center"></el-table-column>
                        <el-table-column prop="traded_at" label="成交时间" align="center"></el-table-column>
                        <el-table-column prop="freight" label="自付邮费" align="center"></el-table-column>
                    </el-table>
                    <br>
                    <el-row type="flex" justify="end">
                        <el-col :span="12" :offset="12">
                            <div class="pull-right">
                                <el-pagination
                                        :current-page="currentPage"
                                        :page-size="pageSize"
                                        layout="total, prev, pager, next, jumper"
                                        :total="internalOrderTotal"
                                        @current-change="internalOrderChange">
                                </el-pagination>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="京东订单" name="Third">
                    <el-table :data="jdOrder" border style="width: 100%">
                        <el-table-column prop="order_sn" label="订单号" align="center"></el-table-column>
                        <el-table-column prop="cus_name" label="成交客户" align="center">
                            <template slot-scope="scope">
                                {{ scope.row.customer ? scope.row.customer.cus_name :"" }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="cus_phone" label="客户固话" align="center">
                            <template slot-scope="scope">
                                {{ scope.row.customer ? scope.row.customer.tel :"" }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="telephone" label="客户手机" align="center">
                            <template slot-scope="scope">
                                {{ scope.row.customer ? scope.row.customer.tel :"" }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="all_money" label="成交金额" align="center"></el-table-column>
                        <el-table-column prop="track_name" label="跟踪人员" align="center">
                            <template slot-scope="scope">
                                {{ scope.row.user ? scope.row.user.realname :"" }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="order_at" label="成交时间" align="center"></el-table-column>
                        <!-- <el-table-column prop="freight" label="邮费" align="center"></el-table-column> -->
                    </el-table>
                    <br>
                    <el-row type="flex" justify="end">
                        <el-col :span="12" :offset="12">
                            <div class="pull-right">
                                <el-pagination
                                        :current-page="jdcurrentPage"
                                        :page-size="pageSize"
                                        layout="total, prev, pager, next, jumper"
                                        :total="jdOrderTotal"
                                        @current-change="jdOrderChange">
                                </el-pagination>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            
    </div>

</template>
  
<script>
// import  SalesPerformanceOrderInfo from '@/packages/SalesPerformanceOrderInfoProxy';
// import SalesPerformanceOrderInfoAjaxProxy from '@/ajaxProxy/SalesPerformanceOrderInfo';
import JdOrderBasicAjaxProxy from '@/packages/JdOrderBasicProxy';

    export default {
        name: 'SubDetail',
        props:{
            row:{
                type: Object,
                default:null
            },
            params:{
                type: Object,
                default:null
            },
            ajaxProxy:{
                type: Function,
                default: null
            }
        },
        data () {
            return {
                salesmanOrder:[],
                internalOrder:[],
                jdOrder:[],
                activeName:'First',
                tabFirst:false,
                tabSecond:false,
                tabThird:false,
                currentPage:1,
                salesmanOrderTotal:0,
                internalOrderTotal:0,
                jdOrderTotal:0,
                pageSize:5,
                salesmanOrderProxy:null,
                internalOrderProxy:null,
                jdcurrentPage:0,
            }
        },
       
        methods:{
            handleFirst(row){
                let param = this.params;
                param.orderType = 3;//销售订单
                this.salesmanOrderProxy.setParam(param).setPageSize(this.pageSize).load();
                this.tabFirst = true;
            },
            handleSecond(row){
                let param = this.params;
                param.orderType = 2;//内部订单
                this.internalOrderProxy.setParam(param).setPageSize(this.pageSize).load();
                this.tabSecond = true;
            },
            handleThird(row){
                let param = this.params;
                this.jdOrderProxy.setParam(param).setPageSize(this.pageSize).load();
                this.tabThird = true;
            },
            // handleFourth(row){
            //     console.log(row);
            //     this.tabFourth = true;
            // },
            getSalesmanOrder(data){
                this.salesmanOrder = data.items;
                this.salesmanOrderTotal = data.total;
            },
            getInternalOrder(data){
                this.internalOrder = data.items;
                this.internalOrderTotal = data.total;
            },
            getJdOrder(data){
                this.jdOrder = data.items;
                this.jdOrderTotal = data.total;
            },
            salesmanOrderChange(v){
                this.salesmanOrderProxy.setPage(v).load();
            },
            internalOrderChange(v){
                this.internalOrderProxy.setPage(v).load();
            },
            jdOrderChange(v){
                this.jdOrderProxy.setPage(v).load();
            },
            
        },
        watch:{
            row(val, oldVal){
                this['handle'+ this.activeName].call(this, this.row);
                this.tabFirst = false;
                this.tabSecond = false;
                this.tabThird = false;
                // this.tabFourth = false;
            },
            activeName(val,oldVal){
                if (!this['tab'+ val] && this.row !== null) {
                    this['handle'+ val].call(this, this.row);
                }
            },

        },
        created(){
            this.salesmanOrderProxy = new this.ajaxProxy({},this.getSalesmanOrder,this);
            this.internalOrderProxy = new this.ajaxProxy({},this.getInternalOrder,this);
            this.jdOrderProxy = new JdOrderBasicAjaxProxy({}, this.getJdOrder, this);
        }
    }
</script>
<style scoped>

</style>
  