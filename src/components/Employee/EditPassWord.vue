<template>
    <div >
        <Dialog title="修改密码" :name="name" :width="width" :height="height">
            <el-form :label-width="labelWidth"   ref="editPasswordForm" :label-position="labelPosition">
                <el-form-item label="员工账号" prop="account">
                    <el-input class="name-input" v-model="editPasswordForm.account"   auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input class="name-input" v-model="editPasswordForm.password"  type="password"  auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input class="name-input" type="password" v-model="editPasswordForm.checkPass" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>


            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button 
                    @click="formSubmit('addForm')" >
                    保 存
                </submit-button>
            </div>

        </Dialog>
    </div>
</template>

<script>
import DialogForm from '../../mix/DialogForm';
export default {
    name: 'Edit',
    mixins:[DialogForm],
    data () {
        return {
            labelPosition:"right",
            labelWidth:'80px',
            computedusers:[
                {user_id:'1',realname:'李青'},
                {user_id:'2',realname:'高鹏'},
                {user_id:'3',realname:'马娇'},
                {user_id:'4',realname:'吴继伟'},
            ],
            topO:[
                {id:'1',name:'西北区'},
                {id:'2',name:'东南区'},
                {id:'3',name:'沿海区'},

            ],
            typeList:['销售部','推广部','风控部','人事部'],

            state7: this.addOpen,
            editPasswordForm:{
                id:"",
                account:"",
                password:"",
                checkPass:""
            },

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
      