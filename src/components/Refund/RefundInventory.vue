<template>
        <div >
            <MyDialog title="退换货入库" :name="name" :width="width" :height="height" @before-open="onOpen" @before-close="onBeforeClose">
                <el-form :model="checkForm" ref="checkForm" :label-width="labelWidth" :label-position="labelPosition">
                    <!-- 订单信息 -->
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="订单号" >
                                {{ orderModel.order_sn }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="销售人员" >
                                {{ orderModel.user_name }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="退换操作人" >
                                {{ afterModel.user_name }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="物流公司" >
                                {{ assignModel.express_name }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="快递单号" >
                                {{ assignModel.express_sn }}
                            </el-form-item>
                        </el-col>
                    </el-row>
    
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="收货人姓名" >
                                {{ addressModel.name }}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="收货人手机" >
                                {{ addressModel.fixed_telephone }}
                            </el-form-item>
                        </el-col>
                    </el-row>
    
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="收货地址" >
                                {{ addressModel.address }}
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="退换原因">
                                {{ afterModel.reason }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="备注">
                                {{ afterModel.remark }}
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row class="red" id="red_tip1">
                        <el-col :span="24">
                            <el-form-item label="审核结果">
                                {{ afterModel.check_status_text }}
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row class="red" id="red_tip2">
                        <el-col :span="24">
                            <el-form-item label="审核备注">
                                {{ afterModel.check_mark }}
                            </el-form-item>
                        </el-col>
                    </el-row>
    
                    <el-row>
                        <el-col :span="24">
                            <el-table :data="goods">
                                <el-table-column label="商品编码" prop="sku_sn" align="center" width="150"></el-table-column>
                                <el-table-column label="商品名称" prop="goods_name" align="center" width="150" show-overflow-tooltip></el-table-column>
                                <el-table-column label="退换类型" prop="status_text"   align="center" width="150"  ></el-table-column>
                                <el-table-column label="退换数量" prop="return_num"  align="center" width="150"  > </el-table-column>
                                <el-table-column label="入库数量" align="center" width="150">
                                    <template slot-scope="scope">
                                        <el-input-number :min="0" :max="scope.row.return_num"  size="small" v-model="scope.row.return_inventory" :controls="false"></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column label="损坏数量" align="center" width="150">
                                    <template slot-scope="scope">
                                        <el-input-number :min="0" :max="scope.row.return_num" size="small" v-model="scope.row.destroy_num" :controls="false"></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作"     align="center" width="150">
                                    <template slot-scope="scope">
                                        <el-button type="danger" size="small" @click="deleteGoods(scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                    <br>
                    <el-row>
                        <el-col :span="24">
                            <el-alert title="请确认退货产品已到，再进行入库操作" type="error"></el-alert>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="dialog-foot" class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <submit-button
                            :observer="dialogThis"
                            @click="beforeSubmit" >
                        提交入库
                    </submit-button>
                </div>
            </MyDialog>
        </div>
    </template>
    
    <script>
        import DialogForm from '@/mix/DialogForm';
        import OrderAjax from '@/ajaxProxy/OrderBasic';
        import OrderGoodsAjax from '@/ajaxProxy/Ordergoods';
        import AssignAjax from '@/ajaxProxy/Assign';
    
        export default {
            name: 'refund-check',
            mixins:[DialogForm],
            ajaxProxy:{
                required:true,
                type: Object,
                default: null
            },
            data () {
                return {
                    dialogThis:this,
                    labelPosition:"right",
                    labelWidth:'100px',
                    checkForm:{
                        id:"",
                    },
                    statusArr:[
                        {id:1, status:'通过'},
                        {id:3, status:'未通过'}
                    ],
                    orderModel:{order_sn:"", user_name:"" },
                    assignModel:{user_name:"", express_name:"", express_sn:"" },
                    afterModel:{ fee:"", return_fee:"" },
                    addressModel:{name:"", fixed_telephone:"", address:"" },
                    goods:[]
                }
            },
            methods:{
                onOpen(param){
                    if (param.params.in_inventory != 0) {
                        this.$alert("已经入库,不能再次入库", "警告", {
                            confirmButtonText: '确定',
                            callback: action=>{
                                this.handleClose();
                            }
                        });
                        return false;
                    }

                    this.checkForm.id = param.params.id;
                    this.afterModel = param.params;
                    this.orderModel = param.params.order;
    
                    OrderGoodsAjax.get({order_id:param.params.order_id, after:1, appends:['status_text']}).then((response)=>{
                        response.data.items.forEach((element)=>{
                            element.return_inventory = 0;
                            element.destroy_num = 0;
                        });
                        this.goods = response.data.items;
                    })
    
                    AssignAjax.get({order_id: param.params.order_id, fields:['id','express_name','express_sn','address_id'], with:['address']}).then((response)=>{
                        this.assignModel = response.data.items[0];
                        this.addressModel = this.assignModel.address;
                    }).catch(()=>{
    
                    });
                },
                getAjaxPromise(model){
                    return this.ajaxProxy.rxinventory(model.id, model);
                },
                deleteGoods(row){
                    this.goods = this.goods.filter((element) => {
                        return element.id != row.id;
                    })
                },
                beforeSubmit(){
                    if (this.goods.length == 0) {
                        this.$message.error('商品数量不能为0');
                        this.$emit('valid-error');
                        return ;
                    }
                    
                    for (let index = 0; index < this.goods.length; index++) {
                        const element = this.goods[index];

                        if (element.return_inventory == 0) {
                            this.$message.error("入库数量不能为0");
                            this.$emit('valid-error');
                            return ;
                        }
                        //+ element.destroy_num 
                        if (element.return_inventory  > element.return_num) {
                            this.$message.error("入库或损坏数量不正确");
                            this.$emit('valid-error');
                            return ;
                        } 
                    }

                    this.checkForm.goods = this.goods;
                    
                    this.formSubmit('checkForm');
                },
                onBeforeClose(){
                    this.checkForm.goods = [];
                }
            }
        }
    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
        #red_tip1, #red_tip2, .red {
            color: red !important;
        }
        .el-form-item {
            margin-bottom: 5px;
        }
    </style>
    
    