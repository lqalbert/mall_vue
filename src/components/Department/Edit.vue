<template>
    <div >
        <Dialog title="添加" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form ref="editForm"  :label-width="labelWidth"  :model="editForm" :label-position="labelPosition" >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="单位名" prop="name">
                            <el-input v-model="editForm.name"  auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类型" prop="type">
                            <el-select  v-model="editForm.type"  :disabled="true" >
                                <el-option  v-for='(item,key) in typeList' :label="item" :value="key" :key="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="部门经理"  prop="contact" >
                                <el-select v-model='editForm.manager_id'>
                                    <el-option
                                            v-for="user in computedusers"
                                            :label="user.realname"
                                            :value="user.user_id"
                                            :key="user.user_id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否启用" prop="status">
                                <el-radio-group v-model="editForm.status">
                                    <el-radio :label="1">启用</el-radio>
                                    <el-radio :label="0">禁用</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注"  prop="remark">
                            <el-input type="textarea"  auto-complete="off" v-model="editForm.remarks" placeholder="请填写备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="dialog-foot">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        :observer="dialogThis"
                        @click="formSubmit('editForm')" >
                    保 存
                </submit-button>
            </div>
        </Dialog>
    </div>
</template>

<script>
    import DialogForm from '../../mix/DialogForm';
    export default {
        name: 'editDialog',
        mixins:[DialogForm],
        props:{
            typeList:{
                type:Array,
                default:['销售部','推广部','风控部','人事部']
            },
            ajaxProxy:{
                required:true,
                type: Object,
                default: null
            }
        },
        data () {
            return {
                dialogThis:this,
                labelWidth:'80px',
                labelPosition:"right",

                computedusers:[
                    {user_id:1,realname:'李青'},
                    {user_id:2,realname:'高鹏'},
                    {user_id:3,realname:'马娇'},
                    {user_id:4,realname:'吴继伟'},
                ],

                editForm:{
                    id:'',
                    type:'',
                    name:'',
                    remarks:'',
                    manager_id:'',
                    status:''
                },

                model:null

            }
        },

        methods:{
            onOpen(param){
                // console.log(param);
                this.model = param.params.model;
            },

            getAjaxPromise(model){
                return this.ajaxProxy.update(model.id, model);
            },

        },
        watch:{

            model:function(val, oldVal){
                console.log(val);
                for (const key in this.editForm) {
                    if (this.editForm.hasOwnProperty(key)) {
                        this.editForm[key] = val[key]
                    }
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

