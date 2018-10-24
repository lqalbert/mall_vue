<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-tabs v-model="activeName" type="border-card">
                    <!--  订单客户信息 -->
                    <el-tab-pane label="订单客户" name="First">
                        <el-table :data="cusTableData" border empty-text="请双击订单显示信息">
                            <el-table-column prop="order_sn" label="订单号"></el-table-column>
                            <el-table-column prop="cus_name" label="客户姓名"></el-table-column>
                            <el-table-column prop="tel" label="联系电话"></el-table-column>
                            <el-table-column prop="order_account" label="下单帐号"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <!-- /订单客户信息 -->
                    <!--  订单商品信息 -->
                    <el-tab-pane label="订单商品" name="Second">
                        <el-table :data="goodsTableData" border empty-text="请双击订单显示信息">
                            <el-table-column prop="order_sn" label="订单号"></el-table-column>
                            <el-table-column prop="goods_name" label="商品名称" width="250" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="goods_id" label="商品ID" width="180"></el-table-column>
                            <el-table-column prop="goods_price" label="京东价"></el-table-column>
                            <el-table-column prop="goods_num" label="订购数量" width="180"></el-table-column>
                            <el-table-column prop="sku_sn" label="货号" width="180"></el-table-column>
                            <el-table-column prop="entrepot_name" label="仓库名称" width="180"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <!--  / 订单商品信息 -->
                    <!--  订单收货地址 -->
                    <el-tab-pane label="收货地址" name="Third">
                        <el-table :data="addressTableData" border empty-text="请双击订单显示信息">
                            <el-table-column prop="order_sn" label="订单号"></el-table-column>
                            <el-table-column prop="address" label="客户地址" width="250" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="cus_name" label="客户姓名"></el-table-column>
                            <el-table-column prop="tel" label="联系电话"></el-table-column>
                            <el-table-column prop="zip_code" label="邮政编码"></el-table-column>
                            <el-table-column prop="email" label="邮箱地址"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <!--  / 订单收货地址 -->
                    <!-- 其他信息  -->
                    <el-tab-pane label="其他信息" name="Fourth">
                        <el-table :data="otherTableData" empty-text="暂无数据" border style="width: 100%">
                            <el-table-column prop="order_sn" label="订单号"></el-table-column>
                            <el-table-column prop="invoice_type" label="发票类型"></el-table-column>
                            <el-table-column prop="invoice_head" label="发票抬头"></el-table-column>
                            <el-table-column prop="invoice_content" label="发票内容"></el-table-column>
                            <el-table-column prop="shop_remark" label="商家备注"></el-table-column>
                            <el-table-column prop="shop_remark_level" label="商家备注等级(1-5高到低)"></el-table-column>
                            <el-table-column prop="add_tax_invoice" label="增值税发票"></el-table-column>
                            <el-table-column prop="general_invoice_tax" label="普通发票纳税编号"></el-table-column>
                            <el-table-column prop="shop_sku_id" label="商家SKUID "></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <!-- /其他信息 -->
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>
  
<script>
    // import CustomerSelectAjaxProxy from '@/packages/CustomerSelectProxy';
    // import OrderGoodsAjaxProxy from "@/packages/OrderGoodsAjaxProxy";
    // import OrderAddressAjaxProxy from "@/packages/OrderAddressAjaxProxy";
    // import OrderAssignAjaxProxy from "../../packages/OrderAssignAjaxProxy";

    export default {
        name: 'SubDetail',
        props:{
            row :{
                type: Object,
                default:null
            }
        },
        data () {
            return {
                cusTableData: [],
                goodsTableData:[],
                addressTableData:[],
                otherTableData:[],

                activeName:'First',
                order_id:0,
                tabFirst:false,
                tabSecond:false,
                tabThird:false,
                tabFourth:false
            }
        },
        methods:{
            handleFirst(row){
                this.cusTableData = row.customer;
                this.tabFirst = true;
            },
            handleSecond(row){
                // console.log('second');
                this.goodsTableData = row.goods;
                this.tabSecond = true;
            },
            handleThird(row){
                // console.log('third');
                this.addressTableData = row.address;
                this.tabThird = true;
            },
            handleFourth(row){
                // console.log("fourth");
                this.otherTableData = row.other;
                this.tabFourth = true;
            },
        },
        watch:{
            row:function(val, oldVal) {
                this['handle'+ this.activeName].call(this, this.row);
                this.tabFirst = false;
                this.tabSecond = false;
                this.tabThird = false;
                this.tabFourth = false;
            },
            activeName:function(val, olvVal){
                // console.log(this.activeName);
                if (!this['tab'+ val] && this.row !== null) {
                    this['handle'+ val].call(this, this.row);
                }
            }

        },

        created(){

        }
    }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  