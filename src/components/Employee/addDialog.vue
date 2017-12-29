<template>
    <div >
        <Dialog  title="添加员工" :name='name'  :width="width" :height="height">
            <el-form 
                ref="addForm"  
                :rules='rules'
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
                                    <el-select size="small" v-model="addForm.department_id" placeholder="部门">
                                        <el-option v-for="v in departments" :label="v.name"
                                                   :value="v.id" :key="v.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="所属团队" prop="group_id">
                                    <el-select v-model="addForm.group_id" placeholder="团队小组">

                                        <el-option
                                            v-for="group in groups"
                                            :label="group.name"
                                            :value="group.id"
                                            :key="group.id"></el-option>

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
                                        name="avatar"
                                        :data="uplaodParam"
                                        :action="url"
                                        :show-file-list="false"
                                        :on-success="addFormUploadSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        <img v-if="uploadImg" :src="uploadImg" class="avatar">
                                        <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>
                                    <el-row>
                                        <el-col :span="12">
                                            <el-form-item label="性别">
                                                <el-radio-group v-model="addForm.sex" >
                                                    <el-radio class="radio"  :label="1">男</el-radio>
                                                    <el-radio class="radio"  :label="2">女</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>

                                    <el-row>
                                        <el-col :span="12">

                                            <el-form-item label="手机" prop="mphone">
                                                <el-input class="name-input" v-model="addForm.phone_number"  auto-complete="off"></el-input>
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
                                                <el-input class="name-input" v-model="addForm.weixin_nickname" auto-complet="off"></el-input>
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

                                    <el-form-item label="住址">
                                        <el-input
                                                v-model="addForm.address"
                                                type="textarea"
                                                placeholder="请输入内容">
                                        </el-input>
                                    </el-form-item>




                    </el-tab-pane>
                    <!-- <el-tab-pane label="其它信息" name="second">
                        
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
                    </el-tab-pane> -->
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
            <div slot="dialog-foot" >
                <el-button @click="handleClose()">取 消</el-button>
                <SubmitButton 
                    @click="formSubmit('addForm')" 
                    :observer="dialogThis" ></SubmitButton>
            </div>
        </Dialog>
    </div>
</template>

<script>
    import DialogForm from '../../mix/DialogForm';
    export default {
        name: 'addDialog',
        mixins:[DialogForm],
        props:{
            departments:{
                type: Array,
                default:[]
            },
            groups:{
                type: Array,
                default:[]
            }
        },
        data () {
            return {
                dialogThis: this,
                labelPosition:"right",
                labelWidth:'80px',
                url:"http://localhost:8000/upload",
                uplaodParam:{  name:"avater", subdir:'asdf' },
                uploadImg:"",
                
                activeName:'first',
                addForm:{
                    head:"",
                    account:"",
                    password:"123456",
                    role_id:"",
                    role_name:"sdf",
                    group_id:"",
                    group_name:"老虎队",
                    department_id:"0",
                    department_name:'销售二部',
                    sex:1,
                    phone:"",
                    phone_number:"",
                    realname:"",
                    address:"",
                    qq:"",
                    qq_nickname:"",
                    weixin:"",
                    weixin_nickname:"",
                    id_card:"",
                    location:'sdjk',
                    ip:"192.168.0.10",
                    create_name:"系统管理员",
                    lg_time:"2017-12-28",
                    out_time:"2017-12-28",

                },
                rules:{
                    account:[
                        { required: true, message:"账号必填", type:'string'}
                    ]
                }

            }
        },

        methods:{
            getAjaxPromise(model){
               // console.log(model);
                return this.ajaxProxy.create(model);
            },
            addFormUploadSuccess(response, file){
                // this.addForm.head = URL.createObjectURL(file.raw);
                if (response.status==1) {
                    this.addForm.head = response.data.url;
                    this.uploadImg = response.data.fullurl;
                }
                
            },
            // handleAvatarSuccess(res, file) {
            //     this.head = URL.createObjectURL(file.raw);
            // },
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

            conlog(param){
                console.log('debug', arguments);
            },

            resetUploadImg (){
                this.uploadImg = "";
            }
           
        },
        created(){
            // this.$on('valid-error', this.conlog);
            // this.$on('submit-final', this.conlog);
            this.$on('submit-final', this.resetUploadImg);


        },
        mounted(){
            // console.log(this.$children);
            // console.log(this);
        }
       
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .avatar{
        max-width: 200px; 
        max-height: 200px;
    }
    .name-input{
        max-width: 217px;
    }
</style>

