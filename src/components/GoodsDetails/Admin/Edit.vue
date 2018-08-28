<template>
    <div >
        <MyDialog title="编辑商品" :name="name" :width="width" :height="height" @before-open="onOpen" @before-close="onBeforeClose">
            <el-form :model="editForm" :rules="editFormRules" ref="editForm" :label-width="labelWidth"  :label-position="labelPosition" style="height:600px; overflow-y: auto">
                <el-tabs v-model="activeName" >
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
                                        filterable change-on-select clearable
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
                                <el-col :span="12">
                                    <el-form-item label="原价"  prop="del_price">
                                        <el-input class="name-input" v-model="editForm.del_price"  auto-complete="off" placeholder="0.00"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="商品货号"  prop="goods_number">
                                    <el-input class="name-input" v-model="editForm.goods_number"  auto-complete="off" placeholder="请填写商品货号"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="商品编号"  prop="sku_sn">
                                    <el-input class="name-input" v-model="editForm.sku_sn"  auto-complete="off" placeholder="请填写商品编号"></el-input>
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
                            <el-col :span="12">
                                    <el-form-item label="是否上架"  prop="status">
                                        <el-radio-group v-model="editForm.status">
                                            <el-radio :label="1">是</el-radio>
                                            <el-radio :label="2">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                        </el-row>
                        
                        <!-- 库存需要 -->
                        <el-row>
                                <el-col :span="12">
                                    <el-form-item label="包装规格"  prop="format">
                                        <el-col :span="4">
                                            <el-input placeholder="长" v-model="editForm.len"></el-input>
                                        </el-col>
                                        <el-col class="line" :span="2">-</el-col>
                                        <el-col :span="4">
                                            <el-input placeholder="宽" v-model="editForm.width"></el-input>
                                        </el-col>
                                        <el-col class="line" :span="2">-</el-col>
                                        <el-col :span="4">
                                            <el-input placeholder="高" v-model="editForm.height"></el-input>
                                        </el-col>
                                        mm
                                </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="条码" prop="barcode">
                                        <el-input placeholder="条码" v-model="editForm.barcode"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="重量(g)" prop="weight">
                                        <el-input placeholder="重量单位 g" v-model="editForm.weight"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="气泡垫(g)" prop="bubble_bag">
                                        <el-input placeholder="重量单位 g" v-model="editForm.bubble_bag"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                           <!-- / 库存需要 -->
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="商品规格" prop="specifications" >
                                    <el-input class="name-input" v-model="editForm.specifications"  auto-complete="off" placeholder="请填写商品规格"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="套餐" prop="combo">
                                    <el-radio-group v-model="editForm.combo">
                                        <el-radio :label="0">否</el-radio>
                                        <el-radio :label="1">是</el-radio>
                                    </el-radio-group>
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



                    <el-tab-pane label="商品图片" name="third">
                        
                        <el-upload
                            ref="upload"
                            name="avatar"
                            :multiple="true"
                            :auto-upload="false"
                            :action="uploadUrl"
                            list-type="picture-card"
                            :file-list="fileList"
                            accept="image/gif, image/jpeg,image/jpg,image/png"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :on-change="changeFiLelist"
                            :before-upload="beforeAvatarUpload">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogVisible" size="tiny" :modal="false">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                        <div class="el-upload__tip">默认第一张图片为封面图片</div>
                    </el-tab-pane>
                    <el-tab-pane label="前台显示" name="four">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="累计评价"  prop="comments">
                                    <el-input class="name-input" v-model="editForm.comments"  auto-complete="off" placeholder="1890"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="累积销售"  prop="sale_count">
                                    <el-input class="name-input" v-model="editForm.sale_count"  auto-complete="off" placeholder="500"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="12">
                                <el-form-item label="显示库存"  prop="sale_able_count">
                                    <el-input class="name-input" v-model="editForm.sale_able_count"  auto-complete="off" placeholder="1890"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-form>

            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                    ref="submit-button"
                    @click="beforeFormSubmit('editForm')"
                    :observer="dialogThis">
                    保 存
                </submit-button>
            </div>

        </MyDialog>
    </div>
</template>

<script>
import DialogForm from '../../../mix/DialogForm';
import AttrItem from '../../common/AttrFormItem';
import APP_CONST from '../../../config';
import { quillRedefine } from 'vue-quill-editor-upload';
import localMix from '../mix';


