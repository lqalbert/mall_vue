<template>
    <div>
        <MyDialog title="添加" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="addForm" ref="addForm" :label-width="labelWidth" :rules="rules" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="entrepot_id"  label="配送中心">
                            <el-select v-model.number="addForm.entrepot_id" placeholder="请选择配送中心" @change="entrepotChange">
                                <el-option v-for="v in distributors" :label="v.name"
                                           :value="v.id" :key="v.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="物流名称" prop="company_name" >
                            <el-input class="name-input" v-model="addForm.company_name" placeholder="请填写物流名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="cpcode" prop="eng" >
                            <el-input class="name-input" v-model="addForm.eng" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系人" prop="contact_name">
                            <el-input class="name-input" v-model="addForm.contact_name" placeholder="请填写物流联系人"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="打印机名称" prop="printer" >
                            <el-input class="name-input" v-model="addForm.printer" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                        
                    <el-col :span="12">
                        <el-form-item label="物流电话" prop="contact_tel" >
                            <el-input class="name-input" v-model="addForm.contact_tel" placeholder="请填写联系电话"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="14">
                        <el-form-item label="备注" prop="remark">
                            <el-input type="textarea" v-model="addForm.remark" placeholder="请填写备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        :observer="dialogThis"
                        @click="formSubmit('addForm')">
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>
<script>
import DialogForm from '../../mix/DialogForm';
import FormMix from '../../mix/Form';
import APP_CONST from '../../config';
import DialogMix from '../../mix/Dialog';
import { mapGetters } from 'vuex';
import { PHONE_REG } from "@/config/index";
export default {
    name: 'Add',
    mixins:[DialogForm,FormMix],
    components: {
        
    },
    props:{
        distributors:{
            type: Array,
            default:function(){
                return [];
            }
        },
    },
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'90px',
            addForm:{
                entrepot_id:'',
                entrepot_name:'',
                company_name:'',
                contact_name:'',
                contact_tel:'',
                eng:'',
                remark:'',
                printer:""
            },
            rules:{
                entrepot_id:[
                    {required: true, message: '选择配送中心', trigger: 'blur' ,type:'number'},
                ],
                company_name:[
                    { required: true, message: '请输入物流公司名称', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度不能超过20个字符', trigger: 'blur'  }
                ],
                contact_name:[
                    // { required: true, message:'请输入物流公司联系人', trigger: 'blur', },
                    {  min: 1, max: 20, message: '长度不能超过20个字符', trigger: 'blur'  }
                ],
                contact_tel:[
                    { required: true,message:'请输入联系人电话', pattern:PHONE_REG, trigger:'blur'}
                ],
                eng:[
                    { required: true, message:'必填', pattern:/^[a-zA-Z0-9]+$/, trigger:'blur'},
                ],
                remark:[
                    {  min: 1, max: 200, message: '长度不能超过200个字符', trigger: 'blur'  }
                ],
                printer:[
                    {  min: 1, max: 20, message: '长度不能超过20个字符', trigger: 'blur'  }
                ],

            }
        }
    },
    methods:{
        getAjaxPromise(model){
            return this.ajaxProxy.create(model);
        },
        entrepotChange(v){
            let i ='';
            for (i in this.distributors){
                if(this.distributors[i]['id'] == v){
                    this.addForm.entrepot_name =this.distributors[i]['name']
                }
            }
        },
        onOpen() {
            this.addForm.entrepot_id = '';
        }
    },

    created(){
        // this.$on('submit-success', this.clearChidren);
    }

}
</script>
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
