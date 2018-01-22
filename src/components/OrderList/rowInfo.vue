<template>
    <div >
        <MyDialog title="查看" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form ref="rowInfoForm" :model="rowInfoForm" :label-width="labelWidth" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="订单编号" prop="order_sn">
                            <el-input v-model="rowInfoForm.order_sn" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="rowInfoForm.goods_name" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label="收货人信息" prop="consignee">
                            <el-input v-model="rowInfoForm.consignee" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="总金额" prop="order_all_money">
                            <el-input v-model="rowInfoForm.order_all_money" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label="应付金额" prop="order_pay_money">
                            <el-input v-model="rowInfoForm.order_pay_money" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="订单状态" prop="order_status">
                            <el-select v-model='rowInfoForm.order_status'>
                                <el-option
                                        v-for="order_status in order_statuslist"
                                        :label="order_status.status"
                                        :value="order_status.id"
                                        :key="order_status.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label="支付方式" prop="pay_name">
                            <el-input v-model="rowInfoForm.pay_name" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="发货状态" prop="shipping_status">
                            <el-select v-model='rowInfoForm.shipping_status'>
                                <el-option
                                        v-for="shipping_status in shipping_statuslist"
                                        :label="shipping_status.status"
                                        :value="shipping_status.id"
                                        :key="shipping_status.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label="配送方式" prop="shipping_name">
                            <el-input v-model="rowInfoForm.shipping_name" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="下单时间" prop="order_time">
                            <el-date-picker size="small" v-model="rowInfoForm.order_time"
                                            :type="date"
                                            @change="DateChange"
                                            :editable="true">
                            </el-date-picker>
                            <!--<el-input v-model="rowInfoForm.order_time" size="small"></el-input>-->
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                <el-col :span="12">
                    <el-form-item label="审核状态" prop="order_status">
                        <el-select v-model='rowInfoForm.check_status'>
                            <el-option
                                    v-for="order_status in check_status"
                                    :label="order_status.status"
                                    :value="order_status.id"
                                    :key="order_status.id"
                                    ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                </el-row>
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
//    import SubmitButton from '../../components/common/SubmitButton';
    export default {
        name: 'addDialog',
        mixins:[DialogForm],
        props:{


        },
        ajaxProxy:{
            required:true,
            type: Object,
            default: null
        },
        data () {
            return {
                order_statuslist:[
                    {id:'0',status:'未付款'},
                    {id:'1',status:'待确认'},
                    {id:'2',status:'已完成'},
                    {id:'3',status:'已关闭'},
                    {id:'4',status:'退款中'},
                ],
                shipping_statuslist:[
                    {id:'0',status:'待发货'},
                    {id:'1',status:'已发货'},
                    {id:'2',status:'已收货'},
                ],
                check_status:[
                    {id:'0', status:'通过'},
                    {id:'1', status:'未通过'},
                    {id:'2', status:'未审核'}
                    ],
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'100px',
                rowInfoForm:{
                    order_sn:'',
                    goods_name:'',
                    consignee:'',
                    order_all_money:'',
                    order_pay_money:'',
                    order_status:'',
                    pay_name:'',
                    shipping_status:'',
                    shipping_name:'',
                    order_time:'',
                },
                model:null

            }
        },

        methods:{
            addFormSubmit:function(){
                this.state6=false;
            },
            closeDialog:function(){
                this.state6=false;
            },

            onOpen(event){
                /** 需要对直接传递过来的数据进行处理，中文转成英文 */
                var check_status = event.params.rowData.check_status;
                var true_check_status = this.check_status;
                var i = 0;
                var newdata = [];
                newdata = event.params.rowData;
                for(i=0;i<true_check_status.length;i++)
                {
                    if(check_status==true_check_status[i].status)
                    {
                        event.params.rowData.check_status = true_check_status[i].id;
                    }
                }
                for(i=0;i<this.order_statuslist.length;i++)
                {
                    if(event.params.rowData.order_status==this.order_statuslist[i].status)
                    {
                        event.params.rowData.order_status = this.order_statuslist[i].id;
                    }
                }
                for(i=0;i<this.shipping_statuslist.length;i++)
                {
                    if(event.params.rowData.shipping_status==this.shipping_statuslist[i].status)
                    {
                        event.params.rowData.shipping_status = this.shipping_statuslist[i].id;
                    }
                }
              this.rowInfoForm = event.params.rowData;
            },
            getAjaxPromise(model){
                console.log(model);
                return this.ajaxProxy.update(model.id, model);
            },
            DateChange:function(v){
                this.rowInfoForm.order_time = v;
            },
        },
        watch:{

            model:function(val, oldVal){
//                console.log(val);
                for (const key in this.rowInfoForm) {
                    if (this.rowInfoForm.hasOwnProperty(key)) {
                        console.log(key);
                        this.rowInfoForm[key] = val[key]
                    }
                }
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

