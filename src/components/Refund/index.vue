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

                <el-form-item prop="department_id" v-if="!isSaler">
                    <el-select v-model="searchForm.department_id" size="small" placeholder="部门">
                        <el-option v-for="department in getDepartments" :key="department.id" :value="department.id" :label="department.name"></el-option>
                    </el-select>
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
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :bubble="bubble" @dbclick="showRow" :page-size="20">
                    <!-- <el-table-column type="selection" align="center" width="50"></el-table-column> -->
                    <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>
                    <el-table-column prop="return_sn" label="退货编码" width="180" align="center"></el-table-column>
                    <el-table-column prop="order_sn" label="销售单号"  width="180"  align="center" ></el-table-column>
                    <el-table-column prop="status" label="状态" align="center" width="100">
                        <template slot-scope="scope">
                            {{setFieldText(scope.row.status,'statusText')}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="inventory_state_text" label="库存操作" width="100"></el-table-column>
                    <el-table-column prop="return_unit" label="退款单位" align="center" width="120"></el-table-column>
                    <el-table-column prop="is_special" label="特殊处理" width="100">
                        <template slot-scope="scope">
                            {{setFieldText(scope.row.is_special,'isSpecialText')}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="refund_status" label="退款状态" width="100"></el-table-column>
                    <el-table-column prop="created_at" label="退货单录入日期" width="180"></el-table-column>
                    <el-table-column prop="order.deal_name" label="原成交员工" width="160" align="center">
                    </el-table-column>


                    <el-table-column prop="cus_id" label="客户ID" align="center" width="100"></el-table-column>
                    <el-table-column prop="refund_percent" label="退款比例" align="center" width="100">
                        <template slot-scope="scope">
                            {{setRefundPercent(scope.row)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="fee" label="应退金额" align="center" width="100"></el-table-column>
                    <el-table-column prop="return_fee" label="退货运费" align="center" width="100"></el-table-column>
                    <el-table-column prop="service_fee" label="退货服务费" align="center" width="120"></el-table-column>
                    
                    <el-table-column prop="user_name" label="发起人" align="center" width="120"></el-table-column>
                    <el-table-column prop="express" label="退货快递公司" align="center" width="160"></el-table-column>
                    <el-table-column prop="express_sn" label="退货快递单号" align="center" width="160"></el-table-column>
                    <el-table-column prop="return_unit" label="退货收货单位" align="center" width="160"></el-table-column>
                    <el-table-column prop="resend_fee" label="重发运费" align="center" width="100"></el-table-column>
                    <el-table-column prop="reservice_fee" label="重发服务费" align="center"  width="160"></el-table-column>
                    <el-table-column prop="sure_at" label="确认日期" align="center" width="160"></el-table-column>
                    <el-table-column prop="check_at" label="审核日期" align="center" width="160"></el-table-column>

                    <div slot="buttonbar">
                        <el-button type="primary" size="small" v-if="hasSure" @click="handleRefundSure">退换货确认</el-button>
                        <el-button type="primary" size="small" @click="showRefundCheck" v-if="hasOrderCheckPermission">审核</el-button>
                        <!-- <el-button type="primary" size="small" @click="showEdit">编辑</el-button> -->
                        <!-- <el-button type="primary" size="small" @click="inventory">入库操作</el-button> -->
                        <el-button type="primary" size="small" @click="openRefundInventory" v-if="isAssignMember" >退货入库</el-button>
                        <el-button type="primary" size="small" @click="openOutInventory" v-if="isAssignMember">坏货出库</el-button>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>
        <br>

        <SubDetail :row="dbRow"></SubDetail>

        <Edit name="refund-edit" :ajax-proxy="ajaxProxy"
            @submit-success="handleReload">
        </Edit>

        <refund-check name="refund-check" :ajax-proxy="ajaxProxy"
            @submit-success="handleReload">
        </refund-check>

        <RefundInventory name="refund-inventory" :ajax-proxy="ajaxProxy" @submit-success="handleReload"></RefundInventory>
        <OutInventory name="out-inventory" :ajax-proxy="ajaxProxy" @submit-success="handleReload"></OutInventory>
        <!-- <AdvancedQuery name="show-advanced-query" :ajax-proxy="orderBasicAjaxProxy"/> -->
    </div>

</template>

<script>
    import DataTable from '@/mix/DataTable';
    import PageMix from '@/mix/Page';
    import config from '@/mix/Delete';
    import AfterSaleAjaxProxy from '@/ajaxProxy/AfterSale';
    import SearchTool from "@/mix/SearchTool";
    import refundCheck from "./check";
    import SubDetail from './SubDetail';
    import Edit from './Edit';
    import RefundInventory from  './RefundInventory';
    import OutInventory from './OutInventory';
    import { mapGetters } from 'vuex';

    export default {
        name: 'Refund',
        pageTitle:"新退货单",
        mixins: [PageMix,SearchTool,DataTable,config],
        components:{
            refundCheck,
            SubDetail,
            Edit,
            RefundInventory,
            OutInventory
        },
        data () {
            return {
                bubble:null,
                dbRow:null,
                ajaxProxy:AfterSaleAjaxProxy,
                mainurl:AfterSaleAjaxProxy,
                mainparam:"",
                strategies:{},
                searchForm:{
                    start:'',
                    order_sn:"",
                    return_sn:"",
                    value7:[],
                    department_id:"",
                    
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
                currentRow:null,
                statusText:['未处理','已审核','已确认','审核未通过'],
                isSpecialText:['否','是'],
            }
        },
        computed:{
            hasSure(){
                return this.$store.getters.hasRefundSure;
            },
            isSaler(){
                return this.$store.getters.hasRefundSure;
            },
            ...mapGetters([
                'getDepartments',
                'isAssignMember',
                'hasOrderCheckPermission'
            ])
        },
        methods:{
            setFieldText(field,TextArr){
                if(field == null){
                    return field;
                }else{
                    return this[TextArr][field];
                }
            },
            setRefundPercent(row){
                let fee = row.fee;
                let total = row.order.order_all_money;
                if (isNaN(fee) || isNaN(total)) { 
                    return "-";
                }else{
                    row['refund_percent'] = total <= 0 ? "0%" : (Math.round(fee / total * 10000) / 100.00 + "%");
                    return row['refund_percent'];
                }
                    
            },
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
                
                //临时写在这里
                // if (this.$store.user.hasRole('sale-manager')) {
                    
                // }
                param['appends'] = ['inventory_state_text','status_text'];
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
                
            },
            showRefundCheck(){
                if (!this.currentRow) {
                    this.$message.error('请选择一行');
                    return ;
                }

                if (this.currentRow.status != 0) {
                    this.$message.error("已经审核，不能再次审核");
                    return false;
                }
                this.$modal.show('refund-check', this.currentRow);
            },
            handleRefundSure(){
                let vmThis = this;
                if (!this.currentRow) {
                    this.$message.error('请选择一行');
                    return ;
                }
                if (this.currentRow.status == 0) {
                    this.$message.error('还未审核');
                    return ;
                }
                if(this.currentRow.status == 2){
                    this.$message.error('已确认过不能再确认');
                    return ;
                }
                this.ajaxProxy.sure(this.currentRow.id, {status:2}).then(function(response){
                    if (response.data.status　==　0) {
                        vmThis.$message.error(response.data.msg ? response.data.msg : "操作失败" );
                    } else {
                        vmThis.$message.success('操作成功');
                        vmThis.handleReload();
                    }
                }).catch(function(error){
                    vmThis.$message.error('出错了');
                });;
            },
            /** 点击订单列表展示用户信息 */
            showRow(row){
                this.dbRow = row;
            },
            inventory(){
                if (!this.currentRow) {
                    this.$message.error('请选择一行');
                    return ;
                }

                if (this.currentRow.inventory_state == 1) {
                    this.$message.error('操作过了');
                    return ;
                }

                // if (this.currentRow.status != 2) {
                //     this.$message.error('还没确认过');
                //     return ;
                // }

                this.ajaxProxy.inventory(this.currentRow.id).then((response)=>{
                    if (response.data.status == 1) {
                        this.$message.success(response.data.msg);
                        this.handleReload();
                    } else {
                        this.$message.error(response.data.msg);
                    }
                }).catch(response=>{

                });
            },
            openRefundInventory(){
                if (!this.currentRow) {
                    this.$message.error('请选择一行');
                    return ;
                }
                this.$modal.show('refund-inventory', this.currentRow);
            },
            openOutInventory(){
                if (!this.currentRow) {
                    this.$message.error('请选择一行');
                    return ;
                }
                this.$modal.show('out-inventory', this.currentRow);
            },
            openFront(){
                window.open("/front-question/1");
            }

        },
        created(){
            
            this.$on('search-tool-change', this.onSearchChange);

            let o = {};
            o['current-change'] = this.onCurrentChange;
            o['row-dblclick'] = this.showRow;
            this.bubble = o;

            this.$store.dispatch("initDepartments");
            if (this.isSaler) {
                this.searchForm.department_id = this.$store.getters.department_id;
            }
            this.mainparam = JSON.stringify(this.searchForm);


        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
