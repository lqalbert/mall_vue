<template>
    <div >
        <MyDialog title="保存盘点单" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="addForm" :label-width="labelWidth" ref="addForm" :label-position="labelPosition" >
                <el-row>
                    <el-col :span="14">
                        <el-form-item label="备注" prop="remark" >
                            <el-input size="small" v-model="addForm.remark" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                    :observer="dialogThis"
                    @click="formSubmit('addForm')" >
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>

<script>
    import DialogForm from '../../mix/DialogForm';
    // import Dialog from '../common/Dialog';
    export default {
        name: 'add-data-dialog',
        mixins:[DialogForm],
        components:{

        },
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'80px',
                addForm:{
                    remark:"",
                },
            }
        },

        methods:{
            onOpen(param){
                this.addForm = param.params.model;
            },
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            },
        },
        created(){
            // this.$on('submit-success');
        }
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>

