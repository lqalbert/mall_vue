<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" ref="searchForm" :model="searchForm">
                <el-form-item prop="value7" >
                    <el-date-picker
                            size="small"
                            v-model="searchForm.value7"
                            type="daterange"
                            placeholder="选择日期"
                            unlink-panels
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2"
                            @change="startDateChange">
                    </el-date-picker>
                </el-form-item>

                <!-- <el-form-item prop="goods_name">
                    <el-input size="small" v-model="searchForm.goods_name" placeholder="请输入商品名称"></el-input>
                </el-form-item> -->

                <!-- <el-form-item prop="deal_name">
                    <el-input size="small" v-model="searchForm.deal_name" placeholder="请输入员工名称"></el-input>
                </el-form-item> -->

                <el-form-item prop="consignee">
                    <el-input size="small" v-model="searchForm.consignee" placeholder="请输入客户名称"></el-input>
                </el-form-item>

                <el-form-item prop="sn">
                    <el-input size="small" v-model="searchForm.sn" placeholder="请输入订单编号"></el-input>
                </el-form-item>
                

                <el-form-item label-width="5px">
                    <el-button type="info" size="small" icon="search"  @click="searchToolChange('searchForm')">查询</el-button>
                    <el-tooltip content="清空搜索条件" placement="bottom-start" style="margin-left:10px;">
                        <el-button  size="small" @click="searchToolReset('searchForm')"  type="warning">重置</el-button>
                    </el-tooltip>
                </el-form-item>

                <br>
                <el-form-item prop="type">
                    <!-- 改成新的 -->
                    <el-badge :value="0"  class="badge-dot" >
                        <el-button size="small" @click="searchToolReset('searchForm')"  type="info" >全部</el-button>
                    </el-badge>
                    <el-badge :value="0" class="badge-dot" is-dot>
                        <el-button size="small" @click="typesearch('0', '', '')"  type="info" >待审核</el-button>
                    </el-badge>

                    <el-badge :value="0" :max="9" class="badge-dot" is-dot>
                        <el-button size="small" @click="typesearch('2', '', '')"  type="info" >待充值</el-button>
                    </el-badge>

                    <el-badge :value="200" class="badge-dot" is-dot>
                        <el-button size="small" @click="typesearch('', '1', '')"  type="info" >配货中</el-button>
                    </el-badge>

                    <el-badge :value="200" class="badge-dot" is-dot>
                        <el-button size="small" @click="typesearch('', '2', '')"  type="info" >已发送</el-button>
                    </el-badge>

                    <el-badge :value="200" class="badge-dot" is-dot>
                        <el-button size="small" @click="typesearch('', '3', '')"  type="info" >已签收</el-button>
                    </el-badge>

                    <el-badge :value="200" class="badge-dot" is-dot>
                        <el-button size="small" @click="typesearch('3', '', '')"  type="info" >完成</el-button>
                    </el-badge>

                    <el-badge :value="200" class="badge-dot" is-dot>
                        <el-button size="small" @click="typesearch('4', '', '')"  type="info" >已取消</el-button>
                    </el-badge>

                    <el-badge :value="200" class="badge-dot" is-dot>
                        <el-button size="small" @click="typesearch('', '', '1')"  type="info" >退换货</el-button>
                    </el-badge>
                   
                   
                </el-form-item>

            </el-form>
        </el-row>

        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload"  @dbclick="showRow" :page-size="20" >
                    <el-table-column prop="order_sn" label="订单号" align="center" width="180">
                    </el-table-column>

                    <el-table-column prop="order_all_money" label="总金额" align="center">
                    </el-table-column>

                    <el-table-column prop="order_pay_money" label="应付金额" align="center">
                    </el-table-column>

                    <el-table-column prop="cus_name" label="购买顾客" align="center">
                    </el-table-column>

                    <el-table-column prop="deal_name" label="成交员工" align="center">
                    </el-table-column>

                    <el-table-column prop="status_text" label="订单状态" align="center">
                    </el-table-column>

                    <el-table-column prop="product_status_text" label="货物状态" align="center">
                    </el-table-column>

                    <el-table-column prop="after_sale_status_text" label="货物状态" align="center">
                    </el-table-column>

                    <el-table-column prop="created_at" label="下单时间" align="center" width="180">
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" align="center" width="210">
                        <template slot-scope="scope">
                            <el-dropdown trigger="click" type="primary" size="small" split-button @click="showRowData(scope.row)" menu-align="start">
                                编辑
                                <el-dropdown-menu slot="dropdown" split-button>
                                    <el-dropdown-item>
                                        <el-button type="text"  @click="open2(scope.row.id)">发起退款</el-button>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                        <el-button type="text"  @click="showExchange(scope.row)">发起换货</el-button>
                                    </el-dropdown-item>
                                    <!-- 总经办这里就没有发起退款 -->
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-button type="danger" @click="handleDelete(scope.row.id)" size="small">删除</el-button>
                        </template>
                    </el-table-column>

                    <div slot="buttonbar">
                        <!-- 暂时注释添加 等改完后再加回去 -->
                        <!-- <el-tooltip content="点击添加订单" placement="right">
                            <el-button size="small" icon="plus" type="info" @click="showAdd" >添加</el-button>
                        </el-tooltip> -->
                    </div>

                </TableProxy>
            </el-col>
        </el-row>

        <br>
        <SubDetail :row="dbRow"/>

        <rowInfo name="rowInfo"
                 :ajax-proxy="ajaxProxy"
                 @submit-success="handleReload"/>
    </div>
