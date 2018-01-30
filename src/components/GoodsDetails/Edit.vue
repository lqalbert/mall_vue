<template>
    <div >
        <MyDialog title="编辑商品" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm" ref="editForm" :label-width="labelWidth"  :label-position="labelPosition">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="基本信息" name="first">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="商品名称" prop="goods_name" >
                                    <el-input class="name-input" v-model="editForm.goods_name"  auto-complete="off" placeholder="请填写商品名称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="商品分类" prop="cate_id">
                                    <el-cascader
                                        expand-trigger="hover"
                                        :options="cateOptions"
                                        v-model="editForm.cate_id"
                                        @change="handleCateChange"
                                        filterable change-on-select 
                                        placeholder="选择商品分类" size="small" style="line-height:28px;">
                                    </el-cascader>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                                <el-col :span="12">
                                    <el-form-item label="副标题" prop="subtitle" >
                                        <el-input class="name-input" v-model="editForm.subtitle"  auto-complete="off" placeholder="请填写商品名称"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="简介" prop="brief">
                                        <el-input type="textarea" v-model="editForm.brief"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="商品价格"  prop="goods_price">
                                    <el-input class="name-input" v-model="editForm.goods_price"  auto-complete="off" placeholder="请填写商品价格"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="是否上架"  prop="status">
                                    <el-radio-group v-model="editForm.status">
                                        <el-radio :label="1">是</el-radio>
                                        <el-radio :label="2">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="商品货号"  prop="goods_number">
                                    <el-input class="name-input" v-model="editForm.goods_number"  auto-complete="off" placeholder="请填写商品货号"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="商品单位"  prop="unit_type">
                                    <el-select v-model='editForm.unit_type'>
                                        <el-option v-for="(item,index) in UnitTypes" :label="item"
                                                    :value="index" :key="index">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <quill-editor v-model="editContent"
                                                ref="myQuillEditor"
                                                :options="editorOption"
                                                @blur="onEditorBlur($event)"
                                                @focus="onEditorFocus($event)"
                                                @ready="onEditorReady($event)"
                                                @change="onEditorChange($event)">
                                </quill-editor>
                            </el-col>
                        </el-row>
                    </el-tab-pane>

                    <!-- <el-tab-pane label="商品规格" name="second">
                        <el-table>
                            <el-table-column
                            prop="sku"
                            label="SKU"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="规格"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="price"
                            label="价格">
                            </el-table-column>
                            <el-table-column
                            prop="num"
                            label="库存">
                            </el-table-column>
                        </el-table>
                            这一块是动态的 跟据不同类型的商品生成不同的规格
                        <el-form-item label="颜色"  prop="unit_type">
                            <el-input v-model="input" placeholder="请输入内容"></el-input>
                            <AttrItem :form-object="attrForm" type="文本"></AttrItem>
                        </el-form-item>
                    
                        <el-form-item label="尺坟"  prop="unit_type">
                                <el-input v-model="input" placeholder="请输入内容"></el-input>
                                <AttrItem :form-object="attrForm" type="图片"></AttrItem>
                        </el-form-item>
                            //end of这一块是动态的
                    
                        <el-form-item label="SKU"  prop="unit_type">
                                <el-input v-model="input" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    
                        <el-form-item label="价格"  prop="unit_type">
                                <el-input v-model="input" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    
                        <el-form-item label="数量"  prop="unit_type">
                                <el-input v-model="input" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    
                        <el-form-item  prop="unit_type">
                            <el-button>添加SKU</el-button>
                        </el-form-item>
                    </el-tab-pane> -->

                    <el-tab-pane label="商品图片" name="third">

                        <el-upload
                            ref="upload"
                            name="avatar"
                            :auto-upload="false"
                            :action="uploadUrl"
                            list-type="picture-card"
                            :file-list="fileList"
                            accept="image/gif, image/jpeg,image/jpg,image/png"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                            :on-error="uploadError">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogVisible" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                        <div class="el-upload__tip">默认第一张图片为封面图片</div>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
    
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button 
                    @click="beforeFormSubmit('editForm')"
                    :observer="dialogThis">
                    保 存
                </submit-button>
            </div>

        </MyDialog>
    </div>
</template>

