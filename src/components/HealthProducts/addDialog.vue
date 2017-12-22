<template>
    <div >
        <el-dialog title="发布公告" :visible.sync="state" @close="handleClose">
            <el-form ref="addForm" :inline="true" :rules="addRules" :model="addForm"  >
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="公告标题" prop="title" >
                            <el-input v-model="addForm.title" placeholder="请填写公告标题" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="公告类型" prop="type">
                            <el-select v-model="addForm.type" placeholder="请选择总结类型">
                                <el-option label="功能升级" value="1"></el-option>
                                <el-option label="系统更新" value="2" ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="公告内容" prop="content">
                            <el-input v-model="addForm.content" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请填写公告内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="开始日期" prop="start">
                            <el-date-picker v-model="addForm.start" type="datetime" placeholder="请选择开始日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="截止日期" prop="end">
                            <el-date-picker v-model="addForm.end" type="datetime" placeholder="请选择截止日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog()">取 消</el-button>
                <el-button :observer="dialogThis" @click="addToolChange('addForm')" type="primary"  >确 定</el-button>
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
                dialogThis:this,
                state: this.addOpen,
                addForm:{
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
//                this.$emit('add-window-close');
                this.$emit('update:add-open', false);
            },
            addFormSubmit:function(){
                console.log(this.addForm);
            },
            closeDialog:function(){
                this.state=false;
            }


        },
        watch:{
            addOpen:function(val, oldVal){
                this.state = val;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

