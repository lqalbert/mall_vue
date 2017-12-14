<template>
    <div >
        <el-dialog title="导入客户" :visible.sync="state6" @close="handleClose">
            <el-form :model="leadInForm"  ref="leadInForm" >
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="leadInForm.name" style="max-width: 150px"></el-input>
                </el-form-item>

                <el-form-item label="资金" prop="money">
                    <el-select v-model="leadInForm.money">
                        <el-option label="5W以下" value="1"></el-option>
                        <el-option label="5W-10W" value="2"></el-option>
                        <el-option label="10W-20W" value="3"></el-option>
                        <el-option label="20W-50W" value="4"></el-option>
                        <el-option label="50W以上" value="5"></el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="qq" prop="qq">
                    <el-input v-model="leadInForm.qq" style="max-width: 150px"></el-input>
                </el-form-item>

                <el-form-item label="微信" prop="weixin">
                    <el-input v-model="leadInForm.weixin" style="max-width: 150px"></el-input>
                </el-form-item>

                <el-form-item label="手机" prop="phone">
                    <el-input v-model="leadInForm.phone" style="max-width: 150px"></el-input>
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
        name: 'addDialog',
        props:{
            addOpen:{
                type:Boolean,
                default:false
            }
        },
        data () {
            return {
                state6: this.addOpen,
                leadInForm:{
                    money:'',
                    weixin:'',
                    qq:'',
                    phone:'',
                    name:'',
                },

            }
        },

        methods:{
            handleClose(){
                this.$emit('add-window-close');
            },
            addFormSubmit:function(){
                console.log(this.leadInForm);
                this.state6=false;
            },
            closeDialog:function(){
                this.state6=false;
            }
        },
        watch:{
            addOpen:function(val, oldVal){
                this.state6 = val;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

