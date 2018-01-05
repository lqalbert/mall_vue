<template>
    <div >
        <el-dialog title="添加" :visible.sync="state8" @close="handleClose">
            <el-form ref="editForm" :inline="true" :model="editForm"  >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="分类名称" prop="name">
                            <el-input v-model="editForm.name"  auto-complete="off" placeholder="请填写总分类名称"></el-input>
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
        name: 'editDialog',
        props:{
            editOpen:{
                type:Boolean,
                default:false
            }
        },
        data () {
            return {

                state8: this.editOpen,
                editForm:{
                    name:"",

                },

            }
        },

        methods:{
            handleClose(){
                this.$emit('add-window-close');
            },
            addFormSubmit:function(){
               // console.log(this.editForm);
                this.$emit('add',{name:this.editForm.name});
                this.editForm.name='';
                this.state8=false;
            },
            closeDialog:function(){
                this.state8=false;
            }
        },
        watch:{
            editOpen:function(val, oldVal){
                this.state8 = val;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

