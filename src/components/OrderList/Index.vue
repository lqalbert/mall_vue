<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" ref="searchForm" :model="searchForm">
                <el-form-item prop="value7" >
                    <el-date-picker
                            size="small"
                            v-model="value7"
                            type="daterange"
                            align="right"
                            placeholder="选择日期"
                            unlink-panels
                            range-separator="/"
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

                <el-form-item prop="id">
                    <el-input size="small" v-model="searchForm.id" placeholder="请输入订单编号"></el-input>
                </el-form-item>
                

                <el-form-item label-width="5px">
                    <el-button type="info" size="small" icon="search"  @click="searchToolChange('searchForm')">查询</el-button>
                    <el-tooltip content="清空搜索条件" placement="bottom-start" style="margin-left:10px;">
                        <el-button  size="small" @click="show_all" type="warning">重置</el-button>
                    </el-tooltip>
                </el-form-item>

                <br>
                <el-form-item prop="type">
                    <el-button size="small" @click="show_all"         type="info" >全部</el-button>
                    <el-button size="small" @click="typesearch('0')"  type="info" >待付款</el-button>
                    <el-button size="small" @click="typesearch('1')"  type="info" >待确认</el-button>
                    <el-button size="small" @click="delivesearch('0')" type="info" >待发货</el-button>
                    <el-button size="small" @click="delivesearch('1')"   type="info" >已发货</el-button>
                    <el-button size="small" @click="delivesearch('2')"    type="info" >已收货</el-button>
                    <el-button size="small" @click="typesearch('2')"        type="info" >已完成</el-button>
                    <el-button size="small" @click="typesearch('3')"      type="info" >已关闭</el-button>
                    <el-button size="small" @click="typesearch('4')"      type="info" >退款中</el-button>
                </el-form-item>

            </el-form>
        </el-row>

        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" @dbclick="showRow" >
                    <el-table-column type="selection" align="center" width="50"></el-table-column>
                    <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>
                    <!--<el-table-column prop="id" label="订单号" width="200" align="center">-->
                    <!--</el-table-column>-->
                    <el-table-column prop="order_all_money" label="总金额" align="center" width="80">
                    </el-table-column>
                    <el-table-column prop="order_pay_money" label="应付金额" align="center" width="80">
                    </el-table-column>
                    <el-table-column prop="cus_name" label="购买顾客" align="center" width="80">
                    </el-table-column>
                    <el-table-column prop="user_name" label="成交员工" align="center" width="80">
                    </el-table-column>

                    <el-table-column prop="order_status" label="订单状态" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.order_status==0">待付款</span>
                            <span v-else-if="scope.row.order_status==1" >待确认</span>
                            <span v-else-if="scope.row.order_status==2">已完成</span>
                            <span v-else-if="scope.row.order_status==3">已关闭</span>
                            <span v-else-if="scope.row.order_status==4">退货中</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="shipping_status" label="发货状态" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.shipping_status==0">待发货</span>
                            <span v-else-if="scope.row.shipping_status==1" >已发货</span>
                            <span v-else-if="scope.row.shipping_status==2">已收货</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="check_status" label="审核状态" align="center" width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.check_status==0">未审核</span>
                            <span v-else-if="scope.row.check_status==1" >通过</span>
                            <span v-else-if="scope.row.check_status==2">未通过</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="refund_check" label="退款审核" align="center" width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.refund_check==0">未审核</span>
                            <span v-else-if="scope.row.refund_check==1" >通过</span>
                            <span v-else-if="scope.row.refund_check==2">未通过</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="refund_status" label="退款状态" align="center" width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.refund_status==0">正常</span>
                            <span v-else-if="scope.row.refund_status==1" >退款中</span>
                            <span v-else-if="scope.row.refund_status==2">已退款</span>
                            <span v-else-if="scope.row.refund_status==3">已驳回</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="created_at" label="下单时间" align="center">
                    </el-table-column>
                    <el-table-column  fixed="right" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="open2(scope.row.id)">发起退款</el-button>
                            <el-button type="info" size="small" @click="showRowData(scope.row)">编辑</el-button>
                            <el-button type="danger" @click="handleDelete(scope.row.id)" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                    <div slot="buttonbar">
                        <el-tooltip content="点击添加订单" placement="right">
                            <el-button size="small" icon="plus" type="info" @click="showAdd" >添加</el-button>
                        </el-tooltip>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>

        <div class="pull-right" style="float:right;margin-top: 5px" >
            <!--<el-col :span="12">-->
            <!--<el-pagination-->
            <!--:current-page="currentPage4"-->
            <!--:page-size="100"-->
            <!--layout="total, prev, pager, next, jumper"-->
            <!--:total="total"-->
            <!--@current-change="currentChange">-->
            <!--</el-pagination>-->
            <!--</el-col>-->

        </div>

        <rowInfo name="rowInfo"
                 :ajax-proxy="ajaxProxy"
                 :users="users"
                 :buyer="buyer"
                 @submit-success="handleReload"
        />
        <div id="app2" class="b" style="margin-top:5px;">
            <el-row>
                <el-col :span="24">
                    <el-tabs type="border-card" @tab-click="handleClick">
                        <el-tab-pane label="订单客户信息">
                            <el-table  :data="usertableData"  v-loading.body="dataLoad" highlight-current-row border ref="select" style="width: 100%"
                                       empty-text="请点击客户显示跟踪信息">
                                <el-table-column prop="name" label="客户姓名" align="center">
                                </el-table-column>

                                <el-table-column prop="sex" label="客户性别" align="center">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.sex==0">未定义</span>
                                        <span v-else-if="scope.row.sex==1" >男</span>
                                        <span v-else-if="scope.row.sex==2">女</span>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="phone" label="客户电话" align="center">
                                </el-table-column>

                                <el-table-column prop="qq" label="客户qq" align="center">
                                </el-table-column>

                                <el-table-column prop="qq_nickname" label="qq昵称" width="180" align="center">
                                </el-table-column>

                                <el-table-column prop="weixin" label="客户微信" align="center">
                                </el-table-column>

                                <el-table-column prop="weixin_nickname" label="微信昵称" align="center">
                                </el-table-column>

                            </el-table>
                        </el-tab-pane>

                        <!-- <el-tab-pane label="软件账号">软件账号</el-tab-pane>
                        <el-tab-pane label="通话记录">通话记录</el-tab-pane> -->
                        <el-tab-pane label="订单商品信息">
                            <el-table :data="goodstableData"  v-loading.body="dataLoad" highlight-current-row border ref="select" empty-text="请点击客户显示跟踪信息" border style="width: 100%">

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

                        <el-tab-pane label="订单收货地址">
                            <el-table :data="addresstableData"  v-loading.body="dataLoad" highlight-current-row border ref="select" empty-text="请点击客户显示订单收货地址" border style="width: 100%">
                                <el-table-column prop="address" label="收货地址" align="center">
                                </el-table-column>
                                <el-table-column prop="default_address" label="是否为默认地址" align="center">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.default_address==0">否</span>
                                        <span v-else-if="scope.row.default_address==1" >是</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" label="收货人姓名" align="center">
                                </el-table-column>
                                <el-table-column prop="phone" label="收货人电话" align="center">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>

                        <el-tab-pane label="订单操作记录">
                            <el-table empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                                <el-table-column prop="user" label="操作员工" align="center">
                                </el-table-column>

                                <el-table-column label="投诉内容" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.content | handleString}}
                                    </template>
                                </el-table-column>

                                <el-table-column prop="created_at" label="投诉时间" width="180" align="center">
                                </el-table-column>

                                <el-table-column prop="type_text" label="投诉类型" align="center">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>

                        <el-tab-pane label="订单收件人">
                            <el-table empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                                <el-table-column prop="user" label="操作员工" align="center">
                                </el-table-column>

                                <el-table-column label="投诉内容" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.content | handleString}}
                                    </template>
                                </el-table-column>

                                <el-table-column prop="created_at" label="投诉时间" width="180" align="center">
                                </el-table-column>

                                <el-table-column prop="type_text" label="投诉类型" align="center">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>

                        <el-tab-pane label="订单发货信息">
                            <el-table empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                                <el-table-column prop="user" label="操作员工" align="center">
                                </el-table-column>

                                <el-table-column label="投诉内容" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.content | handleString}}
                                    </template>
                                </el-table-column>

                                <el-table-column prop="created_at" label="投诉时间" width="180" align="center">
                                </el-table-column>

                                <el-table-column prop="type_text" label="投诉类型" align="center">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>

                        <el-tab-pane label="订单快递信息">
                            <el-table empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                                <el-table-column prop="user" label="操作员工" align="center">
                                </el-table-column>

                                <el-table-column label="投诉内容" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.content | handleString}}
                                    </template>
                                </el-table-column>

                                <el-table-column prop="created_at" label="投诉时间" width="180" align="center">
                                </el-table-column>

                                <el-table-column prop="type_text" label="投诉类型" align="center">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>

                        <el-tab-pane label="订单成交员工">
                            <el-table empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                                <el-table-column prop="user" label="操作员工" align="center">
                                </el-table-column>

                                <el-table-column label="投诉内容" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.content | handleString}}
                                    </template>
                                </el-table-column>

                                <el-table-column prop="created_at" label="投诉时间" width="180" align="center">
                                </el-table-column>

                                <el-table-column prop="type_text" label="投诉类型" align="center">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>

                        <el-tab-pane label="成交比例">
                            <el-table empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                                <el-table-column prop="user" label="操作员工" align="center">
                                </el-table-column>

                                <el-table-column label="投诉内容" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.content | handleString}}
                                    </template>
                                </el-table-column>

                                <el-table-column prop="created_at" label="投诉时间" width="180" align="center">
                                </el-table-column>

                                <el-table-column prop="type_text" label="投诉类型" align="center">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>

                    </el-tabs>
                </el-col>
            </el-row>
        </div>
        <add-dialog
                name='add-orderBasic'
                width="70%"
                :customers="buyer"
                :ajax-proxy="orderBasicAjaxProxy"
                :CategoryList="CategoryList"
                @submit-success="handleReload">
        </add-dialog>
    </div>
