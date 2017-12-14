<template>
    <div >
        <el-dialog title="添加" :visible.sync="state9" @close="handleClose">
            <el-form :model="addForm"  :inline="true"  ref="addForm" >
                <el-row>
                    <el-col :span="14">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="addForm.name"  auto-complete="off" placeholder="请填写单位名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="14">
                        <el-form-item label="区域经理">
                            <el-select v-model="addForm.user_id">
                                <el-option v-for="user in computedusers" :label="user.realname" :value="user.user_id" :key="user.user_id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="14">
                        <el-form-item label="备注"  prop="type">
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="addForm.brief">
                            </el-input>

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

                state9: this.addOpen,
                addForm:{
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
            addFormSubmit:function(){
                console.log(this.addForm);
                this.state9=false;
            },
            closeDialog:function(){
                this.state9=false;
            }
        },
        watch:{
            addOpen:function(val, oldVal){
                this.state9 = val;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

