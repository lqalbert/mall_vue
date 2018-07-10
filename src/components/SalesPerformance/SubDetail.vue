<template>
    <!-- 只有销售经理有权 处理这个页面 -->
    <el-row>
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="订单信息" name="First">
                <el-table :data="orderDetail" border style="width: 100%">
                    <el-table-column prop="order_sn" label="订单号" align="center"></el-table-column>
                    <el-table-column prop="cus_name" label="成交客户" align="center"></el-table-column>
                    <el-table-column prop="cus_phone" label="客户电话" align="center"></el-table-column>
                    <el-table-column prop="trade_money" label="成交金额" align="center"></el-table-column>
                    <el-table-column prop="track_name" label="跟踪人员" align="center"></el-table-column>
                    <el-table-column prop="traded_at" label="成交时间" align="center"></el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </el-row>
</template>
  
<script>

    export default {
        name: 'SubDetail',
        props:{
            orderDetail:{
                type: Array,
                default:[]
            },
        },
        data () {
            return {
                activeName:'First',
                tabFirst:false,
                // tabSecond:false,
                // tabThird:false,
                // tabFourth:false
            }
        },
       
        methods:{
            handleFirst(row){
                // this.tabFirst = true;
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
  