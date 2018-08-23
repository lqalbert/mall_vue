<template>
    <div>
        <MyDialog title="签收" :name="name" :width="width" :height="height"  @before-open="onBeforeOpen" @before-close="onBeforeClose">
            <el-form :model="checkForm" ref="checkForm" :label-width="labelWidth"  :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="快递公司" prop="express_name">
                            <el-input v-model="checkForm.express_name" :disabled="name_disable"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="快递号" prop="express_sn">
                            <el-input v-model="checkForm.express_sn" :disabled="sn_disabled"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="快递费"　prop="express_fee">
                            <el-col :span="14">
                                <el-input v-model="checkForm.express_fee"  placeholder="0.00"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="重量"　prop="real_weigth">
                            <el-col :span="14">
                                <el-input v-model="checkForm.real_weigth" placeholder="100"><template slot="append">g</template></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                    @click="formSubmit('checkForm')"
                    :observer="dialogThis">
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>

<script>
    import DialogForm from '@/mix/DialogForm';
    import StateButton from '@/components/common/StateButton';
    import OrderGoodsAjaxProxy from "@/packages/OrderGoodsAjaxProxy";
    

    export default {
        name: 'Check',
        mixins:[DialogForm],
        components:{
            StateButton
        },
        data () {
            return {
                dialogThis:null,
                labelPosition:"right",
                labelWidth:'100px',
                checkForm:{
                    id:"",
                    express_name:"",
                    express_sn:"",
                    express_fee:"",
                    real_weigth:"",
                },
                name_disable:false,
                sn_disabled:false,  
            }
        },
        computed:{
          
        },
        methods:{
            onBeforeOpen(param){
                this.checkForm.id = param.params.id;
                this.checkForm.express_name = param.params.express_name;
                this.checkForm.express_sn = param.params.express_sn;
                this.checkForm.express_fee = param.params.express_fee;
                this.checkForm.express_fee = param.params.express_fee;
                this.checkForm.real_weigth = param.params.real_weigth;
                
                if (param.params.express_name ) {
                    this.name_disable = true;
                } else {
                    this.name_disable = false;
                }
                
                if (param.params.express_sn ) {
                    this.sn_disabled = true;
                } else {
                    this.sn_disabled = false;
                }
            },

            getAjaxPromise(model){
                let id = model.id;
                delete model.id;
                return this.ajaxProxy.orderSign(id, model);
            },
            onBeforeClose(){
                // this.checkForm.ids = [];
                // this.checkForm.assign_sns = [];
            }
        },
        created(){
            this.dialogThis = this;    
        },
        beforeDestroy(){
            // this.goodsProxy = null;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
      