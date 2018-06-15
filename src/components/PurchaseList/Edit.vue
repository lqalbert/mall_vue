<template>
    <div>
            <MyDialog title="查看" :name="name" :width="width" :height="height" @before-open="onOpen">
                <el-form ref="rowInfoForm" :model="rowInfoForm" :label-width="labelWidth" :label-position="labelPosition">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item  label="订单号" prop="order_sn">
                                {{rowInfoForm.order_sn}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="总金额" prop="order_all_money">
                                3000
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='12'>
                            <el-form-item label="应付金额" prop="order_pay_money">
                                3000
                            </el-form-item>
                        </el-col>
                        <el-col :span='12'>
                            <el-form-item label="购买客户"  prop="cus_id">
                                张三
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row>
                        <el-col :span='12'>
                            <el-form-item label="成交员工" prop="deal_name">
                                李四
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="发货状态" prop="product_status">
                                <el-select v-model='rowInfoForm.product_status' :disabled="true">
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
                        <el-col :span="12">
                            <el-form-item label="订单状态" prop="status">
                                <el-select v-model='rowInfoForm.status' clearable>
                                    <el-option
                                            v-for="order_status in order_statuslist"
                                            :label="order_status.status"
                                            :value="order_status.id"
                                            :key="order_status.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span='12'>
                            <el-form-item label="配送方式" prop="shipping_name">
                                <el-input v-model="rowInfoForm.shipping_name" size="small" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col> -->
                    </el-row>
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
import FormMix from '../../mix/Form';
import APP_CONST from '../../../config/index';
import DialogMix from '../../mix/Dialog';
import { mapGetters } from 'vuex';
import { PHONE_REG } from "@/config/index";
export default {
    name: 'Edit',
    mixins:[DialogForm,FormMix],
    components: {
        
    },
    props:{

    },
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            rowInfoForm:{
                id:'',
                shipper:'',
                entrepot_id:'',
                order_sn:'',
                entrepot_name:'',
                contact_time:'',
                contact_name:'',
                contact_phone:'',
                remark:'',
                sku_type:0,
                goods_total:0,
                goods_money_total:0,

            },
            order_statuslist:[
                {id:0,status:'待审核'},
                {id:1,status:'审核通过'},
                {id:2,status:'待充值'},
                {id:3,status:'配货中'},
                {id:4,status:'订单完成'},
                {id:5,status:'订单取消'},
                {id:6,status:'审核未通过'},
            ],
            shipping_statuslist:[
                {id:0,status:'未处理'},
                {id:1,status:'配货中'},
                {id:2,status:'已发货'},
                {id:3,status:'已签收'},
            ],
            rules:{
                company_name:[
                    { required: true, message: '请输入物流公司名称', trigger: 'blur' }
                ],
                // contact_name:[
                //     { required: true, message:'请输入物流公司联系人', trigger: 'blur', },
                // ],
                // contact_tel:[
                //     { required: true,message:'请输入联系人电话', pattern:PHONE_REG, trigger:'blur'}
                // ],

            },
            model:null,
        }
    },
    methods:{
        getAjaxPromise(model){
            return this.ajaxProxy.update(model.id, model);
        },
        onOpen(param){
			this.model = param.params.model;

        },
    },
    mounted(){

    },
    created(){

    },
    watch:{
        model:function(val, oldVal){
            for (const key in this.rowInfoForm) {
                if (this.rowInfoForm.hasOwnProperty(key)) {
                    this.rowInfoForm[key] = val[key];
                }
            }
        }
    }

}
</script>
<style scoped>

</style>
