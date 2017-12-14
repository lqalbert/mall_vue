<template>
  <div class="hello">
    <el-row>
      <el-col :span="20">
        <el-form ref="pwdForm" :model="pwdForm" label-width="85px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="用户名">
                <el-input v-model="pwdForm.username" disabled placeholder="请输入用户名"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="旧密码" prop="password">
                <el-input v-model="pwdForm.password" type="password" placeholder="请输入旧密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="新密码" prop="newpwd1">
                <el-input v-model="pwdForm.newpwd1" type="password" placeholder="请输入新密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="确认新密码" prop="newpwd2">
                <el-input v-model="pwdForm.newpwd2" type="password" placeholder="请再次输入新密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item>
              <el-tooltip content="保存并修改输入的内容" placement="bottom-start">
                <el-button type="primary" icon="upload"  @click="handleSave" >保存修改</el-button>
              </el-tooltip>
              <el-tooltip content="清空输入框数据" placement="bottom-start" style="margin-left:10px;">
                <el-button type="warning" @click="reset">重置</el-button>
              </el-tooltip>
            </el-form-item>
          </el-row>
        </el-form>
      </el-col>  
    </el-row>
      
  </div>
</template>
      
<script>
import PageMix from '../../mix/Page';
//import DataProxy from '../../packages/DataProxy';



export default {
    name: 'UserSetting',
    pageTitle:"设置密码",
    sb:'sb',
    mixins: [PageMix],
    data () {
        return {
          pwdForm:{
            username:'系统管理员',
            password:'',
            newpwd1:'',
            newpwd2:'',

          },  
            
            
        }
    },
    methods:{

      handleSave:function(){
        console.log(this.pwdForm);
        this.$message.success('保存成功');
      },
      reset:function(){
        //console.log(this.$refs.userInfoForm);
        this.$refs.pwdForm.resetFields();
        //this.$refs[formName].resetFields();
      } 

    },

    created(){
        

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
