<template>
    <div class="login">
        <el-row type="flex" justify="center">
            <el-col :span="8">
              <el-form ref="loginForm"  label-width="80px" :model="loginForm" @keyup.enter.native="login" >
                <el-form-item label="账号">
                  <el-input v-model="loginForm.account" ></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input type="password" v-model="loginForm.password" ></el-input>
                </el-form-item>
                <el-form-item >
                  <el-button type="primary" @click="login">登 录</el-button>
                  <el-button @click="resetForm">重 置</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
    </div>
  </template>
  
<script>
import { mapActions } from 'vuex';
export default {
    name: 'Login',
    data () {
        return {
            loginForm:{
                account:"",
                password:"",
            }
        }
    },
    methods:{
        login(){
            // console.log(arguments);
            this.loginUser(this.loginForm);
        },
        resetForm(){
            this.$refs.loginForm.resetFields();
        },
        ...mapActions({
            'loginUser':'login'
        })
    }

}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  </style>
  