<template>
    <div >
        <Dialog title="查看" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="rowInfoForm" ref="rowInfoForm" :label-width="labelWidth" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="订单编号" prop="order_sn">
                            <el-input v-model="rowInfoForm.order_sn" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="rowInfoForm.goods_name" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label="收货人信息" prop="consignee">
                            <el-input v-model="rowInfoForm.consignee" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="总金额" prop="order_all_money">
                            <el-input v-model="rowInfoForm.order_all_money" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label="应付金额" prop="order_pay_money">
                            <el-input v-model="rowInfoForm.order_pay_money" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="订单状态" prop="order_status">
                            <el-input v-model="rowInfoForm.order_status" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label="支付方式" prop="pay_name">
                            <el-input v-model="rowInfoForm.pay_name" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="发货状态" prop="shipping_status">
                            <el-input v-model="rowInfoForm.shipping_status" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label="配送方式" prop="shipping_name">
                            <el-input v-model="rowInfoForm.shipping_name" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="下单时间" prop="order_time">
                            <el-input v-model="rowInfoForm.order_status" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button :observer="dialogThis" @click="formSubmit('rowInfoForm')" type="primary">确 定</el-button>
            </div>
        </Dialog>
    </div>
</template>

<script>
    import DialogForm from '../../mix/DialogForm';
    export default {
        name: 'addDialog',
        mixins:[DialogForm],
        props:{
            
        },
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'100px',
                rowInfoForm:{
                    order_sn:'',
                    goods_name:'',
                    consignee:'',
                    order_all_money:'',
                    order_pay_money:'',
                    order_status:'',
                    pay_name:'',
                    shipping_status:'',
                    shipping_name:'',
                    order_time:'',
                },

            }
        },

        methods:{
            addFormSubmit:function(){
                console.log(this.rowInfoForm);
                this.state6=false;
            },
            closeDialog:function(){
                this.state6=false;
            },
            pdtTimeDateChange(v){
                this.rowInfoForm.pdt_time = v;
            },
            intoTimeDateChange(v){
                this.rowInfoForm.into_time = v;
            },
            onOpen(event){
              this.rowInfoForm = event.params.rowData;
            }
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

