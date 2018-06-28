<template>
    <div>
        <MyDialog title="确认发货" :name="name" :width="width" :height="height"  @before-open="onOpen">
            <el-form :model="signForm" ref="signForm" :label-width="labelWidth"  :label-position="labelPosition">
            <el-row>
                <el-col>
                    <el-table :data="signGoodsList" border  @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="express_num" label="快递单号" align="center" width="150px"></el-table-column>
                        <el-table-column prop="sku_sn" label="SKU编号" align="center" width="150px"></el-table-column>
                        <el-table-column label="商品规格" align="center"  prop="specifications" width="150px"></el-table-column>
                        <el-table-column label="商品名称" align="center"  prop="goods_name" width="150px"></el-table-column>
                        <el-table-column prop="actual_goods_num" label="发货数" align="center" width="150px"></el-table-column>
                        <el-table-column prop="every_case_goods_num" label="每箱数量" align="center" width="150px"></el-table-column>
                        <el-table-column prop="goods_case_num" label="使用纸箱数量" align="center" width="150px"></el-table-column>
                        <el-table-column prop="goods_case_weight" label="商品重量" align="center" width="150px"></el-table-column>
                        <el-table-column prop="goods_manufacture_time" label="生产日期" align="center" width="150px"></el-table-column>
                        <!--<el-table-column prop="" label="操作" align="center">-->
                            <!--<template slot-scope="scope">-->
                                <!--<el-button type="primary">签收</el-button>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                    </el-table>
                </el-col>
            </el-row>

            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        :observer="dialogThis"
                        @click="submit('signForm')">
                    统一签收
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
import ActualDeliveryGoods from '@/packages/ActualDeliveryGoodsSelectProxy';
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
            labelWidth:'150px',
            active:0,
            signForm:{
                sign:true,
                signGoodsList:[],
                purchase_order_id:null,
            },
            model:null,
            purchase_order_id:null,
            signGoodsList:[],
            selectionGoods:[],

        }
    },
    methods:{
        getAjaxPromise(model){
            return this.ajaxProxy.create(model);
        },
        handleSelectionChange(val) {
            this.selectionGoods = val;
        },
        onOpen(param){
            // 查询未签收的发货单
            this.selectionGoods=[];
            this.purchase_order_id = param.params.row.id;
            this.actualDeliveryGoods.setParam({
                sign_status:0,
                purchase_order_id:this.purchase_order_id,
            }).load();
        },
        getActualDeliveryGoods(data){
            this.signGoodsList = data.items;
        },
        submit(name){
            if(this.selectionGoods.length > 0){
                this.signForm.signGoodsList = this.selectionGoods;
                this.signForm.purchase_order_id = this.purchase_order_id;
                this.formSubmit(name);
            }else{
                this.$message.error('签收单不能为空');
                return;
            }

        }
    },
    watch:{
        model:function(val, oldVal){
            for (const key in this.signForm) {
                if (this.signForm.hasOwnProperty(key)) {
                    this.signForm[key] = val[key];
                }
            }
        }
    },
    created(){
        this.actualDeliveryGoods = new ActualDeliveryGoods(null, this.getActualDeliveryGoods, this);

    }

}
</script>
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
