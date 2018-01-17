<template>
    <div>
        <MyDialog title="添加" :name="name" :width="width" :height="height">
            <el-steps :active="active" finish-status="success">
                <el-step title="选择用户"></el-step>
                <el-step title="选择商品"></el-step>
                <el-step title="收货信息"></el-step>
            </el-steps>
            <el-form :model="addForm"  ref="addForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">
                <div class="tabs" v-show="active==0">
                    <el-form-item label="购买用户"  prop="contact">
                        <el-select v-model='addForm.manager_id'>
                            <el-option v-for="user in computedusers" :label="user.realname"
                                       :value="user.user_id" :key="user.user_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="销售员工"  prop="contact">
                        <el-select v-model='addForm.manager_id'>
                            <el-option v-for="user in computedusers" :label="user.realname"
                                       :value="user.user_id" :key="user.user_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="tabs" v-show="active==1">
                    <el-form-item label="购买商品"  prop="contact">
                        <el-select v-model='addForm.manager_id'>
                            <el-option v-for="user in computedusers" :label="user.realname"
                                       :value="user.user_id" :key="user.user_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="tabs" v-show="active==2">

                        <el-form-item label="收货地址"  prop="contact">
                            <div class="areainp"><area-cascader type='text' :level='1' v-model="value1" placeholder="请选择地址"></area-cascader></div>
                        </el-form-item>
                    <el-form-item label="具体地址"  prop="contact">
                        <div><el-input class="" v-model="addForm.name"  auto-complete="off" placeholder="请填写具体收货地址"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="status">
                        <el-input class="" v-model="addForm.name"  auto-complete="off" placeholder="请填写收件人手机号码"></el-input>
                    </el-form-item>
                </div>


            </el-form>
            <el-button  @click="prv" v-show="stepActive==1">上一步</el-button>
            <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
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
            typeList:{
                type:Array,
                default:['销售部','推广部','风控部','人事部']
            }

        },
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                active: 0,
                labelWidth:'80px',
                computedusers:[
                    {user_id:'1',realname:'李青(测试数据)'},
                    {user_id:'2',realname:'高鹏(测试数据)'},
                    {user_id:'3',realname:'马娇(测试数据)'},
                    {user_id:'4',realname:'吴继伟(测试数据)'},
                ],
                addForm:{
                    name:"",
                    type:"",
                    manager_id:"",
                    remarks:"",
                    status:1,
                },
                rules:{
                    name:[
                        { required: true, message: '请输入部门名称', trigger: 'blur' }
                    ],
                    type:[
                        { required: true, message:'请选择类型', type: 'number', trigger:'change'}
                    ]
                },


            }
        },
        methods:{
            next() {
                if (this.active++ > 1) this.active = 0;
            },
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
