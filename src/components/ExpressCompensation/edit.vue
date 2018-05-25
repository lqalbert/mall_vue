<template>
    <div >
        <MyDialog title="添加配送中心" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm"  :label-width="labelWidth" :rules="rules" ref="editForm" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="entrepot_id"  label="配送中心">
                            <el-select v-model="editForm.entrepot_id" placeholder="请选择配送中心" @change="entrepotChange">
                                <el-option v-for="v in distributors" :label="v.name"
                                           :value="v.id" :key="v.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item prop="express_id" label="物流公司">
                            <el-select v-model="editForm.express_id"  placeholder="请选择物流公司" @change="expressChange">
                                <el-option v-for="v in companys" :value="v.id" :key="v.id" :label="v.company_name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="发货日期" prop="deliver_time" >
                            <el-date-picker
                                    v-model="editForm.deliver_time"
                                    type="datetime"
                                    @change="timeChange"
                                    placeholder="选择发货日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="定单号" prop="order_number" >
                            <el-input class="name-input" v-model="editForm.order_number"  auto-complete="off"  placeholder="请填写定单号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="快递单号" prop="express_number" >
                            <el-input class="name-input" v-model="editForm.express_number"  auto-complete="off"  placeholder="请填写快递单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="赔偿类型" prop="compensation_type" >
                            <el-input class="name-input" v-model="editForm.compensation_type"  auto-complete="off"  placeholder="请填写赔偿类型"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="赔偿金额" prop="compensation_money" >
                            <el-input class="name-input" v-model="editForm.compensation_money"  auto-complete="off"  placeholder="请填写赔偿金额"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="处理进度" prop="processing_progress" >
                            <el-select v-model="editForm.processing_progress"  placeholder="请选择处理进度" @change="processingProgressChange">
                                <el-option v-for="v in processingProgress" :value="v.id" :key="v.id" :label="v.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注"  prop="remark">
                            <el-input type="textarea"  auto-complete="off" v-model="editForm.remark" placeholder="请填写备注(200字以内)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                    :observer="dialogThis"
                    @click="formSubmit('editForm')" >
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>

<script>

    import DialogForm from '../../mix/DialogForm';
    import EmployeeSelectProxy from '../../packages/EmployeeSelectProxy';
    import { mapGetters } from 'vuex';

    import { PHONE_REG } from "@/config/index";
    // import Dialog from '../common/Dialog';
    export default {
        name: 'editDialog',
        mixins:[DialogForm],
        props:{
            distributors:{
                type: Array,
                default:function(){
                    return [];
                }
            },
            companys:{
                type:Array
            }
        },
        // components:{
        //     Dialog
        // },
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'80px',
                computedusers:[],
                editForm:{
                    id:'',
                    entrepot_id: "",
                    entrepot_name: "",
                    express_id: '',
                    express_name: "",
                    order_number: "",
                    express_number: "",
                    deliver_time: "",
                    compensation_type: "",
                    compensation_money: "",
                    processing_progress: "",
                    remark: '',
                },
                processingProgress:[
                    {id:1,name:'未赔偿'},
                    {id:2,name:'已赔偿'},
                    {id:3,name:'已申请'},
                ],
                rules:{
                    name:[
                        { required: true, message: '请输入配送中心名称', trigger: 'blur' }
                    ],
                    eng_name:[
                        { type:'string', pattern:/^[a-zA-Z]+$/, required: true, message:'请输入英文简称', trigger: 'blur', },
                        {  min: 1, max: 2, message: '长度不能超过2个字符', trigger: 'blur'  }
                    ],
                },
                model:''
            }
        },
        methods:{
            getAjaxPromise(model){
                return this.ajaxProxy.update(model.id, model);
            },
            onOpen(param){
                this.model = param.params.model;
            },
            expressChange(v){
                let i =''
                for (i in this.companys){
                    if(this.companys[i]['id'] == v){
                        this.editForm.express_name =this.companys[i]['company_name']
                    }
                }
            },
            entrepotChange(v){
                let i =''
                for (i in this.distributors){
                    if(this.distributors[i]['id'] == v){
                        this.editForm.entrepot_name =this.distributors[i]['name']
                    }
                }
            },
            processingProgressChange(v){
                let i =''
                for (i in this.processingProgress){
                    if(this.processingProgress[i]['id'] == v){
                        this.editForm.processing_progress =this.processingProgress[i]['name']
                    }
                }
            },
        },
        watch:{
            model:function(val, oldVal){
                for (const key in this.editForm) {
                    if (this.editForm.hasOwnProperty(key)) {
                        this.editForm[key] = val[key]
                    }
                }

            }
        },
        created(){


        }
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>