export default {
    name: 'Edit',
    mixins:[DialogForm,localMix],
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
        let is_integer = (rule,value,callback)=>{
            if (!Number.isInteger(value)) {
                callback(new Error('请输入整数数字值'));
            }else{
                if (value < 0) {
                    return callback(new Error('不能为负数'))
                }else{
                    callback();
                }
            }
        } ;
        let validateFormats = (rule, value, callback) => {
            if(this.editForm.len == null || this.editForm.len == ''){
                callback(new Error('请输入长度'));
            }else if (this.editForm.width == null || this.editForm.width == '') {
                callback(new Error('请输入宽度'));
            }else if (this.editForm.height == null || this.editForm.height == '') {
                callback(new Error('请输入高度'));
            }else {
                callback();
            }
        };
        return {
            dialogImageUrl:'',
            dialogVisible: false,
            activeName:'first',
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'100px',
            UnitTypes:{},
            editForm:{
                subtitle:"",
                brief:"",
                goods_name:'',
                cate_id:[],
                goods_price:'',
                status:'',
                goods_number:'',
                sku_sn:"",
                unit_type:'',
                description:'',
                del_imgs:[],
                cover_url:'',
                id:'',
                imgs:[],
                category:[],
                del_price:"",
                comments:"",
                sale_count:"",
                sale_able_count:"",

                len:'',
                width:'',
                height:'',
                barcode:'',
                weight:'',
                bubble_bag:'',
                specifications:'',
                combo:''
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
            changeFileLists:[],
            cover_url:'',
            model:null,
            editFormRules:{
                goods_name:[
                    {required: true, message:'名称必填', trigger:'blur'},
                    {max:100, message:'最长100个字符', trigger:'blur'}
                ],
                unit_type:[
                    {required: true,   message: '请选择单位', trigger:'change'}
                ],
                goods_price:[
                    {required: true,pattern:/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,  message: '价格格式为88.88', trigger:'blur'}
                ],
                sku_sn:[
                    { required: true, message: '商品编号必填', trigger:'blur'}
                ],
                format:[
                    {required: true,validator:validateFormats,trigger:'blur'}
                ],
                barcode:[
                    {required: true, message: '请填写条码', trigger:'blur'}
                ],
                weight:[
                    {required: true, message: '请填写重量', trigger:'blur'}
                ],
                bubble_bag:[
                    {required: true, message: '请填写气泡垫重量', trigger:'blur'}
                ],
                comments:[
                    {trigger:'blur', validator: is_integer,}
                ],
                sale_count:[
                    {trigger:'blur', validator: is_integer,}
                ],
                sale_able_count:[
                    {trigger:'blur', validator: is_integer,}
                ],
            },

            submit_state:0
        }
    },
    methods:{
        onOpen(param){
            this.fileList = [];
            let id = param.params.id;
            this.UnitTypes = param.params.extra;
            this.ajaxProxy.find(id, { with:['category', 'imgs'] }).then((data)=>{
                let row = data.data;
                row.del_imgs = [];
                row.cate_id = [];
                for (let index = 0; index < row.category.length; index++) {
                    row.cate_id.push(row.category[index].id);
                }
                for (let index = 0; index < row.imgs.length; index++) {
                    this.fileList.push({name:row.imgs[index].url, url:row.imgs[index].url, full_url:row.imgs[index].full_url, id:row.imgs[index].id});
                }
                this.model = row;
            })
        },

        handleCateChange(v){
            this.editForm.cate_id = v;
        },
        handleRemove(file, fileList) {
            if(this.fileList.length !=0){
                if(file.id){
                    this.editForm.del_imgs.push(file.id);
                }
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        submitUpload() {
            if (this.changeFileLists.length !=0 ) {
                if(!this.changeFileLists.every(function(element){
                    return element.status  == 'success' ;
                })){
                    this.submit_state = 1;
                    this.$refs.upload.submit();
                    return ;
                }  
            }
            this.submit_state = 2; 
            return ;
        },
        uploadSuccess(response, file, fileList){
            // console.log(fileList);
            if(fileList.every(function(element){
                return element.status  == 'success' ;
            })){
                
                this.setMergeImg(fileList);
            }    
        },
        uploadError(err, file, fileList){
            this.$message.error('上传出错：' + err.msg);
            this.submit_state = -1;
            this.$refs['submit-button'].$emit('reset');
        },

        reals(name){
            let vmthis = this;

            if (vmthis.d ) {
                clearTimeout(vmthis.d);
            }
            if(vmthis.submit_state == -1 ||  vmthis.submit_state == 0) {
                return ;
            }

            vmthis.d = setTimeout(function(){
                if (vmthis.submit_state == 2) {
                    vmthis.formSubmit(name);
                } else {
                    vmthis.reals(name);
                }
            },2000);
        },

        // //重写formSubmit 因为要先提交图片
        beforeFormSubmit(name){
            this[name].description = this.editContent;
            this.$refs['submit-button'].$emit('submit-ing');
            this.submitUpload();
            this.reals(name);
        },
        //---------提交请求
        getAjaxPromise(model){
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
        },
        setMergeImg(fileList){
            this.editForm.merge_img = [];
            fileList.forEach(function(element){
                if (element.response) {
                    this.push(element.response.data.url);
                } else {
                    this.push(element.url);
                }
            }, this.editForm.merge_img);

            this.submit_state = 2;
        },
        onBeforeClose(){
            this.submit_state = 0;
        },
        changeFiLelist(file, fileList){
            this.changeFileLists = fileList;
        },
        upimgErr(){
            this.submit_state = 0;
            this.$refs['submit-button'].$emit('reset');
        }

    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        }
    },
    
    watch:{
        model:function(val, oldVal){
            for (const key in this.editForm) {
                if (this.editForm.hasOwnProperty(key)) {
                    this.editForm[key] = val[key];
                    
                    if(key == 'unit_type'){
                         this.editForm[key] = this.editForm[key].toString();
                    }
                }
            }
            this.editContent = this.editForm.description;
        }
    },
    created(){
        this.editorOption = quillRedefine(APP_CONST.editor_option);
        this.$on('upload-error', this.upimgErr);
        
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
    .v-modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background: #000;
    }
</style>
      