<script>
import DialogForm from '../../mix/DialogForm';
import AttrItem from '../common/AttrFormItem';
import { quillRedefine } from 'vue-quill-editor-upload';
export default {
    name: 'Edit',
    mixins:[DialogForm],
    components: {
        AttrItem,
        quillRedefine,
    },
    props:{
        cateOptions:{
            type:Array,
            default:[]
        },
        uploadUrl:{
            type:String,
            default:'',
        },

    },
    data () {
        return {
            dialogImageUrl:'',
            dialogVisible: false,
            activeName:'first',
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            UnitTypes:{},
            editForm:{
                subtitle:"",
                brief:"",
                goods_name:'',
                cate_id:[],
                goods_price:'',
                status:'',
                goods_number:'',
                unit_type:'',
                description:'',
                img_path:[],
                del_imgs:[],
            },
            attrForm:{
                value:"",
                addon_value:""
            },
            editContent:'',
            editorOption:{},
            ctrlNum:0,
            urlDomain:'',
            fileList:[],
            cover_url:'',
            

        }
    },
    methods:{
        onOpen(param){
            this.fileList = [];
            this.editForm = param.params.model;
            this.editContent = this.editForm.description;
            this.editForm.unit_type = this.editForm.unit_type.toString();
            this.editForm.del_imgs = [];
            this.editForm.img_path = [];
            this.editForm.cate_id = [];
            for (let index = 0; index < this.editForm.category.length; index++) {
                this.editForm.cate_id.push(this.editForm.category[index].id);
            }

            this.UnitTypes = param.params.extra;
            this.urlDomain = param.params.urlDomain;
            for (let index = 0; index < this.editForm.imgs.length; index++) {
                this.fileList.push({name:this.editForm.imgs[index].url, url:this.editForm.imgs[index].full_url});  
            }

            console.log(this.editForm);
        },
        handleClick(tab, event) {
            //console.log(tab, event);
        },
        handleCateChange(v){
            this.editForm.cate_id = v; 
        },
        handleRemove(file, fileList) {
            if(this.fileList.length !=0){
                let delUrl;
                let delUrlArr;
                delUrlArr = file.url.split('/');
                delUrl = '/'+delUrlArr[delUrlArr.length-2]+'/'+delUrlArr[delUrlArr.length-1];
                this.editForm.del_imgs.push(delUrl);
            }
            console.log(this.editForm);

        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        uploadSuccess(response, file, fileList){
            //console.log(1);
            this.editForm.img_path.push(response.data.url);
            this.ctrlNum++;
            console.log(fileList);
            if(this.ctrlNum >= fileList.length){
                this.formSubmit('editForm');
                this.ctrlNum = 0;
            }else{
                if(fileList[fileList.length-1].response){
                    this.formSubmit('editForm');
                    this.ctrlNum = 0;
                }
            }
        },
        uploadError(err, file, fileList){
            this.$message.error('上传出错：' + err.msg);
        },

        // //重写formSubmit 因为要先提交图片
        beforeFormSubmit(name){
            //console.log(this.$refs.upload);die;
            this[name].description = this.editContent;
            console.log(this.$refs.upload);
            let upLength = this.$refs.upload.uploadFiles.length;
            if(upLength != this.fileList.length && upLength!=0){
                if(this.$refs.upload.uploadFiles[upLength-1].status == "success"){
                    this.formSubmit(name);
                }else{
                    this.submitUpload();
                }
            }else{
                if(upLength!=0){
                    if(this.$refs.upload.uploadFiles[upLength-1].status == "ready"){
                        this.submitUpload();
                    }else{
                        this.formSubmit(name);
                    }
                }else{
                    this.formSubmit(name);
                }
            }
            
            this.editForm.img_path = [];
        },

        //---------提交请求
        getAjaxPromise(model){
            //console.log(model);
            return this.ajaxProxy.update(model.id, model);
        },
        //---------编辑器
        onEditorBlur(quill) {
            //console.log('editor blur!', quill);
        },
        onEditorFocus(quill) {
            //console.log('editor focus!', quill);
            
        },
        onEditorReady(quill) {
            //console.log('editor ready!', quill);
        },
        onEditorChange({ quill, html, text }) {
            //console.log('editor change!', quill.getContents(), html, text);
            this.editContent = html;
            //console.log(quill.getContents());
        }

    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        }
    },
    created(){
        this.editorOption = quillRedefine(
            {
                // 图片上传的设置
                uploadConfig: {
                    action: this.uploadUrl,  // 必填参数 图片上传地址
                    // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
                    // 你必须把返回的数据中所包含的图片地址 return 回去
                    res: (respnse) => {
                        //console.log(respnse);
                        return respnse.data.fullurl;
                    },
                    methods: 'POST',  // 可选参数 图片上传方式  默认为post
                    //token: sessionStorage.token,  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
                    name: 'avatar',  // 可选参数 文件的参数名 默认为img
                    size: 500,  // 可选参数   图片限制大小，单位为Kb, 1M = 1024Kb
                    accept: 'image/png, image/gif, image/jpeg, image/jpg',  // 可选参数 可上传的图片格式
                    // start: function (){}
                    start: () => {
                    },  // 可选参数 接收一个函数 开始上传数据时会触发
                    end: () => {
                    },  // 可选参数 接收一个函数 上传数据完成（成功或者失败）时会触发
                    success: () => {
                    },  // 可选参数 接收一个函数 上传数据成功时会触发
                    error: () => {
                    }  // 可选参数 接收一个函数 上传数据中断时会触发
                },
                // 以下所有设置都和vue-quill-editor本身所对应
                placeholder: '请编写产品描述',  // 可选参数 富文本框内的提示语
                theme: 'snow', // 可选参数 富文本编辑器的风格
                toolOptions: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'font': [] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'align': [] }],
                    ['clean'],
                    ['link', 'image']
                ],  // 可选参数  选择工具栏的需要哪些功能  默认是全部
                handlers: {} , // 可选参数 重定义的事件，比如link等事件
            }
        );
        //console.log(this.editorOption);
    }




}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .name-input{
        max-width: 217px;
    }
    .ql-toolbar.ql-snow + .ql-container.ql-snow {
        border-top: 0px;
        min-height: 300px;
    }

    .quill-editor .ql-container {
        height: 300px !important;
    }
</style>
      