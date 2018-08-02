<template>
        <div>
            <MyDialog title="审核" :name="name" :width="width" :height="height"  @before-open="onBeforeOpen" @before-close="onBeforeClose">
                <el-form :model="checkForm" ref="checkForm" :label-width="labelWidth"  :label-position="labelPosition">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="快递公司" prop="express_id">
                                <el-select v-model="checkForm.express_id" clearable>
                                    <el-option v-for="item in company" :label="item.company_name" :value="item.id" :key="item.id"></el-option>
                                </el-select>
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
        export default {
            name: 'Check',
            mixins:[DialogForm],
            
            data () {
                return {
                    dialogThis:null,
                    labelPosition:"right",
                    labelWidth:'100px',
                    checkForm:{
                        ids:[],
                        express_id:"",    
                    },
                    total_vol:0,
                }
            },
            computed:{
                company(){
                    return this.$store.getters.getExpressByEntrepot(this.$store.getters.userEntrepotId);
                }
            },
            methods:{
                onBeforeOpen(param){
                    // console.log(param);
                    this.checkForm.ids = param.params.ids;
                },
                getAjaxPromise(model){
                    return this.ajaxProxy.getWayBill(model);
                },
                getWaybill(){
                    //需要设置一下　不能返复点击
                    if (this.checkForm.express_id.length==0) {
                        this.$message.error('先选择快递公司');
                        
                        return;
                    }
                },
                onBeforeClose(){
                    this.checkForm.ids = [];
                }
            },
            created(){
                this.dialogThis = this;
                
                this.$store.dispatch('initExpress', this.$store.getters.userEntrepotId);
                
            },
    
            beforeDestroy(){
                // this.goodsProxy = null;
            }
        }
    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
    
    </style>
          