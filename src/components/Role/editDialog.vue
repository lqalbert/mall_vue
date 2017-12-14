<template>
    <div >
        <el-dialog title="修改公告" :visible.sync="state1" @close="handleClose">
            <el-form :model="editForm" :inline="true" >
                <el-form-item label="角色名称" >
                    <el-input v-model="editForm.name" auto-complete="off" 
                    style="width:400px;" placeholder="请设置角色名称" >
                    </el-input>
                </el-form-item>

                <el-form-item label="角色英文名" >
                    <el-select v-model="editForm.ename" placeholder="请选择">
                        <el-option label="item" value="item"></el-option>
                        <el-option label="test" value="test"></el-option>
                        <el-option label="admin" value="admin"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="角色说明" >
                    <el-input v-model="editForm.remark" type="textarea" 
                    style="width:500px;" placeholder="请为角色添加说明" >
                    </el-input>
                </el-form-item>

                <el-form-item label="角色状态" >
                    <el-radio class="radio" v-model="editForm.status" label="0">禁用</el-radio>
                    <el-radio class="radio" v-model="editForm.status" label="1">启用</el-radio>
                </el-form-item>
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
                state1: this.editOpen,
                editForm:{
                    name:"",
                    id:"",
                    remark:'',
                    status:'',
                    ename:""
                },
                addRules:{
                  title:[
                     { required: true, message: '请输入公告标题', trigger: 'blur'},
                  ],
                  type:[
                     { required: true, message: '请选择公告类型', trigger: 'blur'},
                  ],
                  content:[
                    {required: true, message: '请输入公告内容', trigger: 'blur'},
                  ],
                },
            }
        },

        methods:{
            handleClose(){
                this.$emit('add-window-close');
            },
            addFormSubmit:function(){
                console.log(this.editForm);
                this.state1=false;
            },
            closeDialog:function(){
                this.state1=false;
            }
        },
        watch:{
            editOpen:function(val, oldVal){
                this.state1 = val;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

