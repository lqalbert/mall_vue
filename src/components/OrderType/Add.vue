<template>
        <div>
            <MyDialog title="添加" :name="name" :width="width" :height="height">
                <el-form :model="addForm"  ref="addForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="名称" prop="name" >
                                <el-input class="name-input"  placeholder="" v-model="addForm.name"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="包邮" prop="is_include">
                                <el-radio v-model="addForm.is_include" :label="1">包邮</el-radio>
                                <el-radio v-model="addForm.is_include" :label="0">不包</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="折扣" prop="discount" >
                                <el-input-number v-model="addForm.discount"  :min="1" :max="100" :step="10"></el-input-number>
                                <span>100表示不打折</span>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                    <!-- <el-row>
                        <el-col :span="12">
                            <el-form-item label="状态" prop="status" >
                                <el-radio v-model="addForm.status" :label="1">启用</el-radio>
                                <el-radio v-model="addForm.status" :label="0">禁用</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row> -->
                </el-form>
        
                <div slot="dialog-foot" class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <submit-button
                            @click="formSubmit('addForm')"
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
        name: 'AddOrderType',
        mixins:[DialogForm],
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'100px',

                addForm:{
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
                }
            }
        },

        methods:{
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
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
          