<template>
    <div >
        <MyDialog title="上传图片" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="addForm"  ref="addForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="图片位置" prop="classify" >
                            <el-select v-model.number="addForm.classify" size="small" placeholder="请选择图片展示位置">
                                <el-option v-for="v in classifys" :label="v.name" :value="v.id" :key="v.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="图片名称" prop="name" >
                            <el-input class="name-input" size="small" v-model="addForm.name" placeholder="请填写图片名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <!-- <el-col :span="12">
                        <el-form-item label="对应商品" prop="goods_id" >
                            <el-select v-model.number="addForm.goods_id" placeholder="请选择对应商品">
                                <el-option v-for="v in goods" :label="v.goods_name" :value="v.id" :key="v.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="12">
                        <el-form-item label="跳转链接" prop="href_url" >
                            <el-input class="name-input" size="small" v-model="addForm.href_url" placeholder="跳转链接"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="图片描述" prop="description" >
                            <el-input class="name-input" size="small" v-model="addForm.description" placeholder="图片描述"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-upload
                        ref="upload"
                        name="avatar"
                        :auto-upload="false"
                        :action="uploadUrl"
                        :data="pictureData"
                        list-type="picture-card"
                        accept="image/gif, image/jpeg,image/jpg,image/png"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="uploadSuccess"
                        :on-error="uploadError"
                        :before-upload="beforeAvatarUpload"
                        :on-change="changefileList">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        @click="upPicture"
                        :is_load="is_load"
                        :observer="dialogThis">
                    上 传
                </submit-button>
            </div>
        </MyDialog>
        <!--@click="up"-->
    </div>
</template>

<script>
import DialogForm from '@/mix/DialogForm';
import DataProxy from '@/packages/DataProxy';
import { mapGetters, mapMutations } from 'vuex';
import APP_CONST from '@/config';
import { quillRedefine } from 'vue-quill-editor-upload';

export default {
    name: 'Add',
    mixins:[DialogForm],
    props:{
        classifys:{
            type:Array
        }   ,
        goods:{
            type:Array
        }
    },
    computed:{
        ...mapGetters([
            'getUser'
        ])
    },
    data () {
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            dialogImageUrl:'',
            dialogVisible: false,
            is_load: false,
            uploadUrl:"/slide-upload",
            pictureData:{},
            addForm:{
                classify:"",
                name:"",
                goods_id:"",
                href_url:'',
                description:'',
            },
            rules:{
                classify:[
                    { required: true, type:"number",  message: '请选择展示位置', trigger: 'blur'},
                ],
                name:[
                    { required: true,  message: '请填写图片名称', trigger: 'blur'},
                ],
                href_url:[
                    { required: true, message: '请填写跳转链接', trigger: 'blur'},
                ],
                description:[
                    { required: true, message: '请填写图片描述', trigger: 'blur'},
                ],
            },
            editContent:"",
            editorOption:null,
            selectionGoods:null,
            fileList:null,
            ctrlNum:0,
        }
    },
    methods:{
        upPicture(){
            if(this.fileList.length == 0){
                this.$alert('请选先择将要上传的图片', '警告', {
                    confirmButtonText: '确定',
                    type:'warning'
                });
                this.is_load = false;
                return ;
            }
            this.$refs['addForm'].validate((valid) => {
                if (valid) {
                    this.$refs.upload.submit();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        onOpen(){
          this.fileList = [];
        },
        beforeAvatarUpload(){
            this.pictureData.classify = this.addForm.classify;
            this.pictureData.user_id = this.getUser.id;
            this.pictureData.goods_id = this.addForm.goods_id;
            this.pictureData.name = this.addForm.name;
            this.pictureData.href_url = this.addForm.href_url;
            this.pictureData.description = this.addForm.description;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleRemove(file, fileList) {
            //console.log(file, fileList);
        },
        beforeSubmit(name) {
            this.addForm.goodsPictures = this.selectionGoods;
            this.formSubmit(name);
        },
        uploadSuccess(response, file, fileList){

            this.ctrlNum++;
            if(this.ctrlNum >= fileList.length){
                this.$message.success('上传成功!');
                this.$refs['addForm'].resetFields();
                this.handleClose();
                this.$emit('submit-success', 'addForm');
                // this.formSubmit('addForm');
                this.ctrlNum = 0;
            }
        },
        uploadError(err, file, fileList){
            this.$message.error('上传出错：' + err.msg);
        },
        changefileList(file, fileList){
            this.fileList = fileList;
        },
        getAjaxPromise(model){
            model['user_id'] = this.getUser.id;
            return this.ajaxProxy.create(model);
        },
        onEditorChange(event){
           this.addForm.content =  event.html;
        }
    },
    created(){
        this.editorOption = quillRedefine(APP_CONST.editor_option);
    }
}
</script>
<style scoped>
    .name-input{
        max-width: 217px;
    }
    .ql-toolbar.ql-snow {
        line-height: normal;
    }
    .ql-container.ql-snow {
        height: 300px !important;
        max-height: 400px;
    }
</style>
      