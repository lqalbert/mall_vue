<template>
    <div >
        <MyDialog title="编辑" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm" :rules="rules" :label-width="labelWidth"  ref="editForm" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="小组名称" prop="name" >
                            <el-input class="name-input" v-model="editForm.name"  auto-complete="off" placeholder="请填写小组名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属部门" prop="department_id" >
                            <el-select v-model='editForm.department_id'>
                                <el-option v-for="department in departments" 
                                :label="department.name" 
                                :value="department.id" 
                                :key="department.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="负责人"  prop="manager_id">
                            <el-select v-model='editForm.manager_id'>
                                <el-option v-for="user in computedusers" :label="user.realname" 
                                :value="user.user_id" :key="user.user_id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否启用" prop="status">
                            <el-radio-group v-model="editForm.status">
                                <el-radio :label="1">启用</el-radio>
                                <el-radio :label="0">禁用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注"  prop="remarks">
                            <el-input type="textarea"  auto-complete="off" v-model="editForm.remarks" placeholder="请填写备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        :observer="dialogThis"
                        @click="formSubmit('editForm')" >
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>

<script>

    import DialogForm from '../../mix/DialogForm';
    export default {
        name: 'editDialog',
        mixins:[DialogForm],
        props:{
            departments:{
                type: Array,
                default:[]
            },
        },
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'80px',
                computedusers:[
                    {user_id:1,realname:'李青'},
                    {user_id:2,realname:'高鹏'},
                    {user_id:3,realname:'马娇'},
                    {user_id:4,realname:'吴继伟'},
                ],
                
                editForm:{
                    id:"",
                    name:"",
                    department_id:"",
                    manager_id:"",
                    remarks:"",
                    status:1,
                },

                rules:{
                    name:[
                        { required: true, message: '请输入小组名称', trigger: 'blur' }
                    ],  
                    department_id:[
                        { required: true, message:'请选择所属部门', trigger: 'blur', type: 'number'}
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
            }
        },
        watch:{
            model:function(val, oldVal){
                this.initObject(val, this.editForm);
            }
        }
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>

