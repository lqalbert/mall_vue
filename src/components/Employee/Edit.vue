<template>
    <div >
        <MyDialog title="添加" :name="name" :width="width" :height="height">
            <el-form
                    ref="addForm"
                    :model="addForm"
                    :label-width="labelWidth"
                    :label-position="labelPosition">
                <el-tabs  type="card" v-model="activeName">
                    <el-tab-pane label="账号" name="first">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="登录账号" prop="account">
                                    <el-input class="name-input" v-model="addForm.account"  auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="密码">
                                    <el-input class="name-input" v-model="addForm.password" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="员工姓名" prop="realname">
                                    <el-input class="name-input" v-model="addForm.realname" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="员工职能">
                                    <el-select v-model="addForm.role_id">
                                        <el-option  label="普通员工" value="1"></el-option>
                                        <el-option  label="精英员工" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row >
                            <el-col :span="12">
                                <el-form-item label="所属部门" prop="department_id">
                                    <el-select v-model="addForm.department_id">
                                        <el-option
                                                v-for="department in departments"
                                                :label="department.name"
                                                :value="department.id"
                                                :key="department.id"></el-option>

                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="其它信息" name="second">
                        <el-row>
                            <el-col :span="12">

                                <el-form-item label="头像">

                                    <el-upload
                                            class="avatar-uploader"
                                            action="url"
                                            :show-file-list="false"
                                            :on-success="addFormUploadSuccess"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="性别">
                                    <el-radio class="radio" v-model="addForm.sex" label="1">男</el-radio>
                                    <el-radio class="radio" v-model="addForm.sex" label="2">女</el-radio>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">

                                <el-form-item label="手机" prop="mphone">
                                    <el-input class="name-input" v-model="addForm.mphone"  auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="固话座机" prop="phone">
                                    <el-input class="name-input" v-model="addForm.phone" auto-complet="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="QQ号" prop="qq">
                                    <el-input class="name-input" v-model="addForm.qq" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="QQ昵称">
                                    <el-input class="name-input" v-model="addForm.qq_nickname" auto-complet="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="微信号" prop="weixin">
                                    <el-input class="name-input" v-model="addForm.weixin" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="微信昵称">
                                    <el-input class="name-input" v-model="addForm.weixin_nikname" auto-complet="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="身份证号" prop="id_card">
                                    <el-input class="name-input" v-model="addForm.id_card" auto-complet="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>


                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="省份">
                                    <el-select v-model="addForm.area_province"  placeholder="请选择">
                                        <el-option label="北京"  value="1"></el-option>
                                        <el-option label="上海"  value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="城市">
                                    <el-select v-model="addForm.area_city"    placeholder="请选择">
                                        <el-option label="北京"  value="1"></el-option>
                                        <el-option label="上海"  value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="区县">
                                    <el-select v-model="addForm.area_district" placeholder="请选择">
                                        <el-option label="北京"  value="1"></el-option>
                                        <el-option label="上海"  value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-form-item label="住址">
                            <el-input
                                    v-model="addForm.address"
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容">
                            </el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="身份证照" name="third" class="third">
                        <el-row>
                            <el-col :span="24">
                               <el-form-item label="手持身份证照">
                                    <el-upload
                                            class="card_img"
                                            action="{:U('Upload/index2')}"
                                            accept="image/jpeg,image/png,image/jpg,image/gif,image/bmp"
                                            :on-success="cardImg"
                                            :data="pathInfo"
                                            :headers="xuploadheader"
                                            :multiple="false"
                                            :show-upload-list="false"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if='addForm.card_img' :src="'__ROOT__' + addForm.card_img" alt="" style="max-width: 400px; max-height:300px;">
                                        <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="身份证正面照">
                                  <el-upload
                                            class="card_front"
                                            action="{:U('Upload/index2')}"
                                            accept="image/jpeg,image/png,image/jpg,image/gif,image/bmp"
                                            :on-success="cardFront"
                                            :data="pathInfo"
                                            :headers="xuploadheader"
                                            :multiple="false"
                                            :show-upload-list="false"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if='addForm.card_front' :src="'__ROOT__' + addForm.card_front" alt="" style="max-width: 400px; max-height:234px;">
                                        <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="身份证反面照">
                                    <el-upload
                                            class="card_back"
                                            action="{:U('Upload/index2')}"
                                            accept="image/jpeg,image/png,image/jpg,image/gif,image/bmp"
                                            :on-success="cardBack"
                                            :data="pathInfo"
                                            :headers="xuploadheader"
                                            :multiple="false"
                                            :show-upload-list="false"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if='addForm.card_back' :src="'__ROOT__' + addForm.card_back" alt="" style="max-width: 400px; max-height:234px;">
                                        <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </el-tab-pane> -->
                </el-tabs>
            </el-form>



            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        @click="formSubmit('addForm')"
                        :observer="dialogThis">
                    保 存
                </submit-button>
            </div>

        </MyDialog>
    </div>
</template>

<script>
import DialogForm from '../../mix/DialogForm';
export default {
    name: 'Add',
    mixins:[DialogForm],
    data () {
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            state2: this.addOpen,
            activeName:'first',
            addForm:{
                account:"",
                password:"123456",
                role_id:"",
                head:"",
                group_id:"",
                department_id:"",
                sex:0,
                phone:"",
                mphone:"",
                area_province:"",
                area_city:"",
                area_district:"",
                realname:"",
                address:"",
                qq:"",
                qq_nickname:"",
                weixin:"",
                weixin_nikname:"",
                id_card:"",
                card_img:"",
                card_front:"",
                card_back:""
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
      