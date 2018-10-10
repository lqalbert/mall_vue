<template>
    <div >
        <MyDialog title="退换货审核" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="checkForm" ref="checkForm" :label-width="labelWidth" :label-position="labelPosition">
                <!-- 订单信息 -->
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="订单号" >
                            {{ orderModel.order_sn }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="销售人员" >
                            {{ orderModel.user_name }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="退换操作人" >
                            {{ afterModel.user_name }}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="物流公司" >
                            {{ assignModel.express_name }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="快递单号" >
                            {{ assignModel.express_sn }}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="收货人姓名" >
                            {{ addressModel.name }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="收货人手机" >
                            {{ addressModel.fixed_telephone }}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="收货地址" >
                            {{ addressModel.address }}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-table :data="goods">
                            <el-table-column label="商品编码" prop="sku_sn" align="center" width="150"></el-table-column>
                            <el-table-column label="商品名称" prop="goods_name" align="center" width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column label="退换类型" prop="status_text"   align="center" width="150"  ></el-table-column>
                            <el-table-column label="退换数量" prop="return_num"  align="center" width="150"  > </el-table-column>
                            <el-table-column label="退换金额"  prop="refund_price"  align="center" width="150"  > </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <br>
                <el-row>
                    <el-col :span="12">
                        合计退款金额：{{ afterModel.fee }} 元
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="退款收取运费">
                            {{ afterModel.return_fee }}
                        </el-form-item>
                    </el-col>
                </el-row>
            <!-- 审核操作 -->
                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="原因" >
                            {{ afterModel.reason }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item  label="发起备注" >
                            {{ afterModel.remark }}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="是否通过" prop="status">
                            <el-select size="small" placeholder="是否通过" v-model="checkForm.status">
                                <el-option
                                        v-for="check in statusArr"
                                        :label="check.status"
                                        :value="check.id"
                                        :key="check.id"></el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注">
                            <el-input type="textarea" v-model="checkForm.check_mark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        :observer="dialogThis"
                        @click="formSubmit('checkForm')" >
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>

<script>
    import DialogForm from '@/mix/DialogForm';
    import OrderAjax from '@/ajaxProxy/OrderBasic';
    import OrderGoodsAjax from '@/ajaxProxy/Ordergoods';
    import AssignAjax from '@/ajaxProxy/Assign';

    export default {
        name: 'refund-check',
        mixins:[DialogForm],
        ajaxProxy:{
            required:true,
            type: Object,
            default: null
        },
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'100px',
                checkForm:{
                    id:"",
                    status:"",
                    check_mark:""
                },
                statusArr:[
                    {id:1, status:'通过'},
                    {id:3, status:'未通过'}
                ],
                orderModel:{order_sn:"", user_name:"" },
                assignModel:{user_name:"", express_name:"", express_sn:"" },
                afterModel:{ fee:"", return_fee:"" },
                addressModel:{name:"", fixed_telephone:"", address:"" },
                goods:[]

            }
        },
        methods:{
            onOpen(param){
                if (param.params.status != 0) {
                    this.$alert("已经审核,不能再次审核", "警告", {
                        confirmButtonText: '确定',
                        callback: action=>{
                            this.handleClose();
                        }
                    });
                    return false;
                }
                this.checkForm.id = param.params.id;
                this.checkForm.status = param.params.status;
                this.afterModel = param.params;
                // this.assignModel = param.params;

                OrderAjax.find(param.params.order_id, {with:['address']}).then((response)=>{
                    this.orderModel = response.data;
                    this.addressModel = this.orderModel.address;
                }).catch((response)=>{
                    
                });

                OrderGoodsAjax.get({order_id:param.params.order_id, after:1, appends:['status_text']}).then((response)=>{
                    this.goods = response.data.items;
                })

                AssignAjax.get({order_id: param.params.order_id, fields:['id','express_name','express_sn']}).then((response)=>{
                    this.assignModel = response.data.items[0];
                }).catch(()=>{

                });
            },
            getAjaxPromise(model){
                return this.ajaxProxy.check(model.id, model);
            },
        },
        

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-form-item {
        margin-bottom: 5px;
    }
</style>

