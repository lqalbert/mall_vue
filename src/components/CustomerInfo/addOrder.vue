<template>
    <div>
        <MyDialog title="添加订单" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form ref="addOrderForm" :model="addOrderForm" :label-width="labelWidth" :label-position="labelPosition">
                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="type" label="订单类型">
                            <el-select v-model="addOrderForm.type" size="small" @change="orderTypeChange">
                                <el-option v-for="ordertype in orderTypes" :value="ordertype.id" :label="ordertype.name" :key="ordertype.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item prop="express_deliver" label="指定快递">
                            <el-col :span="12"><el-select v-model="set_express" size="small" @change="expressChange">
                                <el-option v-for="item in freitemp" :value="item.id" :label="item.express" :key="item.id"></el-option>
                            </el-select></el-col>
                            <el-col :span="1">&nbsp;</el-col>
                            <el-col :span="11"><span>邮费: <span v-if="isIncludeFreight">包邮</span> <span v-else >{{ realfreight }}</span>  
                                合计 {{payMoney}}元</span></el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item prop="address" label="收货地址">
                            <el-radio-group v-model="addOrderForm.address" @change="addressChange">
                                <el-radio v-for="address in addressList" :label="address" :key="address.id" >{{ address.area_province_name }}-{{ address.area_city_name }}-{{ address.area_district_name }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注">
                            <el-input v-model="addOrderForm.express_remark" type="textarea" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <hr>
                <ChoseGoods  @add-goods="addGoods"></ChoseGoods>
                <el-row>
                    <el-col :span="24">
                        <el-table height="200" border :data="orderData">
                            <el-table-column label="序号"  width="80" type="index">
                            </el-table-column>
                            <el-table-column label="商品编号" prop="sku_sn" width="100" >
                            </el-table-column>
                            <el-table-column label="商品名称" prop="goods_name" >
                            </el-table-column>
                            <el-table-column label="商品单价" prop="price"  width="100">
                            </el-table-column>
                            <el-table-column label="购买数量" prop="goods_number"  width="100">
                            </el-table-column>
                            <el-table-column label="小记" prop="moneyNotes" width="100" >
                            </el-table-column>
                            <el-table-column label="操作" width="100" align="center">
                                <template slot-scope="scope">
                                    <el-button size="small" type="danger" @click="deleteRow(scope.row)">删 除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>

            </el-form>
            <div slot="dialog-foot" >
                <el-row type="flex" justify="end">
                    <el-col :span="6" >
                        <el-button @click="handleClose">取 消</el-button>
                        <submit-button
                                ref="submitbutton"
                                @click="handleSubmit"
                                :observer="dialogThis">
                            保 存
                        </submit-button>
                    </el-col>
                </el-row>
            </div>
        </MyDialog>
    </div>
</template>
      
<script>
import DialogForm from '@/mix/DialogForm';
import FreightAlgorithm from '@/packages/Freight';
import DeliverAddressAjax from '@/ajaxProxy/DeliveryAddress';
import ChoseGoods from './choseGoods';

import { mapGetters, mapMutations } from 'vuex';

    export default {
        name: 'addOrder',
        mixins:[DialogForm],
        components:{
            ChoseGoods
        },
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'90px',
                addressList:[],
                orderData:[],
                // totalMoney:0,
                addOrderForm:{
                    cus_id:'',
                    user_id:"",
                    deal_id:'',
                    deal_name:'',
                    address:null,
                    order_all_money:0,
                    discounted_goods_money:0,
                    order_pay_money:0,
                    order_goods:[],
                    order_address:[],
                    dev:[],
                    goods_number:'',
                    remark:'',
                    dep_group_realname:'',
                    cus_name:'',
                    group_id:'',
                    department_id:'',
                    express_delivery:'',
                    express_id:'',
                    order_remark:'',
                    express_remark:'',
                    // express_name:'',
                    type:'',
                    include_freight:0, // 不包邮 包邮,
                    freight:0.00 //运费
                },
                realfreight:0.00,
                set_express:""
            }
        },
        computed:{
            ...mapGetters([
                'user_id',
                'getUser',
            ]),
            orderTypes(){
                return this.$store.getters.getOrderTypes;
            },
            freitemp(){
                return this.$store.getters.getFreightTemplatesByEntrepot(this.$store.getters.userEntrepotId);
            },
            payMoney(){
                let d = this.totalMoney * this.discount()/100;
                return parseFloat(d.toFixed(2)) + parseFloat(this.realfreight);
            },
            totalMoney(){
                let s = 0;
                this.orderData.forEach((element)=>{
                    s += element.moneyNotes;
                })
                return s;
            },
            isIncludeFreight(){
                if (parseInt(this.realfreight) == 0) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        watch:{
            orderData(val, oldval){
                this.$emit('freight-change');
            },
            orderTypeChange(v){
                this.$emit('freight-change');
            }
        },
        methods:{
            onOpen(param){
                this.addOrderForm.cus_name = param.params.model.name;
                this.addOrderForm.user_id = param.params.model.mid_relative.user_id;
                this.addOrderForm.deal_id=this.user_id;
                this.addOrderForm.deal_name=this.getUser.realname;
                this.addOrderForm.cus_id = param.params.model.id;
                this.getAddress(this.addOrderForm.cus_id);
                this.setDefaultTemplate();//设置默认模板
            },
            handleSubmit(){
                // this.addOrderForm.goods_id = this.goodsIds.join(',');
                this.addOrderForm.order_all_money = this.totalMoney; //商品金额
                this.addOrderForm.order_pay_money = this.payMoney; //计算打折 + 运费
                this.addOrderForm.discounted_goods_money = this.addOrderForm.order_pay_money - parseFloat(this.realfreight);
                this.addOrderForm.freight = this.realfreight;
                this.addOrderForm.include_freight = this.isIncludeFreight;
                this.addOrderForm.order_goods = this.orderData;
                // this.addOrderForm.order_address = this.orderAddressData;

                if (this.addOrderForm.order_goods.length == 0) {
                    this.$message.error('商品数量不能为0');
                    this.$emit('valid-error');
                    return ;
                }

                if ( !this.addOrderForm.address ) {
                    this.$message.error('请选地址');
                    this.$emit('valid-error');
                    return ;
                }

                if (this.addOrderForm.type == "") {
                    this.$message.error("选择订单类型");
                    this.$emit('valid-error');
                    return;
                }

                this.formSubmit('addOrderForm');
            },
            getAddress(cus_id){
                DeliverAddressAjax.get({cus_id:cus_id}).then((response)=>{
                    this.addressList = response.data.items;
                }).catch(()=>{
                    this.$message.error("加载收货地址出错");
                });
            },
            setDefaultTemplate(){
                this.freitemp.forEach(element => {
                    if (element.is_default == 1) {
                        this.addOrderForm.express_delivery = element.express;
                        this.set_express = element.id;
                        FreightAlgorithm.setTemplate(element);
                    }
                });
            },
            addGoods(v){
                this.orderData.push(v);
            },
            deleteRow(row){
                let index = this.orderData.indexOf(row);
                if( index > -1){
                    this.orderData.splice(index,1);
                    this.totalMoney -= row.moneyNotes;
                }
            },
            orderTypeChange(){
                FreightAlgorithm.setOrderType(this.getCurrentOrderType());
                this.$emit('freight-change');
            },
            expressChange(v){
                FreightAlgorithm.setTemplate(this.getCurrentFreightTemplate());
                this.$emit('freight-change');
            },
            addressChange(){
                FreightAlgorithm.setAddress(this.addOrderForm.address);
                this.$emit('freight-change');
            },
            discount(){
                let o = this.getCurrentOrderType();
                return o ? o.discount : 100;
            },
            getCurrentOrderType(){
                let selectedId = this.addOrderForm.type;
                return  this.orderTypes.find((element)=>{
                    return element.id == selectedId;
                });
            },
            getCurrentFreightTemplate(){
                let selectedId = this.set_express;
                return  this.freitemp.find((element)=>{
                    return element.id == selectedId;
                });
            },
            freight(){
                FreightAlgorithm.setPrice(this.totalMoney);
                this.realfreight =  FreightAlgorithm.getFreight();
            },
            handleClose(){
                this.addressList=[];
                this.orderData=[];
                this.$refs.addOrderForm.resetFields();
                this.deal_id='';
                this.deal_name = '',
                this.$modal.hide('add-orderBasic');
            },
            getAjaxProxy(){
                return  this.ajaxProxy;
            },
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            },
        },
        created(){
            this.$store.dispatch('initOrderTypes');
            this.$store.dispatch('initFreightTemplate', this.$store.getters.userEntrepotId);
            
            FreightAlgorithm.setScope(this);
            this.$on('freight-change', this.freight);

            let user = this.getUser;
            this.addOrderForm.deal_id =  user.id;
            this.addOrderForm.deal_name = user.realname;
        },
        
        beforeDestroy(){
            this.goodsProxy = null;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-radio+.el-radio {
        margin-left: 0px;
    }
</style>
      