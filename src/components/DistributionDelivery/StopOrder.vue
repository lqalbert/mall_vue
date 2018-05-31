<template>
    <div>
        <MyDialog title="拦截/取消" :name="name" :width="width" :height="height"  @before-open="onBeforeOpen">
            <el-form :model="stopForm" ref="stopForm" :label-width="labelWidth"  :label-position="labelPosition">
                <!-- 这是一个 toggle 类型的操作 点一下拦截　再点一下取消拦截 -->
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备注" required　prop="stop_mark">
                            <el-input
                                type="textarea"
                                :rows="2" v-model="stopForm.stop_mark"
                                placeholder="请输入内容">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                    @click="formSubmit('stopForm')"
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
        name: 'StopOrder',
        mixins:[DialogForm],
        data () {
            return {
                dialogThis:null,
                labelPosition:"right",
                labelWidth:'100px',
                stopForm:{
                    id:"",
                    is_stop:0,
                    stop_mark:"",
                    
                },

            }
        },
        methods:{
            
            onBeforeOpen(param){
                this.stopForm.id = param.params.row.id;
                this.stopForm.is_stop = param.params.row.is_stop;
            },
            
            
            getAjaxPromise(model){
                return this.ajaxProxy.stop(model.id, model);
            },
            
        },
        created(){
            this.dialogThis = this;
            
            
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
          