</template>

<script>
    import rowInfo from "./rowInfo";
    import addDialog from "./Add.vue";
    import DataTable from '../../mix/DataTable';
    import PageMix from '../../mix/Page';
    import config from '../../mix/Delete';
    import DataProxy from '../../packages/DataProxy';
    import SelectProxy from  '../../packages/SelectProxy';
    import OrderlistAjaxProxy from '../../ajaxProxy/OrderBasic';
    import UsersSelectProxy from '../../packages/UsersSelectProxy';
    import BuyerAjaxProxy from '../../ajaxProxy/Buyer';
    import OrdergoodsAjaxProxy from '../../ajaxProxy/Ordergoods';
    import DeliveryAddressAjaxProxy from '../../ajaxProxy/DeliveryAddress';
    import Tree from '../../ajaxProxy/Tree';
    import Users from '../../ajaxProxy/Users';
    import TableProxy from '../common/TableProxy';
    import OrderBasic from '../../ajaxProxy/OrderBasic';
    import SearchTool from "../../mix/SearchTool";
    export default {
        name: 'OrderList',
        pageTitle:"订单详情",
        mixins: [PageMix,SearchTool,DataTable,config,OrderlistAjaxProxy],
        components:{
            rowInfo,addDialog,
        },
        data () {
            return {
                ajaxProxy:OrderlistAjaxProxy,
                orderBasicAjaxProxy:OrderBasic,
                mainurl:OrderlistAjaxProxy.getUrl(),
                mainparam:"",
                dataLoad:false,
                addDialog: false,
                users:[],
                buyer:[],
                typeName:'请选择排名方式',
                conditions:["录入个数", "成交金额", "成交个数"],
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

                },
                tabindex:'0',
                currentPage4:1,
                tableData: '',
                usertableData:[],
                addresstableData: [],
                goodstableData:[],
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
        watch:{
            addDialog(val, oldVal){
                console.log('index addDialog', val);
            }
        },
        methods:{
            getAjaxProxy(){
                return  this.ajaxProxy;
            },
            showRowData(row){
                this.$modal.show('rowInfo',{rowData:row});
            },
            open2(id) {
                this.$confirm('确认发起退款（需要审核）?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.refund(id),
                        this.refresh(),
                        this.$message({
                            type: 'success',
                            message: '发起退款成功!'
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            /** 点击订单列表展示用户信息 */
            showRow(row){
                console.log(row);
                /** 选项卡1显示客户信息 */
                let selectProxy = new SelectProxy(BuyerAjaxProxy.getUrl(), this.loadbuyer, this);
                selectProxy.setExtraParam({id:row.cus_id}).load();
                /** 选项卡2获取订单商品信息 */
                let goodsProxy = new SelectProxy(OrdergoodsAjaxProxy.getUrl(), this.loadgoods, this);
                goodsProxy.setExtraParam({goods_id:row.goods_id,order_id:row.id}).load();
                /** 选项卡3获取用户地址信息 */
                let addressProxy = new SelectProxy(DeliveryAddressAjaxProxy.getUrl(), this.loaddelivery, this);
                addressProxy.setExtraParam({cus_id:row.cus_id}).load();
                /** 选项卡2显示订单商品信息 */


            },
            getCategoryList(data){
                this.CategoryList=data.items;
            },
            dataReload:function(){
//          console.log(this.searchForm);
            },
            All:function(){
                this.orderlistInit();
            },
            typesearch:function($criteria){
                this.searchToolReset('searchForm');
                this.searchForm.type=$criteria;
                this.searchToolChange('searchForm');
            },
            refund(id)
            {
                let refundProxy = new SelectProxy(OrderlistAjaxProxy.getUrl(), this.loadtest, this);
                refundProxy.setExtraParam({refund_id:id}).load();

            },
            loadUsers(data) {
                console.log(data.items);
                this.users = data.items;
            },
            loadtest(data){
                this.mainData = data.items;
                // console.log(data.items);
            },
            loaddelivery(data){
                this.addresstableData = data.items;
            },
            loadbuyer(data) {
                this.usertableData = data.items;
            },
            loadcustomer(data){
                this.buyer = data.items;
            },
            loadgoods(data) {
                this.goods = data.items;
                this.goodstableData = this.goods;
            },
            /** 切换选项卡时查找对应信息 */
            handleClick(tab, event) {
                this.tabindex = tab.index;
            },
            show_all:function(){
                this.searchForm.type = '';
                this.searchForm.deliver = '';
                this.searchForm.goods_name = '';
                this.searchForm.consignee = '';
                this.searchForm.id = '';
                this.searchForm.sale_name = '';
                this.searchForm.end = '';
                this.searchForm.condition = '';
                this.searchForm.type = '';
                this.searchForm.deliver = '';
                this.searchToolChange('searchForm');
            },
            refresh(){
                this.$emit('refresh-success');
            },
            delivesearch:function($criteria){
                this.searchToolReset('searchForm');
                this.searchForm.deliver=$criteria;
                this.searchToolChange('searchForm');
            },
            typeChange:function(v){
                this.typeName=this.conditions[v];
            },
            showAdd:function(){
                this.$modal.show('add-orderBasic');
            },
            startDateChange:function(v){
                var date = v.split('/');
                this.searchForm.start = date[0];
                this.searchForm.end = date[1];this.searchForm.start = date[0]+" 00:00:00";
                this.searchForm.end = date[1]+" 23:59:59";
            },
            mainTableLoad(data){
                this.toggleTableLoad();
                this.tableData = data.items;
                this.total = data.total;
            },
            currentChange(v){
                this.toggleTableLoad();
                this.mainProxy.setPage(v).load();
            },
            toggleTableLoad(){
                this.dataLoad = !this.dataLoad;
            },
            onSearchChange(param){
//            console.log(param);
                this.mainparam = JSON.stringify(param);
            },
//        searchReset:function(){
//            this.$refs['searchForm'].resetFields();
//            this.typeName = '请选择排名方式';
//            this.toggleTableLoad();
//        },
            getCategory(){
                let selectProxy = new SelectProxy(Tree.getUrl(), this.getCategoryList, this);
                selectProxy.load();
            },
            click(){},

        },
        created(){
            let selectProxy = new SelectProxy(BuyerAjaxProxy.getUrl(), this.loadcustomer, this);
            selectProxy.load();
            this.$on('search-tool-change', this.onSearchChange);
            this.$on('refresh-success', this.handleReload);
            let orderProxy = new UsersSelectProxy(null, this.loadUsers, this);
            this.orderProxy = orderProxy;
            this.orderProxy.load();
            this.getCategory();


        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* .el-form-item {
        margin-bottom: 2px;
    } */
</style>
