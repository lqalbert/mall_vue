<template>
    <div >
        <el-dialog title="出库资料填写" :visible.sync="status" @close="handleClose">
            <el-form  :inline="true" :model="goodsOutForm" size="small" label-width="140px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="出库日期" prop="out_time">
                          <el-date-picker v-model="goodsOutForm.datetime" type="datetime" placeholder="选择日期时间" 
                               @change="outTimeDateChange" :editable="false">
                          </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item  label="种类" prop="pdt_type">
                          <el-select size="small" placeholder="产品种类" v-model="goodsOutForm.pdt_type">
                              <el-option value="1" label="化妆品"></el-option>
                              <el-option value="2" label="保健品"></el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="销售员工" prop="pdt_name">
                            <el-input v-model="goodsOutForm.pdt_name" size="small" placeholder="产品名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="数量" prop="goods_num">
                            <el-input-number v-model="goodsOutForm.goods_num" @change="goodsNumChange" :min="1" :max="1000">
                            </el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label="销售人员" prop="sale_name">
                            <el-select  size="small" clearable v-model="goodsOutForm.sale_name">
                                <el-option label="张三" value="1"></el-option>
                                <el-option label="李四" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item  label="销售日期" prop="sale_time">
                          <el-date-picker v-model="goodsOutForm.sale_time" type="datetime" placeholder="选择日期时间" 
                               @change="saleTimeDateChange" :editable="false">
                          </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label="订单审核员" prop="check_name">
                            <el-select  size="small" clearable v-model="goodsOutForm.check_name">
                                <el-option label="特朗普" value="1"></el-option>
                                <el-option label="普京" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item  label="审核日期" prop="check_time">
                          <el-date-picker v-model="goodsOutForm.check_time" type="datetime" placeholder="选择日期时间" 
                               @change="checkTimeDateChange" :editable="false">
                          </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item  label="出库人" prop="out_name">
                          <el-select size="small" placeholder="出库人" v-model="goodsOutForm.out_name">
                              <el-option value="1" label="魑"></el-option>
                              <el-option value="2" label="魅"></el-option>
                              <el-option value="3" label="魍"></el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item  label="选择物流" prop="express">
                          <el-select size="small" placeholder="选择物流" v-model="goodsOutForm.express">
                              <el-option value="1" label="申通"></el-option>
                              <el-option value="2" label="顺丰"></el-option>
                              <el-option value="3" label="韵达"></el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog()">取 消</el-button>
                <el-button @click="outformSubmit()" type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'addDialog',
        props:{
            outOpen:{
                type:Boolean,
                default:false
            }
        },
        data () {
            return {
                status: this.outOpen,
                goodsOutForm:{
                  datetime:'',
                  pdt_type:'',
                  pdt_name:'',
                  goods_num:'',
                  sale_name:'',
                  sale_time:'',
                  check_name:'',
                  check_time:'',
                  express:'',
                  out_name:'',
                },

            }
        },

        methods:{
            handleClose(){
                this.$emit('goodsout-window-close');
            },
            outformSubmit:function(){
                console.log(this.goodsOutForm);
                this.status=false;
            },
            closeDialog:function(){
                this.status=false;
            },
            outTimeDateChange(v){
                this.goodsOutForm.out_time = v;
            },
            goodsNumChange(v){
                this.goodsOutForm.goods_num = v;
            },
            saleTimeDateChange(v){
                this.goodsOutForm.sale_time = v;
            },
            checkTimeDateChange(v){
                this.goodsOutForm.check_time = v;
            }
        },
        watch:{
            outOpen:function(val, oldVal){
                this.status = val;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

