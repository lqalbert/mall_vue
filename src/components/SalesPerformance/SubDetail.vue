<template>
    <div>
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="销售订单" name="First">
                    <!--<TableProxy :url="selectOrderUrl" >-->
                        <el-table :data="SalesPerformanceOrderInfoData" border style="width: 100%">
                            <el-table-column prop="order_sn" label="订单号" align="center"></el-table-column>
                            <el-table-column prop="cus_name" label="成交客户" align="center"></el-table-column>
                            <el-table-column prop="cus_phone" label="客户电话" align="center"></el-table-column>
                            <el-table-column prop="trade_money" label="成交金额" align="center"></el-table-column>
                            <el-table-column prop="track_name" label="跟踪人员" align="center"></el-table-column>
                            <el-table-column prop="traded_at" label="成交时间" align="center"></el-table-column>
                        </el-table>
                    <!--</TableProxy>-->

                </el-tab-pane>

                <el-tab-pane label="内部订单" name="Second">
                   
                </el-tab-pane>
            </el-tabs>
            <br>
            <el-row type="flex" justify="end">
                <el-col :span="12">
                    <slot name="buttonbar"></slot>
                </el-col>
                <el-col :span="12" >
                    <div class="pull-right">
                        <el-pagination
                                :current-page="currentPage"
                                :page-size="page_size"
                                layout="total, prev, pager, next, jumper"
                                :total="SalesPerformanceOrderInfoTotal"
                                @current-change="currentChange">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
    </div>

</template>
  
<script>
// import  SalesPerformanceOrderInfo from '@/packages/SalesPerformanceOrderInfoProxy';
// import SalesPerformanceOrderInfoAjaxProxy from '@/ajaxProxy/SalesPerformanceOrderInfo';

    export default {
        name: 'SubDetail',
        props:{
            ajaxProxy:{
                type: Object,
                default: null
            },
            SalesPerformanceOrderInfoData:{
                type: Array,
                default: []
            },
            SalesPerformanceOrderInfoTotal:{
                type: Number,
                default: 0
            },
            page_size:{
                type: Number,
                default: 2
            },
        },
        data () {
            return {
                activeName:'First',
                tabFirst:false,
                currentPage:1,
            }
        },
       
        methods:{
            handleFirst(row){
                // this.tabFirst = true;
            },
            getAjaxProxy(){
               return this.SalesPerformanceOrderInfoAjaxProxy;
            },
            currentChange(v){
                this.$emit('getOrderData',v);
            },
            // handleSecond(row){
            //     console.log(row);
            //     this.tabSecond = true;
            // },
            // handleThird(row){
            //     console.log(row);
            //     this.tabThird = true;
            // },
            // handleFourth(row){
            //     console.log(row);
            //     this.tabFourth = true;
            // },
            
        },
        watch:{
            row(val, oldVal){
                this['handle'+ this.activeName].call(this, this.row);
                this.tabFirst = false;
                // this.tabSecond = false;
                // this.tabThird = false;
                // this.tabFourth = false;
            },
            activeName(val,oldVal){
                if (!this['tab'+ val] && this.row !== null) {
                    this['handle'+ val].call(this, this.row);
                }
            },

        },
        created(){
        }
    }
</script>
<style scoped>

</style>
  