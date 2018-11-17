<template>
    <div>
        <MyDialog title="手动设置匹配" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form ref="addForm" :model="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-row>
                    <el-col>
                        <el-form-item label="部门" prop="department_id">
                            <el-select size="small" clearable
                                filterable v-model="addForm.department_id" @change="saleDepChange" placeholder="选择部门">
                                <el-option v-for="dep in departments" :key="dep.id" :value="dep.id" :label="dep.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="小组" prop="group_id">
                            <el-select size="small" clearable filterable 
                                v-model="addForm.group_id" @change="saleGroupChange" placeholder="选择小组">
                                <el-option v-for="group in groups" :key="group.id" :value="group.id" :label="group.name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="员工" prop="user_id">
                            <el-select v-model="addForm.user_id" placeholder="员工" clearable filterable>
                                <el-option v-for="user in users" :value="user.id" :label="user.realname" :key="user.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                    :observer="dialogThis"
                    @click="formSubmit('addForm')" >
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>
 
<script>
import DialogForm from '@/mix/DialogForm';
import EmployeeSelectAjaxProxy from "@/packages/EmployeeSelectProxy";
import { mapGetters } from 'vuex';

export default {
    name: 'manual-match',
    mixins:[DialogForm],
    components:{
        
    },
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',

            addForm:{
                department_id:'',
                group_id:'',
                user_id:'',
                ids:[]
            },
            rules:{
                department_id:[
                    {required: true,type: 'number', message:'选择部门',trigger:'blur'}
                ],
                group_id:[
                    {required: true,type: 'number', message:'选择小组',trigger:'blur'}
                ],
                user_id:[
                    {required: true,type: 'number', message:'选择员工',trigger:'blur'}
                ],
            },
            users:[],
        }
    },
    computed:{
        ...mapGetters([
            'user_id',
            'getUser',
        ]),
        departments(){
            return this.$store.getters.getDepartments;
        },
        groups(){
            return this.$store.getters.getGroupsByDepartment(this.addForm.department_id);
        }
    },
    methods:{
        onOpen(param){
            console.log(param.params);
            this.addForm.ids = param.params.ids;
        },
        getAjaxPromise(model){
            return this.ajaxProxy.manualMatch(model);
        },
        saleDepChange(v){
            this.$store.dispatch('initGroups', {department_id:v});
            this.addForm.group_id= "";
            this.addForm.user_id = '';
            this.users = [];
        },
        saleGroupChange(v){
            let dep_id = this.addForm.department_id;
            if (v.toString().length > 0) {
                this.employeeSelect.setParam({group_id:v,department_id:dep_id});
                this.employeeSelect.load();
            }
            this.addForm.user_id = '';
            this.users = [];
        },
        loadUsers(data){
            this.users = data.items;
        },
        setSuccess(name){
            console.log(name);
            this.$refs[name].resetFields();
        }
    },
    created(){
        this.$store.dispatch('initDepartments');
        this.employeeSelect = new EmployeeSelectAjaxProxy(null, this.loadUsers, this);
        this.$on('submit-success',this.setSuccess)
    },
    
}
</script>
<style scoped>
    .form-item-unique{
        width: 140px !important;
    }
    .name-input{
        max-width: 170px;
    }
    .name-input-area{
        max-width: 220px;
    }
    .pull-right {
        float: right;
    }

    .input-width {
        width: 120px;
    }
</style>

 