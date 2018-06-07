<template>
    <div>
        <MyDialog title="修改盘点" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm" ref="editForm" :label-width="labelWidth" :rules="rules" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="check_num" label="盘点单号:">
                            {{editForm.check_num}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="sku_sn" label="商品编号:">
                            {{editForm.sku_sn}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="entrepot_name" label="配送中心:">
                            {{editForm.entrepot_name}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="goods_name" label="商品名称:">
                            {{editForm.goods_name}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="cate_type" label="商品类型:">
                            {{editForm.cate_type}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="goods_price" label="商品单价:">
                            <el-input class="name-input" size="small" 
                                v-model="editForm.goods_price" @change="handlePrice" placeholder="必须输入单价">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="entrepot_count" label="库存数量:">
                            {{editForm.entrepot_count}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="check_count" label="盘点数量:">
                            <el-input class="name-input" size="small" 
                                v-model.number="editForm.check_count" @change="handleChange" placeholder="输入盘点数量">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="profit_count" label="盘盈数量:">
                            {{editForm.profit_count}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="profit_money" label="盘盈金额:">
                            {{editForm.profit_money}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="loss_count" label="盘亏数量:">
                            {{editForm.loss_count}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="loss_money" label="盘亏金额:">
                            {{editForm.loss_money}}
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="16">
                        <el-form-item prop="remark" label="备注:">
                            <el-input type="textarea" size="small" v-model="editForm.remark" placeholder="备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>

            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        :observer="dialogThis"
                        @click="formSubmit('editForm')">
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>
<script>
import DialogForm from '../../mix/DialogForm';
import FormMix from '../../mix/Form';
import DialogMix from '../../mix/Dialog';
import APP_CONST from '../../config';
import { mapGetters } from 'vuex';

export default {
    name: 'add-dialog',
    mixins:[DialogForm,FormMix,DialogMix],
    components: {
        
    },
    props:{

    },
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'100px',
            editForm:{
                cate_kind:'',
                cate_kind_id:'',
                cate_type:'',
                cate_type_id:'',
                check_count:'',
                check_id:'',
                check_name:'',
                check_num:'',
                check_user_id:'',
                entrepot_count:'',
                entrepot_id:'',
                entrepot_name:'',
                goods_name:'',
                goods_price:'',
                id:'',
                inventory_id:'',
                loss_count:'',
                loss_money:'',
                profit_count:'',
                profit_money:'',
                remark:'',
                sku_sn:'',
            },
            model:null,
            rules:{
                goods_price:[
                    {required: true,pattern:/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,message: '价格格式为00.00', trigger:'blur'}
                ],
                check_count:[
                    {required: true,type:'number',message: '填写数量纯数字', trigger:'blur'}
                ]
            }
        }
    },
    computed:{
        ...mapGetters([
            'getUser'
        ])
    },
    methods:{
        onOpen(param){
            console.log(param.params.model);
            // console.log(this.getUser);
            this.model = param.params.model;
        },
        getAjaxPromise(model){
            // return this.ajaxProxy.create(model);
            return this.ajaxProxy.update(model.id, model);
        },
        handlePrice(v){
            this.handleChange(this.editForm.check_count);
        },
        handleChange(v){
            let check_count = v;
            let entrepot_count = this.editForm.entrepot_count;
            let goods_price = this.editForm.goods_price;
            let $num = check_count-entrepot_count;
            if(goods_price == '' || goods_price == undefined){
                this.$message.error('请输入价格才能计算盘盈/盘亏');
                return;
            }
            if($num>0){
                this.editForm.profit_count = $num;
                this.editForm.profit_money = $num*goods_price;
                this.editForm.loss_count = 0;
                this.editForm.loss_money = 0;
            }else if($num<0){
                this.editForm.profit_count = 0;
                this.editForm.profit_money = 0;
                this.editForm.loss_count = Math.abs($num);
                this.editForm.loss_money = Math.abs($num*goods_price);
            }else{
                this.editForm.profit_count = 0;
                this.editForm.profit_money = 0;
                this.editForm.loss_count = 0;
                this.editForm.loss_money = 0;
            }
        }
    },

    created(){
        
    },
    watch:{
        model:function(val, oldVal){
            for (const key in this.editForm) {
                if (this.editForm.hasOwnProperty(key)) {
                    this.editForm[key] = val[key];
                }

            }
        }
    }

}
</script>
<style scoped>
    .name-input{
        max-width: 170px;
    }
</style>
