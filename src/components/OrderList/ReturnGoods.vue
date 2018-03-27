<template>
    <div>
        <MyDialog title="发起退货" :name="name" :width="width" :height="height" @before-open="onOpen" @before-close="onBeforeClose">
            <el-form ref="rowInfoForm" :model="rowInfoForm" :label-width="labelWidth" :label-position="labelPosition">
                <el-steps :space="150" :active="active" finish-status="success" :center="true" :align-center="true">
                    <el-step title="选择退货的商品"></el-step>
                    <el-step title="填写快递号"></el-step>
                </el-steps>
                <div　v-show="active == 0">
                    <h5>订单信息</h5>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="订单号" prop="id">
                                {{ model.order_sn }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="总金额" prop="order_all_money">
                                {{ model.order_all_money }} 元
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="订单状态" prop="status">
                                {{　model.status_text }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <h5>勾选要退货的商品</h5>
                    <el-row>
                        <el-col :span="24">
                            <el-table :data="goods" @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column label="商品名称" prop="goods_name"></el-table-column>
                                <el-table-column label="商品编号" prop="sku_sn" width="120"></el-table-column>
                                <el-table-column label="数量"     prop="goods_number" width="160">
                                </el-table-column>
                                <el-table-column label="单价"     prop="price" width="100"></el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </div>

                <div v-show="active == 1">
                    <h5>要退货的商品</h5>
                    <el-row>
                        <el-col :span="24">
                            <el-table :data="multipleSelection" >
                                <el-table-column label="商品名称" prop="goods_name"></el-table-column>
                                <el-table-column label="商品编号" prop="sku_sn" width="120"></el-table-column>
                                <el-table-column label="数量"    prop="goods_num"  width="160">
                                    <template slot-scope="scope">
                                        <el-input-number size="small" :min="1" :controls="false" :max="scope.row.goods_number"  v-model="scope.row.goods_num" @change="numberChange"></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column label="单价"  prop="price" width="100"></el-table-column>
                                <el-table-column label="操作"  width="100">
                                    <template slot-scope="scope">
                                        <el-button　type="danger" @click="del(scope.$index)"　size="small">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="退款金额">
                                {{ rowInfoForm.refund }}
                            </el-form-item>
                        </el-col>
                    </el-row>
    
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="备注">
                                <el-input type="textarea" :rows="2" placeholder="请输入内容">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
    
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="快递号">
                                <el-input placeholder="请输入内容">
                                </el-input><el-button>
                                    <i class="el-icon-plus"></i>
                                </el-button>
                            </el-form-item>
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
                    <el-col :span="12">
                        <el-button @click="handleClose">取 消</el-button>
                        <submit-button :observer="dialogThis" @click="formSubmit('rowInfoForm')">
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

    export default {
        name: 'ReturnGoods',
        mixins: [DialogForm],
        props: {

        },
        ajaxProxy: {
            required: true,
            type: Object,
            default: null
        },
        data() {
            return {
                order_statuslist: [
                    { id: 0, status: '待审核' },
                    { id: 1, status: '审核通过' },
                    { id: 2, status: '待充值' },
                    { id: 3, status: '配货中' },
                    { id: 4, status: '订单完成' },
                    { id: 5, status: '订单取消' },
                    { id: 6, status: '审核未通过' },
                ],
                shipping_statuslist: [
                    { id: 0, status: '未处理' },
                    { id: 1, status: '配货中' },
                    { id: 2, status: '已发货' },
                    { id: 3, status: '已签收' },
                ],
                check_status: [
                    { id: '0', status: '通过' },
                    { id: '1', status: '未通过' },
                    { id: '2', status: '未审核' }
                ],
                dialogThis: this,
                labelPosition: "right",
                labelWidth: '70px',
                rowInfoForm: {
                    order_id: "",
                    goods: [],
                    refund:"",
                    express:[],
                },
                goods:[],
                model: {},
                multipleSelection:[],
                active:0

            }
        },

        methods: {
            onOpen(param) {
                this.model = param.params;
                OrderGoodsAjaxProxy.get({order_id: this.model.id}).then((response)=>{
                    this.goods = response.data.items;
                });
                this.rowInfoForm.order_id = this.model.id;
            },
            onBeforeClose(){
                this.multipleSelection = [];
                this.active = 0;
            },
            getAjaxPromise(model) {
                return this.ajaxProxy.update(model.id, model);
            },

            handleSelectionChange(v){
                this.multipleSelection = [].concat(v);
                this.multipleSelection.forEach(element => {
                    element.goods_num = parseInt(element.goods_number);
                });
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
            }
        },
        watch: {

            model: function (val, oldVal) {
                for (const key in this.rowInfoForm) {
                    if (this.rowInfoForm.hasOwnProperty(key)) {
                        // console.log(key);
                        this.rowInfoForm[key] = val[key]
                    }
                }
            },

            multipleSelection:function(val, oldVal){
                console.log(val);
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
</style>