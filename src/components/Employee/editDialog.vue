<template>
    <div >
        <el-dialog title="编辑修改" :visible.sync="state10" @close="handleClose">
            <el-form ref="editForm" :inline="true" :model="editForm" >
                <el-tabs  type="card"  v-model="activeName">
                    <el-tab-pane label="基本信息" name="first">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="登录账号" prop="account">
                                    <el-input v-model="editForm.account"  :disabled="true" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="员工姓名" prop="realname">
                                    <el-input v-model="editForm.realname" auto-complete="off"></el-input>

                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row v-if="departmentItem==1">
                            <el-col :span="12">
                                <el-form-item label="所属部门" prop="department_id">
                                    <el-select v-model="editForm.department_id">
                                        <el-option v-for="department in departments" :label="department.name" :value="department.id" 
                                        :key="department.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="性别">
                                    <el-radio class="radio" v-model="editForm.sex" label="1">男</el-radio>
                                    <el-radio class="radio" v-model="editForm.sex" label="2">女</el-radio>
                                </el-form-item>
                            </el-col>
                        </el-row>


                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="头像">
                                    <img v-show='editUploadImg' :src="editUpload" alt="" style="max-width: 200px; max-height: 200px;">
                                    <el-upload
                                            action="{:U('Upload/index2')}"
                                            accept="image/jpeg,image/png,image/jpg,image/gif,image/bmp"
                                            :on-success="editFormUploadSuccess"
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
                                <el-form-item label="手机" prop="mphone">
                                    <el-input v-model="editForm.mphone"  auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="固话" prop="phone">
                                    <el-input v-model="editForm.phone" auto-complet="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="QQ号" prop="qq">
                                    <el-input v-model="editForm.qq" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="QQ昵称">
                                    <el-input v-model="editForm.qq_nickname" auto-complet="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="微信号">
                                    <el-input v-model="editForm.weixin" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="微信昵称">
                                    <el-input v-model="editForm.weixin_nikname" auto-complet="off"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="身份证号">
                                    <el-input v-model="editForm.id_card" auto-complet="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="区县">
                                    <el-select v-model="editForm.area_district" placeholder="请选择">
                                        <el-option v-for="dis in districts" :label="dis.name"  :value="dis.id" :key="dis.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="省份">
                                    <el-select ref="editselect" v-model="editForm.area_province" @change="provinceChange" placeholder="请选择">
                                        <el-option v-for="province in provinces" :label="province.name"  :value="province.id" 
                                        :key="province.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="城市">
                                    <el-select v-model="editForm.area_city" @change="cityChange"   placeholder="请选择">
                                        <el-option v-for="city in cities" :label="city.name"  :value="city.id" :key="city.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>

                        </el-row>

                        <el-form-item label="住址">
                            <el-input
                                    v-model="editForm.address"
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容">
                            </el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="身份证照" name="second">
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="手持身份证照">
                                    <el-upload
                                            class="card_img"
                                            action="{:U('Upload/index2')}"
                                            accept="image/jpeg,image/png,image/jpg,image/gif,image/bmp"
                                            :on-success="editCardImg"
                                            :data="pathInfo"
                                            :headers="xuploadheader"
                                            :multiple="false"
                                            :show-upload-list="false"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if='editForm.card_img' :src="'__ROOT__' + editForm.card_img" alt="" style="max-width: 400px; max-height:300px;">
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
                                            :on-success="editCardFront"
                                            :data="pathInfo"
                                            :headers="xuploadheader"
                                            :multiple="false"
                                            :show-upload-list="false"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if='editForm.card_front' :src="'__ROOT__' + editForm.card_front" alt="" style="max-width: 400px; max-height:234px;">
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
                                            :on-success="editCardBack"
                                            :data="pathInfo"
                                            :headers="xuploadheader"
                                            :multiple="false"
                                            :show-upload-list="false"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if='editForm.card_back' :src="'__ROOT__' + editForm.card_back" alt="" style="max-width: 400px; max-height:234px;">
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
                <el-button @click="editFormSubmit()" type="primary"  >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'editDialog',
        props:{
            editOpen:{
                type:Boolean,
                default:false
            }
        },
        data () {
            return {
                activeName:'first',
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

                state10: this.editOpen,
                editForm:{
                    account:"",
                    role_id:"",
                    id:"",
                    head:"",
                    group_id:"",
                    department_id:"",
                    sex:0,
                    phone:"",
                    mphone:"",
                    area_province:null,
                    area_city:null,
                    area_district:null,
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
            editFormSubmit:function(){
                console.log(this.editForm);
                this.state10=false;
            },
            closeDialog:function(){
                this.state10=false;
            }
        },
        watch:{
            editOpen:function(val, oldVal){
                this.state10 = val;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

