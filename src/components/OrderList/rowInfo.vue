<template>
    <div >
        <MyDialog title="查看" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form ref="rowInfoForm" :model="rowInfoForm" :label-width="labelWidth" :label-position="labelPosition">
                
                <el-tabs v-model="activeName">
                    <el-tab-pane label="基本信息" name="First">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item  label="订单号" prop="id">
                                    {{ model.order_sn }}
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="总金额" prop="order_all_money">
                                    {{ model.order_all_money }}
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span='12'>
                                <el-form-item label="应付金额" prop="order_pay_money">
                                    <el-input class="name-input" v-model="rowInfoForm.order_pay_money" size="small"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span='12'>
                                <el-form-item label="购买客户"  prop="cus_id">
                                    {{ model.cus_name }}
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col :span='12'>
                                <el-form-item label="成交员工" prop="deal_name">
                                        {{ model.deal_name }}
                                </el-form-item>
                            </el-col>
                            <!-- <el-col :span="12">
                                <el-form-item label="发货状态" prop="product_status">
                                    <el-select v-model='rowInfoForm.product_status' :disabled="true">
                                        <el-option
                                                v-for="shipping_status in shipping_statuslist"
                                                :label="shipping_status.status"
                                                :value="shipping_status.id"
                                                :key="shipping_status.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col> -->
                        </el-row>
                        <!-- <el-row> -->
                            <!-- <el-col :span="12">
                                <el-form-item label="订单状态" prop="status">
                                    <el-select v-model='rowInfoForm.status' clearable>
                                        <el-option
                                                v-for="order_status in order_statuslist"
                                                :label="order_status.status"
                                                :value="order_status.id"
                                                :key="order_status.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col> -->
                            <!-- <el-col :span='12'>
                                <el-form-item label="配送方式" prop="shipping_name">
                                    <el-input v-model="rowInfoForm.shipping_name" size="small" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col> -->
                        <!-- </el-row> -->
                        <!--<el-row>-->
                        <!--<el-col :span="12">-->
                            <!--<el-form-item label="审核状态" prop="order_status">-->
                                <!--<el-select v-model='rowInfoForm.check_status'>-->
                                    <!--<el-option-->
                                            <!--v-for="order_status in check_status"-->
                                            <!--:label="order_status.status"-->
                                            <!--:value="order_status.id"-->
                                            <!--:key="order_status.id"-->
                                            <!--&gt;</el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--</el-row>-->
                    </el-tab-pane>
                    <el-tab-pane label="收货地址" name="Second">
                        <el-row>
                            <el-col :span='12'>
                                <el-form-item label="收货人姓名:"  prop="name">
                                    {{ addresstableData.name }}
                                </el-form-item>
                            </el-col>
                            <el-col :span='12'>
                                <el-form-item label="收货电话:"  prop="phone">
                                    {{ addresstableData.phone }}
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span='6'>
                                <el-form-item label="省:"  prop="area_province_name">
                                    {{ addresstableData.area_province_name }}
                                </el-form-item>
                            </el-col>
                            <el-col :span='6'>
                                <el-form-item label="市:"  prop="area_city_name">
                                    {{ addresstableData.area_city_name }}
                                </el-form-item>
                            </el-col>
                            <el-col :span='6'>
                                <el-form-item label="区/县:"  prop="area_district_name">
                                    {{ addresstableData.area_district_name }}
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span='12'>
                                <el-form-item label="邮编:"  prop="zip_code">
                                    {{ addresstableData.zip_code }}
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span='20'>
                                <el-form-item label="详细地址:"  prop="address">
                                    {{ addresstableData.address }}
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="商品明细" name="Third">
                        <el-row>
                            <el-col :span='12'>
                                <el-form-item label="商品名称:"  prop="goods_name">
                                    {{ goodstableData.goods_name }}
                                </el-form-item>
                            </el-col>
                            <el-col :span='12'>
                                <el-form-item label="商品数量:"  prop="goods_number">
                                    {{ goodstableData.goods_number }}
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span='12'>
                                <el-form-item label="商品价格:"  prop="price">
                                    {{ goodstableData.price }}
                                </el-form-item>
                            </el-col>
                            <el-col :span='12'>
                                <el-form-item label="编号:"  prop="sku_sn">
                                    {{ goodstableData.sku_sn }}
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span='12'>
                                <el-form-item label="商品单位:"  prop="unit_type">
                                    {{ goodstableData.unit_type }}
                                </el-form-item>
                            </el-col>
                            <el-col :span='12'>
                                <el-form-item label="商品重量:"  prop="weight">
                                    {{ goodstableData.weight }}g
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span='20'>
                                <el-form-item label="备注:"  prop="remark">
                                    {{ goodstableData.remark }}
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>   
            </el-form>

            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        :observer="dialogThis"
                        @click="formSubmit('rowInfoForm')" >
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>

