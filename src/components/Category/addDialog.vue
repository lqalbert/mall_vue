<template>
    <div >
        <el-dialog title="添加" :visible.sync="state7" @close="handleClose">
            <el-form :model="addForm" :inline="true" ref="addForm"  labelPosition="right"
                     labelWidth='100px'>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="分类名称" prop="name">
                            <el-input class="name-input" v-model="addForm.name"  auto-complete="off" placeholder="请填写分类名称"></el-input>
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

                state7: this.addOpen,
                addForm:{
                    name:"",

                },

            }
        },

        methods:{
            handleClose(){
                this.$emit('add-window-close');
            },
            addFormSubmit:function(){
//                console.log(this.addForm);
                this.$emit('aaa',{name:this.addForm.name});
                this.addForm.name='';
                this.state7=false;
            },
            closeDialog:function(){
                this.state7=false;
            }
        },
        watch:{
            addOpen:function(val, oldVal){
                this.state7 = val;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>

