<template>
    <div >
        <el-dialog title="经理回复" :visible.sync="state4" @close="handleClose">
            <el-form ref="replyForm"  :model="replyForm"  >
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="回复内容" prop="reply">
                            <el-input v-model="replyForm.reply" type="textarea" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请填写回复内容"></el-input>
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
        name: 'replyDialog',
        props:{
            addOpen:{
                type:Boolean,
                default:false
            }
        },
        data () {
            return {
                state4: this.addOpen,
                replyForm:{
                    reply:''
                },


            }
        },

        methods:{
            handleClose(){
                this.$emit('add-window-close');
            },
            addFormSubmit:function(){
                console.log(this.replyForm);
                this.state4=false;
            },
            closeDialog:function(){
                this.state4=false;
            }
        },
        watch:{
            addOpen:function(val, oldVal){
                this.state4 = val;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

