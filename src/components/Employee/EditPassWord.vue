<template>
    <div >
        <MyDialog title="修改密码" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :label-width="labelWidth" :rules="rules" :model="editPasswordForm" ref="editPasswordForm" :label-position="labelPosition">
                <el-form-item label="员工账号" prop="account">
                    <el-input class="name-input" v-model="editPasswordForm.account"    :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input class="name-input" v-model="editPasswordForm.password"  type="password"   ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input class="name-input" type="password" v-model="editPasswordForm.checkPass" ></el-input>
                </el-form-item>
            </el-form>

            <div slot="dialog-foot" >
                <el-button @click="handleClose()">取 消</el-button>
                <SubmitButton
                        @click="formSubmit('editForm')"
                        :observer="dialogThis" ></SubmitButton>
            </div>
        </MyDialog>
    </div>
</template>

<script>
import DialogForm from '../../mix/DialogForm';
export default {
    name: 'editPassWord',
    mixins:[DialogForm],
    props:{
        paramData:{},
    },
    data () {
        return {
            dialogThis: this,
            labelPosition:"right",
            labelWidth:'80px',
            editPasswordForm:{
                id:"",
                account:"",
                password:"",
                checkPass:""
            },
            rules:{
                password:[
                    { required: true, message:"请输入新密码", type:'string',trigger:'change'}
                    ],
                checkPass:[
                    { validator: this.checkPassword, trigger: 'blur' }
                    ],
            },
            model:''

        }
    },
    methods:{
        onOpen(param){
            this.model = param.params.model;
        },
        checkPassword(rule,value,callback){
            if(this.editPasswordForm.password !==value){
                return callback(new Error('两次输入的密码不一致'));
            }

        },
    },
    watch:{
        model:function(val, oldVal){
            for (const key in this.editPasswordForm) {
                if (this.editPasswordForm.hasOwnProperty(key)) {
                    this.editPasswordForm[key] = val[key]
                }
            }
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
      