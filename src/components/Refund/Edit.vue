<template>
    <MyDialog title="退换货编辑" :name="name" :width="width" :height="height" @before-open="onOpen">
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
                                    <el-input  class="name-input"  v-model="rowInfoForm.cus_id"  placeholder="客户ID" ></el-input>
    
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
                                        <el-option value="0" label="否" ></el-option>
                                        <el-option value="1" label="是" ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
    
                            <el-col :span="12">
                                <el-form-item label="是否特殊处理" prop="is_special">
                                    <el-select v-model="rowInfoForm.is_special">
                                        <el-option value="0" label="否" ></el-option>
                                        <el-option value="1" label="是" ></el-option>
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
                                <el-form-item label="退货发起人" prop="user_name">
                                    <el-input  class="name-input"  v-model="rowInfoForm.user_name"  placeholder="退货经手人" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="配送中心" prop="entrepot_id">
                                    <el-select v-model="rowInfoForm.entrepot_id">
                                        
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
                                                <el-option value="0"  label="入库"></el-option>
                                                <el-option value="1" label="出库"></el-option>
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
                    <el-col :span="12" class="text-left">
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
</template>

<script>
    import DialogForm from '../../mix/DialogForm';
    import OrderGoodsAjaxProxy from '@/ajaxProxy/Ordergoods';

    export default {
        name: 'Edit',
        mixins:[DialogForm],
        props:{
            ajaxProxy:{
                type:Object
            }
        },
        data () {
            return {
                dialogThis: this,
                labelPosition: "right",
                labelWidth: '150px',
                rowInfoForm: {
                    id:"",
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
                    pay_at_return:'',
                    is_special:'',
                    fee:'',
                    user_name:'',
                    remark:''
                },
                goods:[],
                active:0,
                return_cause:[]
            }
        },
        methods:{
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

            onOpen(param) {
               
                this.model = param.params;
                OrderGoodsAjaxProxy.get({order_id: this.model.order_id}).then((response)=>{
                    
                    response.data.items.forEach(element => {
                        element.return_num = parseInt(element.goods_number);
                    });
                    this.goods = response.data.items;
                });

                this.initObject(this.model, this.rowInfoForm);
            },

            onBeforeClose(){
                // this.multipleSelection = [];
                this.active = 0;
            },

            getAjaxPromise(model) {
                return this.ajaxProxy.update(model.id, model);
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
  