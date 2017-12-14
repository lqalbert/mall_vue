<template>
  <div class="hello">
    <el-row>
      <el-col :span="20">
        <el-form ref="userInfoForm" :model="userInfoForm" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="用户名">
                <el-input v-model="userInfoForm.username" disabled placeholder="请输入用户名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-form-item label="所属角色">
                <el-input v-model="userInfoForm.role" disabled placeholder="请输入请选择角色"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="真实姓名" prop="realname">
                <el-input v-model="userInfoForm.realname" placeholder="请输入真实姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-form-item label="手机号码" prop="mphone">
                <el-input v-model="userInfoForm.mphone" placeholder="请输入手机号码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="固话座机" prop="phone">
                <el-input v-model="userInfoForm.phone" placeholder="请输入固话座机"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="userInfoForm.sex">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="证书编号" prop="cert_no">
                <el-input v-model="userInfoForm.cert_no" placeholder="请输入证书编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-form-item label="QQ号码" prop="qq">
                <el-input v-model="userInfoForm.qq" placeholder="请输入QQ号码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="QQ昵称" prop="qq_nickname">
                <el-input v-model="userInfoForm.qq_nickname" placeholder="请输入QQ昵称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-form-item label="微信号码" prop="weixin">
                <el-input v-model="userInfoForm.weixin" placeholder="请输入微信号码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="微信昵称" prop="weixin_nikname">
                <el-input v-model="userInfoForm.weixin_nikname" placeholder="请输入微信昵称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="居住住址" prop="address">
                <el-input v-model="userInfoForm.address" type="textarea" 
                :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入居住住址">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="座右铭" prop="motto">
                <el-input v-model="userInfoForm.motto" type="textarea" 
                :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入座右铭">
                </el-input>
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
      <el-col :span="4" id="upload-css"> 
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i> 
        </el-upload>
        <span style="margin-left:60px;">上传头像</span>
      </el-col>
    </el-row>
 
  </div>
</template>
      
<script>
import PageMix from '../../mix/Page';
//import DataProxy from '../../packages/DataProxy';



export default {
    name: 'UserInfo',
    pageTitle:"个人信息",
    mixins: [PageMix],
    data () {
        return {
          imageUrl: '',
          userInfoForm:{
            username:'admin',
            role:'系统管理员',
            realname:'系统管理员',
            mphone:'13888888888',
            phone:'028-8888888',
            sex:'2',
            cert_no:'GTRR36',
            qq:'88888888',
            qq_nickname:'月亮罩着地球',
            weixin:'88888888',
            weixin_nikname:'太阳罩着月亮',
            address:'成都市啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
            motto:'路漫漫其修远兮，吾将上下而求索'
          },  
            
            
        }
    },
    methods:{
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleSave:function(){
        console.log(this.userInfoForm);
        this.$message.success('保存成功');
      },
      reset:function(){
        //console.log(this.$refs.userInfoForm);
        this.$refs.userInfoForm.resetFields();
        //this.$refs[formName].resetFields();
      } 

    },

    created(){
        

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 #upload-css .avatar-uploader .el-upload {
    border: 1px dashed #dc8c8c;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #upload-css .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  #upload-css .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  #upload-css .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
