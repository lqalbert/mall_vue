<template>
    <div>
        <MyDialog title="添加订单" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form ref="addOrderForm" :model="addOrderForm" :label-width="labelWidth" :label-position="labelPosition">
                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="type" label="订单类型">
                            <el-select size="small">
                                <el-option v-for="ordertype in orderTypes" :value="ordertype.id" :label="ordertype.name" :key="ordertype.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item prop="express_deliver" label="指定快递">
                            <el-col :span="12"><el-select size="small" >
                                    <el-option v-for="item in freitemp" :value="item.id" :label="item.name" :key="item.id"></el-option>
                            </el-select></el-col>
                            <el-col :span="1">&nbsp;</el-col>
                            <el-col :span="11"><span>邮费: 合计 xx元</span></el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item prop="address" label="收货地址">
                            <el-radio-group v-model="addOrderForm.address" >
                                <el-radio v-for="address in addressList" :label="address" :key="address.id">{{ address.area_province_name }}-{{ address.area_city_name }}-{{ address.area_district_name }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注">
                            <el-input type="textarea" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <hr>
                <ChoseGoods  @add-goods="addGoods"></ChoseGoods>
                <el-row>
                    <el-col :span="24">
                        <el-table >
                            <el-table-column label="序号"  width="80" type="index">
                            </el-table-column>
                            <el-table-column label="商品编号"  width="100" >
                            </el-table-column>
                            <el-table-column label="商品名称"  >
                            </el-table-column>
                            <el-table-column label="商品单价"  width="100">
                            </el-table-column>
                            <el-table-column label="购买数量"  width="100">
                            </el-table-column>
                            <el-table-column label="小记" width="100" >
                            </el-table-column>
                            <el-table-column label="操作" width="100" >
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
                
                addOrderForm:{
                    cus_id:'',
                    user_id:"",
                    deal_id:'',
                    deal_name:'',
                    goods_id:"",
                    // address_id:"",
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
                    express_name:'',
                    type:'',
                    include_freight:0, // 不包邮 包邮,
                    freight:0.00 //运费
                }
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
            
        },
        methods:{
            onOpen(param){
                this.addOrderForm.cus_name = param.params.model.name;
                this.addOrderForm.user_id = param.params.model.mid_relative.user_id;
                this.addOrderForm.deal_id=this.user_id;
                this.addOrderForm.deal_name=this.getUser.realname;
                // this.cus_id = param.params.model.id;
                this.addOrderForm.cus_id = param.params.model.id;
                // this.addOrderForm.dep_group_realname = this.setDepGroupRealname(this.user_id);
                this.getAddress(this.addOrderForm.cus_id);

                this.setDefaultTemplate();//设置默认模板
            },
            
            
            handleSubmit(){

            },
            getAddress(cus_id){
                DeliverAddressAjax.get({cus_id:cus_id}).then((response)=>{
                    this.addressList = response.data.items;
                }).catch(()=>{
                    this.$message.error("加载收货地址出错");
                });
            },
            setDefaultTemplate(){

            },
            addGoods(){
                
            }
        },
        created(){
            this.$store.dispatch('initOrderTypes');
            this.$store.dispatch('initFreightTemplate', this.$store.getters.userEntrepotId);
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
      