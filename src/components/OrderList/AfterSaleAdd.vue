<template>
    <div>
        <MyDialog title="发起退换货" :name="name" :width="width" :height="height" @before-open="onOpen" @before-close="onBeforeClose">
            <el-form ref="rowInfoForm" size="small" :rules="rules" :model="rowInfoForm" :label-width="labelWidth" :label-position="labelPosition">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="订单号" >
                            {{ rowInfoForm.order_sn }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="销售人员" >
                            {{ rowInfoForm.user_name }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="退换操作人" >
                            {{ rowInfoForm.user_name }}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="物流公司" >
                            {{ assign.express_name }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="快递单号" >
                            {{ assign.express_sn }}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="收货人姓名" >
                            {{ address.name }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="收货人手机" >
                            {{ address.fixed_telephone }}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="收货地址" >
                            {{ address.address }}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-table :data="goods">
                            <el-table-column label="商品编码" prop="sku_sn" align="center" width="150"></el-table-column>
                            <el-table-column label="商品名称" prop="goods_name" align="center" width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column label="退换类型"   align="center" width="150"  >
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.status" style="width:110px" size="small" @change="triggerCalculate">
                                        <el-option :value="0" label="正常发货"></el-option>
                                        <el-option :value="1"  label="退货"></el-option>
                                        <el-option :value="2" label="换货"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="退换数量"   align="center" width="150"  >
                                <template slot-scope="scope">
                                    <el-input-number 
                                        size="small" 
                                        :min="1" 
                                        style="width:60px" 
                                        :controls="false" 
                                        :max="scope.row.goods_number"
                                        v-model="scope.row.return_num" 
                                        @change="triggerCalculate">
                                    </el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column label="退换金额"   align="center" width="150"  >
                                <template slot-scope="scope">
                                    <el-input size="small" v-model="scope.row.saled_price" @blur="triggerCalculate"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button type="danger" size="mini" @click.stop="goodsDelet(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <br>
                <el-row>
                    <el-col :span="12">
                        合计退款金额：{{ rowInfoForm.fee }} 元
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="退款收取运费">
                                <el-input v-model="rowInfoForm.return_fee"><template slot="append">元</template></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="退换原因">
                            <el-input type="area" :rows="2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input type="area" :rows="2"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="dialog-foot" class="right">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        @click="beforeSubmit"
                        :observer="dialogThis">
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>

<script>
    import DialogForm from '@/mix/DialogForm';
    import OrderGoodsAjaxProxy from '@/ajaxProxy/Ordergoods';
    import AfterSaleAjaxProxy from '@/ajaxProxy/AfterSale';
    import AssignAjaxProxy from '@/ajaxProxy/Assign';
    import {PRICE_REG} from '../../config/index';

    import { mapGetters } from 'vuex';
    export default {
        name: 'ReturnGoods',
        mixins: [DialogForm],
        props: {
            ajaxProxy: {
                required: true,
                type: Object,
                default: null
            }
        },
        data() {
            return {
                dialogThis: this,
                labelPosition: "right",
                labelWidth: '120px',
                rowInfoForm: {
                    cus_id:"",
                    order_id: "",
                    order_sn: "",
                    user_id:'',
                    user_name:'',     
                    remark:'',
                    entrepot_id:'',
                    return_unit:'',
                    return_fee:'',
                    receive_unit:'',
                    resend_unit:'',
                    express:'',
                    express_sn:'',
                    service_fee:'',
                    pay_at_return:0,
                    is_special:0,
                    fee:'',
                    user_name:'',
                    remark:'',
                    resend_fee:'',
                    reservice_fee:''
                },
                goods:[],
                return_cause:[
                    {id:1,name:'a.非常规产品问题(总部担责)'},
                    {id:2,name:'b.常规产品问题(总部3成交方7担责)'},
                    {id:3,name:'b1.常规产品过敏问题(总部3成交方7担责)'},
                    {id:4,name:'b2.常规包装质量问题(总部3成交方7担责)'},
                    {id:5,name:'c.物流因素及运输破损(发货方担责找快递索赔)'},
                    {id:6,name:'d.订单录入错误(成交方担责)'},
                    {id:7,name:'e.错发或漏发(发货方担责)'},
                    {id:8,name:'f.客户拒收(成交方担责)'},
                    {id:9,name:'g.其他无理由退换(成交方担责)'},
                    {id:10,name:'h.产品破损-无理由退换(成交方5发货方5)'},
                ],
                model: {},
                rules:{
                    return_fee:[
                        {pattern:PRICE_REG,message: '格式为xx.xx', trigger:'blur'}
                    ],
                    service_fee:[
                        {pattern:PRICE_REG,message: '格式为xx.xx', trigger:'blur'}
                    ],
                    fee:[
                        {required:true,pattern:PRICE_REG,message: '格式为xx.xx', trigger:'blur'}
                    ],
                    resend_fee:[
                        {pattern:PRICE_REG,message: '格式为xx.xx', trigger:'blur'}
                    ],
                    reservice_fee:[
                        {pattern:PRICE_REG,message: '格式为xx.xx', trigger:'blur'}
                    ],
                },
                assignRow:null,
                addressRow:null
            }
        },
        computed:{
            ...mapGetters([
                'getUser'
            ]),

            entrepots(){
                return this.$store.getters.getEntrepots ;
            },
            assign(){
                if (this.assignRow) {
                    return this.assignRow
                } else {
                    return {express_name: "", express_sn: "" };
                }
            },
            address(){
                if (this.addressRow) {
                    return this.addressRow
                } else {
                    return {name:"", fixed_telephone:"", address:""};
                }
            }
        },
        methods: {
            onOpen(param) {
                this.model = param.params;
                OrderGoodsAjaxProxy.get({order_id: this.model.id, appends:['saled_price']}).then((response)=>{
                    
                    response.data.items.forEach(element => {
                        element.return_num = parseInt(element.goods_number);
                    });
                    this.goods = response.data.items;
                });
                this.rowInfoForm.order_id = this.model.id;
                this.rowInfoForm.order_sn = this.model.order_sn;
                
                this.rowInfoForm.entrepot_id = this.model.entrepot_id;
                this.rowInfoForm.user_id = this.getUser.id;
                this.rowInfoForm.user_name = this.getUser.realname;
               
                this.rowInfoForm.cus_id  = this.model.cus_id;

                AssignAjaxProxy.get({order_id: this.model.id, fields:['id','express_name','express_sn','address_id'], with:['address']}).then((response)=>{
                    this.assignRow = response.data.items[0];
                    this.addressRow = this.assignRow.address;
                }).catch(()=>{

                });
            },
            onBeforeClose(){
                
                
            },
            getAjaxPromise(model) {
                return AfterSaleAjaxProxy.create(model);
            },
            next(){
                this.active ++ ;
            },
            prev(){
                if (this.active > 1) {
                    this.active --;
                } else {
                    this.active = 0;
                } 
            },
            beforeSubmit(){
                // this.rowInfoForm.goods = this.multipleSelection;
                this.rowInfoForm.goods = this.goods;
                if (this.rowInfoForm.goods.length == 0) {
                    this.$message.error('不能没有商品');
                    return ;
                }
                
                for (let i = 0; i < this.rowInfoForm.goods.length; i++) {
                    let element = this.rowInfoForm.goods[i];
                    if(element.reason== null|| element.reason== ''){
                        this.$message.error('请选择退换货原因');
                        return ;
                    }
                    if(element.status == 0){
                        this.$message.error('请选择退/换货');
                        return ;
                    }
                    if(element.inventory == null){
                        console.log(element);
                        this.$message.error('请选择入/出货');
                        return ;
                    }
                }
                // console.log(this.goods);
                this.formSubmit('rowInfoForm');
            },
            deletes(index){
                this.goods.splice(index, 1);
            },
            reasonChange(v){
                this.goods.forEach((element)=>{
                    element.reason = v;
                })
            },
            goodsDelet(row){
                this.goods = this.goods.filter((item)=>{
                    return item.id != row.id;
                })
            },
            caluRefundAll(){
                //遍历goods  退货的 数量 * 退款金额
                if (this.goods.length > 0) {
                    let re = 0;
                    this.goods.forEach(function (value) {
                        if (value.status == 1) {
                              re + value.return_num * value.saled_price
                        } 
                    });

                   
                    //this.rowInfoForm.return_fee =  
                    console.log('caluRefundAll', re );
                }
                
            },
            triggerCalculate(){
                this.caluRefundAll();
            }
        },
        watch: {
            goods(val, oldVal) {
                this.triggerCalculate();
            }
        },
        created(){
            this.$store.dispatch('initEntrepots');
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .button_step {
        text-align: left;
    }
    .name-input{
        max-width: 217px;
    }
</style>
