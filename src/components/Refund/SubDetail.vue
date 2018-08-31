<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-tabs v-model="activeName" type="border-card">
                    <el-tab-pane label="退货明细" name="First">
                        <el-table :data="refundGoodsData" border empty-text="请双击订单显示信息" v-loading="loading">
                            <el-table-column prop="goods_name" label="商品" align="center">
                            </el-table-column>

                            <el-table-column prop="sku_sn" label="商品编号" align="center">
                            </el-table-column>

                            <el-table-column prop="goods_number" label="数量" align="center">
                            </el-table-column>

                            <el-table-column prop="return_inventory" label="入库数量" align="center">
                            </el-table-column>

                            <el-table-column prop="destroy_num" label="损坏数量" align="center">
                            </el-table-column>

                            <el-table-column prop="status_text" label="状态" width="180" align="center">
                            </el-table-column>

                            <!-- <el-table-column prop="reason" label="退货原因" align="center">
                            </el-table-column> -->

                            <el-table-column prop="created_at" label="订单日期" align="center">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="重发列表" name="Second">
                        <el-table :data="reSendListData" border empty-text="暂无数据">

                            <el-table-column prop="goods_name" label="商品名称" align="center">
                            </el-table-column>
                            <el-table-column prop="price" label="商品价格" align="center">
                            </el-table-column>

                            <el-table-column prop="goods_number" label="商品数量" width="180" align="center">
                            </el-table-column>
                            <el-table-column prop="remark" label="备注" width="180" align="center">
                            </el-table-column>

                        </el-table>
                    </el-tab-pane> -->

                    <el-tab-pane label="原订单信息" name="Third">
                        <el-table :data="oldOrderData" border empty-text="请双击订单显示信息" v-loading="loading">
                            <el-table-column prop="deal_name" label="成交员工" align="center"></el-table-column>
                            <el-table-column prop="department_name" label="成交单位" align="center"></el-table-column>
                            <!-- <el-table-column prop="auditor_name" label="审核员工" align="center"></el-table-column> -->
                            <el-table-column prop="order_status" label="订单状态" align="center">
                                <template slot-scope="scope">
                                    {{setFieldText(scope.row.order_status,'orderStatusText')}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="order_all_money" label="总金额" align="center"></el-table-column>
                            <el-table-column prop="order_pay_money" label="应付金额" align="center"></el-table-column>
                            <el-table-column prop="shipping_status" label="发货状态" align="center">
                                <template slot-scope="scope">
                                    {{setFieldText(scope.row.shipping_status,'shippingStatusText')}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="check_status" label="审核状态" align="center">
                                <template slot-scope="scope">
                                    {{setFieldText(scope.row.check_status,'checkStatusText')}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="refund_check" label="退款审核" align="center">
                                <template slot-scope="scope">
                                    {{setFieldText(scope.row.refund_check,'refundCheckText')}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="refund_status" label="退款状态" align="center">
                                <template slot-scope="scope">
                                    {{setFieldText(scope.row.refund_status,'refundStatusText')}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="created_at" label="订单日期" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>

                    <el-tab-pane label="退货发货信息" name="Fourth">
                        <el-table :data="refundSendData" empty-text="暂无数据" border style="width: 100%" v-loading="loading">
                            <!-- <el-table-column prop="order_id" label="订单id" align="center">
                            </el-table-column> -->
                            <el-table-column prop="receive_unit" label="收货单位" align="center"></el-table-column>
                            <el-table-column prop="resend_unit" label="重新发货单位" align="center"></el-table-column>
                            <el-table-column prop="express" label="快递公司" align="center"></el-table-column>
                            <el-table-column prop="express_sn" label="退货快递单号" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>

                    <el-tab-pane label="退货消费信息" name="Fifth">
                        <el-table :data="refundPayData" empty-text="暂无数据" border style="width: 100%" v-loading="loading">
                            <el-table-column prop="refund_percent" label="退款比例" align="center"></el-table-column>
                            <el-table-column prop="return_fee" label="退货运费" align="center"></el-table-column>
                            <el-table-column prop="fee" label="应退总额" align="center"></el-table-column>
                            <el-table-column prop="refund_status" label="退款状态" align="center"></el-table-column>
                            <el-table-column prop="return_unit" label="退款单位" align="center"></el-table-column>
                            <el-table-column prop="resend_fee" label="重发运费" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>

                    <el-tab-pane label="退货单客户信息" name="Sixth">
                        <el-table :data="refundOrderCusData" empty-text="暂无数据" border style="width: 100%" v-loading="loading">
                            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                            <el-table-column prop="sex" label="性别" align="center">
                                <template slot-scope="scope">
                                    {{setFieldText(scope.row.sex,'sexText')}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="type_text" label="类型" align="center"></el-table-column>
                            <el-table-column prop="source_text" label="来源" align="center"></el-table-column>
                            <el-table-column prop="phone" label="手机" align="center">
                                <template slot-scope="scope">
                                    {{scope.row.contacts[0].phone}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="qq" label="qq号" align="center">
                                <template slot-scope="scope">
                                    {{scope.row.contacts[0].qq}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="qq_nickname" label="qq昵称" align="center">
                                <template slot-scope="scope">
                                    {{scope.row.contacts[0].qq_nickname}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="mid_relative.user_name" label="跟踪员工" align="center"></el-table-column>
                            <el-table-column prop="mid_relative.department_name" label="跟踪单位" align="center"></el-table-column>
                            <el-table-column prop="created_at" label="锁定日期" align="center"></el-table-column>
                            <el-table-column prop="mid_relative.last_track" label="最后跟踪" align="center"></el-table-column>
                            <el-table-column prop="mid_relative.plan" label="计划跟踪" align="center"></el-table-column>
                            <el-table-column prop="province.name" label="省份" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>

                    <!-- <el-tab-pane label="退货操作记录" name="Seventh">
                        <el-table :data="refundOperationData" empty-text="暂无数据" border style="width: 100%">
                            <el-table-column prop="user_name" label="操作人" align="center"></el-table-column>
                            <el-table-column prop="express_name" label="操作时间" align="center"></el-table-column>
                            <el-table-column prop="express_fee" label="操作类型" align="center"></el-table-column>
                            <el-table-column prop="deliver_name" label="操作备注" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane> -->

                    <!-- <el-tab-pane label="退货快递信息" name="Eighth">
                        <el-table :data="refundExpressData" empty-text="暂无数据" border style="width: 100%">
                            <el-table-column prop="user_name" label="发货人员" align="center">
                            </el-table-column>
                            <el-table-column prop="express_name" label="快递公司" align="center">
                            </el-table-column>
                            <el-table-column prop="express_fee" label="快递费用" align="center">
                            </el-table-column>
                            <el-table-column prop="deliver_name" label="收件人员" align="center">
                            </el-table-column>
                            <el-table-column prop="out_entrepot_at" label="发货时间" align="center">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane> -->
                </el-tabs>
            </el-col>
        </el-row>
    </div>
  </template>
  
  <script>
    import OrderGoodsAjaxProxy from '../../ajaxProxy/Ordergoods';
    import AfterSaleAjaxProxy from '../../ajaxProxy/AfterSale';
    
    export default {
        name: 'SubDetail',
        props:{
            row :{
                type: Object,
                default:null
            }
        },
        data () {
            return {
                activeName:'First',
                refundGoodsData:[],
                reSendListData:[],
                oldOrderData:[],
                refundSendData:[],
                refundPayData:[],
                refundOrderCusData:[],
                refundOperationData:[],
                refundExpressData:[],

                tabFirst:false,
                tabSecond:false,
                tabThird:false,
                tabFourth:false,
                tabFifth:false,
                tabSixth:false,
                tabSeventh:false,
                tabEighth:false,

                inventoryText:['入库','出库'],
                orderStatusText:['待付款','待确认','已完成','已关闭','退货中','换货中'],
                shippingStatusText:['待发货','已发货','已收货'],
                checkStatusText:['未审核','通过','未通过'],
                refundCheckText:['未审核','通过','未通过'],
                refundStatusText:['未申请','退款中','退款完成','失败'],
                sexText:['未定义','男','女'],

                loading:false
            }
        },
        methods:{
            setFieldText(field,TextArr){
                if(field == null){
                    return field;
                }else{
                    return this[TextArr][field];
                }
            },
            handleFirst(row){
                // console.log('1');//refundGoodsData
                // console.log(row);
                this.loading = true;
                OrderGoodsAjaxProxy.get({order_id: row.order_id, appends:['status_text'], after:1}).then((response)=>{
                    
                    response.data.items.forEach(element => {
                        element.return_num = parseInt(element.goods_number);
                    });
                    this.refundGoodsData = response.data.items;
                    this.loading = false;
                });
                this.tabFirst = true;
            },
            handleSecond(row){
                // console.log('2');//reSendListData
            },
            handleThird(row){
                // console.log('3');//oldOrderData
                this.loading = true;
                this.oldOrderData = [];
                this.oldOrderData.push(row.order);
                this.tabThird = true;
                this.loading = false;
            },
            handleFourth(row){
                // console.log("4");//refundSendData
                this.loading = true;
                this.refundSendData = [];
                this.refundSendData.push({
                    id:row.id,
                    receive_unit:row.receive_unit,
                    resend_unit:row.resend_unit,
                    express:row.express,
                    express_sn:row.express_sn
                });
                this.tabFourth = true;
                this.loading = false;
            },
            handleFifth(row){
                // console.log('5');//refundPayData
                // console.log(row);
                this.loading = true;
                this.refundPayData = [];
                this.refundPayData.push({
                    id:row.id,
                    refund_percent:row.refund_percent,
                    return_fee:row.return_fee,
                    fee:row.fee,
                    refund_status:row.refund_status,
                    return_unit:row.return_unit,
                    resend_fee:row.resend_fee,
                });
                this.tabFifth = true;
                this.loading = false;
            },
            handleSixth(row){
                //console.log('6');//refundOrderCusData
                //console.log(row);
                this.loading = true;
                AfterSaleAjaxProxy.getCusInfo(row.cus_id).then((response)=>{
                    this.refundOrderCusData = response.data.items;
                    this.loading = false;
                });
                // this.tabSixth = true;
            },
            handleSeventh(row){
                // console.log('7');//refundOperationData
            },
            handleEighth(row){
                // console.log('8');//refundExpressData
            },
        },
        watch:{
            row:function(val, oldVal) {
                this['handle'+ this.activeName].call(this, this.row);
                this.tabFirst = false;
                this.tabSecond = false;
                this.tabThird = false;
                this.tabFourth = false;
                this.tabFifth = false;
                this.tabSixth = false;
                this.tabSeventh = false;
                this.tabEighth = false;
            },
            activeName:function(val, olvVal){
                // console.log(this.activeName);
                if (!this['tab'+ val] && this.row !== null) {
                    this['handle'+ val].call(this, this.row);
                }
            }
        },
        created(){
            
        },
    }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  