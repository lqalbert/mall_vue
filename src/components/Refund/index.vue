<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" ref="searchForm" :model="searchForm">
                <el-form-item prop="value7" >
                    <el-date-picker
                            v-model="searchForm.value7"
                            type="daterange"
                            size="small"
                            placeholder="选择日期"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2"
                            @change="startDateChange">
                    </el-date-picker>
                </el-form-item>

                <el-form-item prop="goods_name">
                    <el-input size="small" v-model="searchForm.goods_name" placeholder="请输入商品名称"></el-input>
                </el-form-item>

                <el-form-item prop="sale_name">
                    <el-input size="small" v-model="searchForm.sale_name" placeholder="请输入员工名称"></el-input>
                </el-form-item>

                <el-form-item prop="consignee">
                    <el-input size="small" v-model="searchForm.consignee" placeholder="请输入客户名称"></el-input>
                </el-form-item>



                <!--<el-form-item prop="id">-->
                <!--<el-input size="small" v-model="searchForm.id" placeholder="请输入订单编号"></el-input>-->
                <!--</el-form-item>-->
                
                <el-form-item >
                    <el-button type="info" size="small" icon="search"  @click="searchToolChange('searchForm')">查询</el-button>
                    <el-tooltip content="清空搜索条件" placement="bottom-start" style="margin-left:10px;">
                        <el-button  size="small" @click="searchToolReset('searchForm')" type="warning">重置</el-button>
                    </el-tooltip>
                    <!-- <el-tooltip content="点击刷新当前页面" placement="right" style="margin-left:10px;">
                        <el-button  size="small" @click="refresh" type="danger" >刷新</el-button>
                    </el-tooltip> -->
                </el-form-item>

            </el-form>
        </el-row>

        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload"   :page-size="15">
                    <el-table-column type="selection" align="center" width="50"></el-table-column>
                    <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>
                    <el-table-column prop="id" label="退货编码" width="100" align="center"></el-table-column>
                    <el-table-column prop="order.order_all_money" label="销售单号" align="center" width="100"></el-table-column>
                    <el-table-column prop="order.order_pay_money" label="状态" align="center" width="100"></el-table-column>
                    <el-table-column prop="order.cus_name" label="退款单位" align="center" width="80"></el-table-column>
                    <el-table-column prop="user_name" label="补换单位" align="center" width="80"></el-table-column>
                    <el-table-column prop="type_text" label="特殊处理"　width="100"></el-table-column>
                    <el-table-column prop="check_status_text" label="退款状态"></el-table-column>
                    <el-table-column prop="type_text" label="退货单录入日期" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="type_text" label="原成交员工" align="center"></el-table-column>

                    <el-table-column prop="type_text" label="原成交单位" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="订单录入日期" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="原初成员工" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="原初成单位" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="原发货单位" align="center"></el-table-column>

                    <el-table-column prop="type_text" label="客户ID" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="退款比例" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="应退金额" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="退货运费" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="退货服务费" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="收货单位额" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="经手人" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="退货快递公司" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="退货快递单号" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="退货收货单位" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="重发单位" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="原发货快递" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="提交日期" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="重发运费" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="重发服务费" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="确认日期" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="审核日期" align="center"></el-table-column>

                    <el-table-column v-if="showOperator" label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="warning" size="small" @click="handleCheck(scope.row)">审核</el-button>
                            <!-- <el-button type="warning" size="small" @click="exchangeC(scope.row)">审核</el-button> -->
                            <!--<el-button type="danger" @click="handleDelete(scope.row.id)" size="small">删除</el-button>-->
                        </template>
                    </el-table-column>
                    <div slot="buttonbar">
                        <el-button type="primary" size="small" @click="showAdvancedQuery">高级查询</el-button>
                        <el-button type="primary" size="small" @click="showAdvancedQuery">退货修改</el-button>
                        <el-button type="primary" size="small" @click="showAdvancedQuery">退货提交</el-button>
                        <el-button type="primary" size="small" @click="showAdvancedQuery">退货确认</el-button>
                        <el-button type="primary" size="small" @click="showAdvancedQuery">退货审核</el-button>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>
        <br>
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

        <checkDialog name="check" :ajax-proxy="orderBasicAjaxProxy"/>

        <AdvancedQuery name="show-advanced-query" :ajax-proxy="orderBasicAjaxProxy"/>

        <exchangeCheckDialog name="exchangeCheck" :ajax-proxy="orderBasicAjaxProxy"/>
    </div>

