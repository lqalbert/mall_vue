<template>
    <div >
        <MyDialog title="导入账号设置" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="addForm"  :label-width="labelWidth" :rules="rules" ref="addForm" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属部门" prop="department_id">
                            <el-select  v-model.number="addForm.department_id" placeholder="部门"  @change="departmentChange">
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
                            <el-select v-model.number="addForm.group_id" placeholder="团队小组" @change="groupChange">
                                <el-option label="请选择" :value="0"></el-option>
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
                    <el-col :span="12">
                        <el-form-item label="员工" prop="user_id" >
                            <el-select v-model.number="addForm.user_id" placeholder="员工" @change="userChange">
                                <el-option label="请选择" :value="0"></el-option>
                                <el-option
                                        v-for="user in users"
                                        :label="user.realname"
                                        :value="user.id"
                                        :key="user.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--<el-col :span="12">-->
                        <!--<el-form-item label="接纳人数"  prop="max_number">-->
                            <!--<el-input type="input" class="name-input" auto-complete="off" v-model.number="addForm.max_number" placeholder="请填写该小组接纳人数"></el-input>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注"  prop="remark">
                            <el-input type="textarea"  auto-complete="off" v-model="addForm.remark" placeholder="请填写备注(100字以内)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                    :observer="dialogThis"
                    @click="beforeSubmit" >
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>

<script>

    import DialogForm from '../../mix/DialogForm';
    import EmployeeSelectProxy from '../../packages/EmployeeSelectProxy';
    import AreaSelect from '../../packages/AreaSelectProxy';

    import { mapGetters } from 'vuex';

    import { PHONE_REG } from "@/config/index";
    import getGroupsByPid from '../../ajaxProxy/getGroupsByPid';
    import getUsersByGid from '../../ajaxProxy/getUsersByGid';

    // import Dialog from '../common/Dialog';
    export default {
        name: 'addDialog',
        mixins:[DialogForm,getGroupsByPid,getUsersByGid],
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
                users:[],
                addForm:{
                    remark:'',
                    // max_number:'',
                    department_id:'',
                    group_id:'',
                    user_id:'',
                    department_name:'',
                    group_name:'',
                    user_name:'',
                },

                rules:{
                    department_id:[
                        { required: true,type:'number', message: '请选择部门', trigger: 'blur' }
                    ],
                    group_id:[
                        {  required:true, type:'number', message:'请选择小组', trigger: 'blur', },
                    ],
                    user_id:[
                        {  required:true, type:'number', message:'请选择员工', trigger: 'blur', },
                    ],
                    max_number:[
                        {  required:true, type:'number', message:'请填写小组接纳人数', trigger: 'blur', },
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
                this.addForm.group_id=0;
                this.getGroupsAjax(v);
                this.getName(this.departments,'department_name',v);
            },
            groupChange(v){
                this.getUsersAjax(v);
                this.getName(this.groups,'group_name',v);
            },
            userChange(v){
                this.getName(this.users,'user_name',v);
            },
            getName(arr,field,id){
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]['id'] == id) {
                        this.addForm[field] = arr[i]['name'] ? arr[i]['name'] : arr[i]['realname'];
                    }
                }
            },
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            },
            loadUsers(data){
                this.computedusers = data.items;
            },
            onOpen(param){

            },
            getAreaName(arr,field,id){
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]['id'] == id) {
                        this.addForm[field] = arr[i]['name'];
                    }
                }
            },
            beforeSubmit(){
                console.log(this.addForm);
                this.formSubmit('addForm');
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

