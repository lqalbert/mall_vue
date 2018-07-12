<template>
    <!-- 本来是设置地址的，后来发现查询剩余的面单号也是用这个 -->
        <div>
            <MyDialog title="订购查询" :name="name" :width="width" :height="height" @before-open="onOpen" @before-close="onBeforeClose">
                <el-form :model="editForm" ref="editForm" :label-width="labelWidth"   :label-position="labelPosition">
                    <!-- <el-alert
                        title="请选择正确的地址 "
                        type="warning"
                        show-icon>
                    </el-alert> -->
                    <div v-for="bill in waybill" :key="bill.index">
                        <el-row>
                            <el-col :span="24">
                                cpCode: {{ cpCode }} 
                                <el-alert
                                    title="当没有设置cpCode时 菜鸟接口会返回一个默认的cpCode，仔细核对这个cpCode是不是正确的。"
                                    type="warning"
                                    show-icon>
                                </el-alert>
                            </el-col>
                        </el-row>
                        <el-row >
                            <el-col :span="12">
                                <el-form-item label="已用面单数量">
                                    {{ bill.allocatedQuantity }} 
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="取消面单总数">
                                    {{ bill.cancelQuantity }}   
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="已经打印面单总数">
                                    {{ bill.printQuantity }}      
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="面单余额数量">
                                    {{ bill.quantity }}         
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24">
                                <el-form-item prop="send_address"  label="地址">
                                    <el-radio-group v-model="editForm.send_address">
                                        <el-radio v-for="(item, addressIndex) in bill.shippAddressCols" :label="item" :key="addressIndex">{{item.province}}  - {{item.city}} - {{item.town}} - {{item.district}} - {{item.detail}} </el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>

                    
                </el-form>
                <div slot="dialog-foot" class="dialog-footer">
                    <el-button @click="getCainiao" :loading="queryIng">查 询</el-button> 
                    <el-button @click="handleClose">取 消</el-button>
                    <submit-button
                            :observer="dialogThis"
                            @click="formSubmit('editForm')">
                        保存地址
                    </submit-button>
                </div>
            </MyDialog>
        </div>
</template>
<script>
import DialogForm from '@/mix/DialogForm';
import APP_CONST from '@/config';
import { mapGetters } from 'vuex';

export default {
    name: 'Edit',
    mixins:[DialogForm],
    props:{
        ajaxProxy:{type: Object}
    },
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            editForm:{
                id:'',
                send_address:null
            },
            waybill:[],
            cpCode:"",
            queryIng:false
        }
    },
    methods:{
        getAjaxPromise(model){
            return this.ajaxProxy.updateAddress(model.id, model);
        },
        onOpen(param){
            this.editForm.id = param.params.id;       
        },
        parseAddress(ar){
            let re = [];
            if (ar.length == 0) {
                this.$message.error('请联系管理员，没有找到发货地址');
                return ;
            }
            for (let index = 0; index < ar.length; index++) {
                const element = ar[index];
                var d = {};
                if (element.branchAccountCols.length) {
                    d.address = element.branchAccountCols[0].shippAddressCols[0];
                    d.name    = element.branchAccountCols[0].branchName;
                }
                re.push(d);   
            }
            this.addresslist = re;
        },
        getCainiao(){
            this.queryIng = true;
            this.ajaxProxy.getAddress(this.editForm.id).then((Response)=>{
                this.queryIng = false;
                if (Response.data.status == 1) {
                    this.waybill = Response.data.data[0].branchAccountCols;
                    this.cpCode = Response.data.data[0].cpCode;
                } else {
                    this.$message.error(Response.data.msg);
                }
            }).catch((Response)=>{
                this.queryIng.false;
                this.$message.error('操作失败');
            });
        },
        onBeforeClose(){
            this.waybill = [];
            this.cpCode = "";
        }
    }
    </script>
    <style scoped>
        .name-input{
            max-width: 217px;
        }
    </style>
    
