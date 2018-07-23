<template>
        <div>
            <MyDialog title="编辑" :name="name" :width="width" :height="height" @before-open="onOpen">
                <el-form :model="editForm"  ref="editForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="名称" prop="name" >
                                <el-input class="name-input"  placeholder="" v-model="editForm.name"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="包邮" prop="is_include">
                                <el-radio v-model="editForm.is_include" :label="1">包邮</el-radio>
                                <el-radio v-model="editForm.is_include" :label="0">不包</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="折扣" prop="discount" >
                                <el-input-number v-model="editForm.discount"  :min="1" :max="100" :step="10"></el-input-number>
                                <span>100表示不打折</span>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                    <!-- <el-row>
                        <el-col :span="12">
                            <el-form-item label="状态" prop="status" >
                                <el-radio v-model="editForm.status" :label="1">启用</el-radio>
                                <el-radio v-model="editForm.status" :label="0">禁用</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row> -->
                </el-form>
        
                <div slot="dialog-foot" class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <submit-button
                            @click="formSubmit('editForm')"
                            :observer="dialogThis">
                        保 存
                    </submit-button>
                </div>
    
            </MyDialog>
        </div>
    </template>
    
    <script>
    import DialogForm from '@/mix/DialogForm';
    
    export default {
        name: 'EditOrderType',
        mixins:[DialogForm],
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'100px',

                editForm:{
                    id:"",
                    name:"",
                    is_include:1,
                    discount:"100",
                    status:1
                },
                rules:{
                    name:[
                        { required: true, message:"请输入模板名", type:'string'},
                        { max:20, message:"最长不超过20个字符"}
                    ],
                    discount:[
                        { type:'number', max: 100 , message:"最大不超过100"}
                    ]
                },

                model:null
            }
        },
        
        methods:{
            getAjaxPromise(model){
                return this.ajaxProxy.update(model.id, model);
            },
            onOpen(param){
                this.model = param.params.model;
            },
        },
        watch:{
            model:function(val, oldVal){
                this.initObject(val, this.editForm);
            }
        },
        // created(){

        // }
    }
    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
        .name-input{
            max-width: 217px;
        }
    </style>
          