<template>
    <div >
        <MyDialog title="添加" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="addForm" ref="addForm" :label-width="labelWidth"  :label-position="labelPosition">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="基本信息" name="first">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="商品名称" prop="goods_name" >
                                    <el-input class="name-input" v-model="addForm.goods_name"  auto-complete="off" placeholder="请填写商品名称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="商品分类" prop="cate_id">
                                    <el-cascader
                                        expand-trigger="hover"
                                        :options="cateOptions"
                                        v-model="addForm.cate_id"
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
                                    <el-input class="name-input" v-model="addForm.subtitle"  auto-complete="off" placeholder="请填写商品名称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="简介" prop="brief">
                                    <el-input type="textarea" v-model="addForm.brief"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="商品价格"  prop="goods_price">
                                    <el-input class="name-input" v-model="addForm.goods_price"  auto-complete="off" placeholder="请填写商品价格"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="是否上架"  prop="status">
                                    <el-radio-group v-model="addForm.status">
                                        <el-radio label="1">是</el-radio>
                                        <el-radio label="2">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="商品货号"  prop="goods_number">
                                    <el-input class="name-input" v-model="addForm.goods_number"  auto-complete="off" placeholder="请填写商品货号"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="商品单位"  prop="unit_type">
                                    <el-select v-model='addForm.unit_type'>
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

                    <el-tab-pane label="商品规格" name="second">
                        <el-table :data="addForm.skus">
                            <el-table-column type="index" label="序号" width="80">
                            </el-table-column>
                            <el-table-column prop="name" label="sku" width="80">
                            </el-table-column>
                            <el-table-column  label="规格小项" >
                                <template slot-scope="scope">
                                    {{ displayAttr(scope.row.attr)|stringSuffix(10) }}
                                </template>
                            </el-table-column>
                            <el-table-column type="expand">
                                <template slot-scope="scope">
                                    <el-form label-position="left" inline class="table-expand " >
                                        <el-form-item v-for="item in scope.row.attr" :label="item.name + '：'">
                                            <span>{{ item.value }}</span>
                                            <img v-if="item.fullurl.length > 1" :src="item.fullurl" width="50" height="50" class="vertical-middle" >
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column prop="price" label="价格" width="80">
                            </el-table-column>
                            <el-table-column prop="num" label="库存" width="80">
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="small" type="danger" @click="deleteAttrItem(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <br>

                        <AttrItem :form-object="attrForm"></AttrItem>
                    
                        <el-form-item label="SKU"  prop="unit_type">
                            <el-col :span="10">
                                <el-input v-model="skuForm.name" placeholder="请输入内容"></el-input>
                            </el-col>
                        </el-form-item>
                    
                        <el-form-item label="价格"  prop="unit_type">
                            <el-col :span="10">
                                <el-input v-model="skuForm.price" placeholder="请输入内容"></el-input>
                            </el-col>
                        </el-form-item>
                    
                        <el-form-item label="数量"  prop="unit_type">
                            <el-col :span="10">
                                <el-input  v-model="skuForm.num" placeholder="请输入内容"></el-input>
                            </el-col>
                        </el-form-item>
                    
                        <el-form-item  prop="unit_type">
                            <el-button @click="addSku">添加SKU</el-button>
                        </el-form-item>
                    </el-tab-pane>

                    <el-tab-pane label="商品图片" name="third">

                        <el-upload
                            ref="upload"
                            name="avatar"
                            :auto-upload="false"
                            :action="uploadUrl"
                            list-type="picture-card"
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
                    @click="beforeFormSubmit('addForm')"
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
import APP_CONST from '../../config';
import GoodsTypeSelectProxy from '../../packages/GoodsTypeSelectProxy';

import { quillRedefine } from 'vue-quill-editor-upload';

export default {
    name: 'Add',
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
            addForm:{
                subtitle:"",
                goods_name:'',
                cate_id:[],
                goods_price:'',
                status:'1',
                goods_number:'',
                unit_type:'',
                description:'',
                img_path:[],
                skus:[],

            },
            attrForm:[],
            editContent:'',
            editorOption:{},
            ctrlNum:0,
            skulist:[],
            skuForm:{
                name:"",
                price:"",
                num:""
            },

        }
    },
    methods:{
        onOpen(param){
            this.UnitTypes = param.params.model;
        },
        handleClick(tab, event) {
            //console.log(tab, event);
        },
        handleCateChange(v){
            // this.addForm.cate_id = v;
            //获取对应的商品类型
            this.goodsTypeProxy.setParam({id:1}).find();
        },
        handleRemove(file, fileList) {
            //console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        uploadSuccess(response, file, fileList){
            this.addForm.img_path.push(response.data.url);
            this.ctrlNum++;
            if(this.ctrlNum >= fileList.length){
                //console.log(this.addForm);
                this.formSubmit('addForm');
                this.ctrlNum = 0;
            }
        },
        uploadError(err, file, fileList){
            this.$message.error('上传出错：' + err.msg);
        },

        // //重写formSubmit 因为要先提交图片
        beforeFormSubmit(name){
            //console.log(this.$refs.upload);
            this[name].description = this.editContent;
            this.addForm.img_path = [];
            if(this.$refs.upload.uploadFiles.length == 0){
                this.formSubmit(name);
            }else{
                this.submitUpload();
            }
            
        },

        //---------提交请求
        getAjaxPromise(model){
            return this.ajaxProxy.create(model);
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
        resetEditContent(){
            this.editContent = '';
        },
        loadGoodsAttr(data){
            if (data.specs) {
                data.specs.forEach(element => {
                    element.value = "";
                });
            }
            this._attrForm = data.specs;
            this._attrForm.forEach(function(item){
                item.fullurl = "";
                item.addon_value = "";
            })
            console.log(this._attrForm);
            this.copy(this._attrForm, this.attrForm);
        },
        addSku(){
            // console.log(this.attrForm);
            // this.skuForm.attr  = this.attrForm.concat(); //concat 一个空的数组 返回一个新数组;
            this.skuForm.attr = [];
            this.copy(this.attrForm, this.skuForm.attr);
            let obj = Object.assign({}, this.skuForm);
            this.addForm.skus.push(obj);
            this.attrForm = [];
            this.copy(this._attrForm, this.attrForm);
            this.skuForm.name = "";
            this.skuForm.price = "";
            this.skuForm.num = "";
        },
        displayAttr(attr){
            return attr.map((item)=>{
                return item.name+":"+item.value
            }).join("、");
        },
        copy(source, target){
            source.forEach(function(item){
                this.push(Object.assign({}, item));
            }, target);
            return target;
        },
        deleteAttrItem(index){
            this.addForm.skus.splice(index,1);
        }

    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        }
    },
    created(){
        this.editorOption = quillRedefine(APP_CONST.editor_option);
        this.$on('submit-success', this.resetEditContent);

        this.goodsTypeProxy  = new GoodsTypeSelectProxy({}, this.loadGoodsAttr, this);
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

    .table-expand .el-form-item {
        width: 40%;
    }
    .vertical-middle{
        vertical-align: middle;
    }
</style>
      