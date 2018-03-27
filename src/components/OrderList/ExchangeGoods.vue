<template>
        <div>
            <MyDialog title="发起换货" :name="name" :width="width" :height="height" @before-open="onOpen" @before-close="onBeforeClose">
                <el-form ref="rowInfoForm" :model="rowInfoForm" :label-width="labelWidth" :label-position="labelPosition">
                    <el-steps :space="250" :active="active" finish-status="success" :center="true" :align-center="true">
                        <el-step title="选择退回的商品"></el-step>
                        <el-step title="添加更换的商品"></el-step>
                        <el-step title="填写备注"></el-step>
                    </el-steps>
                    <div　v-show="active == 0">
                        <h5>订单信息</h5>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="订单号" prop="id">
                                    {{ model.order_sn }}
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="总金额" prop="order_all_money">
                                    {{ model.order_all_money }} 元
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="订单状态" prop="status">
                                    {{　model.status_text }}
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <h5>勾选要退回的商品</h5>
                        <el-row>
                            <el-col :span="24">
                                <el-table :data="goods" @selection-change="handleSelectionChange">
                                    <el-table-column type="selection" width="55"></el-table-column>
                                    <el-table-column label="商品名称" prop="goods_name"></el-table-column>
                                    <el-table-column label="商品编号" prop="sku_sn" width="120"></el-table-column>
                                    <el-table-column label="数量"     prop="goods_number" width="160">
                                            <template slot-scope="scope">
                                                <el-input-number size="small" :min="1" :controls="false" :max="scope.row.goods_number"  v-model="scope.row.goods_num" @change="numberChange"></el-input-number>
                                            </template>
                                    </el-table-column>
                                    <el-table-column label="单价"     prop="price" width="100"></el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
                    </div>
    
                    <div v-show="active == 1">
                        <h5>要更换的商品</h5>
                        <el-row>
                            <el-col :span="24">
                                <el-table :data="rowInfoForm.goods" >
                                    <el-table-column label="商品名称" prop="goods_name"></el-table-column>
                                    <el-table-column label="商品编号" prop="sku_sn" width="120"></el-table-column>
                                    <el-table-column label="数量"    prop="goods_num"  width="160">
                                        <template slot-scope="scope">
                                            <el-input-number size="small" :min="1" :controls="false" :max="scope.row.goods_number"  v-model="scope.row.goods_num" @change="numberChange"></el-input-number>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="单价"  prop="price" width="100"></el-table-column>
                                    <el-table-column label="操作"  width="100">
                                        <template slot-scope="scope">
                                            <el-button　type="danger" @click="del(scope.$index)"　size="small">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
                        <br>
                        <el-row>
                            <el-col :span="24">
                                <el-button size="small" @click="changeNew">换新</el-button><el-button size="small" @click="changeOther">其它商品</el-button>
                            </el-col>
                        </el-row>
                        <div v-show="addOther">
                            <br>
                                <el-row>
                                    <el-col :span="24">
                                        <el-row>
                                            <el-col :span="12">
                                                <el-form-item label="商品分类"  >
                                                    <el-cascader size="small">
                                                    </el-cascader>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item  label="商品名称">
                                                    <el-select size="small">
                                                        <el-option>
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="12">
                                                <el-form-item prop="goods_number" label="商品数量">
                                                    <el-input-number size="small" :min="1"    >
                                                    </el-input-number>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                <el-form-item >
                                                    <el-button size="small" type="info">添加</el-button>
                                                </el-form-item>
                                            </el-col>
                                        </el-row> 
                                    </el-col>
                                </el-row>  
                        </div>
                        
                    </div>
                    <div v-show="active == 2">
                        <h5>备注</h5>
                        <el-row>
                            <el-col :span="20">
                                <el-form-item label="差价计算">
                                    <el-col :span="8">
                                        <el-input　size="small" placeholder="请输入内容">
                                        </el-input>
                                    </el-col>
                                    <el-col :span="2">&nbsp;</el-col>
                                    <el-col :span="4">
                                            <el-button size="small">计算</el-button>
                                    </el-col>
                                    
                                </el-form-item>
                            </el-col>
                            
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="备注">
                                    <el-input type="textarea" :rows="2" placeholder="请输入内容">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
        
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="快递号">
                                    <el-input placeholder="请输入内容">
                                    </el-input><el-button>
                                        <i class="el-icon-plus"></i>
                                    </el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-form>
    
                <div slot="dialog-foot" class="dialog-footer">
                    <el-row type="flex" justify="space-between">
                        <el-col :span="12" class="button_step">
                            <el-button v-if="active>0"  @click="prev" class="pull-left">上一步</el-button>
                            <el-button v-if="active==0 || active==1" @click="next" class="pull-left">下一步</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button @click="handleClose">取 消</el-button>
                            <submit-button :observer="dialogThis" @click="formSubmit('rowInfoForm')">
                                保 存
                            </submit-button>
                        </el-col>
                    </el-row>
                    
    
                    
                </div>
            </MyDialog>
        </div>
    </template>
    
    <script>
        import DialogForm from '../../mix/DialogForm';
        import OrderGoodsAjaxProxy from '@/ajaxProxy/Ordergoods';
    
        export default {
            name: 'ExchangeGoods',
            mixins: [DialogForm],
            props: {
    
            },
            ajaxProxy: {
                required: true,
                type: Object,
                default: null
            },
            data() {
                return {
                    addOther:false,
                    dialogThis: this,
                    labelPosition: "right",
                    labelWidth: '70px',
                    rowInfoForm: {
                        order_id: "",
                        goods: [],
                        refund:"",
                        express:[],
                    },
                    goods:[],
                    model: {},
                    multipleSelection:[],
                    active:0
    
                }
            },
    
            methods: {
                onOpen(param) {
                    this.model = param.params;
                    OrderGoodsAjaxProxy.get({order_id: this.model.id}).then((response)=>{
                        response.data.items.forEach(element => {
                            element.goods_num = parseInt(element.goods_number);
                        });
                        this.goods = response.data.items;
                    });
                    this.rowInfoForm.order_id = this.model.id;
                },
                onBeforeClose(){
                    this.multipleSelection = [];
                    this.active = 0;
                },
                getAjaxPromise(model) {
                    return this.ajaxProxy.update(model.id, model);
                },
    
                handleSelectionChange(v){
                    this.multipleSelection = [].concat(v);
                    this.multipleSelection.forEach(element => {
                        element.type = 1;
                        element.type_text = '换货退回';
                    });
                },
                next(){
                    this.active ++ ;
                },
                prev(){
                    if (this.active > 1) {
                        this.active --;
                    } else {
                        this.active = 0;
                    } 
                },
                del(index){
                    this.multipleSelection.splice(index,1);
                },
                numberChange(){
                    this.$nextTick(function(){
                        this.sumPrice();
                    });
                },
                sumPrice(){
                    if (this.multipleSelection.length > 0) {
                        let goods_price = this.multipleSelection.map(element=>{
                            return element.goods_num * parseFloat(element.price);
                        });
                        
                        this.rowInfoForm.refund = goods_price.reduce((ac, cu)=>{
                            return ac+cu;
                        }).toFixed(2);
                    } else {
                        this.rowInfoForm.refund = '0.00';
                    }  
                },
                changeNew(){
                    this.rowInfoForm.goods = [].concat(this.multipleSelection);
                },
                changeOther(){
                    this.addOther = true;
                }
            },
            watch: {
    
                model: function (val, oldVal) {
                    for (const key in this.rowInfoForm) {
                        if (this.rowInfoForm.hasOwnProperty(key)) {
                            // console.log(key);
                            this.rowInfoForm[key] = val[key]
                        }
                    }
                },
    
                multipleSelection:function(val, oldVal){
                    console.log(val);
                    this.sumPrice();
                }
            }
    
        }
    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
        .button_step {
            text-align: left;
        }
    </style>