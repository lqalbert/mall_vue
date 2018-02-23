<template>
    <div class="login">
        <el-row type="flex" justify="center">
            <el-col :span="8">
              <el-form ref="loginForm"  label-width="80px" :model="loginForm" @keyup.enter.native="login" >
                <el-form-item label="账号" prop="account">
                  <el-input v-model="loginForm.account" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
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
    import { mapMutations } from 'vuex';
    import loginAjaxProxy from '../ajaxProxy/Login';

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
            ...mapMutations({
                'loginUser':'login'
            }),

            login(){
                let vmThis = this;
                loginAjaxProxy.login(vmThis.loginForm).then(function(response){
                    let data = response.data;
                    console.log(response);
                    if (data.status == 0) {
                        
                        // throw new Error(data.msg);
                        vmThis.$message.error(data.msg);
                        return ;
                    }
                    // console.log(data.data);
                    vmThis.loginUser(data.data)
                }).catch(function(data){
                    vmThis.$message.error(data);
                })
                
            },
            resetForm(){
                this.$refs.loginForm.resetFields();
            },
        
        }

    }
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  