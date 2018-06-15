<template>
    <div>
        <MyDialog title="添加采购订单" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm" :label-width="labelWidth"  :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="采购单号" prop="company_name" >
                            <el-input v-model="addForm.company_name" placeholder="系统生成"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="采购单位" prop="eng" >
                            <el-input v-model="addForm.eng" placeholder="请填写采购单位"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="发货单位" prop="contact_name">
                            <el-input v-model="addForm.contact_name" placeholder="请填写发货单位"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="采购状态" prop="contact_tel" >
                            <el-select v-model="addForm.contact_tel" placeholder="请选择">
                                <el-option label="申请" value="1"></el-option>
                                <el-option label="审核通过" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="采购时间" prop="contact_name">
                            <el-date-picker
                                    v-model="addForm.contact_name"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="采购人" prop="contact_tel" >
                            <el-input v-model="addForm.contact_name" placeholder="请填写采购人"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="商品类型" prop="contact_name">
                            <el-input v-model="addForm.contact_name" placeholder="请填写商品类型"></el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品名称" prop="contact_tel" >
                            <el-input v-model="addForm.contact_name" placeholder="请填写商品名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="采购数量" prop="contact_name">
                            <el-input v-model="addForm.contact_name" placeholder="请填写采购数量"></el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品规格" prop="contact_tel" >
                            <el-input v-model="addForm.contact_name" placeholder="请填写商品规格"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="采购单价" prop="contact_name">
                            <el-input v-model="addForm.contact_name" placeholder="请填写采购数量"></el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="总金额" prop="contact_tel" >
                            <el-input v-model="addForm.contact_name" placeholder="请填写商品规格"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="12">
                        <el-form-item label="采购单位" prop="contact_name">
                            <el-select v-model="addForm.contact_tel" placeholder="请选择">
                                <el-option label="瓶" value="1"></el-option>
                                <el-option label="片" value="2"></el-option>
                                <el-option label="只" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>






























                <el-row>
                    <el-col :span="14">
                        <el-form-item label="备注" prop="remark">
                            <el-input type="textarea" v-model="addForm.remark" placeholder="请填写备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        :observer="dialogThis"
                        @click="formSubmit('addForm')">
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>
<script>
import DialogForm from '../../mix/DialogForm';
import FormMix from '../../mix/Form';
import APP_CONST from '../../../config/index';
import DialogMix from '../../mix/Dialog';
import { mapGetters } from 'vuex';
import { PHONE_REG } from "@/config/index";
export default {
    name: 'Add',
    mixins:[DialogForm,FormMix],
    components: {
        
    },
    props:{

    },
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            addForm:{
                company_name:'',
                contact_name:'',
                contact_tel:'',
                remark:'',
            },

        }
    },
    methods:{
        getAjaxPromise(model){
            return this.ajaxProxy.create(model);
        },
        // formSubmit(){
        //     console.log(this.addForm)
        // }
    },


}
</script>
<style scoped>

</style>
