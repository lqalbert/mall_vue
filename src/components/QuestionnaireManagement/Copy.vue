<template>
        <div >
            <MyDialog title="编辑" :name="name" :width="width" :height="height" @before-open="onOpen">
                <el-form :model="editForm" :rules="rules" :label-width="labelWidth"  ref="editForm" :label-position="labelPosition">
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="访问网址" prop="title" >
                                <el-input   v-text="title" auto-complete="off" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item>
                                <el-button type="primary" size="small" @click="goHtml()">跳转到页面</el-button>
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
        import {QUESTIONNAIRE_URL} from '../../config';
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
                    labelWidth:'140px',
                    editForm:{
                        id:"",
                        title:"http://yanggang112.51vip.biz:50009/questionnaire",
                        title1:"http://localhost:8000/questionnaire",
                        title2:"http://pulata.com.cn/questionnaire",
                    },
                    rules:{

                    },
                    title:'',
                    title1:'',
                    title2:'',
                    model:null,
                }
            },
            methods:{
                onOpen(param){
                    this.model = param.params.model;
                },
                goHtml(){
                    window.open(this.title);
                },
                getAjaxPromise(model){
                    return this.ajaxProxy.update(model.id, model);
                } ,
            },
            watch:{
              model:function (val,oldval) {
                  // this.title = "http://yanggang112.51vip.biz:50009/questionnaire" + '?id=' + val.id;
                  this.title = QUESTIONNAIRE_URL + val.id;
                  // this.title2 = "http://pulata.com.cn/questionnaire" + '?id=' + val.id;
              }
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
    
    