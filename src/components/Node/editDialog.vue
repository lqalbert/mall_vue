<template>
    <div >
        <el-dialog title="修改公告" :visible.sync="state1" @close="handleClose">
            <el-form :model="editForm" :inline="true" >
                <el-form-item label="节点分类：" >
                    <el-select  v-model="editForm.pid" filterable  placeholder="请选择节点分类">
                        <el-option label="顶级节点" value="0" ></el-option>
                        <el-option label="集思信箱" value="1" ></el-option>
                        <el-option label="公共客户信息" value="2" ></el-option>
                        <el-option label="离职员工" value="3" ></el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="节点中文名：">
                    <el-input v-model="editForm.title" place="请输入权限名称" style="width:270px;"></el-input>
                </el-form-item>
                <el-form-item label="节点名：">
                    <el-input  v-model="editForm.name" placeholder="请输入节点名" style="width:270px;"></el-input>
                </el-form-item>
                <el-form-item label="节点说明：">
                    <el-input type="textarea" v-model="editForm.remark" style="width:500px;" placeholder="请为节点添加说明"></el-input>
                </el-form-item>

                <el-form-item label="节点排序：">
                    <el-input-number v-model="editForm.sort" :min="0" size="small" ></el-input-number>
                    <span>由小到大</span>
                </el-form-item>

                <el-form-item label="状态：">
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
                    id:'',
                    pid:'',
                    name:"",
                    title:"",
                    remark:"",
                    status:'1',
                    sort:0
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

