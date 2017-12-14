<template>
    <div >
        <el-dialog title="编辑修改" :visible.sync="state8" @close="handleClose">
            <el-form ref="editForm" :inline="true" :model="editForm"  >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="单位名" prop="name">
                            <el-input v-model="editForm.name"  auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类型" prop="type">
                            <el-select  v-model="editForm.type"   >
                                <el-option  v-for='(item,key) in typeList' :label="item" :value="key" :key="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="事业/财富区"  prop="division_id" >
                            <el-select  v-model="editForm.division_id" placeholder="请选择事业/财富区">
                                <el-option v-for='item in topO' :label="item.name" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="部门经理"  prop="contact" >
                                <el-select v-model='editForm.user_id'>
                                    <el-option v-for="user in computedusers" :label="user.realname" :value="user.user_id" :key="user.user_id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注"  prop="remark">
                            <el-input  auto-complete="off" v-model="editForm.remark"></el-input>
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
        name: 'editDialog',
        props:{
            editOpen:{
                type:Boolean,
                default:false
            }
        },
        data () {
            return {
                computedusers:[
                    {user_id:'1',realname:'李青'},
                    {user_id:'2',realname:'高鹏'},
                    {user_id:'3',realname:'马娇'},
                    {user_id:'4',realname:'吴继伟'},
                ],
                topO:[
                    {id:'1',name:'西北区'},
                    {id:'2',name:'东南区'},
                    {id:'3',name:'沿海区'},

                ],
                typeList:['销售部','推广部','风控部','人事部'],
                state8: this.editOpen,
                editForm:{
                    type:'',
                    name:'',
                    remark:'',
                    user_id:'',
                    division_id:'',
                },

            }
        },

        methods:{
            handleClose(){
                this.$emit('add-window-close');
            },
            addFormSubmit:function(){
                console.log(this.editForm);
                this.state8=false;
            },
            closeDialog:function(){
                this.state8=false;
            }
        },
        watch:{
            editOpen:function(val, oldVal){
                this.state8 = val;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

