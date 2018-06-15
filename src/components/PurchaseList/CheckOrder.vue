<template>
    <div>
        <MyDialog title="审核" :name="name" :width="width" :height="height" @before-open="onOpen">

            <el-form :model="checkForm" ref="checkForm" :label-width="labelWidth" :label-position="labelPosition">

                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="采购单号" prop="order_sn">
                            {{checkForm.order_sn}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="收货仓库" prop="entrepot_name">
                            {{checkForm.entrepot_name}}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="发货单位" prop="shipper">
                            {{checkForm.shipper}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品金额" prop="goods_money_total">
                            {{checkForm.goods_money_total}}元
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="发货状态" prop="shipper">
                            待发货
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="采购人" prop="contact_name">
                            {{checkForm.contact_name}}
                        </el-form-item>
                    </el-col>
                </el-row>

                <br>
                <el-row>
                    <el-table :data="goodsList" border>
                        <el-table-column label="ID" align="center"  prop="id" width="65"></el-table-column>
                        <el-table-column label="SKU编号" align="center"  prop="sku_sn" ></el-table-column>
                        <el-table-column label="商品名称" align="center"  prop="goods_name" ></el-table-column>
                        <el-table-column label="商品规格" align="center"  prop="specifications" ></el-table-column>
                        <el-table-column label="采购数量" align="center"  prop="goods_purchase_num" ></el-table-column>
                        <el-table-column label="采购价" align="center"  prop="goods_purchase_price" ></el-table-column>
                    </el-table>
                </el-row>
                <br>
                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="主管审核" prop="status">
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
                        @click="formSubmit('checkForm')">
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
                id:'',
                status:'',
                shipper:'',
                entrepot_id:'',
                order_sn:'',
                entrepot_name:'',
                contact_time:'',
                contact_name:'',
                contact_phone:'',
                remark:'',
                sku_type:0,
                goods_total:0,
                goods_money_total:0,
            },
            c_status:[
                {id:1, status:'未通过审核'},
                {id:2, status:'通过审核'}
            ],
            model:null,
            goodsList:[],
        }
    },
    methods:{
        getAjaxPromise(model){
            return this.ajaxProxy.update(model.id, model);
        },
        onOpen(param){
            this.model = param.params.row;
            this.goodsList=this.model.goods;
        },
        // formSubmit(){
        //     console.log(this.checkForm);
        // }
    },
    watch:{
        model:function(val, oldVal){
            for (const key in this.checkForm) {
                if (this.checkForm.hasOwnProperty(key)) {
                    this.checkForm[key] = val[key];
                }
            }
        }
    },


}
</script>
<style scoped>

</style>
