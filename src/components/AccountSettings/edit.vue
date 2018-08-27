<template>
    <div >
        <MyDialog title="编辑配送中心" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm"  :label-width="labelWidth" :rules="rules" ref="editForm" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属部门" prop="department_id">
                            <el-select  v-model.number="editForm.department_id" placeholder="部门"  @change="departmentChange">
                                <!-- <el-option label="请选择" :value="0"></el-option> -->
                                <el-option v-for="department in departments"
                                           :label="department.name"
                                           :value="department.id"
                                           :key="department.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属小组" prop="group_id" >
                            <el-select v-model.number="editForm.group_id" placeholder="团队小组" @change="groupChange">
                                <!--<el-option label="请选择" :value="0"></el-option>-->
                                <el-option
                                        v-for="group in groups"
                                        :label="group.name"
                                        :value="group.id"
                                        :key="group.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注"  prop="remark">
                            <el-input type="textarea"  auto-complete="off" v-model="editForm.remark" placeholder="请填写备注(100字以内)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
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

    import { mapGetters } from 'vuex';
    import getGroupsByPid from '../../ajaxProxy/getGroupsByPid';
    import { PHONE_REG } from "@/config/index";
    export default {
        name: 'editDialog',
        mixins:[DialogForm,getGroupsByPid],
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
                groups:[],
                editForm:{
                    id:'',
                    remark:'',
                    department_id:'',
                    group_id:'',
                    department_name:'',
                    group_name:'',
                },
                model:'',
                rules:{
                    department_id:[
                        { required: true,type:'number', message: '请选择部门', trigger: 'blur' }
                    ],
                    group_id:[
                        {  required:true, type:'number', message:'请选择小组', trigger: 'blur', },
                    ],
                    remark:[
                        {max: 100, message: '长度不能超过100个字符', trigger: 'blur'  }
                    ],
                }
            }
        },
        methods:{
            departmentChange(v){
                this.groups=[];
                // this.editForm.group_id=0;
                this.getGroupsAjax(v);
                this.getName(this.departments,'department_name',v);
            },
            groupChange(v){
                this.getName(this.groups,'group_name',v);
            },
            getAjaxPromise(model){
                return this.ajaxProxy.update(model.id, model);
            },
            onOpen(param){
                this.model = param.params.model;
                this.getGroupsAjax(this.model.department_id);
            },

            getName(arr,field,id){
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]['id'] == id) {
                        this.editForm[field] = arr[i]['name'];
                    }
                }
            },

        },
        watch:{
            model:function(val, oldVal){
                for (const key in this.editForm) {
                    if (this.editForm.hasOwnProperty(key)) {
                        this.editForm[key] = val[key]
                    }
                }

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
</style>

