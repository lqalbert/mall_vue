<template>
    <div >
        <MyDialog  title="编辑" :name='name'  :width="width" :height="height" @before-open="onOpen">
            <el-form
                    ref="editForm"
                    :rules='rules'
                    :model="editForm"
                    :label-width="labelWidth"
                    :label-position="labelPosition">
                <el-tabs  type="card" v-model="activeName">
                    <el-tab-pane label="账号" name="first">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="登录账号" prop="account">
                                    <!-- <el-input class="name-input" v-model="editForm.account"  auto-complete="off"></el-input> -->
                                    {{ model.account }}
                                </el-form-item>
                                <!--<el-form-item label="密码">-->
                                    <!--<el-input class="name-input" v-model="editForm.password" auto-complete="off"></el-input>-->
                                <!--</el-form-item>-->
                                <!-- <el-form-item label="员工职能">
                                    <el-select v-model="editForm.role_id">
                                        <el-option v-for="role in roles"  :label="role.display_name" :value="role.id" :key="role.id"></el-option>
                                    </el-select>
                                </el-form-item> -->
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="员工姓名" prop="realname">
                                    <el-input class="name-input" v-model="editForm.realname" auto-complete="off"></el-input>
                                </el-form-item>

                            </el-col>
                        </el-row>
                        <el-row >
                            <el-col :span="12">
                                <el-form-item label="所属部门" prop="department_id">
                                    <el-select   v-model="editForm.department_id" placeholder="部门" @change="departmentChange">
                                        <!-- <el-option label="请选择" :value="0"></el-option> -->
                                        <el-option v-for="v in departments" :label="v.name"
                                                   :value="v.id" :key="v.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="所属团队" prop="group_id" >
                                    <el-select v-model="editForm.group_id" clearable placeholder="团队小组">
                                        <el-option label="无" :value="0"></el-option>
                                        <el-option
                                                v-for="group in groups"
                                                :label="group.name"
                                                :value="group.id"
                                                :key="group.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="员工职能">
                                    <el-checkbox-group
                                        v-model="editForm.role_ids">
                                        <el-checkbox v-for="role in roles"  :label="role.id" :key="role.id">{{role.display_name}}</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-alert
                                    title="给员工添加多个职能时，请谨慎"
                                    type="warning"
                                    :closable="false">
                                </el-alert>
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
                                            :with-credentials="true"
                                            :data="uplaodParam"
                                            :action="url"
                                            :show-file-list="false"
                                            :on-success="editFormUploadSuccess"
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
                                    <el-radio-group v-model="editForm.sex" >
                                        <el-radio   :label="1">男</el-radio>
                                        <el-radio   :label="2">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">

                                <el-form-item label="手机" prop="mobilephone">
                                    <el-input class="name-input" v-model="editForm.mobilephone"  auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="固话座机" prop="telephone">
                                    <el-input class="name-input" v-model="editForm.telephone" auto-complet="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="QQ号" prop="qq">
                                    <el-input class="name-input" v-model="editForm.qq" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="QQ昵称" prop="qq_nickname">
                                    <el-input class="name-input" v-model="editForm.qq_nickname" auto-complet="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="微信号" prop="weixin">
                                    <el-input class="name-input" v-model="editForm.weixin" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="微信昵称" prop="weixin_nickname">
                                    <el-input class="name-input" v-model="editForm.weixin_nickname" auto-complet="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="身份证号" prop="id_card">
                                    <el-input class="name-input" v-model="editForm.id_card" auto-complet="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="住址" prop="address">
                            <el-input
                                    v-model="editForm.address"
                                    type="textarea"
                                    placeholder="请输入内容">
                            </el-input>
                        </el-form-item>




                    </el-tab-pane>
                    <el-tab-pane label="身份证照" name="third">
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="手持身份证照">
                                    <el-upload
                                        class="avatar-uploader"
                                        name="avatar"
                                        :data="carParam"
                                        :action="url"
                                        accept="image/gif, image/jpeg,image/jpg,image/png"
                                        :show-file-list="false"
                                        :on-success="handleCardImg"
                                        :on-error="uploadError"
                                        :before-upload="beforeAvatarUpload">
                                        <img v-if="cardImg" :src="cardImg" class="avatar show-img">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="身份证正面照">
                                    <el-upload
                                        class="avatar-uploader"
                                        name="avatar"
                                        :data="carParam"
                                        :action="url"
                                        accept="image/gif, image/jpeg,image/jpg,image/png"
                                        :show-file-list="false"
                                        :on-success="handleCardFront"
                                        :on-error="uploadError"
                                        :before-upload="beforeAvatarUpload">
                                        <img v-if="cardFront" :src="cardFront" class="avatar show-img">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="身份证反面照">
                                    <el-upload
                                        class="avatar-uploader"
                                        name="avatar"
                                        :data="carParam"
                                        :action="url"
                                        accept="image/gif, image/jpeg,image/jpg,image/png"
                                        :show-file-list="false"
                                        :on-success="handleCardBack"
                                        :on-error="uploadError"
                                        :before-upload="beforeAvatarUpload">
                                        <img v-if="cardBack" :src="cardBack" class="avatar show-img">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
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
    import DialogForm from '../../../mix/DialogForm';
    import getGroupsByPid from '../../../ajaxProxy/getGroupsByPid';
    import { mapGetters } from 'vuex';

    import APP_CONST from '../../../config';
    import { PHONE_REG,QQ_REG } from "@/config/index";
    export default {
        name: 'editDialog',
        mixins:[DialogForm,getGroupsByPid],
        props:{
            departments:{
                type: Array,
                default:[]
            },
        },
        computed:{
            ...mapGetters({
                roles: 'assignable',
            })
        },
        data () {
            return {
                dialogThis: this,
                labelPosition:"right",
                labelWidth:'100px',
                url:APP_CONST.UPLOAD_URL,
                uplaodParam:{  name:"avater", subdir:'asdf' },
                uploadImg:"",
                activeName:'first',
                carParam:{subdir:'IDCar'},
                cardImg:'',
                cardFront:'',
                cardBack:'',
                groups:[],
                editForm:{
                    id:'',
                    head:"",
                    // account:"",
                    // password:"123456",
                    role_ids:[],
                    group_id:'',
                    department_id:"",
                    sex:'',
                    telephone:"",
                    mobilephone:"",
                    realname:"",
                    address:"",
                    qq:"",
                    qq_nickname:"",
                    weixin:"",
                    weixin_nickname:"",
                    id_card:"",
                    card_img:'',
                    card_front:'',
                    card_back:'',
                    // location:'成都市',
                    // ip:'192.168.0.1',
                    // create_name:"系统管理员",
                    // lg_time:"2017-12-28",
                    // out_time:"2017-12-28",

                },
                rules:{
                    // account:[
                    //     { required: true, message:"账号必填", type:'string'},
                    //     { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    // ],
                    realname:[
                        { required: true, message:"请填写姓名", type:'string'},
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    address:[
                        { message:'输入内容最大长度为200', type: 'string', trigger:'blur', max:200}
                    ],
                    mobilephone:[
                        { required: true, message:'请输入正确的手机号', pattern: PHONE_REG, trigger:'blur'},
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    qq:[
                        { required: true, message:'请输入正确格式的QQ号',  pattern: QQ_REG, trigger:'blur'},
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    qq_nickname:[
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    weixin:[
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    weixin_nickname:[
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    telephone:[
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    id_card:[
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                },
                model:''

            }
        },

        methods:{
            departmentChange(v){
                this.groups=[];
                this.getGroupsAjax(v);
                if (this.model.department_id != v) {
                    this.editForm.group_id = '' ;
                }
                
            },
            onOpen(param){
                this.model = param.params.model;
                console.log(this.model);
                this.uploadImg=this.model.head;
                this.cardImg=this.model.card_img;
                this.cardFront=this.model.card_front;
                this.cardBack=this.model.card_back;
                // this.getGroupsAjax(param.params.model.department_id);
            },
            getAjaxPromise(model){

                return this.ajaxProxy.update(model.id, model);
            },
            editFormUploadSuccess(response, file){
                if (response.status==1) {
                    this.editForm.head = response.data.url;
                    this.uploadImg = response.data.fullurl;
                }

            },
            beforeAvatarUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                // if (!isJPG) {
                //     this.$message.error('上传头像图片只能是 JPG 格式!');
                // }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return   isLt2M;
            },
            conlog(param){
                console.log('debug', arguments);
            },
            resetUploadImg (){
                this.uploadImg = "";
            },
            handleCardImg(response, file, fileList){
                this.editForm.card_img = response.data.url;
                this.cardImg = URL.createObjectURL(file.raw);
            },
            handleCardFront(response, file, fileLis){
                this.editForm.card_front = response.data.url;
                this.cardFront = URL.createObjectURL(file.raw);
            },
            handleCardBack(response, file, fileLis){
                this.editForm.card_back = response.data.url;
                this.cardBack = URL.createObjectURL(file.raw);
            },
            uploadError(err, file, fileList){
                this.$message.error('上传出错：' + err.msg);
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },

        },
        watch:{
            model:function(val, oldVal){
                this.editForm.role_ids = [];
                for (const key in this.editForm) {
                    if (this.editForm.hasOwnProperty(key)) {
                        this.editForm[key] = val[key]
                    }
                }

                let role_ids = [];
                if (val.roles) {
                    for (let index = 0; index < val.roles.length; index++) {
                        role_ids.push(val.roles[index].id)
                    }
                    this.editForm.role_ids = role_ids;
                }

                this.departmentChange(this.editForm.department_id);
            },
        },
        created(){
            this.$on('submit-final', this.resetUploadImg);
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "../style/index.css";
    .avatar{
        max-width: 200px;
        max-height: 200px;
    }
    .name-input{
        max-width: 217px;
    }
    .show-img{
       max-width: 180px;
       max-height:180px; 
    }
</style>

