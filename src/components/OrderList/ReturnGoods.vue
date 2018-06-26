<template>
    <div>
        <MyDialog title="发起退货" :name="name" :width="width" :height="height" @before-open="onOpen" @before-close="onBeforeClose">
            <el-form ref="rowInfoForm" size="small" :rules="rules" :model="rowInfoForm" :label-width="labelWidth" :label-position="labelPosition">
                <el-steps :space="250" :active="active" finish-status="success" :center="true" :align-center="true">
                    <el-step title="订单信息"></el-step>
                    <el-step title="订单商品处理"></el-step>
                </el-steps>

                <div v-show="active==0">
                    <h5>订单信息</h5>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="订单号" prop="order_sn">
                                <el-input  class="name-input"  v-model="rowInfoForm.order_sn"  placeholder="订单号" ></el-input>

                                <!--{{ model.order_sn }}-->
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="客户ID" prop="cus_id">
                                <el-input  class="name-input"  v-model="rowInfoForm.cus_id"  placeholder="订单号" ></el-input>

                                <!--{{ model.cus_id }}-->
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="退款单位" prop="return_unit">
                                <el-input  class="name-input"  v-model="rowInfoForm.return_unit"  placeholder="退款单位" ></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="退货运费" prop="return_fee">
                                <el-input  class="name-input"  v-model="rowInfoForm.return_fee"  placeholder="退货运费" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="收货单位" prop="receive_unit">
                                <el-input  class="name-input"  v-model="rowInfoForm.receive_unit"  placeholder="收货单位" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="重新发货单位" prop="resend_unit">
                                    <el-input  class="name-input"  v-model="rowInfoForm.resend_unit"  placeholder="重新发货单位" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="退货快递公司" prop="express">
                                <el-input  class="name-input"  v-model="rowInfoForm.express"  placeholder="退货快递公司" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="退货快递单号" prop="express_sn">
                                <el-input  class="name-input"  v-model="rowInfoForm.express_sn"  placeholder="退货快递单号" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>

                        <el-col :span="12">
                            <el-form-item label="退货服务费" prop="service_fee">
                                <el-input  class="name-input"  v-model="rowInfoForm.service_fee"  placeholder="退货服务费" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="退货到付" prop="pay_at_return">
                                <el-select v-model="rowInfoForm.pay_at_return">
                                    <el-option :value="0" label="否" ></el-option>
                                    <el-option :value="1" label="是" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="是否特殊处理" prop="is_special">
                                <el-select v-model="rowInfoForm.is_special">
                                    <el-option :value="0" label="否" ></el-option>
                                    <el-option :value="1" label="是" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="退款金额" prop="fee">
                                <el-input  class="name-input"  v-model="rowInfoForm.fee"  placeholder="退款金额" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="重发运费" prop="resend_fee">
                                <el-input  class="name-input"  v-model="rowInfoForm.resend_fee"  placeholder="重发运费" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="重发服务费" prop="reservice_fee">
                                <el-input  class="name-input"  v-model="rowInfoForm.reservice_fee"  placeholder="重发服务费" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="退货发起人" prop="user_name">
                                <el-input  class="name-input"  v-model="rowInfoForm.user_name"  placeholder="退货经手人" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="配送中心" prop="entrepot_id">
                                <el-select v-model="rowInfoForm.entrepot_id">
                                    <el-option v-for="entrepot in entrepots" :key="entrepot.id" :label="entrepot.name" :value="entrepot.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="退货备注信息" prop="remark">
                                <el-input type="textarea" :rows="2" v-model="rowInfoForm.remark"
                                          placeholder="请输入退货备注信息" size="small">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </div>

                <div v-show="active==1">

                    <h5>订单商品</h5>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="退(换)货原因" prop="return_cause_id">
                                <el-select v-model="rowInfoForm.return_cause_id" @change="reasonChange">
                                    <el-option v-for="v in return_cause" :value="v.name" :key="v.id" :label="v.name"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-table :data="goods">
                                <el-table-column label="商品名称" prop="goods_name" align="center" width="110"></el-table-column>
                                <!-- <el-table-column label="商品类型" prop="goods_name" align="center" width="110"></el-table-column> -->
                                
                                <el-table-column label="退(换)货原因" prop="reason" align="center" width="240">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.reason" size="small">
                                            <el-option v-for="v in return_cause" :value="v.name" :key="v.id" :label="v.name"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column label="退/换" prop="status" align="center" width="130">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.status" style="width:110px" size="small">
                                            <el-option :value="1"  label="退货"></el-option>
                                            <el-option :value="2" label="换货"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column label="入/出库" prop="inventory" align="center" width="130">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.inventory" style="width:110px" size="small">
                                            <el-option :value="0"  label="入库"></el-option>
                                            <el-option :value="1" label="出库"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column label="商品编号" prop="sku_sn" align="center" width="110"></el-table-column>
                                <el-table-column label="数量" prop="return_num" align="center" width="80">
                                    <template slot-scope="scope">
                                        <el-input-number 
                                            size="small" 
                                            :min="1" 
                                            style="width:60px" 
                                            :controls="false" 
                                            :max="scope.row.goods_number"
                                            v-model="scope.row.return_num" >
                                        </el-input-number>
                                    </template>
                                </el-table-column>
                                
                                <el-table-column label="操作"  align="center" width="100">
                                    <template slot-scope="scope">
                                        <el-button type="danger" @click="deletes(scope.$index)" size="small">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </div>
            </el-form>

            <div slot="dialog-foot" class="dialog-footer">
                <el-row type="flex" justify="space-between">
                    <el-col :span="12" class="button_step">
                        <el-button v-if="active>0"  @click="prev" class="pull-left">上一步</el-button>
                        <el-button v-if="active==0" @click="next" class="pull-left">下一步</el-button>
                    </el-col>
                    <el-col :span="12" v-if="active==1">
                        <el-button @click="handleClose">取 消</el-button>
                        <el-button type="primary" @click="beforeSubmit">保 存</el-button>
                        <!-- <submit-button  :observer="dialogThis" @click="beforeSubmit">
                            保 存
                        </submit-button> -->
                    </el-col>
                </el-row>   
            </div>
        </MyDialog>
    </div>
</template>

<script>
    import DialogForm from '../../mix/DialogForm';
    import OrderGoodsAjaxProxy from '@/ajaxProxy/Ordergoods';
    import AfterSaleAjaxProxy from '@/ajaxProxy/AfterSale';
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
                multipleSelection:[],
                active:0,
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
            }
        },
        computed:{
            ...mapGetters([
                'getUser'
            ]),

            entrepots(){
                return this.$store.getters.getEntrepots ;
            }
        },
        methods: {
            onOpen(param) {
                this.model = param.params;
                OrderGoodsAjaxProxy.get({order_id: this.model.id}).then((response)=>{
                    
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
            },
            onBeforeClose(){
                // this.multipleSelection = [];
                this.active = 0;
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
            }
        },
        watch: {
            // model: function (val, oldVal) {
            //     for (const key in this.rowInfoForm) {
            //         if (this.rowInfoForm.hasOwnProperty(key)) {
            //             // console.log(key);
            //             this.rowInfoForm[key] = val[key]
            //         }
            //     }
            // },

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
