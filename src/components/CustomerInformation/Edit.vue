<template>
    <div >
        <Dialog title="添加客户" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm"  :label-width="labelWidth"   :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="客户姓名" prop="goods_name" >
                            <el-input class="name-input" v-model="addForm.goods_name"  auto-complete="off" placeholder="请填写商品名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="客户类型"  prop="goods_type">
                            <el-select  v-model="addForm.goods_type"  placeholder="请选择类型"  >
                                <el-option  v-for='(item,key) in typeList' :label="item" :value="key" :key="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="sex">
                            <el-radio-group v-model="addForm.sex">
                                <el-radio :label="1">男</el-radio>
                                <el-radio :label="0">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="手机号"  prop="goods_price">
                            <el-input class="name-input" v-model="addForm.goods_price"  auto-complete="off" placeholder="请填写商品价格"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="微信号"  prop="goods_price">
                            <el-input class="name-input" v-model="addForm.goods_price"  auto-complete="off" placeholder="请填写商品价格"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="资金量"  prop="unit_type">
                            <el-select v-model='addForm.unit_type'>
                                <el-option v-for="(v,key) in unit_types" :label="v.name"
                                           :value="v.id" :key="key">
                                </el-option>
                            </el-select>
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
    name: 'Add',
    mixins:[DialogForm],
    data () {
        return {
            labelPosition:"right",
            labelWidth:'80px',
            unit_types:[
                {id:'1',name:'5W以下'},
                {id:'2',name:'5W-10W'},
                {id:'3',name:'10W以上'},

            ],

            typeList:['一般客户','准客户','意向客户'],

            state7: this.addOpen,
            addForm:{
                goods_name:"",
                goods_type:"",
                goods_price:"",
                goods_number:"",
                remark:"",
                unit_type:'',
                sex:'',
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
      