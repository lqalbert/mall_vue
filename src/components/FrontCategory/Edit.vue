<template>
    <div >
        <MyDialog title="添加" :name="name" :width="width" :height="height" @before-open="onBeforeOpen">
            <el-form :model="editForm"  ref="editForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="分类名称" prop="label">
                            <el-input class="name-input" v-model="editForm.label"  auto-complete="off" placeholder="请填写分类名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        @click="formSubmit('editForm')"
                        :observer="dialogThis">
                    保 存
                </submit-button>
            </div>
        </MyDialog>

    </div>
</template>

<script>
    import DialogForm from '@/mix/DialogForm';
    export default {
        mixins:[DialogForm],
        name: 'editdialog',
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'80px',
                
                rules:{
                    label: [
                        { required: true, message: '请输入分类名称', trigger: 'blur' },
                    ],
                    
                },
                editForm:{
                    label:"",
                },
                id:null
            }
        },
        methods:{
            getAjaxPromise(model){
                return this.ajaxProxy.update(this.id, model);
            },
            onBeforeOpen(param){
                this.id = param.params.id;
                this.editForm.label = param.params.label;
            }
        },
        created(){
           
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>

