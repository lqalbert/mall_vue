<template>
        <div >
            <MyDialog title="编辑" :name="name" :width="width" :height="height" @before-open="onOpen">
                <el-form :model="editForm" :rules="rules" :label-width="labelWidth"  ref="editForm" :label-position="labelPosition">
                    <el-row>
                        <el-col :span="14">
                            <el-form-item label="测试服务器访问网址" prop="title" >
                                <el-input  v-model="editForm.title"  auto-complete="off" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="14">
                            <el-form-item label="开发访问网址" prop="title1" >
                                <el-input  v-model="editForm.title1"  auto-complete="off" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="14">
                            <el-form-item label="正式服务器访问网址" prop="title2" >
                                <el-input  v-model="editForm.title2"  auto-complete="off" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <!--<div slot="dialog-foot" class="dialog-footer">-->
                    <!--<el-button @click="handleClose">取 消</el-button>-->
                    <!--<submit-button-->
                        <!--:observer="dialogThis"-->
                        <!--@click="formSubmit('editForm')" >-->
                        <!--保 存-->
                    <!--</submit-button>-->
                <!--</div>-->
            </MyDialog>
        </div>
    </template>
    
    <script>
        import DialogForm from '../../mix/DialogForm';
        import APP_CONST from '../../config';
        import { quillRedefine } from 'vue-quill-editor-upload';
        export default {
            name: 'Copy',
            mixins:[DialogForm],
            components:{
            },
            data () {
                return {
                    dialogThis:this,
                    labelPosition:"right",
                    labelWidth:'160px',
                    editForm:{
                        id:"",
                        title:"http://yanggang112.51vip.biz:50009/questionnaire",
                        title1:"http://localhost:8000/questionnaire",
                        title2:"http://pulata.com.cn/questionnaire",
                    },
                    rules:{

                    },
                    model:null
                }
            },
    
            methods:{
                onOpen(param){
                },
                getAjaxPromise(model){
                    return this.ajaxProxy.update(model.id, model);
                } ,
            },
            created(){
            }
            
        }
    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
        .name-input{
            max-width: 217px;
        }
        .avatar{
            max-width: 250px;
            max-height: 250px;
        }
    </style>
    
    