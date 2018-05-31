<template>
    <div>
        <MyDialog title="返单" :name="name" :width="width" :height="height"  @before-open="onBeforeOpen">
            <el-form :model="repeatForm" ref="repeatForm" :label-width="labelWidth"  :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="返回类型" prop="is_repeat">
                            <el-select v-model="repeatForm.is_repeat" clearable >
                                <el-option v-for="item in repeat_status" :label="item.label + item.sub" :value="item.value" :key="item.value">
                                    <span style="float: left">{{ item.label }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.sub }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-row>
                    <el-col :span="12">
                        <el-form-item>
                           
                            <el-checkbox v-model="checked" >销售单返回录入状态,发货单将会被删除</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row> -->
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备注" required prop="repeat_mark">
                            <el-input
                                type="textarea"
                                :rows="2" v-model="repeatForm.repeat_mark"
                                placeholder="请输入内容">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                    @click="formSubmit('repeatForm')"
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
                repeatForm:{
                    id:"",
                    is_repeat:"",
                    repeat_mark:'',
                    
                },
                repeat_status:[
                    {label:"导入状态", value:"1", sub:""},
                    {label:"审核状态", value:"2", sub:""},
                    {label:"录入状态", value:"3", sub:"删除发货单"},
                ]
            }
        },
        methods:{
            
            onBeforeOpen(param){
                this.repeatForm.id = param.params.row.id;
            },
            
           
            getAjaxPromise(model){
                return this.ajaxProxy.repeat(model.id, model);
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
      