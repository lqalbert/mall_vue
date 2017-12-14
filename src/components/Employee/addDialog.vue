<template>
    <div >
        <el-dialog title="添加员工" :visible.sync="state2" @close="handleClose">
            <el-form ref="addForm"  :model="addForm" :inline="true">
                <el-tabs  type="card" v-model="activeName">
                    <el-tab-pane label="账号" name="first">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="登录账号" prop="account">
                                    <el-input v-model="addForm.account"  auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="密码">
                                    <el-input v-model="addForm.password" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="员工姓名" prop="realname">
                                    <el-input v-model="addForm.realname" auto-complete="off"></el-input>
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
                            <el-col>
                                <el-form-item label="所属部门" prop="department_id">
                                    <el-select v-model="addForm.department_id">
                                        <el-option label="推广部" value="4"></el-option>
                                        <el-option label="销售部" value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="其它信息" name="second">
                        <el-row>
                            <el-col :span="12">

                                <el-form-item label="头像">
                                    <img v-show='addUploadImg' :src="addUpload" alt="" style="max-width: 200px; max-height: 200px;">
                                    <el-upload
                                            action="{:U('Upload/index2')}"
                                            accept="image/jpeg,image/png,image/jpg,image/gif,image/bmp"
                                            :on-success="addFormUploadSuccess"
                                            :on-error="addFormUploadError"
                                            :data="pathInfo"
                                            :headers="xuploadheader"
                                            :multiple="false"
                                            :show-upload-list="false">
                                        <el-button size="small" type="primary">点击上传</el-button>
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
                                    <el-input v-model="addForm.mphone"  auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="固话座机" prop="phone">
                                    <el-input v-model="addForm.phone" auto-complet="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="QQ号" prop="qq">
                                    <el-input v-model="addForm.qq" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="QQ昵称">
                                    <el-input v-model="addForm.qq_nickname" auto-complet="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="微信号" prop="weixin">
                                    <el-input v-model="addForm.weixin" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="微信昵称">
                                    <el-input v-model="addForm.weixin_nikname" auto-complet="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="身份证号" prop="id_card">
                                    <el-input v-model="addForm.id_card" auto-complet="off"></el-input>
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
                    <el-tab-pane label="身份证照" name="third" class="third">
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

                    </el-tab-pane>
                </el-tabs>



            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog()">取 消</el-button>
                <el-button @click="addFormSubmit()" type="primary"  >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'addDialog',
        props:{
            addOpen:{
                type:Boolean,
                default:false
            }
        },
        data () {
            return {
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

        methods:{
            handleClose(){
                this.$emit('add-window-close');
            },
            addFormSubmit:function(){
                console.log(this.addForm);
            },
            closeDialog:function(){
                this.state2=false;
            }
        },
        watch:{
            addOpen:function(val, oldVal){
                this.state2 = val;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

