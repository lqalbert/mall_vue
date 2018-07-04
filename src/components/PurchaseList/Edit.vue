<template>
    <div>
            <MyDialog title="编辑" :name="name" :width="width" :height="height" @before-open="onOpen">
                <el-row>
                    <el-tabs v-model="activeName" type="border-card">
                        <el-tab-pane label="采购信息" name="First">
                            <el-form ref="editForm" :inline="true" :model="editForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                                <el-row>
                                    <el-form-item prop="shipper" label="发货单位">
                                        <el-input v-model="editForm.shipper" size="small" placeholder="发货单位" style="width:180px"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="entrepot_id"  label="采购单位">
                                        <el-select v-model.number="editForm.entrepot_id" placeholder="请选择采购单位" size="small" style="width:180px" @change="entrepotChange">
                                            <el-option v-for="v in distributors" :label="v.name"
                                                       :value="v.id" :key="v.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="到货时间" prop="contact_time">
                                        <el-date-picker
                                                v-model="editForm.contact_time"
                                                type="date"
                                                size="small"
                                                @change="timeChange"
                                                placeholder="选择日期时间" style="width:180px">
                                        </el-date-picker>
                                    </el-form-item>

                                </el-row>

                                <el-row>
                                    <el-form-item prop="contact_name" label="采购人名">
                                        <el-input v-model="editForm.contact_name" size="small" placeholder="采购人" style="width:180px"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="contact_phone" label="联系电话">
                                        <el-input v-model="editForm.contact_phone" size="small" placeholder="采购人电话" style="width:180px"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="remark" label="采购备注">
                                        <el-input   v-model="editForm.remark" size="small"  placeholder="备注" style="width:180px"></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="采购商品" name="Second">
                            <el-table :data="purchaseOrderGoodsData" border >
                                <el-table-column prop="sku_sn" label="sku编码" align="center"></el-table-column>
                                <el-table-column prop="goods_name" label="商品名称" align="center"></el-table-column>
                                <el-table-column prop="specifications" label="规格" align="center"></el-table-column>
                                <el-table-column prop="goods_purchase_num" label="采购数量" align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.goods_purchase_num"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="goods_purchase_price" label="采购价" align="center">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.goods_purchase_price"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column  label="操作" align="center" width="100">
                                    <template slot-scope="scope">
                                        <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>

                    </el-tabs>
                </el-row>

                
                <div slot="dialog-foot" class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <submit-button
                            :observer="dialogThis"
                            @click="submit('editForm')" >
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
import DistributionCenterProxy from '../../packages/DistributionCenterSelectProxy';
import PurchaseOrderGoods from '@/packages/PurchaseOrderGoodsSelectProxy';
export default {
    name: 'Edit',
    mixins:[DialogForm,FormMix],
    components: {
        
    },
    props:{
        purchaseOrderGoodsAjaxProxy:{}
    },
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            activeName:'First',
            editForm:{
                id:'',
                shipper:'',
                entrepot_id:'',
                entrepot_name:'',
                contact_time:'',
                contact_name:'',
                contact_phone:'',
                remark:'',
                sku_type:0,
                goods_total:0,
                goods_money_total:0,
                purchase_goods:[],

            },
            rules:{
                shipper:[
                    { required: true, message: '请填写发货单位', trigger: 'blur' },
                    { min:1,   max: 20, message: '长度不能超过20个字符', trigger: 'blur'  }
                ],
                entrepot_id:[
                    { required: true, message: '请选择采购单位', trigger: 'blur',type:'number' },
                ],
                contact_time:[
                    { required: true, message: '请选择到货时间', trigger: 'blur' },
                ],
                contact_name:[
                    { required: true, message: '请填写采购人姓名', trigger: 'blur' },
                    { min:1,   max: 20, message: '长度不能超过20个字符', trigger: 'blur'  }
                ],
                contact_phone:[
                    { required: true, message: '请填写采购人电话',pattern: /^1[34578]\d{9}$/, trigger: 'blur' },
                ],
                remark:[
                    { min:1,   max: 100, message: '长度不能超过100个字符', trigger: 'blur'}
                ],

            },
            distributors:[],
            purchaseOrderGoodsData:[],
            model:null,
        }
    },
    methods:{
        getAjaxProxy(){
            return  this.ajaxProxy;
        },
        getAjaxPromise(model){
            return this.ajaxProxy.update(model.id, model);
        },

        handleDelete(id){
            let vmthis = this;
            let ajaxProxy = this.getAjaxProxy();
            if(!ajaxProxy){
                return ;
            }
            this.$confirm('确定删除?', '警告',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                ajaxProxy.delete(id).then(function(response){
                    vmthis.$message.success("操作成功");
                    vmthis.purchaseOrderGoods.setParam({
                        purchase_order_id:vmthis.model.id,
                    }).load();
                    vmthis.$emit('delete-success');
                }).catch(function(error){
                    vmthis.$message.error("出错了")
                });
            });
        },
        onOpen(param){
            this.model = param.params.model;
            this.purchaseOrderGoods.setParam({
                purchase_order_id:this.model.id,
            }).load();
        },

        submit(name) {
            this.editForm.goods_total = 0;
            this.editForm.goods_money_total = 0;
            for(let i=0;i<this.purchaseOrderGoodsData.length;i++) {
                if (this.purchaseOrderGoodsData[i].goods_purchase_num == undefined || this.purchaseOrderGoodsData[i].goods_purchase_price == undefined || this.purchaseOrderGoodsData[i].goods_purchase_num == 0 || this.purchaseOrderGoodsData[i].goods_purchase_price == 0) {
                    this.is_submit = false;
                    this.$message.error('请填写采购数量和价格');
                    return;
                }
                this.editForm.goods_total += parseInt(this.purchaseOrderGoodsData[i].goods_purchase_num);
                this.editForm.goods_money_total += parseInt(this.purchaseOrderGoodsData[i].goods_purchase_num) * parseInt(this.purchaseOrderGoodsData[i].goods_purchase_price);
            }
            this.editForm.purchase_goods = this.purchaseOrderGoodsData;
            this.editForm.sku_type=this.purchaseOrderGoodsData.length;
            this.formSubmit(name);

        },
        timeChange(v) {
            this.editForm.contact_time=v;
        },
        getDistributionCenter(data){
            this.distributors = data.items;
        },
        getPurchaseOrderGoods(data){
            this.purchaseOrderGoodsData = data.items;
        },
        entrepotChange(v){
            let i =''
            for (i in this.distributors){
                if(this.distributors[i]['id'] == v){
                    this.editForm.entrepot_name =this.distributors[i]['name']
                }
            }
        },
    },
    mounted(){

    },
    created(){
        //获取配送中心数据
        let DistributionCenterSelect = new DistributionCenterProxy({}, this.getDistributionCenter, this);
        DistributionCenterSelect.load();


        this.purchaseOrderGoods = new PurchaseOrderGoods(null, this.getPurchaseOrderGoods, this);
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

</style>
