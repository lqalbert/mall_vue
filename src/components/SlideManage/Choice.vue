<template>
    <div >
        <MyDialog title="选择图片" :name="name" :width="width" :height="height">
            <el-form :model="addForm"  ref="addForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">
                <el-tabs v-model="activeName" >
                    <el-tab-pane label="基本信息" name="first">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="图片位置" prop="classify" >
                                    <el-select v-model.number="addForm.classify" placeholder="请选择图片展示位置" @change="classifyChange">
                                        <el-option v-for="v in classifys" v-if="v.id==2 || v.id==3" :label="v.name" :value="v.id" :key="v.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-table :data="goodsPictures" border height="400" @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column label="图片名称" prop="goods_name"  align="center"></el-table-column>
                            <el-table-column  label="商品图片"  align="center">
                                <template slot-scope="scope">
                                    <img :src="scope.row.cover_url" width="50" height="50" alt="">
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-form>

            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        @click="beforeSubmit('addForm')"
                        :observer="dialogThis">
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>

<script>
import DialogForm from '@/mix/DialogForm';
import DataProxy from '@/packages/DataProxy';
import { mapGetters, mapMutations } from 'vuex';
import APP_CONST from '@/config';
import { quillRedefine } from 'vue-quill-editor-upload';
import SlideUploadPictureSelect from  '../../packages/SlideUploadPictureSelectProxy';

export default {
    name: 'Choice',
    mixins:[DialogForm],
    props:{
        classifys:{
            type:Array
        }   ,
        goodsParentPictures:{
            type:Array
        } ,
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
            activeName:'first',
            slideuploadpictureSelect:null,
            uploadUrl:"admin/slide-upload",
            pictureData:{},
            addForm:{
                classify:"",
            },
            rules:{
                classify:[
                    { required: true, type:"number",  message: '请选择展示位置', trigger: 'blur'},
                ],
            },
            editContent:"",
            editorOption:null,
            goodsPictures:[],
            selectionGoods:null,
            ctrlNum:null,
        }
    },
    methods:{
        classifyChange(v){
            if(v == 2 || v== 3){
                this.goodsPictures = this.goodsParentPictures;
            }else{
                this.slideuploadpictureSelect.setParam(
                    {'classify':v}
                ).load();
            }

        },
        setSlideUploadPicture(){//获取幻灯片
            let slideuploadpictureselect = new SlideUploadPictureSelect({},this.getSlideUploadPicture,this);
            this.slideuploadpictureSelect = slideuploadpictureselect;
            this.slideuploadpictureSelect.setPageSize(this.pageSize);
        },
        getSlideUploadPicture(data){
            this.goodsPictures = data.items;
            this.dataTotal = data.total;
        },
        handleSelectionChange(val) {
            this.selectionGoods = val;
        },
        beforeAvatarUpload(){
            this.pictureData.classify = this.addForm.classify;
            this.pictureData.user_id = this.getUser.id;
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
                this.formSubmit('addForm');
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
        this.setSlideUploadPicture();
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
      