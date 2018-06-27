<template>
    <div >
        <MyDialog title="添加联系人" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="网站" prop="webUrl" >
                            <el-input class="name-input" size="small" placeholder="具体网址" v-model="addForm.webUrl"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="名称" prop="describe" >
                            <el-input class="name-input" size="small" placeholder="请不要超过20个字符" v-model="addForm.describe"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="备注" prop="remark" >
                            <el-input type="textarea" size="small" placeholder="请不要超过200个字符" v-model="addForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        @click="formSubmit('addForm')"
                        :observer="dialogThis">
                    保 存
                </submit-button>
            </div>

        </MyDialog>    </div>
</template>

<script>
import DialogForm from '../../mix/DialogForm';
import DataProxy from '../../packages/DataProxy';
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'Add',
    mixins:[DialogForm],
    computed:{
        ...mapGetters([
            'getUser'
        ])
    },
    data () {
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            addForm:{
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
        }
    },
    methods:{
        getAjaxPromise(model){
            model['user_id'] = this.getUser.id;
            return this.ajaxProxy.create(model);
        },
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
      