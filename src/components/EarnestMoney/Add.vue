<template>
    <div>
        <MyDialog title="添加" :name="name" :width="width" :height="height">
            <el-form :model="addForm"  ref="addForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="部门" prop="department_id">
                            <el-select clearable  placeholder="请选择部门名"  v-model="addForm.department_id" >
                                <el-option v-for="v in departments"
                                    :label="v.name" 
                                    :value="v.id"
                                    :key="v.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    
                    <el-col :span="12">
                        <el-form-item label="金额" prop="money" >
                            <el-input class="name-input"  placeholder="输入金额" v-model.number="addForm.money"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备注" prop="remark" >
                            <el-input type="textarea" :rows="2" v-model="addForm.remark" placeholder="请输入200个字以内"></el-input>
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
import getUsersByGid from '../../ajaxProxy/getUsersByGid';
import getGroupsByPid from '../../ajaxProxy/getGroupsByPid';
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
            users:[],
            // chargeTypes:[
            //     {id:1,name:'微信'},
            //     {id:2,name:'支付宝'},
            //     {id:3,name:'银行转账'},
            //     ],
            departmentInput:'',
            groupInput:'',
            userInput:'',
            addForm:{
                department_id:"",
                // group_id:"",
                // user_id:"",
                department_name:"",
                // group_name:"",
                // charge_type:'',
                // charge_time:"",
                realname:"",
                money:"",
                creator_id:"",
                creator:"",
                remark:"",
                charge_department:""
            },
            rules:{
                money:[
                    { required: true, message:'金额未输入或输入的格式不正确', pattern:/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/ , trigger:'blur',min:0 }
                ],
                department_id:[
                    {required: true, message:'请选择部门', type: 'number', trigger:'blur'}
                ] ,
                remark:[
                    { message:'输入内容最大长度为200', type: 'string', trigger:'blur', max:200}
                ]
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now() ;
                }
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
        timeChange(v){
            this.addForm.charge_time=v;
        },
        // formSubmit(v){
        //     console.log(this.addForm);
        // },
        loadDepartment(data){
            this.departments = data.res;
        },
        onDepartChange(id){
            this.groups=[];
            this.users=[];
            this.addForm.department_name=this.departments[id].name;
            this.addForm.group_id='';
            this.addForm.user_id='';
            this.getGroupsAjax(id);

        },
        onGroupChange(index){
            this.users=[];
            this.addForm.user_id='';
            this.addForm.group_id=this.groups[index].id;
            this.addForm.group_name=this.groups[index].name;
            this.getUsersAjax(this.groups[index].id);
        },
        onUserChange(index){
            this.addForm.user_id=this.users[index].id;
            this.addForm.realname=this.users[index].realname;
        }
        
    },
    created(){
        let departProxy = new DepartSelectProxy(null, this.loadDepartment, this);
        this.departProxy = departProxy;
        this.departProxy.load();

        this.addForm.creator_id = this.creator_id;
        this.addForm.creator = this.creator;
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
      