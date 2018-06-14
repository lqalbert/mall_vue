<template>
    <div class="">
        <el-row>
            <el-col :span="24">
                <el-tabs v-model="activeName" type="border-card">
                    <!--  订单客户信息 -->
                    <el-tab-pane label="退货明细" name="First">
                        <el-table :data="usertableData"    border    empty-text="请双击订单显示信息">
                            <el-table-column prop="name" label="商品" align="center">
                            </el-table-column>

                            <el-table-column prop="sex_text" label="数量" align="center">
                            </el-table-column>

                            <el-table-column prop="contact.phone" label="类型" align="center">
                            </el-table-column>

                            <el-table-column prop="contact.qq" label="处理类型" align="center">
                            </el-table-column>

                            <el-table-column prop="contact.qq_nickname" label="出入库" width="180" align="center">
                            </el-table-column>

                            <el-table-column prop="contact.weixin" label="退货原因" align="center">
                            </el-table-column>

                            <el-table-column prop="contact.weixin_nickname" label="退货理由" align="center">
                            </el-table-column>

                        </el-table>
                    </el-tab-pane>
                    <!-- /订单客户信息 -->
                    <!--  订单商品信息 -->
                    <el-tab-pane label="重发列表" name="Second">
                        <el-table :data="goodstableData"    border   empty-text="暂无数据">

                            <el-table-column prop="goods_name" label="商品名称" align="center">
                            </el-table-column>
                            <el-table-column prop="price" label="商品价格" align="center">
                            </el-table-column>

                            <el-table-column prop="goods_number" label="商品数量" width="180" align="center">
                            </el-table-column>
                            <el-table-column prop="remark" label="备注" width="180" align="center">
                            </el-table-column>

                        </el-table>
                    </el-tab-pane>
                    <!--  / 订单商品信息 -->
                    <!--  订单收货地址 -->
                    <el-tab-pane label="原订单信息" name="Third">
                        <el-table :data="addresstableData"   highlight-current-row border  empty-text="请点击客户显示订单收货地址">
                            <el-table-column prop="address" label="销售订单" align="center"></el-table-column>
                            <el-table-column prop="name" label="订单状态" align="center"></el-table-column>
                            <el-table-column prop="phone" label="成交员工" align="center"></el-table-column>
                            <el-table-column prop="phone" label="成交单位" align="center"></el-table-column>
                            <el-table-column prop="phone" label="初成员工" align="center"></el-table-column>
                            <el-table-column prop="phone" label="初成单位" align="center"></el-table-column>
                            <el-table-column prop="phone" label="发货单位" align="center"></el-table-column>
                            <el-table-column prop="phone" label="录入日期" align="center"></el-table-column>
                            <el-table-column prop="phone" label="提交日期" align="center"></el-table-column>
                            <el-table-column prop="phone" label="确认日期" align="center"></el-table-column>
                            <el-table-column prop="phone" label="发货日期" align="center"></el-table-column>
                            <el-table-column prop="phone" label="签收日期" align="center"></el-table-column>
                            <el-table-column prop="phone" label="实付金额" align="center"></el-table-column>
                            <el-table-column prop="phone" label="实付邮费" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <!--  / 订单收货地址 -->
                    <!-- 订单操作记录  -->
                    <el-tab-pane label="退货发货信息" name="Fourth">
                        <el-table :data="manageData" empty-text="暂无数据" border style="width: 100%">
                            <!-- <el-table-column prop="order_id" label="订单id" align="center">
                            </el-table-column> -->
                            <el-table-column prop="order_action" label="收货单位" align="center"></el-table-column>
                            <el-table-column prop="manager" label="重新发货单位" align="center"></el-table-column>
                            <el-table-column prop="remark" label="快递公司" align="center"></el-table-column>
                            <el-table-column prop="time" label="退货快递单号" align="center"></el-table-column>

                        </el-table>
                    </el-tab-pane>
                    <!-- /订单操作记录 -->
                    <!-- 订单发货信息 -->
                    <el-tab-pane label="退货消费信息" name="Fifth">
                        <el-table :data="assignData" empty-text="暂无数据" border style="width: 100%">
                            <el-table-column prop="user_name" label="退款比例" align="center"></el-table-column>
                            <el-table-column prop="express_name" label="退货运费" align="center"></el-table-column>
                            <el-table-column prop="express_fee" label="应退总额" align="center"></el-table-column>
                            <el-table-column prop="deliver_name" label="退款状态" align="center"></el-table-column>
                            <el-table-column prop="out_entrepot_at" label="退款单位" align="center"></el-table-column>
                            <el-table-column prop="out_entrepot_at" label="重发运费" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="退货单客户信息" name="Sixth">
                        <el-table :data="assignData" empty-text="暂无数据" border style="width: 100%">
                            <el-table-column prop="user_name" label="姓名" align="center"></el-table-column>
                            <el-table-column prop="express_name" label="性别" align="center"></el-table-column>
                            <el-table-column prop="express_fee" label="类型" align="center"></el-table-column>
                            <el-table-column prop="deliver_name" label="来源" align="center"></el-table-column>
                            <el-table-column prop="out_entrepot_at" label="验证" align="center"></el-table-column>
                            <el-table-column prop="out_entrepot_at" label="手机" align="center"></el-table-column>
                            <el-table-column prop="out_entrepot_at" label="qq号" align="center"></el-table-column>
                            <el-table-column prop="out_entrepot_at" label="qq昵称" align="center"></el-table-column>
                            <el-table-column prop="out_entrepot_at" label="跟踪员工" align="center"></el-table-column>
                            <el-table-column prop="out_entrepot_at" label="跟踪单位" align="center"></el-table-column>
                            <el-table-column prop="out_entrepot_at" label="锁定日期" align="center"></el-table-column>
                            <el-table-column prop="out_entrepot_at" label="最后跟踪" align="center"></el-table-column>
                            <el-table-column prop="out_entrepot_at" label="计划跟踪" align="center"></el-table-column>
                            <el-table-column prop="out_entrepot_at" label="生日" align="center"></el-table-column>
                            <el-table-column prop="out_entrepot_at" label="日历" align="center"></el-table-column>
                            <el-table-column prop="out_entrepot_at" label="省份" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="退货操作记录" name="Seventh">
                        <el-table :data="assignData" empty-text="暂无数据" border style="width: 100%">
                            <el-table-column prop="user_name" label="操作人" align="center"></el-table-column>
                            <el-table-column prop="express_name" label="操作时间" align="center"></el-table-column>
                            <el-table-column prop="express_fee" label="操作类型" align="center"></el-table-column>
                            <el-table-column prop="deliver_name" label="操作备注" align="center"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="退货快递信息" name="Eighth">
                        <el-table :data="assignData" empty-text="暂无数据" border style="width: 100%">
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
                    </el-tab-pane>
                    <!-- /订单发货信息 -->
                </el-tabs>
            </el-col>
        </el-row>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SubDetail',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  