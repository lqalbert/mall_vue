<template>
    <div >
        <MyDialog title="编辑标题" :name="name" :width="width" :height="height"  @before-open="onOpen">
            <el-form :model="editForm"  ref="editForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="公告标题" prop="title" >
                            <el-input class="name-input" size="small" placeholder="公告标题" v-model="editForm.title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="公告类型" prop="type_id" >
                            <el-select v-model.number="editForm.type_id" placeholder="请选择总结类型">
                                <el-option v-for="v in types" :label="v.name" :value="v.id" :key="v.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="公告内容" prop="content" >
                            <!-- <el-input type="textarea" auto-complete="off" v-model="editForm.content" placeholder="请输入255字以内"></el-input> -->
                                <quill-editor v-model="editContent"
                                    ref="myQuillEditor"
                                    :options="editorOption"
                                    @change="onEditorChange($event)">
                                </quill-editor>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="开始时间" prop="start_time" >
                            <el-date-picker
                                    v-model="editForm.start_time"
                                    type="datetime"
                                    placeholder="选择开始时间"
                                    :picker-options="startPickerOptions"
                                    :editable="false"
                                    @change="startTimeChange">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="截止时间" prop="end_time" >
                            <el-date-picker
                                    v-model="editForm.end_time"
                                    type="datetime"
                                    placeholder="选择截止时间"
                                    :picker-options="endPickerOptions"
                                    :editable="false"
                                    @change="endTimeChange">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>

            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        @click="formSubmit('editForm')"
                        :observer="dialogThis">
                    保 存
                </submit-button>
            </div>

        </MyDialog>    </div>
</template>

<script>
    import DialogForm from '@/mix/DialogForm';
    import DataProxy from '@/packages/DataProxy';
    import { quillRedefine } from 'vue-quill-editor-upload';
    import APP_CONST from '@/config';



    export default {
        name: 'edit',
        mixins:[DialogForm],
        props:{
            types:{
                type:Array
            }
        },
        components:{
            quillRedefine
        },
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'80px',
                
                editForm:{
                    id:'',
                    user_id:'',
                    title:"",
                    type_id:"",
                    start_time:"",
                    end_time:"",
                    content:"",
                },
                rules:{
                    title:[
                        { required: true, message: '请输入公告标题', trigger: 'blur'},
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    type_id:[
                        { required: true, type:"number",  message: '请选择公告类型', trigger: 'blur'},
                    ],
                },
                startPickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() ;
                    }
                },
                endPickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() ;
                    }
                },
                model:null,
                editContent:"",
                editorOption:null
            }
        },
        methods:{
            onOpen(param){
                this.model = param.params.model;
            },
            startTimeChange(v){
                this.editForm.start_time=v;
            },
            endTimeChange(v){
                this.editForm.end_time=v;
            },
            getAjaxPromise(model){
                return this.ajaxProxy.update(model.id, model);
            },
            onEditorChange({ quill, html, text }) {
                // this.editContent = html;
                this.editForm.content= html;
            },
        },
        watch:{

            model:function(val, oldVal){
                for (const key in this.editForm) {
                    if (this.editForm.hasOwnProperty(key)) {
                        this.editForm[key] = val[key]
                    }
                }
                this.editContent = this.editForm.content;
            }
        },

        created(){
            this.editorOption = quillRedefine(APP_CONST.editor_option);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
      