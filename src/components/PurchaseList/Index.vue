<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="order_sn">
                    <el-input v-model="searchForm.order_sn" size="small" placeholder="采购单编号"></el-input>
                </el-form-item>
                <el-form-item prop="entrepot_id" >
                    <el-select v-model="searchForm.entrepot_id" placeholder="请选择采购单位" size="small" style="width:180px" >
                        <el-option v-for="v in distributors" :label="v.name"
                                   :value="v.id" :key="v.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="shipper">
                    <el-input v-model="searchForm.shipper" size="small" placeholder="发货单位"></el-input>
                </el-form-item>
                <el-form-item prop="purchase_status">
                        <el-select v-model="searchForm.purchase_status" placeholder="采购状态" size="small">
                            <el-option v-for="v in purchaseStatus" :label="v.name" :value="v.id" :key="v.id"> </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item prop="warehousing_status">
                    <el-select v-model="searchForm.warehousing_status" placeholder="入库状态" size="small">
                        <el-option v-for="v in warehousingStatus" :label="v.name" :value="v.id" :key="v.id"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="settlement_status">
                    <el-select v-model="searchForm.settlement_status" placeholder="结算状态" size="small">
                        <el-option v-for="v in settlementStatus" :label="v.name" :value="v.id" :key="v.id"> </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询</el-button>
                    <el-button type="primary" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-col>
                    <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" @cellclick="rowCellClick" :page-size="15">
                    <el-table-column label="ID" align="center"  prop="id" width="65"></el-table-column>
                    <el-table-column label="采购单编号" align="center"  prop="order_sn" width="180"></el-table-column>
                    <el-table-column label="采购人" align="center"  prop="contact_name" width="150"></el-table-column>
                    <el-table-column label="发货单位" align="center"  prop="shipper" width="150"></el-table-column>
                    <el-table-column label="收货仓库" align="center"  prop="entrepot_name" width="150"></el-table-column>
                    <el-table-column label="采购状态" align="center"  prop="purchase_status" width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.purchase_status==1">待审核</span>
                            <span v-if="scope.row.purchase_status==2">未通过审核</span>
                            <span v-if="scope.row.purchase_status==3">通过审核</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="入库状态" align="center"  prop="warehousing_status" width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.warehousing_status==1">未入库</span>
                            <span v-if="scope.row.warehousing_status==2">部分入库</span>
                            <span v-if="scope.row.warehousing_status==3">完全入库</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="结算状态" align="center"  prop="settlement_status" width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.settlement_status==1">未结算</span>
                            <span v-if="scope.row.settlement_status==2">已结算</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="SKU种类" align="center"  prop="sku_type" width="150"></el-table-column>
                    <el-table-column label="总数量" align="center"  prop="goods_total" width="150"></el-table-column>
                    <el-table-column label="商品金额" align="center"  prop="goods_money_total" width="150"></el-table-column>
                    <el-table-column label="到货时间" align="center"  prop="contact_time" width="150"></el-table-column>
                    <el-table-column label="备注" align="center"  prop="remark" width="150"></el-table-column>

                    <!--<el-table-column  label="操作" align="center" width="200">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-button type="info" size="small" @click="showEdit(scope.row)">编辑</el-button>-->
                            <!--<el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>-->
                        <!--</template>-->
                    <!--</el-table-column>-->

                    <div slot="buttonbar">
                        <el-button type="primary" size="small" @click="checkOrder">采购单审核</el-button>
                        <el-button type="primary" size="small" @click="showDeliverGoods">确认发货</el-button>
                        <el-button type="primary" size="small" @click="showSignGoods">签收入库</el-button>
                    </div>

                </TableProxy>

            </el-col>
        </el-row>
        <br>
        <SubDetail :row="row_model" ></SubDetail>
        <!-- 写弹窗组件 -->
        <Add name='add-express-company'
             :ajax-proxy="ajaxProxy"
             :distributors="distributors"
             @submit-success="handleReload">
        </Add>
        <CheckOrder name='add-check-order'
             :ajax-proxy="ajaxProxy"
             @submit-success="handleReload">
        </CheckOrder>

        <DeliverGoods name='add-deliver-goods'
             :ajax-proxy="actualDeliveryExpressAjaxProxy"
             @submit-success="handleReload"
             @submit-ok="getPurchaseOrderGoods(row_model.id)">
        </DeliverGoods>
        <SignGoods name='add-sign-goods'
             :ajax-proxy="ajaxProxy"
             @submit-success="handleReload"
             >
        </SignGoods>

        <Edit name='edit-express-company'
              :ajax-proxy="ajaxProxy"
              @submit-success="handleReload">
        </Edit>
    </div>