<script>
    import DialogForm from '../../mix/DialogForm';
    import OrderGoodsAjaxProxy from "@/packages/OrderGoodsAjaxProxy";
    import OrderAddressAjaxProxy from "@/packages/OrderAddressAjaxProxy";
    import status from './status';
    export default {
        name: 'addDialog',
        mixins:[DialogForm,status],
        props:{

        },
        ajaxProxy:{
            required:true,
            type: Object,
            default: null
        },
        data () {
            return {
                check_status:[
                    {id:'0', status:'通过'},
                    {id:'1', status:'未通过'},
                    {id:'2', status:'未审核'}
                ],
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'100px',
                rowInfoForm:{
                    goods_name:'',
                    consignee:'',
                    order_all_money:'',
                    order_pay_money:'',
                    order_status:'',
                    pay_name:'',
                    shipping_status:'',
                    shipping_name:'',
                    order_time:'',
                    id:""
                },
                model:{},
                row:null,
                activeName:'First',
                addresstableData:{},
                goodstableData:{},

                tabFirst:false,
                tabSecond:false,
                tabThird:false,
                
            }
        },

        methods:{

            onOpen(event){
            //   this.rowInfoForm = event.params.rowData;
                this.model = event.params.rowData;
                this.row = event.params.rowData;
            },
            getAjaxPromise(model){
                delete model.cus_name;
                delete model.buyer;
                delete model.user_name;
                delete model.users;
                return this.ajaxProxy.update(model.id, model);
            },
            getOrderAddress(data){
                console.log(data);
                this.addresstableData = data.items[0];
            },
            getOrderGoods(data){
                console.log(data);
                this.goodstableData = data.items[0];
            },
            handleSecond(row){
                // console.log(row);
                // console.log('second');//OrderAddressProxy
                this.OrderAddressProxy.setParam({
                    order_id:row.id,
                }).load();
                this.tabSecond = true;
            },
            handleThird(row){
                // console.log(row);
                // console.log('third');
                this.OrderGoodsProxy.setParam({
                    order_id:row.id,
                }).load();
                this.tabThird = true;
            },
        },
        watch:{
            model:function(val, oldVal){
                for (const key in this.rowInfoForm) {
                    if (this.rowInfoForm.hasOwnProperty(key)) {
                        console.log(key);
                        this.rowInfoForm[key] = val[key]
                    }
                }
            },
            row:function(val, oldVal) {
                if(this.activeName != 'First'){
                    this['handle'+ this.activeName].call(this, this.model);
                    this.tabSecond = false;
                    this.tabThird = false;
                }
            },
            activeName:function(val, olvVal){
                // console.log(this.activeName);
                if (!this['tab'+ val] && this.row !== null && val != 'First') {
                    this['handle'+ val].call(this, this.row);
                }
            }
        },
        created(){
            this.OrderAddressProxy = new OrderAddressAjaxProxy({fields:["*"]},    this.getOrderAddress,this);
            this.OrderGoodsProxy = new OrderGoodsAjaxProxy({fields:["*"]},    this.getOrderGoods,this);
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        /* max-width: 217px; */
        max-width: 140px;
    }
</style>

