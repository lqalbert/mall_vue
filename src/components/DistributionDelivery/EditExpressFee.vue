<template>
    <div>
        <MyDialog title="修改实付运费" :name="name" :width="width" :height="height"  @before-open="onBeforeOpen">
            <el-form :model="editForm" ref="editForm" :label-width="labelWidth"  :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="实付运费" prop="express_fee">
                            <el-input class="name-input" v-model="editForm.express_fee"  auto-complete="off"  placeholder="实付运费"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--<el-row>-->
                    <!--<el-col :span="12">-->
                        <!--<el-form-item label="备注" required prop="repeat_mark">-->
                            <!--<el-input-->
                                <!--type="textarea"-->
                                <!--:rows="2" v-model="editForm.repeat_mark"-->
                                <!--placeholder="请输入内容">-->
                            <!--</el-input>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                <!--</el-row>-->
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
        name: 'RepeatOrder',
        mixins:[DialogForm],
        data () {
            return {
                dialogThis:null,
                labelPosition:"right",
                labelWidth:'100px',
                editForm:{
                    id:"",
                    express_fee:"",
                    assign_sn:"",
                    // repeat_mark:'',
                    
                },
                model:'',
            }
        },
        methods:{
            
            onBeforeOpen(param){
                this.editForm.id = param.params.row.id;
                this.editForm.assign_sn = param.params.row.assign_sn;
                this.model = param.params.row;
            },

            getAjaxPromise(model){
                return this.ajaxProxy.editExpressFee(model.id, model);
            },
            
        },
        watch:{
            model:function(val, oldVal){
                for (const key in this.editForm) {
                    if (this.editForm.hasOwnProperty(key)) {
                        this.editForm[key] = val[key]
                    }
                }

            }
        },
        created(){
            this.dialogThis = this;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
      