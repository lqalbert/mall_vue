<template>
        <MyDialog title="高级查询" :name="name" :width="width" :height="height">
            <el-form :model="queryForm"  ref="queryForm"  :label-width="labelWidth"   :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="department_id" label="发货单">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="group_id" label="订单">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="deal_id" label="发货单状态">
                            <el-select 　 placeholder="　" >
                                
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="consignee" label="收货人">
                            <el-input  v-model="queryForm.consignee" class="name-input" placeholder="请输入收货人名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="phone" label="收货手机">
                            <el-input  v-model="queryForm.phone" class="name-input" placeholder="请输入收货人手机"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="sn" label="订单编号">
                            <el-input  v-model="queryForm.sn" class="name-input" placeholder="请输入订单编号"></el-input>
                        </el-form-item> 
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="status" label="箱类型">
                            <el-select v-model="queryForm.status">
                                　
                            </el-select>
                        </el-form-item> 
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="product_status" label="收货省份">
                            <el-select v-model="queryForm.product_status">
                                　
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="range" label="收货城市">
                                <el-select v-model="queryForm.product_status">
                                　
                                    </el-select>
                        </el-form-item> 
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="product_status" label="自提">
                            <el-select v-model="queryForm.product_status">
                                　
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="range" label="订单备注">
                                <el-select v-model="queryForm.product_status">
                                　
                                    </el-select>
                        </el-form-item> 
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="product_status" label="订单金额">
                            <el-select v-model="queryForm.product_status">
                                　
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="cate_type_id" >
                            <el-select v-model="queryForm.cate_type_id" size="small" placeholder="商品类型" clearable @change="cate_type_change">
                                　
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="cate_kind_id" >
                            <el-select v-model="queryForm.cate_kind_id" size="small" placeholder="商品品类" >
                                　
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>  
                <el-row>
                        <el-col :span="12">
                            <el-form-item prop="cate_type_id" >
                                <el-select v-model="queryForm.cate_type_id" size="small" placeholder="查询日期" clearable @change="cate_type_change">
                                    　
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="cate_kind_id" >
                                    <el-date-picker
                                    
                                    type="datetimerange"
                                    placeholder="选择时间范围">
                                  </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>      
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button @click="handleReset">重 置</el-button>
                <el-button @click="handleSubmit" type="info">查 询</el-button>
            </div>
        </MyDialog>
    </template>
    
<script>
    import DialogForm from '@/mix/DialogForm';
    // import DepartmentSelectProxy from '@/packages/DepartSelectProxy';
    // import GroupSelectProxy from '@/packages/GroupSelectProxy';
    // import EmployeeSelectProxy from '@/packages/EmployeeSelectProxy';

    export default {
        name: 'advance',
        mixins:[DialogForm],
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'100px',
                department:[],
                groups:[],
                users:[],
                range:"",
                
                queryForm:{
                   
                },
            }
        },
        methods:{
            handleReset(){
                // this.$refs.queryForm.resetFields();
                this.initObject(this._queryForm, this.queryForm);
                this.$parent.$emit('search-tool-change', this.queryForm);
            },
           
            
            handleSubmit(){
                this.$parent.$emit('search-tool-change', this.queryForm);
                this.handleClose();
            },
            rangeChange(v){
                if (v) {
                    let ar = v.split(" - ");
                   
                } else {
                    
                }
            }
        },
        created(){
            
            this._queryForm = {};
            this.initObject(this.queryForm, this._queryForm);
        }
    }
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
        .name-input{
            max-width: 217px;
        }
    </style>
    
