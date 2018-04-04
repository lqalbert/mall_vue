<template>
    <div >
        <MyDialog title="添加客户" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm"  :label-width="labelWidth" :rules="rules"  :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="客户姓名" prop="name" >
                            <el-input  class="name-input" v-model="addForm.name"  auto-complete="off" placeholder="请填写客户姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="客户年龄"  prop="age">
                            <el-input  class="name-input" v-model.number="addForm.age"  auto-complete="off" placeholder="请填写客户年龄"></el-input>

                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="QQ号"  prop="qq">
                            <el-input class="name-input" v-model.number="addForm.qq"  auto-complete="off" placeholder="请填写QQ"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="QQ昵称"  prop="qq_nickname">
                            <el-input class="name-input" v-model="addForm.qq_nickname"  auto-complete="off" placeholder="请填写QQ昵称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="微信号"  prop="weixin">
                            <el-input class="name-input" v-model="addForm.weixin"  auto-complete="off" placeholder="请填写微信号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="微信昵称"  prop="weixin_nickname">
                            <el-input class="name-input" v-model="addForm.weixin_nickname"  auto-complete="off" placeholder="请填写微信昵称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                            <el-form-item label="手机号"  prop="phone">
                                <el-input class="name-input" v-model.number="addForm.phone"  auto-complete="off" placeholder="请填写客户手机号"></el-input>
                            </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="sex">
                            <el-radio-group v-model="addForm.sex">
                                <el-radio :label="1">男</el-radio>
                                <el-radio :label="2">女</el-radio>
                            </el-radio-group>
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

        </MyDialog>
    </div>
</template>

<script>
import DialogForm from '../../mix/DialogForm';
import DataProxy from '../../packages/DataProxy';
export default {
    name: 'Add',
    mixins:[DialogForm],
    props:{
        ajaxProxy:{
            type:Object,
        }
    },
    data () {
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            state7: this.addOpen,
            addForm:{
                name:"",
                age:'',
                qq:'',
                qq_nickname:"",
                weixin:"",
                weixin_nickname:'',
                sex:1,
                phone:''
            },
            rules:{
                name:[
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min:1,   max: 10, message: '长度不能超过10个字符', trigger: 'blur'  }
                ],
                age:[
                    { required: true, message:'请输入正确格式的年龄', trigger: 'blur', type: 'number'},
                    {min:1,  max: 120, message: '请输入合理的年龄', trigger: 'blur' ,type: 'number' }
                ],
                qq:[
                    { required: true,message:'请输入正确格式的QQ号', type: 'number', trigger:'blur'},
                    {min:1, max: 999999999999999, message: '请输入合理的QQ',type: 'number', trigger: 'blur'  }

                ],
                qq_nickname:[
                    { required: true,message:'请输入QQ昵称', type: 'string', trigger:'blur'},
                    {min:1, max: 20, message: '长度不能超过20个字符', trigger: 'blur'  }

                ],
                weixin:[
                    { required: true, message:'请输入微信号', type: 'string', trigger:'blur'},
                    {   max: 20, message: '长度不能超过20个字符', trigger: 'blur'  }
                ],
                weixin_nickname:[
                    { required: true, message:'请输入微信昵称', type: 'string', trigger:'blur'},
                    {   max: 20, message: '长度不能超过20个字符', trigger: 'blur'  }
                ],
                phone:[
                    { required: true,max: 99999999999, message:'请输入正确的手机号', type: 'number', trigger:'blur'},
                ],
            }

        }
    },

    methods:{
        getAjaxPromise(model){
            return this.ajaxProxy.create(model);
        },

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
      