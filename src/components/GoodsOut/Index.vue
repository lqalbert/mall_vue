<template>
    <div >
        <el-row>
            <el-col>
                <el-form :inline="true" ref="searchForm" class="demo-form-inline"  :model="searchForm">
                    <el-form-item prop="pdt_name">
                        <el-input v-model="searchForm.pdt_name" size="small" placeholder="产品名称"></el-input>
                    </el-form-item>

                    <el-form-item prop="pdt_type">
                        <el-select size="small" placeholder="产品种类" v-model="searchForm.pdt_type">
                            <el-option value="1" label="化妆品"></el-option>
                            <el-option value="2" label="保健品"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="out_time">
                        <el-date-picker size="small" v-model="searchForm.out_time"
                                        placeholder="出库时间"
                                        @change="outTimeDateChange"
                                        :editable="false">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item prop="sale_time">
                        <el-date-picker size="small" v-model="searchForm.sale_time"
                                        placeholder="销售时间"
                                        @change="saleTimeDateChange"
                                        :editable="false">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item prop="check_time">
                        <el-date-picker size="small" v-model="searchForm.check_time"
                                        placeholder="订单审核时间"
                                        @change="checkTimeDateChange"
                                        :editable="false">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" size="small" icon="search" @click="searchToolChange('searchForm')">查询</el-button>
                        <el-button type="info" size="small" icon="search"  @click="addDialog = false">高级查询</el-button>
                        <el-button type="info" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                        <el-tooltip content="点击刷新当前页面" placement="right"  style="margin-left:15px;">
                            <el-button  size="small" type="danger">刷新</el-button>
                        </el-tooltip>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-table :data="tableData" v-loading="dataLoad" border style="width: 100%">
                    <el-table-column type="selection" align="center" width="50"></el-table-column>
                    <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>
                    <el-table-column prop="order_sn" label="订单编号" width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="goods_name" label="商品名称" align="center">
                    </el-table-column>
                    <el-table-column prop="consignee" label="收货人信息" align="center">
                    </el-table-column>
                    <el-table-column prop="order_all_money" label="总金额" align="center" width="100">
                    </el-table-column>
                    <el-table-column prop="order_pay_money" label="应付金额" align="center" width="100">
                    </el-table-column>
                    <el-table-column prop="order_status" label="订单状态" align="center">
                    </el-table-column>
                    <el-table-column prop="pay_name" label="支付方式" align="center" width="100">
                    </el-table-column>
                    <el-table-column prop="shipping_status" label="发货状态" align="center" width="100">
                    </el-table-column>
                    <el-table-column prop="shipping_name" label="配送方式" align="center" width="100">
                    </el-table-column>
                    <el-table-column prop="order_time" label="下单时间" align="center">
                    </el-table-column>
                    <el-table-column  label="操作" align="center" width="140">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="goodsOutDialog = true">商品出库</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row >
            <div class="pull-right" style="float: right;margin-top: 5px">
                <el-col :span="12">
                    <el-pagination
                            :current-page="currentPage4"
                            :page-size="100"
                            layout="total, prev, pager, next, jumper"
                            :total="total"
                            @current-change="currentChange">
                    </el-pagination>
                </el-col>
            </div>
        </el-row>
<!--         <el-row>
            <el-col :span="24">
                <el-tabs  type="border-card">
                    <el-tab-pane label="跟踪记录">
                        <el-table :data="tableData1" empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                            <el-table-column prop="user" label="操作员工" header-align="center">
                            </el-table-column>
                            <el-table-column prop="content" label="内容" header-align="center">

                            </el-table-column>

                            <el-table-column prop="created_at" label="跟踪时间" width="180" align="center">
                            </el-table-column>

                            <el-table-column prop="track_text" label="跟踪类型" header-align="center">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="购买纪录">
                        <el-table :data="tableData2" empty-text="请点击客户显示其客户资料" border style="width: 100%">
                            <el-table-column label="产品金额" prop="product_money" header-align="center">
                            </el-table-column>
                            <el-table-column label="产品名称" prop="product_name" header-align="center">
                            </el-table-column>
                            <el-table-column label="产品周期" prop="product_t" header-align="center">
                            </el-table-column>
                            <el-table-column label="购买时间" prop="buy_time" align="center">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="投诉记录">
                        <el-table :data="tableData3"  empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                            <el-table-column prop="user" label="操作员工" header-align="center">
                            </el-table-column>

                            <el-table-column prop="content" label="投诉内容" header-align="center">

                            </el-table-column>

                            <el-table-column prop="created_at" label="投诉时间" width="180" align="center">
                            </el-table-column>

                            <el-table-column prop="type_text" label="投诉类型" align="center">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row> -->

        <addDialog :add-open="addDialog" @add-window-close="handleAddWindow"/>
        <goodsOutDialog :out-open="goodsOutDialog" @goodsout-window-close="handleOutWindow"/>
    </div>
</template>
      
<script>
    import addDialog from './addDialog';
    import goodsOutDialog from './goodsOutDialog';
    import PageMix from '../../mix/Page';
    import DataProxy from '../../packages/DataProxy';
    import SearchTool from '../../mix/SearchTool';
export default {
    name: 'GoodsOut',
    pageTitle:"商品出库",
    mixins: [PageMix,SearchTool],
    components: {
        addDialog,
        goodsOutDialog
    },
    data () {
        return {
            total:100,
            dataLoad:false,
            addDialog:false,
            goodsOutDialog:false,
            searchForm:{
                pdt_name:'',
                pdt_type:'',
                out_time:'',
                sale_time:'',
                check_time:'',
            },
            currentPage4:1,
            tableData:[
                {
                    type:'购买',
                    cb_name:'李四',
                    db_realname:'李曼曼',
                    product_name:'点金手高端版',
                    product_money:'8888',
                    risk_state:'通过',
                    risk_name:'审查专员',
                    callback_state:'通过',
                    callback_name:'回访A',
                    buy_time:'2017-11-28',
                    datastaff_name:'刘科',
                    status:'已开单',
                },
            ],
            tableData1:[],
            tableData2:[],
            tableData3:[],
        }
    },
    methods:{
        dataReload:function(){
          console.log(this.searchForm);
        },
        searchReset:function(){

        },
        handleDeletes:function(){

        },
        handleAddWindow(){
            this.addDialog = false;
        },
        handleOutWindow(){
            this.goodsOutDialog = false;
        },
        mainTableLoad(data){
            this.toggleTableLoad();
            this.tableData = data.items;
            this.tableData1 = data.items1;
            this.tableData2 = data.items2;
            this.tableData3 = data.items3;
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
          this.toggleTableLoad();
          this.mainProxy.setExtraParam(param).load();
          this.toggleTableLoad();
        },
        outTimeDateChange(v){
            this.searchForm.out_time = v;
        },
        checkTimeDateChange(v){
            this.searchForm.sale_time = v;
        },
        saleTimeDateChange(v){
            this.searchForm.sale_time = v;
        },


    },
    created(){
        this.toggleTableLoad();
        let mainProxy = new DataProxy("/goodsout", this.pageSize, this.mainTableLoad, this);
        this.mainProxy = mainProxy;
        this.mainProxy.load();
        
        this.$on('search-tool-change',this.onSearchChange);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-form-item{
    margin-bottom: 5px;
}
.el-tabs__header {
    border-bottom: 1px solid #d1dbe5;
    padding: 0;
    position: relative;
    margin: 0 0 5px;
}
</style>
