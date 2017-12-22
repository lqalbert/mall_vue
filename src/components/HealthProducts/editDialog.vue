<template>
    <div >
        <el-dialog title="修改公告" :visible.sync="state1" @close="handleClose">
            <el-form ref="editForm" :inline="true" :rules="addRules" :model="editForm"  >
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="总结标题" prop="title">
                            <el-input v-model="editForm.title" placeholder="请填写公告标题"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="总结类型" prop="type">
                            <el-select v-model="editForm.type" placeholder="请选择总结类型">
                                <el-option label="功能升级" value="1"></el-option>
                                <el-option label="系统更新" value="2" ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="公告内容" prop="content">
                            <el-input v-model="editForm.content" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请填写公告内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="开始日期">
                            <el-date-picker v-model="editForm.start" type="datetime" placeholder="请选择开始日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="截止日期">
                            <el-date-picker v-model="editForm.end" type="datetime" placeholder="请选择截止日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog()">取 消</el-button>
                <el-button :observer="dialogThis" @click="addFormSubmit()" type="primary"  >确 定</el-button>
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
                dialogThis:this,
                state1: this.editOpen,
                editForm:{
                    type:'',
                    title:'',
                    content:'',
                    start:'',
                    end:'',
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

