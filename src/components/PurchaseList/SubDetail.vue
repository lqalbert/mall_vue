<template>
    <!-- 只有销售经理有权 处理这个页面 -->
    <el-row>
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="采购信息" name="First">
                <el-table :data="purchaseOrderGoodsData" border style="width: 100%">
                    <el-table-column label="ID" align="center"  prop="id" width="65"></el-table-column>
                    <el-table-column label="SKU编号" align="center"  prop="sku_sn" ></el-table-column>
                    <el-table-column label="商品名称" align="center"  prop="goods_name" ></el-table-column>
                    <el-table-column label="商品规格" align="center"  prop="specifications" ></el-table-column>
                    <el-table-column label="采购数量" align="center"  prop="goods_purchase_num" ></el-table-column>
                    <el-table-column label="采购价" align="center"  prop="goods_purchase_price" ></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="快递信息" name="Second">
                <el-table :data="actualDeliveryExpressData" border style="width: 100%">
                    <el-table-column prop="express_num" label="快递单号" align="center"></el-table-column>
                    <el-table-column prop="express_company" label="快递公司名称" align="center"></el-table-column>
                    <el-table-column prop="total_case_num" label="纸箱总数" align="center"></el-table-column>
                    <el-table-column prop="postage" label="邮费" align="center"></el-table-column>
                    <el-table-column prop="confirm_user" label="确认发货人" align="center"></el-table-column>
                    <el-table-column prop="deliver_goods_time" label="发货时间" align="center"></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="发货信息" name="Third">
                <el-table :data="actualDeliveryGoodsData" border style="width: 100%">
                    <el-table-column prop="express_num" label="快递单号" align="center"></el-table-column>
                    <el-table-column prop="sign_status" label="签收状态" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.sign_status==0">未签收</span>
                            <span v-if="scope.row.sign_status==1">已签收</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sku_sn" label="SKU编号" align="center"></el-table-column>
                    <el-table-column label="商品规格" align="center"  prop="specifications" ></el-table-column>
                    <el-table-column label="商品名称" align="center"  prop="goods_name" ></el-table-column>
                    <el-table-column prop="actual_goods_num" label="发货数" align="center"></el-table-column>
                    <el-table-column prop="every_case_goods_num" label="每箱数量" align="center"></el-table-column>
                    <el-table-column prop="goods_case_num" label="使用纸箱数量" align="center"></el-table-column>
                    <el-table-column prop="goods_case_weight" label="商品重量" align="center"></el-table-column>
                    <el-table-column prop="goods_manufacture_time" label="生产日期" align="center"></el-table-column>
                </el-table>
            </el-tab-pane>

        </el-tabs>
    </el-row>
</template>
  
<script>
    import CustomerTrackLogProxy from '@/packages/CustomerTrackLogProxy';
    import CustomerComplainProxy from '@/packages/CustomerComplainProxy';
    import OrderGoodsProxy from '@/packages/OrderGoodsSelectProxy';
    import AfterGoodsProxy from '@/packages/AfterGoodsSelectProxy';
    import PurchaseOrderGoods from '@/packages/PurchaseOrderGoodsSelectProxy';
    import ActualDeliveryExpress from '@/packages/ActualDeliveryExpressSelectProxy';
    import ActualDeliveryGoods from '@/packages/ActualDeliveryGoodsSelectProxy';

    export default {
        name: 'SubDetail',
        props:{
            row:{
                type: Object,
                // type: Array,
                default:null
            },
        },
        data () {
            return {
                activeName:'First',
                purchaseOrderGoodsData:[],
                actualDeliveryExpressData:[],
                actualDeliveryGoodsData:[],
                tabFirst:false,
                tabSecond:false,
                tabThird:false,
                tabFourth:false
            }
        },
       
        methods:{
            handleFirst(row){
                this.purchaseOrderGoods.setParam({
                    purchase_order_id:row.id,
                }).load();
                this.tabFirst = true;
            },
            handleSecond(row){
                this.actualDeliveryExpress.setParam({
                    purchase_order_id:row.id,
                }).load();
                this.tabSecond = true;
            },
            handleThird(row){
                this.actualDeliveryGoods.setParam({
                    purchase_order_id:row.id,
                }).load();
                this.tabThird = true;
            },

            getPurchaseOrderGoods(data){
                this.purchaseOrderGoodsData = data.items;
            },
            getActualDeliveryExpress(data){
                this.actualDeliveryExpressData = data.items;
            },
            getActualDeliveryGoods(data){
                this.actualDeliveryGoodsData = data.items;
            },

        },
        watch:{
            row(val, oldVal){
                this['handle'+ this.activeName].call(this, this.row);
                this.tabFirst = false;
                this.tabSecond = false;
                this.tabThird = false;
                this.tabFourth = false;
            },
            activeName(val,oldVal){
                if (!this['tab'+ val] && this.row !== null) {
                    this['handle'+ val].call(this, this.row);
                }
            },
        },
        created(){
            this.purchaseOrderGoods = new PurchaseOrderGoods(null, this.getPurchaseOrderGoods, this);
            this.actualDeliveryExpress = new ActualDeliveryExpress(null, this.getActualDeliveryExpress, this);
            this.actualDeliveryGoods = new ActualDeliveryGoods(null, this.getActualDeliveryGoods, this);

        }
    }
</script>
<style scoped>

</style>
  