<template>
    <div >
        <el-dialog title="导入客户" :visible.sync="state6" @close="handleClose">
            <el-form  :inline="true" :model="searchForm" size="small" label-width="140px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item  label="销售部" prop="department_id">
                            <el-select size="small" clearable v-model="searchForm.department_id">
                                <el-option label="销售二部" value="1"></el-option>
                                <el-option label="销售四部" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  label="销售小组" prop="group_id">
                            <el-select size="small" clearable v-model="searchForm.group_id">
                                <el-option label="飞龙队" value="1"></el-option>
                                <el-option label="猛龙队" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  label="销售员工" prop="user_id">
                            <el-select size="small" clearable v-model="searchForm.user_id">
                                <el-option label="张三" value="1"></el-option>
                                <el-option label="李四" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='24'>
                        <el-form-item label="审查员工" prop="risk_id">
                            <el-select  size="small" clearable v-model="searchForm.risk_id">
                                <el-option label="张三" value="1"></el-option>
                                <el-option label="李四" value="2"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="回访员工" prop="callback_id">
                            <el-select  size="small" clearable v-model="searchForm.callback_id">
                                <el-option label="张三" value="1"></el-option>
                                <el-option label="李四" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='24'>

                        <el-form-item label="材料员工" prop="datastaff_id">
                            <el-select  size="small" clearable v-model="searchForm.datastaff_id">
                                <el-option label="张三" value="1"></el-option>
                                <el-option label="李四" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog()">取 消</el-button>
                <el-button @click="addFormSubmit()" type="primary"  >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'addDialog',
        props:{
            addOpen:{
                type:Boolean,
                default:false
            }
        },
        data () {
            return {
                state6: this.addOpen,
                searchForm:{
                    name:"",
                    sortFiled:"id",
                    sortWay:"asc",
                    checkState:"",
                    risk_state:'',
                    callback_state:'',
                    status:'',
                    department_id:"",
                    group_id:"",
                    user_id:"",
                    risk_id:"",
                    callback_id:"",
                    datastaff_id:""
                },

            }
        },

        methods:{
            handleClose(){
                this.$emit('add-window-close');
            },
            addFormSubmit:function(){
                console.log(this.searchForm);
                this.state6=false;
            },
            closeDialog:function(){
                this.state6=false;
            }
        },
        watch:{
            addOpen:function(val, oldVal){
                this.state6 = val;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

