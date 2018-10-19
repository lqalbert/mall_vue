<template>
    <div >
        <MyDialog title="添加物流揽件" :name="name" :width="width" :height="height" >
            <el-form :model="addForm"  :label-width="labelWidth" :rules="rules" ref="addForm" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="express_id" label="物流公司">
                            <el-select v-model.number="addForm.express_id" size="small" placeholder="物流公司" @change="expressChange">
                                <el-option v-for="v in companys" :value="v.id" :key="v.id" :label="v.company_name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="发货单号" prop="assign_sn" >
                            <el-input class="name-input" size="small" v-model="addForm.assign_sn"  auto-complete="off"  placeholder="配货单号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="快递单号" prop="express_sn" >
                            <el-input class="name-input" size="small" v-model="addForm.express_sn"  auto-complete="off"  placeholder="快递单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="发货核对时间" prop="assign_check_time" >
                            <el-date-picker
                                    v-model="addForm.assign_check_time"
                                    type="datetime" size="small"
                                    placeholder="选择日期时间"
                                    :picker-options="pickerOptions"
                                    @change="checkTime">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="核对人"  prop="check_user_name">
                            <el-input class="name-input" size="small" auto-complete="off" v-model="addForm.check_user_name" placeholder="请填写核对人"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                    :observer="dialogThis"
                    @click="formSubmit('addForm')" >
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
    export default {
        name: 'addDialog',
        mixins:[DialogForm],
        props:{
            companys:{
                type:Array
            }
        },
        data () {
            return {
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() + 60*60*24*1000 - 8.64e7;
                    }
                },
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'120px',
                computedusers:[],
                addForm:{
                    express_id: "",
                    express_name: "",
                    assign_sn: "",
                    express_sn: "",
                    assign_check_time: "",
                    check_user_id: '',
                    check_user_name:''
                },

                rules:{
                    express_id:[
                        { required: true, message: '请选择物流公司',type: 'number', trigger: 'blur' }
                    ],
                    assign_sn:[
                        { required: true, message:'请输入发货单号', trigger: 'blur', },
                        {max: 20, message: '长度不能超过20个字符', trigger: 'blur'  }
                    ],
                    express_sn:[
                        { required: true, message:'请输入快递单号', trigger: 'blur', },
                        {max: 20, message: '长度不能超过20个字符', trigger: 'blur'  }
                    ],
                    assign_check_time:[
                        { required: true,message:'请选择核对时间', type: 'string', trigger:'blur'}
                    ],
                    check_user_name:[
                        { required: true, message: '请输入核对人名字', trigger: 'blur' },
                        { message:'输入内容最大长度为20个字符', type: 'string', trigger:'blur', max:20}                    ],
                }
            }
        },
        methods:{
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            },
            checkTime(v){
                this.addForm.assign_check_time=v;
            },
            expressChange(v){
                let i =''
                for (i in this.companys){
                    if(this.companys[i]['id'] == v){
                        this.addForm.express_name =this.companys[i]['company_name']
                    }
                }
            },
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

