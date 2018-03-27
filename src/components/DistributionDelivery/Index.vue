<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="entrepot_id">
                    <el-select v-model="searchForm.entrepot_id" size="small" placeholder="配送中心" clearable>
                        <el-option v-for="v in distributors" :label="v.name"
                                   :value="v.id" :key="v.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="cate_type_id" >
                    <el-select v-model="searchForm.cate_type_id" size="small" placeholder="商品类型" clearable @change="cate_type_change">
                        <el-option v-for="v in CategoryList" :label="v.label"
                                   :value="v.id" :key="v.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="cate_kind_id" >
                    <el-select v-model="searchForm.cate_kind_id" size="small" placeholder="商品品类" >
                        <el-option v-for="v in CategoryChildrenList" :label="v.label"
                                   :value="v.id" :key="v.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="goods_name">
                    <el-input v-model="searchForm.goods_name" size="small" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item prop="sale_name">
                    <el-input v-model="searchForm.sale_name" size="small" placeholder="销售人员"></el-input>
                </el-form-item>

                <el-form-item prop="times">
                    <el-date-picker
                            v-model="times"
                            type="daterange"
                            size="small"
                            placeholder="选择日期范围"
                            @change="timeChange">
                    </el-date-picker>
                </el-form-item>

                <el-form-item prop="deliver_name">
                    <el-input v-model="searchForm.deliver_name" size="small" placeholder="收货人姓名"></el-input>
                </el-form-item>
                <el-form-item prop="deliver_phone">
                    <el-input v-model="searchForm.deliver_phone" size="small" placeholder="收货人电话"></el-input>
                </el-form-item>
                <el-form-item prop="express_name">
                    <el-input v-model="searchForm.express_name" size="small" placeholder="快递公司"></el-input>
                </el-form-item>
                <el-form-item prop="status">
                    <el-select v-model="searchForm.status" size="small" placeholder="发货状态">
                        <el-option label="待发" value="0"></el-option>
                        <el-option label="已发" value="1"></el-option>
                        <el-option label="废单" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="assign_type">
                    <el-select v-model="searchForm.assign_type" size="small" placeholder="发货类型">
                        <el-option label="正常" value="0"></el-option>
                        <el-option label="退货" value="1"></el-option>
                        <el-option label="换货" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="user_name">
                    <el-input v-model="searchForm.user_name" size="small" placeholder="发货人员"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询</el-button>
                    <el-button type="primary" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <!-- table -->
        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :page-size="20" :bubble="bubble" @dbclick="dbClick">
                <!-- <el-table :data="mainData" border highlight-current-row style="width: 100%"> -->
                    <el-table-column label="序号" align="center"  type="index" width="65">
                    </el-table-column>

                    <el-table-column prop="assign_sn" label="发货单号" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="status" label="发货状态" align="center" width="200">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status==0">待发</span>
                            <span v-if="scope.row.status==1">已发</span>
                            <span v-if="scope.row.status==2">废单</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="cus_name" label="客户姓名" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="goods_name" label="商品名称" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="goods_num" label="数量" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="unit_type" label="商品单位" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="cate_type" label="商品类型" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="express_name" label="快递公司" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="express_sn" label="快递单号" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="express_print_status" label="快递单打印状态" align="center" width="200">
                        <template slot-scope="scope">
                            <span v-if="scope.row.express_print_status==0">未打印</span>
                            <span v-if="scope.row.express_print_status==1">已打印</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="assign_print_status" label="发货单打印状态" align="center" width="200">
                        <template slot-scope="scope">
                            <span v-if="scope.row.assign_print_status==0">未打印</span>
                            <span v-if="scope.row.assign_print_status==1">已打印</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="set_express" label="是否指定快递" align="center" width="200">
                        <template slot-scope="scope">
                            <span v-if="scope.row.set_express==2">否</span>
                            <span v-if="scope.row.set_express==1">是</span>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="deliver_name" label="收货人姓名" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="deliver_phone" label="收件人手机" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="weight" label="重量" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="assign_fee" label="配送费" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="express_fee" label="快递费" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="express_print_at" label="快递单打印时间" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="assign_print_at" label="发货单打印时间" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="out_entrepot_at" label="发货时间" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="sale_time" label="销售时间" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="sign_at" label="签收时间" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="sale_name" label="销售人员" align="center" width="200">
                    </el-table-column>

                    <!-- <el-table-column  label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="showEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column> -->

                    <div slot="buttonbar">
                        <el-button type="primary" size="small" @click="addDelivery">发 货</el-button>     
                        <el-button type="primary" size="small" @click="handleEdit">修 改</el-button>     
                        <el-button type="primary" size="small" @click="setDropOrder">废 单</el-button>     
                        <el-button type="primary" size="small" @click="handleReceive">签 收</el-button>     
                        <el-button type="primary" size="small" @click="addContact">沟 通</el-button>     
                        <el-button type="primary" size="small" @click="editAddress">修改地址</el-button>     
                    </div>
                <!-- </el-table> -->
                </TableProxy>
            </el-col>
        </el-row>
        <!-- /table -->
        <br>
        <el-row>
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                <el-tab-pane label="发货明细" name="first">
                    <el-table :data="delivery_details_data" border style="width: 100%">
                        <el-table-column prop="goods_name" label="商品" align="center"></el-table-column>
                        <el-table-column prop="cate_kind" label="小类型" align="center"></el-table-column>
                        <el-table-column prop="goods_num" label="数量" align="center"></el-table-column>
                        <el-table-column prop="goods_price" label="价格" align="center"></el-table-column>
                        <el-table-column prop="weight" label="重量" align="center"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="订单明细" name="second">
                    <el-table :data="tableData2" border style="width: 100%">
                        <el-table-column prop="order_num" label="订单编号" align="center"></el-table-column>
                        <el-table-column prop="cus_name" label="客户姓名" align="center"></el-table-column>
                        <el-table-column prop="buy_goods" label="购买商品" align="center"></el-table-column>
                        <el-table-column prop="buy_num" label="数量" align="center"></el-table-column>
                        <el-table-column prop="trade" label="成交时间" align="center"></el-table-column>
                        <el-table-column prop="sale_name" label="销售人员" align="center"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="历史快递" name="third">
                    <el-table :data="tableData3" border style="width: 100%">
                        <el-table-column prop="express_num" label="快递单号" align="center"></el-table-column>
                        <el-table-column prop="express_company" label="快递公司" align="center"></el-table-column>
                        <el-table-column prop="express_fee" label="快递费用" align="center"></el-table-column>
                        <el-table-column prop="recevie_name" label="签收人" align="center"></el-table-column>
                        <el-table-column prop="receive_time" label="客户签收时间" align="center"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="收货地址" name="fourth">
                    <el-table :data="delivery_addresses_data" border style="width: 100%">
                        <el-table-column prop="deliver_name" label="收件人姓名" align="center"></el-table-column>
                        <el-table-column prop="deliver_phone" label="收件人手机号" align="center"></el-table-column>
                        <el-table-column prop="deliver_address" label="收货详细地址" align="center"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="沟通联系" name="five">
                    <el-table :data="communication_data" border style="width: 100%">
                        <el-table-column prop="cus_name" label="客户姓名" align="center"></el-table-column>
                        <el-table-column prop="contact_content_time" label="沟通时间" align="center"></el-table-column>
                        <el-table-column prop="user_name" label="沟通人" align="center"></el-table-column>
                        <el-table-column prop="contact_content" label="沟通内容" align="center"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="操作记录" name="six">
                    <el-table :data="operation_data" border style="width: 100%">
                        <el-table-column prop="time" label="操作时间" align="center"></el-table-column>
                        <el-table-column prop="user_name" label="操作人" align="center"></el-table-column>
                        <el-table-column prop="type_name" label="变更内容明细" align="center"></el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-row>
        <!-- 写弹窗组件 -->
        <add-delivery name='add-delivery'
            :ajax-proxy="ajaxProxy"
            @submit-success="handleReload">
        </add-delivery>

        <handle-edit name='handle-edit'
            :ajax-proxy="ajaxProxy"
            @submit-success="handleReload">
        </handle-edit>

        <set-drop-order name='set-drop-order'
            :ajax-proxy="ajaxProxy"
            @submit-success="handleReload">
        </set-drop-order>

        <handle-receive name='handle-receive'
             @submit-success="handleReload"
            :ajax-proxy="ajaxProxy">
        </handle-receive>

        <add-contact name='add-contact'
            :ajax-proxy="ajaxProxy"
             @submit-success="handleReload">
        </add-contact>

        <edit-address name='edit-address'
            :ajax-proxy="ajaxProxy"
            @submit-success="handleReload">
        </edit-address>
    </div>
