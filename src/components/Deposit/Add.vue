<template>
        <div>
            <MyDialog title="添加" :name="name" :width="width" :height="height">
                <el-form :model="addForm"  ref="addForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="部门" prop="department_id">
                                <el-select clearable size="small" placeholder="请选择部门名"  v-model="departmentInput" @change="onDepartChange">
                                    <el-option v-for="(v,index) in departments" 
                                        :label="v.name" 
                                        :value="index" 
                                        :key="v.id">
                                        
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="小组" prop="group_id" >
                                <el-select size="small" placeholder="请选择小组"  v-model="groupInput" @change="onGroupChange">
                                        <el-option v-for="(v,index) in groups" 
                                            :label="v.name" 
                                            :value="index" 
                                            :key="v.id">
                                            {{ v.name }} - {{ index }}
                                        </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="员工" prop="user_id" >
                                <el-select size="small" placeholder="请选择员工"  v-model="employeeInput" @change="onEmployeeChange">
                                    <el-option v-for="(v,index) in employee"
                                        :label="v.realname" 
                                        :value="index" 
                                        :key="v.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="金额" prop="money" >
                                <el-input size="small" placeholder="输入金额" v-model.number="addForm.money"></el-input>
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
    
            </MyDialog>
        </div>
    </template>
    
    <script>
    import DialogForm from '../../mix/DialogForm';
    import DataProxy from '../../packages/DataProxy';

    import DepartSelectProxy from '../../packages/DepartSelectProxy';
    import GroupSelectProxy from '../../packages/GroupSelectProxy';
    import EmployeeSelectProxy from '../../packages/EmployeeSelectProxy';

    import { mapGetters } from 'vuex';
    
    export default {
        name: 'Add',
        mixins:[DialogForm],
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'80px',

                departments:[],
                groups:[],
                employee:[],

                departmentInput:"",
                groupInput:"",
                employeeInput:"",
                
                addForm:{
                    department_id:"",
                    group_id:"",
                    user_id:"",

                    department_name:"",
                    group_name:"",
                    realname:"",

                    money:"",
                    creator_id:"",
                    creator:"",
                    // charge_at:"",
                    charge_department:""
                },
                rules:{
                    // name:[
                    //     { required: true, message: '请输入部门名称', trigger: 'blur' }
                    // ],
                    money:[
                        { required: true, message:'请输入金额', type: 'integer', trigger:'change'}
                    ]
                },
    
    
            }
        },
        computed:{
            ...mapGetters({
                'creator_id':'user_id',
                'creator':'realname',
                'departName':'departName'
            })
        },
        methods:{
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            },
            loadDepartment(data){
                this.departments = data.items;
            },
            loadGroup(data) {
                this.groups = data.items;
            },

            onDepartChange(index){
                if (index !== "") {
                    this.addForm.department_id = this.departments[index].id;
                    this.addForm.department_name = this.departments[index].name;

                    this.groupProxy.setParam({department_id: this.addForm.department_id});
                    this.groupProxy.load();
                } else {
                    this.groupInput = "";

                    this.addForm.department_id = "";
                    this.addForm.department_name = "";
                }
            },
            onGroupChange(index){
                if (index !== "") {
                   
                    this.addForm.group_id = this.groups[index].id;
                    this.addForm.group_name = this.groups[index].name;

                    this.employeeProxy.setParam({group_id: this.addForm.group_id});
                    this.employeeProxy.load();
                } else {
                    this.addForm.group_id = "";
                    this.addForm.group_name = "";

                    this.employeeInput = "";
                }
            },
            onEmployeeChange(index){
                if (index !== "") {
                    this.addForm.user_id = this.employee[index].id;
                    this.addForm.realname = this.employee[index].name;
                } else {
                    this.addForm.user_id = "";
                    this.addForm.realname = "";
                }
            }
            
        },
        created(){
            let departProxy = new DepartSelectProxy(null, this.loadDepartment, this);
            this.departProxy = departProxy;
            this.departProxy.load();

            let groupProxy = new GroupSelectProxy(null, this.loadGroup, this);
            this.groupProxy = groupProxy;
            this.groupProxy.load();

            let employeeProxy = new EmployeeSelectProxy(null, this.loadEmployee, this);
            this.employeeProxy = employeeProxy;

            console.log(this.departName);
            this.addForm.charge_department = this.departName;
            console.log(this.creator);
            this.addForm.creator = this.creator;
            console.log(this.creator_id);
            this.addForm.creator_id = this.creator_id;

            
        }
    }
    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
        .name-input{
            max-width: 217px;
        }
    </style>
          