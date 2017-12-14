<template>
    <div >
        <el-dialog title="录入总结" :visible.sync="state3" @close="handleClose">
            <el-form ref="addForm" :inline="true"  :model="addForm"  >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="总结标题" prop="title">
                            <el-input v-model="addForm.title" auto-complete="off" placeholder="请填写标题" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="总结类型" prop="type">
                            <el-select v-model="addForm.type" placeholder="请选择总结类型">
                                <el-option  label="每日总结" value="1"></el-option>
                                <el-option  label="每周总结" value="2"></el-option>
                                <el-option  label="每月总结" value="3"></el-option>

                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="总结内容" prop="advice">
                            <el-input v-model="addForm.advice" type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请填写总结内容"></el-input>
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
                state3: this.addOpen,
                addForm:{
                    type:'',
                    title:'',
                    advice:'',

                }

            }
        },

        methods:{
            handleClose(){
                this.$emit('add-window-close');
            },
            addFormSubmit:function(){
                console.log(this.addForm);
                this.state3=false;
            },
            closeDialog:function(){
                this.state3=false;
            }
        },
        watch:{
            addOpen:function(val, oldVal){
                this.state3 = val;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

