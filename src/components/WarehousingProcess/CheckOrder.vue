<template>
    <div>
        <MyDialog title="审核" :name="name" :width="width" :height="height" @before-open="onOpen">

            <el-form :model="checkForm" ref="checkForm" :label-width="labelWidth" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="采购单号" prop="id">
                            0000000001
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="配送中心" prop="order_all_money">
                            成都配送中心
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="发货单位" prop="id">
                            郑州发货中心
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="总金额" prop="order_all_money">
                            3000
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="发货状态" prop="product_status">
                            待发货
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label="采购人" prop="deal_name">
                            李四
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-table :data="dataList">
                        <el-table-column label="序号" type="index" width="50px"></el-table-column>
                        <el-table-column label="商品名称" prop="name"></el-table-column>
                        <el-table-column label="采购单价" prop="price"></el-table-column>
                        <el-table-column label="采购数量" prop="number"></el-table-column>
                        <el-table-column label="采购单位" prop="company"></el-table-column>
                    </el-table>

                </el-row>
                <br>
                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="是否通过" prop="status">
                            <el-select size="small" placeholder="是否通过" v-model="checkForm.status">
                                <el-option
                                        v-for="check in c_status"
                                        :label="check.status"
                                        :value="check.id"
                                        :key="check.id">
                                </el-option>
                            </el-select>
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
import APP_CONST from '../../config';
import DialogMix from '../../mix/Dialog';
import { mapGetters } from 'vuex';
import { PHONE_REG } from "@/config/index";
export default {
    name: 'DeliverGoods',
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
            checkForm:{
                status:'',
            },
            c_status:[
                {id:'1', status:'通过'},
                {id:'6', status:'未通过'}
            ],
            dataList:[
                {id:1,name:'面膜',company:'盒',number:20,price:100},
                {id:2,name:'爽肤水',company:'瓶',number:50,price:200},
            ],
            model:null,
            row_model:null,
        }
    },
    methods:{
        getAjaxPromise(model){
            return this.ajaxProxy.create(model);
        },
        onOpen(param){
            this.row_model = param.params.model;
            // console.log(param.params.model);
        },
        // formSubmit(){
        //     console.log(this.addForm)
        // }
    },
    watch:{
        // model:function(val, oldVal){
        //     for (const key in this.editForm) {
        //         if (this.editForm.hasOwnProperty(key)) {
        //             this.editForm[key] = val[key];
        //         }
        //     }
        // }
    },


}
</script>
<style scoped>

</style>
