<template>
    <div >
        <MyDialog title="发布标题" :name="name" :width="width" :height="height">
            <el-form :model="addForm"  ref="addForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="公告标题" prop="title" >
                            <el-input class="name-input" size="small" placeholder="公告标题" v-model="addForm.title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="公告类型" prop="type_id" >
                            <el-select v-model="addForm.type_id" placeholder="请选择总结类型">
                                <el-option v-for="v in types" :label="v.name" :value="v.id" :key="v.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="公告内容" prop="content" >
                            <!-- <el-input type="textarea" auto-complete="off" v-model="addForm.content" placeholder="请输入255字以内"></el-input> -->
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
                                    v-model="addForm.start_time"
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
                                    v-model="addForm.end_time"
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
                        @click="formSubmit('addForm')"
                        :observer="dialogThis">
                    保 存
                </submit-button>
            </div>

        </MyDialog>    </div>
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
        types:{
            type:Array
        }
    },
    computed:{
        ...mapGetters([
            'getUser'
        ])
    },
    components:{
        quillRedefine
    },
    data () {
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            
            addForm:{
                title:'',
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
                // content:[
                //     {required: true, message: '请输入公告内容', trigger: 'blur'},
                // ],
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
            editContent:"",
            editorOption:null,
        }
    },
    methods:{
        startTimeChange(v){
            this.addForm.start_time=v;
        },
        endTimeChange(v){
            this.addForm.end_time=v;
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

    

    .quill-editor .ql-container {
        height: 400px !important;
    }

</style>
      