</template>
<script>
    import PageMix from '../../mix/Page';
    import SearchTool from '../../mix/SearchTool';
    import DataTable from '../../mix/DataTable';
    import config from '../../mix/Delete';
    import WarehousingProcessAjaxProxy from '../../ajaxProxy/WarehousingProcess';
    import ActualDeliveryExpressAjaxProxy from '../../ajaxProxy/ActualDeliveryExpress';

    import DistributionCenterProxy from '../../packages/DistributionCenterSelectProxy';
    import PurchaseOrderGoods from '../../packages/PurchaseOrderGoodsSelectProxy';

    import Add from './Add';
    import Edit from './Edit';
    import CheckOrder from './CheckOrder';
    import DeliverGoods from './DeliverGoods';
    import SubDetail from './SubDetail';
    import SignGoods from './SignGoods';
    export default {
        name: 'PurchaseList',
        pageTitle:"采购单列表",
        mixins:[PageMix,SearchTool,DataTable,config,WarehousingProcessAjaxProxy,ActualDeliveryExpressAjaxProxy],
        components:{
            Add,
            Edit,
            CheckOrder,
            DeliverGoods,
            SubDetail,
            SignGoods,
        },
        data(){
            return {
                mainparam:"",
                mainurl:WarehousingProcessAjaxProxy.getUrl(),
                ajaxProxy:WarehousingProcessAjaxProxy,
                actualDeliveryExpressAjaxProxy:ActualDeliveryExpressAjaxProxy,
                searchForm:{
                order_sn:'',
                complainType:{},
                entrepot_id:'',
                shipper:'',
                purchase_status:'',
                warehousing_status:'',
                settlement_status:'',
                },
                distributors:[],
                goodsList:[],
                purchaseStatus:[
                    {id:1,name:'待审核'},
                    {id:2,name:'未通过审核'},
                    {id:3,name:'通过审核'},
                ],
                warehousingStatus:[
                    {id:1,name:'未入库'},
                    {id:2,name:'部分入库'},
                    {id:3,name:'完全入库'},
                ],
                settlementStatus:[
                    {id:1,name:'未结算'},
                    {id:2,name:'已结算'},
                ],
                reFundCheckShow:false,
                row_model:null,
            }
        },
        methods:{
            onSearchChange(param){
                this.mainparam = JSON.stringify(param);
            },
            showAdd(){
                this.$modal.show('add-express-company');
            },

            showEdit(row){
                this.$modal.show('edit-express-company',{model:row});
            },
            getAjaxProxy(){
                return  this.ajaxProxy;
            },
            //订单审核
            checkOrder(){
                if (this.openDialogCheck()) {
                    this.$modal.show('add-check-order',{row:this.row_model});
                }
            },
            //确认发货
            showDeliverGoods(){
                if (this.openDialogCheck() && this.deliverDialogCheck()) {
                    this.$modal.show('add-deliver-goods',{row:this.row_model});
                }
            },
            //签收入库
            showSignGoods(){
                if (this.openDialogCheck() && this.deliverDialogCheck()) {
                    this.$modal.show('add-sign-goods',{row:this.row_model});
                }
            },
            openDialogCheck(){
                if (!this.hasCurrentRow()) {
                    this.$alert('请选择一行', '警告', {
                        confirmButtonText: '确定',
                    })
                    return false;
                } else {
                    return true;
                }
            },
            deliverDialogCheck(){
                if (this.row_model.purchase_status ==1) {
                    this.$alert('该订单还未审核，请先审核！', '警告', {
                        confirmButtonText: '确定',
                    })
                    return false;
                }else if(this.row_model.purchase_status ==2){
                    this.$alert('该订单未通过审核，请先修改！', '警告', {
                        confirmButtonText: '确定',
                    })
                    return false;
                }else{
                    return true;
                }
            },
            hasCurrentRow(){
                if (this.row_model) {
                    return true;
                } else {
                    return false;
                }
            },
            getPurchaseOrderGoods(id){
                //获取采购单商品数据
                let DistributionCenterSelect = new PurchaseOrderGoods({purchase_order_id:id}, this.getPurchaseOrderGoodsData, this);
                DistributionCenterSelect.load();
            },
            getPurchaseOrderGoodsData(res){
                this.goodsList = res.items;
            },
            rowCellClick(row){
                // this.getPurchaseOrderGoods(row.id);
                this.row_model=row;
                // this.rowId=row.id;
                if(!this.row_model){
                    this.reFundCheckShow = true;
                }else{
                    this.reFundCheckShow = false;
                }
            },
            getDistributionCenter(data){
                this.distributors = data.items;
            },
        },
        created(){
            this.$on('search-tool-change', this.onSearchChange);

            //获取配送中心数据
            let DistributionCenterSelect = new DistributionCenterProxy({}, this.getDistributionCenter, this);
            DistributionCenterSelect.load();
        },
        mounted(){

        },

    }
</script>
<style scoped>

</style>

