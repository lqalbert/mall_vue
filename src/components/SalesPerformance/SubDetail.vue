<template>
    <!-- 只有销售经理有权 处理这个页面 -->
    <el-row>
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="订单信息" name="First">
                <el-table :data="orderDetail" border style="width: 100%">
                    <el-table-column prop="order_sn" label="订单号" align="center"></el-table-column>
                    <el-table-column prop="cus_name" label="成交客户" align="center"></el-table-column>
                    <el-table-column prop="cus_phone" label="客户电话" align="center"></el-table-column>
                    <el-table-column prop="produce_name" label="成交产品" align="center"></el-table-column>
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
            row:{
                type: Object,
                default:null
            },
        },
        data () {
            return {
                activeName:'First',
                orderDetail:[
                    {order_sn:'OR20180316BJ0008',cus_name:'李福清',cus_phone:13666666666,produce_name:'国产壮阳神油',trade_money:2222,track_name:'李烨野',traded_at:'2018-07-05 16:36'},
                    {order_sn:'OR20180316BJ0008',cus_name:'李福清',cus_phone:13666666666,produce_name:'国产壮阳神油',trade_money:2222,track_name:'李烨野',traded_at:'2018-07-05 16:36'},
                    {order_sn:'OR20180316BJ0008',cus_name:'李福清',cus_phone:13666666666,produce_name:'国产壮阳神油',trade_money:2222,track_name:'李烨野',traded_at:'2018-07-05 16:36'},
                    {order_sn:'OR20180316BJ0008',cus_name:'李福清',cus_phone:13666666666,produce_name:'国产壮阳神油',trade_money:2222,track_name:'李烨野',traded_at:'2018-07-05 16:36'},
                ],
                tabFirst:false,
                // tabSecond:false,
                // tabThird:false,
                // tabFourth:false
            }
        },
       
        methods:{
            handleFirst(row){
                console.log(row);
                this.tabFirst = true;
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
  