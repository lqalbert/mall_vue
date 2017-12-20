<template>
    <div >
        <Dialog title="编辑" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm"  :label-width="labelWidth"   :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="商品名称" prop="goods_name" >
                            <el-input class="name-input" v-model="addForm.goods_name"  auto-complete="off" placeholder="请填写商品名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品类型"  prop="goods_type">
                            <el-select  v-model="addForm.goods_type"  placeholder="请选择类型"  >
                                <el-option  v-for='(item,key) in typeList' :label="item" :value="key" :key="key"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="商品价格"  prop="goods_price">
                            <el-input class="name-input" v-model="addForm.goods_price"  auto-complete="off" placeholder="请填写商品价格"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="商品货号"  prop="goods_number">
                            <el-input class="name-input" v-model="addForm.goods_number"  auto-complete="off" placeholder="请填写商品货号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="单位类型"  prop="unit_type">
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
    name: 'Edit',
    mixins:[DialogForm],
    data () {
        return {
            labelPosition:"right",
            labelWidth:'80px',
            unit_types:[
                {id:'1',name:'瓶'},
                {id:'2',name:'套'},
                {id:'3',name:'盒'},

            ],
            topO:[
                {id:'1',name:'西北区'},
                {id:'2',name:'东南区'},
                {id:'3',name:'沿海区'},

            ],
            typeList:['化妆品','保健品'],

            state7: this.addOpen,
            addForm:{
                goods_name:"",
                goods_type:"",
                goods_price:"",
                goods_number:"",
                remark:"",
                unit_type:'',
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
      