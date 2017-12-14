<template>
    <div >
        <el-dialog title="编辑修改" :visible.sync="state10" @close="handleClose">
            <el-form :model="editForm"   :inline="true" ref="editForm" >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="editForm.name"  auto-complete="off" placeholder="请填写单位名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="14">
                        <el-form-item label="区域经理">
                            <el-select v-model="editForm.user_id">
                                <el-option v-for="user in computedusers" :key="user.user_id" :label="user.realname" :value="user.user_id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备注"  prop="type">
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="editForm.brief">
                            </el-input>

                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog()">取 消</el-button>
                <el-button @click="editFormSubmit()" type="primary"  >确 定</el-button>
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

                state10: this.editOpen,
                editForm:{
                    name:"",
                    user_id:null,
                    brief:""
                },

            }
        },

        methods:{
            handleClose(){
                this.$emit('add-window-close');
            },
            editFormSubmit:function(){
                console.log(this.editForm);
                this.state10=false;
            },
            closeDialog:function(){
                this.state10=false;
            }
        },
        watch:{
            editOpen:function(val, oldVal){
                this.state10 = val;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

