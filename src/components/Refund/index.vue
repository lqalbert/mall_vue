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

                <el-form-item prop="return_sn">
                    <el-input size="small" v-model="searchForm.return_sn" placeholder="退货单号"></el-input>
                </el-form-item>

                <el-form-item prop="order_sn">
                    <el-input size="small" v-model="searchForm.order_sn" placeholder="订单号"></el-input>
                </el-form-item>

                <!-- <el-form-item prop="consignee">
                    <el-input size="small" v-model="searchForm.consignee" placeholder="请输入客户名称"></el-input>
                </el-form-item> -->
                
                <el-form-item >
                    <el-button type="info" size="small" icon="search"  @click="searchToolChange('searchForm')">查询</el-button>
                    <el-tooltip content="清空搜索条件" placement="bottom-start" >
                        <el-button  size="small" @click="searchToolReset('searchForm')" type="warning">重置</el-button>
                    </el-tooltip>
                </el-form-item>

            </el-form>
        </el-row>

        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :bubble="bubble"  :page-size="20">
                    <!-- <el-table-column type="selection" align="center" width="50"></el-table-column> -->
                    <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>
                    <el-table-column prop="return_sn" label="退货编码" width="180" align="center"></el-table-column>
                    <el-table-column prop="order_sn" label="销售单号"  width="180"  align="center" ></el-table-column>
                    <el-table-column prop="status" label="状态" align="center" width="100"></el-table-column>
                    <el-table-column prop="return_unit" label="退款单位" align="center" width="120" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="is_special" label="特殊处理"　width="100"></el-table-column>
                    <el-table-column prop="refund_status" label="退款状态" width="100"></el-table-column>
                    <el-table-column prop="created_at" label="退货单录入日期" width="180"></el-table-column>
                    <el-table-column prop="order.deal_name" label="原成交员工" width="160" align="center" :show-overflow-tooltip="true"></el-table-column>

                    <!-- <el-table-column prop="type_text" label="原成交单位" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="订单录入日期" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="原初成员工" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="原初成单位" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="原发货单位" align="center"></el-table-column> -->

                    <el-table-column prop="cus_id" label="客户ID" align="center" width="100"></el-table-column>
                    <el-table-column prop="type_text" label="退款比例" align="center" width="100"></el-table-column>
                    <el-table-column prop="fee" label="应退金额" align="center" width="100"></el-table-column>
                    <el-table-column prop="return_fee" label="退货运费" align="center" width="100"></el-table-column>
                    <el-table-column prop="service_fee" label="退货服务费" align="center" width="120"></el-table-column>
                    
                    <el-table-column prop="user_name" label="发起人" align="center" width="120"></el-table-column>
                    <el-table-column prop="express" label="退货快递公司" align="center" width="160"></el-table-column>
                    <el-table-column prop="express_sn" label="退货快递单号" align="center" width="160"></el-table-column>
                    <el-table-column prop="return_unit" label="退货收货单位" align="center" width="160"></el-table-column>
                    <!-- <el-table-column prop="type_text" label="重发单位" align="center"></el-table-column>
                    <el-table-column prop="type_text" label="原发货快递" align="center"></el-table-column> -->
                    <!-- <el-table-column prop="type_text" label="提交日期" align="center"></el-table-column> -->
                    <el-table-column prop="resend_fee" label="重发运费" align="center" width="100"></el-table-column>
                    <el-table-column prop="reservice_fee" label="重发服务费" align="center"  width="160"></el-table-column>
                    <el-table-column prop="sure_at" label="确认日期" align="center" width="160"></el-table-column>
                    <el-table-column prop="check_at" label="审核日期" align="center" width="160"></el-table-column>

                    <!-- <el-table-column  label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="warning" size="small" @click="handleCheck(scope.row)">审核</el-button>
                        </template>
                    </el-table-column> -->
                    <div slot="buttonbar">
                        <!-- <el-button type="primary" size="small" @click="showAdvancedQuery">高级查询</el-button>
                        <el-button type="primary" size="small" @click="showAdvancedQuery">退货修改</el-button>
                        <el-button type="primary" size="small" @click="showAdvancedQuery">退货提交</el-button> -->
                        <el-button type="primary" size="small" @click="showAdvancedQuery">换货确认</el-button>
                        <el-button type="primary" size="small" @click="showAdvancedQuery">退货审核</el-button>
                        <el-button type="primary" size="small" @click="showEdit">编辑</el-button>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>
        <br>
        <SubDetail></SubDetail>
        <Edit name="refund-edit" :ajax-proxy="ajaxProxy" ></Edit>

        <!-- <checkDialog name="check" :ajax-proxy="orderBasicAjaxProxy"/> -->

        <!-- <AdvancedQuery name="show-advanced-query" :ajax-proxy="orderBasicAjaxProxy"/> -->
    </div>

</template>

<script>
    import DataTable from '@/mix/DataTable';
    import PageMix from '@/mix/Page';
    import config from '@/mix/Delete';
    import AfterSaleAjaxProxy from '@/ajaxProxy/AfterSale';
    import DeliveryAddressAjaxProxy from '@/ajaxProxy/DeliveryAddress';
    import SearchTool from "@/mix/SearchTool";
    import checkDialog from "./check";
    import SubDetail from './SubDetail';
    import Edit from './Edit';



    export default {
        name: 'Refund',
        pageTitle:"新退货单",
        mixins: [PageMix,SearchTool,DataTable,config],
        components:{
            checkDialog,
            SubDetail,
            Edit
        },
        data () {
            return {
                bubble:null,
                ajaxProxy:AfterSaleAjaxProxy,
                mainurl:AfterSaleAjaxProxy,
                mainparam:"",
                strategies:{},
                searchForm:{
                    start:'',
                    order_sn:"",
                    return_sn:""
                },
               
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
                currentRow:null
            }
        },
        computed:{
            
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
            
            getAjaxProxy(){
                return  this.ajaxProxy;
            },


            onSearchChange(param){ 
                param['load'] = ['order'];  
                this.mainparam = JSON.stringify(param);
            },
            searchReset:function(){
                this.$refs['searchForm'].resetFields();
                this.$emit('search-tool-change', this.searchForm);
            },
            onCurrentChange(row){
                this.currentRow = row;
            },
            showEdit(){
                if (!this.currentRow) {
                    this.$message.error('请选择一行');
                    return ;
                }
                this.$modal.show('refund-edit', this.currentRow);
                
            }
        },
        created(){
            this.mainparam = JSON.stringify(this.searchForm);
            this.$on('search-tool-change', this.onSearchChange);

            let o = {};
            o['current-change'] = this.onCurrentChange;
            this.bubble = o;


        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
