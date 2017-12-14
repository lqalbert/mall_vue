<template>
    <div >
        <el-dialog title="编辑节点" :visible.sync="state1" @close="handleClose">

            <el-form :model="editForm" :inline="true" >

                <el-form-item label="菜单分类："  >
                    <el-select  v-model="editForm.pid" filterable placeholder="请选择菜单分类" style="width:270px;">
                        <el-option label="顶级节点" value="0"></el-option>
                        <el-option label="百宝箱" value="1"></el-option>
                        <el-option label="推广素材" value="2"></el-option>
                        <el-option label="组织员工" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单中文名：">
                    <el-input  v-model="editForm.title" placeholder="请输入权限名称" style="width:270px;"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标：">
                    <el-input  v-model="editForm.icon" placeholder="请输入菜单图标：" style="width:270px;"></el-input>
                </el-form-item>
                <el-form-item label="菜单地址：">
                    <el-input  v-model="editForm.href" placeholder="请输入菜单地址：" style="width:270px;"></el-input>
                </el-form-item>
                <el-form-item label="节点ID："  >
                    <el-select  v-model="editForm.node_id" filterable placeholder="请选择菜单分类" style="width:270px;">
                        <el-option label="客户管理" value="1"></el-option>
                        <el-option label="组织单位" value="2"></el-option>
                        <el-option label="团队小组" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="菜单排序：">
                    <el-input-number size="small" v-model="editForm.sort" :min="0" ></el-input-number>
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
                    title:"",
                    icon:"",
                    href:'',
                    node_id:'',
                    sort:0,
                    status:'1'
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