</template>

<script>
    import addDialog from "./Add.vue";
    import AdvancedQuery from "./AdvancedQuery.vue";
    import DataTable from '../../mix/DataTable';
    import PageMix from '../../mix/Page';
    import config from '../../mix/Delete';
    import DataProxy from '../../packages/DataProxy';
    import SelectProxy from  '../../packages/SelectProxy';
    import OrderlistAjaxProxy from '../../ajaxProxy/OrderBasic';
    import AfterSaleAjaxProxy from '@/ajaxProxy/AfterSale';
    import UsersSelectProxy from '../../packages/UsersSelectProxy';
    import BuyerAjaxProxy from '../../ajaxProxy/Buyer';
    import OrdergoodsAjaxProxy from '../../ajaxProxy/Ordergoods';
    import DeliveryAddressAjaxProxy from '../../ajaxProxy/DeliveryAddress';
    import Tree from '../../ajaxProxy/Tree';
    import Users from '../../ajaxProxy/Users';
    import TableProxy from '../common/TableProxy';
    import OrderBasic from '../../ajaxProxy/OrderBasic';
    import SearchTool from "../../mix/SearchTool";

    import checkDialog from "./check";
    import exchangeCheckDialog from "./exchangeCheck";
    export default {
        name: 'Refund',
        pageTitle:"新退货单",
        mixins: [PageMix,SearchTool,DataTable,config,OrderlistAjaxProxy],
        components:{
            checkDialog,
            exchangeCheckDialog,
            AdvancedQuery
        },
        data () {
            return {
                ajaxProxy:AfterSaleAjaxProxy,
                orderBasicAjaxProxy:AfterSaleAjaxProxy,
                mainurl:AfterSaleAjaxProxy,
                mainparam:"",
                strategies:{},
                searchForm:{
                    start:'',
                    goods_name:'',
                    consignee:'',
                    id:'',
                    sale_name:'',
                    end:'',
                    condition:'',
                    department:'1',
                    type:'',
                    deliver:'',

                    load:['order'],
                    appends:['type_text','check_status_text']

                },
                tabindex:'0',
                currentPage4:1,
                tableData: '',
                usertableData:'',
                addresstableData: '',
                goodstableData:'',
                CategoryList:'',
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value6: '',
                value7: ''
            }
        },
        computed:{
            showOperator(){
                return this.strategies.operator != 0;
            },
        },
        methods:{
            handleCheck(row){
                this.$modal.show('check',{row:row});
            },

            showAdvancedQuery(v){
                this.$modal.show('show-advanced-query');
            },
            startDateChange(v){

            },
            refund(id)
            {
                let refundProxy = new SelectProxy(OrderlistAjaxProxy.getUrl(), this.loadtest, this);
                refundProxy.setExtraParam({refund_id:id}).load();

            },
            getAjaxProxy(){
                return  this.ajaxProxy;
            },


            onSearchChange(param){
                this.mainparam = JSON.stringify(param);
            },
            searchReset:function(){
                this.$refs['searchForm'].resetFields();
                this.typeName = '请选择排名方式';
                this.toggleTableLoad();
            },
            
            

        },
        created(){

            this.mainparam = JSON.stringify(this.searchForm);

            this.$on('search-tool-change', this.onSearchChange);
             

            this.strategies = this.$store.getters.getStrategy( this.$options.name );
            console.log(this.strategies);


        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
