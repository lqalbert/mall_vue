<template>
    <div>
        <MyDialog title="发起退货" :name="name" :width="width" :height="height" @before-open="onOpen" @before-close="onBeforeClose">
            <el-form ref="rowInfoForm" size="small" :model="rowInfoForm" :label-width="labelWidth" :label-position="labelPosition">
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
                            <el-form-item label="退款单位" prop="remark">
                                <el-input  class="name-input"  v-model="rowInfoForm.remark"  placeholder="退款单位" ></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="退货运费" prop="remark">
                                <el-input  class="name-input"  v-model="rowInfoForm.remark"  placeholder="退货运费" ></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="收货单位" prop="remark">
                                <el-input  class="name-input"  v-model="rowInfoForm.remark"  placeholder="收货单位" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="重新发货单位" prop="remark">
                                    <el-input  class="name-input"  v-model="rowInfoForm.remark"  placeholder="重新发货单位" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="退货快递公司" prop="remark">
                                <el-input  class="name-input"  v-model="rowInfoForm.remark"  placeholder="退货快递公司" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="退货快递单号" prop="remark">
                                <el-input  class="name-input"  v-model="rowInfoForm.remark"  placeholder="退货快递单号" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>

                        <el-col :span="12">
                            <el-form-item label="退货服务费" prop="remark">
                                <el-input  class="name-input"  v-model="rowInfoForm.remark"  placeholder="退货服务费" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="退货到付" prop="remark">
                                <el-select v-model="rowInfoForm.remark">
                                    <el-option value="1" label="是" ></el-option>
                                    <el-option value="1" label="否" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>

                        <el-col :span="12">
                            <el-form-item label="是否特殊处理" prop="remark">
                                <el-select v-model="rowInfoForm.remark">
                                    <el-option value="1" label="是" ></el-option>
                                    <el-option value="1" label="否" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="退款金额" prop="order_all_money">
                                <el-input  class="name-input"  v-model="rowInfoForm.order_all_money"  placeholder="退款金额" ></el-input>

                                <!--{{ model.order_all_money }} 元-->
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="退货经手人" prop="remark">
                                <el-input  class="name-input"  v-model="rowInfoForm.remark"  placeholder="退货经手人" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="订单状态" prop="status">
                                {{　model.status_text }}
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="退(换)货原因" prop="return_cause_id">
                                <el-select v-model="rowInfoForm.return_cause_id">
                                    <el-option v-for="v in return_cause" :value="v.id" :key="v.id" :label="v.name"></el-option>
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
                        <el-col :span="24">
                            <el-table :data="goods">
                                <el-table-column label="商品名称" prop="goods_name" align="center" width="110"></el-table-column>
                                <el-table-column label="商品类型" prop="goods_name" align="center" width="110"></el-table-column>
                                <el-table-column label="进货锁定价" prop="price" align="center" width="110"></el-table-column>
                                <el-table-column label="退(换)货原因" prop="return_cause_id" align="center" width="240">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.return_cause_id">
                                            <el-option v-for="v in return_cause" :value="v.id" :key="v.id" :label="v.name"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column label="退/换" prop="exchange_status" align="center" width="130">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.exchange_status" style="width:110px">
                                            <el-option value="0"  label="请选择" ></el-option>
                                            <el-option value="1"  label="退货"></el-option>
                                            <el-option value="2" label="换货"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column label="商品编号" prop="sku_sn" align="center" width="110"></el-table-column>
                                <el-table-column label="数量" prop="goods_number" align="center" width="80">
                                    <template slot-scope="scope">
                                        <el-input-number size="small" :min="1" style="width:60px" :controls="false" :max="scope.row.goods_number"
                                                         v-model="scope.row.goods_num" @change="numberChange">
                                        </el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column label="单价" prop="price" width="100"></el-table-column>
                                <el-table-column label="操作"  align="center" width="100">
                                    <template slot-scope="scope">
                                        <el-button type="danger" @click="delete(scope.row.id)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>

                    <!--<el-row>-->
                        <!--<el-col :span="16">-->
                            <!--<el-form-item label="备注" prop="remark">-->
                                <!--<el-input type="textarea" :rows="2" v-model="rowInfoForm.remark"-->
                                    <!--placeholder="请输入内容" size="small">-->
                                <!--</el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-row>-->

                    <!--<el-row>-->
                        <!--<el-col :span="16">-->
                            <!--<el-form-item v-for="(items,index) in rowInfoForm.express" :label="'快递号'+(index+1)" :key="index" :prop="'express.'+index+'.value'">-->
                                <!--<el-col :span="10"><el-input placeholder="快递号" size="small" v-model="items.express_sn"></el-input></el-col>-->
                                <!--<el-col :span="1">&nbsp;</el-col>-->
                                <!--<el-col :span="5"><el-button v-if="index!==0" size="small" @click.prevent="removeExpress(items)">删除</el-button></el-col>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item>-->
                                <!--<el-button size="small" type="info" icon="plus" @click="addExpress">添加快递号</el-button>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-row>-->
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
                        <submit-button  :observer="dialogThis" @click="beforeSubmit">
                            保 存
                        </submit-button>
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
                labelWidth: '150px',
                rowInfoForm: {
                    cus_id:"",
                    order_id: "",
                    order_sn: "",
                    user_id:'',
                    user_name:'',
                    group_id:'',
                    department_id:'',
                    type:0,
                    remark:'',
                    goods: [],
                    refund:"",
                    order_all_money:"",
                    return_cause_id:"",
                    express:[
                        {express_sn:''}
                    ],
                    entrepot_id:''
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

            }
        },
        computed:{
            ...mapGetters([
                'getUser'
            ]),
        },
        methods: {
            onOpen(param) {
                this.model = param.params;
                // console.log(this.model);
                OrderGoodsAjaxProxy.get({order_id: this.model.id}).then((response)=>{
                    response.data.items.forEach(element => {
                        element.goods_num = parseInt(element.goods_number);
                        element.type  = 0;
                        element.return_cause_id  = '';
                    });
                    this.goods = response.data.items;
                    console.log(this.goods);
                    // this.goods.return_cause_id = '';
                });
                this.rowInfoForm.order_id = this.model.id;
                this.rowInfoForm.order_sn = this.model.order_sn;
                this.rowInfoForm.order_all_money = this.model.order_all_money;
                this.rowInfoForm.entrepot_id = this.model.entrepot_id;
                this.rowInfoForm.user_id = this.getUser.id;
                this.rowInfoForm.user_name = this.getUser.realname;
                this.rowInfoForm.group_id = this.getUser.group_id;
                this.rowInfoForm.department_id = this.getUser.department_id;
                this.rowInfoForm.cus_id  = this.model.cus_id;
            },
            onBeforeClose(){
                this.multipleSelection = [];
                this.active = 0;
            },
            getAjaxPromise(model) {
                return AfterSaleAjaxProxy.create(model);
            },

            handleSelectionChange(v){
                this.multipleSelection = v;
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
            del(index){
                this.multipleSelection.splice(index,1);
            },
            numberChange(){
                this.$nextTick(function(){
                    this.sumPrice();
                });
            },
            sumPrice(){
                if (this.multipleSelection.length > 0) {
                    let goods_price = this.multipleSelection.map(element=>{
                        return element.goods_num * parseFloat(element.price);
                    });
                    
                    this.rowInfoForm.refund = goods_price.reduce((ac, cu)=>{
                        return ac+cu;
                    }).toFixed(2);
                } else {
                    this.rowInfoForm.refund = '0.00';
                }  
            },
            addExpress(){
                this.rowInfoForm.express.push({ express_sn: '' });
            },
            removeExpress(item){
                var index = this.rowInfoForm.express.indexOf(item);
                if (index !== -1) {
                    this.rowInfoForm.express.splice(index, 1);
                }
            },
            beforeSubmit(){
                this.rowInfoForm.goods = this.multipleSelection;
                

                this.formSubmit('rowInfoForm');
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

            multipleSelection:function(val, oldVal){
               
                this.sumPrice();
            }
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
