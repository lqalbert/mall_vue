<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-tabs v-model="activeName" type="border-card">
                    <!--  订单客户信息 -->
                    <el-tab-pane label="订单客户" name="First">
                        <el-table :data="cusTableData" border empty-text="请双击订单显示信息">
                            <el-table-column prop="prefix_order_sn" label="订单号"></el-table-column>
                            <el-table-column prop="order_sn" label="京东订单号"></el-table-column>
                            <el-table-column prop="cus_name" label="客户姓名"></el-table-column>
                            <el-table-column prop="tel" label="联系电话"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <!-- /订单客户信息 -->
                    <!--  订单商品信息 -->
                    <el-tab-pane label="订单商品" name="Second">
                        <el-table :data="goodsTableData" border empty-text="请双击订单显示信息">
                            <el-table-column prop="order_sn" label="订单号"></el-table-column>
                            <el-table-column prop="origin_goods.goods_name" label="商品名称" width="250" show-overflow-tooltip></el-table-column>
                            <!-- <el-table-column prop="goods_id" label="商品ID" width="180"></el-table-column> -->
                            <el-table-column prop="goods_price" label="京东价"></el-table-column>
                            <el-table-column prop="goods_num" label="订购数量" width="180"></el-table-column>
                            <el-table-column prop="sku_sn" label="货号" width="180"></el-table-column>
                            <el-table-column prop="jd_entrepot_name" label="仓库名称" width="180"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <!--  / 订单商品信息 -->
                    <!--  订单收货地址 -->
                    <el-tab-pane label="收货地址" name="Third">
                        <el-table :data="addressTableData" border empty-text="请双击订单显示信息">
                            <!-- <el-table-column prop="order_sn" label="订单号"></el-table-column> -->
                            <el-table-column prop="address" label="客户地址" width="250" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="cus_name" label="客户姓名"></el-table-column>
                            <el-table-column prop="tel" label="联系电话"></el-table-column>
                            <!-- <el-table-column prop="zip_code" label="邮政编码"></el-table-column>
                            <el-table-column prop="email" label="邮箱地址"></el-table-column> -->
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

                    <el-tab-pane label="扣返明细" name="Seventh"  v-if="showdetail && (isAdmin || isSaleManager) ">
                        <el-table :data="sevenData" border style="width: 100%" max-height="400">
                            <el-table-column label="商品类型" prop="type_text"  align="center"></el-table-column>
                            <el-table-column label="金额" prop="amount"  align="center"></el-table-column>
                            <el-table-column label="扣款" prop="deposit"  align="center"></el-table-column>
                            <el-table-column label="运营费" prop="saler_point"  align="center"></el-table-column>
                            <el-table-column label="仓储费" prop="entrepot_point"  align="center"></el-table-column>
                            <el-table-column label="快递费" prop="freight"  align="center"></el-table-column>
                            <el-table-column label="店铺扣点" prop="thirdpart_point"  align="center"></el-table-column>
                            <el-table-column label="返还" prop="return_deposit"  align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>

                    <el-tab-pane label="归属" name="Fifth"  >
                        <el-table :data="userData" border style="width: 100%" max-height="400">
                            <el-table-column label="订单编号" prop="order_sn"  align="center"></el-table-column>
                            <el-table-column label="客户姓名" prop="customer.cus_name"  align="center"></el-table-column>
                            <el-table-column label="电话" prop="customer.tel"  align="center"></el-table-column>
                            <el-table-column label="归属员工"   align="center">
                                <template slot-scope="scope">
                                    {{ setDepGroupUser(scope.row) }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>
  
<script>
    import JdOrderBasicAjax from '@/ajaxProxy/JdOrderBasic';
    import JdOrderGoodsAjax from '@/ajaxProxy/JdOrderGoods';
    import { mapGetters } from 'vuex';
    export default {
        name: 'SubDetail',
        props:{
            row :{
                type: Object,
                default:null
            },
            showdetail:{
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                cusTableData: [],
                goodsTableData:[],
                addressTableData:[],
                otherTableData:[],
                userData:[],
                sevenData:[],
                activeName:'First',
                order_id:0,
                tabFirst:false,
                tabSecond:false,
                tabThird:false,
                tabFourth:false,
                tabSeventh:false,
            }
        },
        methods:{
            handleFirst(row){
                let cus = row.customer;
                cus.prefix_order_sn = row.prefix_order_sn;
                this.cusTableData = [cus];
                this.tabFirst = true;
            },
            handleSecond(row){
                // console.log('second');
                JdOrderGoodsAjax.get({order_sn:row.order_sn}).then((response)=>{
                    let data = response.data;
                    this.goodsTableData = data.items;
                    this.tabSecond = true;
                }).catch((response)=>{

                })
            },
            handleThird(row){
                // console.log('third');
                this.addressTableData = [row.address];
                this.tabThird = true;
            },
            handleFourth(row){
                // console.log("fourth");
                this.otherTableData = [row.other];
                this.tabFourth = true;
            },
            handleSeventh(row){
                //试一下不用packages的方式写 会不会更简单点
                JdOrderBasicAjax.depositDetail(row.id).then((response)=>{
                    let data = response.data;
                    this.sevenData = data.items;
                }).catch((response)=>{

                });
                this.tabSeventh = true;
            },
            handleFifth(row){
                this.userData = [row];
                this.tabFifth = true;
            },
            setDepGroupUser(row){
                let fullName = "";
                if(row.department){
                    fullName = row.department.name;
                }
                if(row.group){
                    fullName +="-"+row.group.name;
                }
                if(row.user){
                    fullName +="-"+row.user.realname;
                }
                return fullName;
            },
        },
        computed:{
            ...mapGetters([
                'isAdmin',
                'isSaleManager'
            ])
        },
        watch:{
            row:function(val, oldVal) {
                this['handle'+ this.activeName].call(this, this.row);
                this.tabFirst = false;
                this.tabSecond = false;
                this.tabThird = false;
                this.tabFourth = false;
                this.tabSeventh = false;
                this.tabFifth = false;
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
  