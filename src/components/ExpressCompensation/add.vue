<template>
    <div >
        <MyDialog title="添加赔偿" :name="name" :width="width" :height="height" >
            <el-form :model="addForm"  :label-width="labelWidth" :rules="rules" ref="addForm" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                            <el-form-item prop="entrepot_id"  label="配送中心">
                                <el-select v-model="addForm.entrepot_id" placeholder="请选择配送中心" @change="entrepotChange">
                                    <el-option v-for="v in distributors" :label="v.name"
                                               :value="v.id" :key="v.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item prop="express_id" label="物流公司">
                            <el-select v-model="addForm.express_id"  placeholder="请选择物流公司" @change="expressChange">
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
                                    v-model="addForm.deliver_time"
                                    type="datetime"
                                    @change="timeChange"
                                    placeholder="选择发货日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="订单号" prop="order_number" >
                            <el-input class="name-input" v-model="addForm.order_number"  auto-complete="off"  placeholder="请填写订单号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="快递单号" prop="express_number" >
                            <el-input class="name-input" v-model="addForm.express_number"  auto-complete="off"  placeholder="请填写快递单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="赔偿类型" prop="compensation_type" >
                            <el-input class="name-input" v-model="addForm.compensation_type"  auto-complete="off"  placeholder="请填写赔偿类型"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="赔偿金额" prop="compensation_money" >
                            <el-input class="name-input" v-model="addForm.compensation_money"  auto-complete="off"  placeholder="请填写赔偿金额"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="处理进度" prop="processing_progress" >
                            <el-select v-model="addForm.processing_progress"  placeholder="请选择处理进度" @change="processingProgressChange">
                                <el-option v-for="v in processingProgress" :value="v.id" :key="v.id" :label="v.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注"  prop="remark">
                            <el-input type="textarea"  auto-complete="off" v-model="addForm.remark" placeholder="请填写备注(200字以内)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                    :observer="dialogThis"
                    @click="beforeSubmit" >
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
        name: 'addDialog',
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
                addForm:{
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
                    entrepot_id:[
                        {required: true, message: '选择配送中心', trigger: 'blur' },
                    ],
                    express_id:[
                        {required: true, message: '选择物流公司', trigger: 'blur' },
                    ],
                    deliver_time:[
                        {required: true, message: '选择发货时间', trigger: 'blur' },
                    ],
                    order_number:[
                        { required: true, message: '请输入订单号', trigger: 'blur' },
                        {  min: 1, max: 20, message: '长度不能超过20个字符', trigger: 'blur'  }
                    ],
                    express_number:[
                        { required: true, message: '请输入快递单号', trigger: 'blur' },
                        {  min: 1, max: 20, message: '长度不能超过20个字符', trigger: 'blur'  }
                    ],
                    compensation_type:[
                        { required: true, message: '选输入偿类型', trigger: 'blur' },
                        {  min: 1, max: 20, message: '长度不能超过20个字符', trigger: 'blur'  }
                    ],
                    processing_progress:[
                        {required: true, message: '选择处理进度', trigger: 'blur' },
                    ],
                    compensation_money:[
                        { required: true, message: '请输入赔偿金额', trigger: 'blur' },
                        {pattern:/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,  message: '价格格式为00.00', trigger:'blur'}
                    ],
                    remark:[
                        {  min: 1, max: 200, message: '长度不能超过200个字符', trigger: 'blur'  }
                    ],

                }
            }
        },
        methods:{
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            },
            loadUsers(data){
                this.computedusers = data.items;
            },
            timeChange(v){
                this.addForm.deliver_time = v;
            },

            onDepartChange(v){
                this.employeeSelect.setParam({department_id:v, role:'group-captain', group_candidate:1})
                this.employeeSelect.load();
                this.addForm.manager_id = "";
            },
            expressChange(v){
                let i =''
                for (i in this.companys){
                    if(this.companys[i]['id'] == v){
                        this.addForm.express_name =this.companys[i]['company_name']
                    }
                }
            },
            entrepotChange(v){
                let i =''
                for (i in this.distributors){
                    if(this.distributors[i]['id'] == v){
                        this.addForm.entrepot_name =this.distributors[i]['name']
                    }
                }
            },
            processingProgressChange(v){
                let i =''
                for (i in this.processingProgress){
                    if(this.processingProgress[i]['id'] == v){
                        this.addForm.processing_progress =this.processingProgress[i]['name']
                    }
                }
            },
            beforeSubmit(){
                console.log(this.addForm);
                 this.formSubmit('addForm');
            }
        },
        created(){
            this.employeeSelect = new EmployeeSelectProxy({}, this.loadUsers, this);

        }
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>

