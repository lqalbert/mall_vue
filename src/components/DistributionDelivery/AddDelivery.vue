<template>
    <div>
        <MyDialog title="发 货" :name="name" :width="width" :height="height" @before-open="onBeforeOpen">
            <el-form :model="addForm" ref="addForm" :label-width="labelWidth"  :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="客户姓名"  >
                            <!-- <el-input v-model="addForm.cus_name" :disabled="true" placeholder="客户姓名"></el-input> -->
                            {{ model.cus_name }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="购买商品" >
                            <!-- <el-input v-model="addForm.goods_name" :disabled="true" placeholder="购买商品"></el-input> -->
                            {{ model.goods_name }}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="商品品种" >
                            <!-- <el-input v-model="addForm.category" :disabled="true" placeholder="品种"></el-input> -->
                            {{ model.cate_kind }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="数量">
                            <!-- <el-input v-model="addForm.num" :disabled="true" placeholder="数量"></el-input> -->
                            {{ model.goods_num }}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="销售人员" >
                            <!-- <el-input v-model="addForm.sale_name" :disabled="true" placeholder="销售人员"></el-input> -->
                            {{ model.sale_name }} 
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="购买时间">
                            <!-- <el-input v-model="addForm.buy_time" :disabled="true" placeholder="购买时间"></el-input> -->
                            {{ }}还没加上
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="经理审核时间" prop="manager_check_time" >
                            <!-- <el-input v-model="addForm.manager_check_time" :disabled="true" placeholder="经理审核时间"></el-input> -->
                            {{ model.pass_check }} 
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="商品编号" prop="sku_sn" >
                            <el-input v-model="addForm.sku_sn" placeholder="商品编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否指定快递" prop="set_express">
                            <!-- <el-input v-model="addForm.set_express" placeholder="是否指定快递"></el-input> -->
                            <el-radio class="radio" v-model="addForm.set_express" label="1">是</el-radio>
                            <el-radio class="radio" v-model="addForm.set_express" label="2">否</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="快递公司" prop="express_name" >
                            <el-input v-model="addForm.express_name" placeholder="快递公司"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="快递单号" prop="express_sn">
                            <el-input v-model="addForm.express_sn" placeholder="快递单号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="收件人" prop="deliver_name" >
                            <el-input v-model="addForm.deliver_name" placeholder="收件人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机" prop="deliver_phone">
                            <el-input v-model="addForm.deliver_phone" placeholder="手机"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="重量" prop="weight" >
                            <el-input v-model="addForm.weight" placeholder="重量"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="快递费" prop="express_fee">
                            <el-input v-model="addForm.express_fee" placeholder="快递费"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="配送费" prop="assign_fee">
                            <el-input v-model="addForm.assign_fee" placeholder="配送费"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <!-- <el-button type="info" @click="handleClose">保 存</el-button> -->
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
import APP_CONST from '../../config';
export default {
    name: 'add-delivery',
    mixins:[DialogForm],

    
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            addForm:{
                id:"",
                sku_sn:"",
                set_express:"",
                express_name:"",
                express_sn:"",
                deliver_name:"",
                deliver_phone:"",
                weight:"",
                express_fee:"",
                assign_fee:""
            },
            model:{}
        }
    },
    methods:{
        getAjaxPromise(model){
            return this.ajaxProxy.update(model.id, model);
        },
        onBeforeOpen(model) {
            this.model =  model.params;
        }
    },
    watch:{
        model:function(val, oldVal){
            this.initObject(val, this.addForm);
        }
    },
    mounted(){

    },
    created(){

    }

}
</script>
<style scoped>

</style>
