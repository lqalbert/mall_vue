<template>
    <div >
        <MyDialog title="编辑联系人" :name="name" :width="width" :height="height"  @before-open="onOpen">
            <el-form :model="editForm"  ref="editForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="网站" prop="webUrl" >
                            <el-input class="name-input" size="small" placeholder="具体网址" v-model.number="editForm.webUrl"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="名称" prop="describe" >
                            <el-input class="name-input" size="small" placeholder="请不要超过20个字符" v-model.number="editForm.describe"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="备注" prop="remark" >
                            <el-input type="textarea" size="small" placeholder="请不要超过200个字符" v-model.number="editForm.remark"></el-input>
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

        </MyDialog>    </div>
</template>

<script>
    import DialogForm from '../../mix/DialogForm';
    import DataProxy from '../../packages/DataProxy';
    export default {
        name: 'edit',
        mixins:[DialogForm],
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'80px',
                editForm:{
                    id:'',
                    user_id:'',
                    webUrl:"",
                    describe:"",
                    remark:"",
                },
                rules:{
                    webUrl:[
                        { required: true, message: '请输入网址', trigger: 'blur'},
                    ],
                    describe:[
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    remark:[
                        { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
                    ],
                },
                model:''
            }
        },
        methods:{
            onOpen(param){
                this.model = param.params.model;
            },
            getAjaxPromise(model){
                return this.ajaxProxy.update(model.id, model);
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

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
      