</template>
<script>
import rowInfo from "../rowInfo";
import exchange from "../exchange";
import addDialog from "../Add.vue";

import deleteMix from '@/mix/Delete';
import DataProxy from '@/packages/DataProxy';

import TableProxy from '../../common/TableProxy';
import OrderBasic from '@/ajaxProxy/OrderBasic';

import mix from '../mix';
import { mapGetters  } from 'vuex';

export default {
    name: 'OrderList',
    pageTitle:"订单详情",
    mixins: [mix,deleteMix],
    components:{
        rowInfo,addDialog,exchange
    },
    data () {
        return {
            ajaxProxy:OrderBasic,
            orderBasicAjaxProxy:OrderBasic,
            mainurl:OrderBasic.getUrl(),
            mainparam:"",
            daterange:'',
            searchForm:{
                start:'',
                goods_name:'',
                consignee:'',
                sn:'',
                // deal_name:'',
                end:'',
                condition:'',
                deal_id:'',
                value7:"",

                // hyf 添加
                status:"", //订单状态 
                product_status:"", //货物状态
                after_sale_status:"",//售后状态,
                appends:['status_text','product_status_text','after_sale_status_text']

            },
            // tableData: '',
            bubble:null,
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
                }],
                disabledDate(time) {
                    return time.getTime() > Date.now();//- 8.64e7
                }
            },
            value6: '',
            value7: '',
            dbRow:null
        }
    },
    computed:{
        ...mapGetters([
            'user_id'
          ])
    },
    methods:{
        getAjaxProxy(){
            return  this.ajaxProxy;
        },
        showRowData(row){
            this.$modal.show('rowInfo',{rowData:row});
        },
        showExchange(row){
            // this.$modal.show('exchange',{rowData:row});
        },
        /** 发起退款弹窗  */
        open2(id) {
            /*     this.$confirm('确认发起退款（需要审核）?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.refund(id),
                    // this.refresh(),
                    this.$message({
                        type: 'success',
                        message: '发起退款成功!'
                    });
            }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消'
                });
            }); */
        },

        /** 点击订单列表展示用户信息 */
        showRow(row){
            
            this.dbRow = row;
            // this.usertableData.splice(0,this.usertableData.length);
            // /** 选项卡1显示客户信息 */
            // let selectProxy = new SelectProxy(BuyerAjaxProxy.getUrl(), this.loadbuyer, this);
            // selectProxy.setExtraParam({cus_id:row.cus_id}).load();
            // /** 选项卡2获取订单商品信息 */
            // let goodsProxy = new SelectProxy(OrdergoodsAjaxProxy.getUrl(), this.loadgoods, this);
            // goodsProxy.setExtraParam({goods_id:row.goods_id,order_id:row.id}).load();
            // /** 选项卡3获取用户地址信息 */
            // let addressProxy = new SelectProxy(DeliveryAddressAjaxProxy.getUrl(), this.loaddelivery, this);
            // addressProxy.setExtraParam({address_id:row.address_id}).load();
            // /** 选项卡2显示订单商品信息 */
            // this.loadbuyer2(row.cus_id);
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
        loadtest(data){
            this.mainData = data.items;
            // console.log(data.items);
        },
        // showAdd:function(){
        //     this.$modal.show('add-orderBasic');
        // },
        startDateChange:function(v){
            if (v) {
                var sdate = v.split(' - ');
                this.searchForm.start = sdate[0] + " 00:00:00";
                this.searchForm.end = sdate[1] + " 23:59:59";
            } 
        },
        onSearchChange(param){
            if (param.value7.length != 2) {
                param.start = "";
                param.end   = "";
            }

            param.deal_id = this.user_id;
            this.mainparam = JSON.stringify(param);
        },

        // hyf 添加
        singlbutton(status, product_status, after_sale_status){
            this.searchForm.status = status,
            this.searchForm.product_status = product_status;
            this.searchForm.after_sale_status = after_sale_status;
        }

    },
    created(){
        let o = {};
        o['row-dblclick'] = this.showRow;
        this.bubble = o;

        this.onSearchChange(this.searchForm);
        this.$on('search-tool-change', this.onSearchChange);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .menu
    {
        width: 100%;
        border: none;
        background-color: #20A0FF;
        color:#fbfdff;
    }
    .menu:hover
    {
        width: 100%;
        border: none;
        background-color: #20A0FF;
        color: black;
    }
    
</style>
