<template>
    <div >
        <el-dialog title="发布公告" :visible.sync="state2" @close="handleClose">
            <el-form ref="addForm" :inline="true"  :model="addForm"  >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="标题" prop="title">
                            <el-input v-model="addForm.title" auto-complete="off" placeholder="请填写标题" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="类型" prop="type">
                            <el-select v-model="addForm.type" placeholder="请选择总结类型">
                                <el-option  label="技术建议" value="1"></el-option>
                                <el-option  label="系统制度" value="2"></el-option>

                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="建议内容" prop="advice">
                            <el-input v-model="addForm.advice" type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请填写建议内容"></el-input>
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
                state2: this.addOpen,
                addForm:{
                    type:'',
                    title:'',
                    advice:'',

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
                console.log(this.addForm);
            },
            closeDialog:function(){
                this.state2=false;
            }
        },
        watch:{
            addOpen:function(val, oldVal){
                this.state2 = val;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

