<template>
    <div >
        <Dialog title="添加" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="单位名" prop="name" >
                            <el-input class="name-input" v-model="addForm.name"  auto-complete="off" placeholder="请填写单位名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类型"  prop="type">
                            <el-select  v-model="addForm.type"  placeholder="请选择类型"  >
                                <el-option  v-for='(item,key) in typeList' :label="item" :value="key" :key="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="部门经理"  prop="contact">
                            <el-select v-model='addForm.manager_id'>
                                <el-option v-for="user in computedusers" :label="user.realname"
                                           :value="user.user_id" :key="user.user_id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否启用" prop="status">
                            <el-radio-group v-model="addForm.status">
                                <el-radio :label="1">启用</el-radio>
                                <el-radio :label="0">禁用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注"  prop="remark">
                            <el-input type="textarea"  auto-complete="off" v-model="addForm.remarks" placeholder="请填写备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>


            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button 
                    @click="formSubmit('addForm')" >
                    保 存
                </submit-button>
            </div>

        </Dialog>
    </div>
</template>

<script>
import DialogForm from '../../mix/DialogForm';
export default {
    name: 'Edit',
    mixins:[DialogForm],
    data () {
        return {
            labelPosition:"right",
            labelWidth:'80px',
            computedusers:[
                {user_id:'1',realname:'李青'},
                {user_id:'2',realname:'高鹏'},
                {user_id:'3',realname:'马娇'},
                {user_id:'4',realname:'吴继伟'},
            ],
            topO:[
                {id:'1',name:'西北区'},
                {id:'2',name:'东南区'},
                {id:'3',name:'沿海区'},

            ],
            typeList:['销售部','推广部','风控部','人事部'],

            state7: this.addOpen,
            addForm:{
                name:"",
                type:"",
                division_id:"",
                user_id:"",
                remark:"",
                status:1,
            },

        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
      