</template>
<script>
import PageMix from '../../mix/Page';
import SearchTool from '../../mix/SearchTool';
import DataTable from '../../mix/DataTable';

import AddDelivery from './AddDelivery';
import HandleEdit from './HandleEdit';
import SetDropOrder from './SetDropOrder';
import HandleReceive from './HandleReceive';
import AddContact from './AddContact';
import EditAddress from './EditAddress';

import GoodsSelectProxy from '../../packages/GoodsSelectProxy';
import DistributionCenterProxy from '../../packages/DistributionCenterSelectProxy';
import DistributionDeliveryTabPaneProxy from '../../packages/DistributionDeliveryTabPaneProxy';
import AssignAjaxProxy from '@/ajaxProxy/Assign';
import SelectProxy from  '../../packages/SelectProxy';

export default {
    name: 'DistributionDelivery',
    pageTitle:"配送发货",
    mixins:[PageMix,SearchTool,DataTable],

    components:{
        AddDelivery,
        HandleEdit,
        SetDropOrder,
        HandleReceive,
        AddContact,
        EditAddress,
    },
    data(){
        return {
            mainparam:"",
            mainurl:AssignAjaxProxy.getUrl(),
            ajaxProxy:AssignAjaxProxy,
            searchForm:{
                entrepot_id:'',
                cate_type_id:'',
                cate_kind_id:'',
                goods_name:'',
                sale_name:'',
                start:'',
                end:'',
                deliver_name:'',
                deliver_phone:'',
                express_name:'',
                status:'',
                assign_type:'',
                user_name:'',
                with:['order'],
                appends:['status_text'],
            },
            distributors:[],
            CategoryList:[],
            CategoryChildrenList:[],
            times:'',

            delivery_details_data:[],
            delivery_addresses_data:[],
            communication_data:[],
            operation_data:[],


            tableData2:[
                {order_num:'201803061545',cus_name:'李四',buy_goods:'神油2号',buy_num:100,trade:'2018-03-09',sale_name:'李思思',},
                {order_num:'201803061545',cus_name:'李四',buy_goods:'神油2号',buy_num:100,trade:'2018-03-09',sale_name:'李思思',},
                {order_num:'201803061545',cus_name:'李四',buy_goods:'神油2号',buy_num:100,trade:'2018-03-09',sale_name:'李思思',},
                {order_num:'201803061545',cus_name:'李四',buy_goods:'神油2号',buy_num:100,trade:'2018-03-09',sale_name:'李思思',},
            ],
            tableData3:[
                {express_num:'201803091148',express_company:'顺丰',express_fee:88,recevie_name:'王武',receive_time:'2018-03-09',},
                {express_num:'201803091148',express_company:'顺丰',express_fee:88,recevie_name:'王武',receive_time:'2018-03-09',},
                {express_num:'201803091148',express_company:'顺丰',express_fee:88,recevie_name:'王武',receive_time:'2018-03-09',},
                {express_num:'201803091148',express_company:'顺丰',express_fee:88,recevie_name:'王武',receive_time:'2018-03-09',},
                {express_num:'201803091148',express_company:'顺丰',express_fee:88,recevie_name:'王武',receive_time:'2018-03-09',},
            ],

            activeName:'first',

            bubble:null,
            currentRow: null
        }
    },
    methods:{
        dbClick(row){
            //获取标签页展示数据
            let DistributionDeliveryTabPaneSelect = new DistributionDeliveryTabPaneProxy(row, this.getDistributionDeliveryTabPane, this);
            DistributionDeliveryTabPaneSelect.load();

        },
        searchToolReset(name){
            this.$refs[name].resetFields();
            this.$refs[name].$emit('reset');
            this.$emit('search-tool-change', this[name]);
            this.times='';
        },
        getDistributionCenter(data){
            this.distributors = data.items;
        },
        getDistributionDeliveryTabPane(data){
            this.delivery_details_data = data.delivery_details_data;
            this.delivery_addresses_data = data.delivery_addresses_data;
            this.communication_data = data.communication_data;
            this.operation_data = data.operation_data[0];
        },
        getCategoryList(data){
            this.CategoryList=data.items;
        },
        getCategoryChildrenList(data){
            this.CategoryChildrenList=data;
        },
        cate_type_change(v){
            if(v){
                let selectProxy = new SelectProxy('/getCategorys/'+ v, this.getCategoryChildrenList, this);
                selectProxy.load();
            }
        },
        timeChange(v){
            this.searchForm.start = v.split(' - ')[0];
            this.searchForm.end = v.split(' - ')[1];
        },
        addDelivery(){
            if (this.openDialogCheck()) {
                this.$modal.show('add-delivery', this.currentRow);
            }
        },
        handleEdit(){
            if (this.openDialogCheck()) {
                this.$modal.show('handle-edit', this.currentRow);
            }
        },
        setDropOrder(){
            if (this.openDialogCheck()) {
                this.$modal.show('set-drop-order', this.currentRow);
            }
        },
        handleReceive(){
            if (this.openDialogCheck()) {
                this.$modal.show('handle-receive',this.currentRow);
            }
        },
        addContact(){
            if (this.openDialogCheck()) {
                this.$modal.show('add-contact',this.currentRow);
            }
        },
        editAddress(){
            if (this.openDialogCheck()) {
                this.$modal.show('edit-address',this.currentRow);
            }
        },  
        handleClick(tab, event){
            // console.log(tab, event);
        },
        onSearchChange(param){
            this.mainparam = JSON.stringify(param);
        },
        onCurrentChange(currentRow) {
            console.log(currentRow);
            this.currentRow = currentRow;
        },
        hasCurrentRow(){
            if (this.currentRow) {
                return true;
            } else {
                return false;
            }
        },

        openDialogCheck(){
            if (!this.hasCurrentRow()) {
                // this.$message.error('请选择一行');

                this.$alert('请选择一行', '警告', {
                    confirmButtonText: '确定',
                })
                return false;
            } else {
                return true;
            }
        }
    },
    created(){
        //获取配送中心数据
        let DistributionCenterSelect = new DistributionCenterProxy({}, this.getDistributionCenter, this);
        DistributionCenterSelect.load();
        //获取商品类型
        let selectProxy = new SelectProxy('/tree', this.getCategoryList, this);
        selectProxy.load();

        this.mainparam = JSON.stringify(this.searchForm);

        this.$on('search-tool-change', this.onSearchChange);
        
        let o = {};
        o['current-change'] = this.onCurrentChange;
        this.bubble = o;
    },
    mounted(){

    },
    
}
</script>
<style scoped>

</style>

