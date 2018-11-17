<template>
        <div>
            <el-row>
                <el-col :span="24">
                    <el-form :inline="true" ref="searchForm" :model="searchForm">
                        <!-- <el-form-item label="京东订单号" prop="order_sn">
                            <el-input size="small" v-model="searchForm.order_sn" placeholder="订单号" 
                                class="form-item-unique">
                            </el-input>
                        </el-form-item> -->
                        <el-form-item label="批次号" prop="flag">
                            <el-input size="small" v-model="searchForm.flag" placeholder="导入批次号" 
                                class="form-item-unique">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="info" size="small" @click="searchToolChange('searchForm')" 
                                icon="search">查询
                            </el-button>
                            <!-- <el-button type="info" size="small"  @click="searchToolReset('searchForm')">重置</el-button> -->
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            
            <el-row>
                <el-col>
                    <!-- @cellclick="rowCellClick" -->
                    <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload"  
                        @dbclick="rowDbClick" :page-size="15" :bubble="bubble" >
                        <el-table-column type="selection" width="55"></el-table-column>
                        <!-- <el-table-column prop="flag" label="导入批次" width="140"></el-table-column> -->
                        <el-table-column prop="prefix_order_sn" label="订单号" width="180"></el-table-column>
                        <el-table-column prop="order_sn" label="京东订单号" width="140"></el-table-column>
                        <el-table-column label="分配状态" prop="match_text" width="100"></el-table-column>
                        <el-table-column label="客户姓名" width="120">
                            <template slot-scope="scope">
                                {{ scope.row ? scope.row.customer.cus_name : '' }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="order_money" label="订单金额" width="100"></el-table-column>
                        <el-table-column prop="all_money" label="应收金额" width="100"></el-table-column>
                        <el-table-column prop="pay_money" label="实付金额" width="100"></el-table-column>
                        <el-table-column prop="express_fee" label="自付邮费" width="100"></el-table-column>
                        <el-table-column label="联系电话" width="130">
                            <template slot-scope="scope">
                                {{ scope.row ? scope.row.customer.tel : '' }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="order_at" label="下单时间" width="180"></el-table-column>
                        <el-table-column prop="pay_confirm_at" label="付款时间" width="180"></el-table-column>
                        <el-table-column prop="status" label="订单状态" width="140"></el-table-column>
                        <el-table-column prop="remark" label="订单备注" width="140" show-overflow-tooltip></el-table-column>
                        <el-table-column label="操作" width="180" align="center" fixed="right">
                            <template slot-scope="scope">
                                <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                        <div slot="buttonbar">
                            <el-button size="small" type="primary" @click="uploadExcel">上传excel</el-button>
                            <el-button size="small" type="primary" @click="matchTable()">自动匹配</el-button>
                            <el-button size="small" type="primary" @click="handleMatch()">手动匹配</el-button>
                        </div>
                    </TableProxy>
                </el-col>
            </el-row>
            <br>

            <sub-detail :row="dbRow" :showdetail="false" />
            <upload-excel name="upload-excel" :ajax-proxy="ajaxProxy" :entrepots="entrepots"
                @submit-success="handleReload" @flag-change="setFlag"/>
    
            <match-data name="match-table" :ajax-proxy="ajaxProxy"
                @submit-success="handleReload"/>
    
            <manual-match name="manual-match" :ajax-proxy="ajaxProxy" @submit-success="handleReload"/>

        </div>
    </template>
    
    <script>
    import PageMix from '@/mix/Page';
    import SearchTool from '@/mix/SearchTool';
    import DataTable from '@/mix/DataTable';
    import JdOrderBasicAjax from '@/ajaxProxy/JdOrderBasic';
    import { mapGetters } from 'vuex';
    import SubDetail from '../JdOrderBasic/SubDetail';
    import UploadExcel from './UploadExcel';
    import MatchData from './Match';
    import ManualMatch from './ManualMatch';
    import deleteMix from '@/mix/Delete';
    
    export default {
        name:"ImportJdOrder",
        pageTitle:"导入京东订单",
        mixins:[PageMix, SearchTool,DataTable,deleteMix],
        components:{
            SubDetail,
            UploadExcel,
            MatchData,
           
            ManualMatch,
        },
        data(){
            return {
                mainparam:"",
                mainurl:JdOrderBasicAjax.getUrl(),
                ajaxProxy:JdOrderBasicAjax,
                setPicker:{
                    disabledDate:function(time) {
                        return time.getTime() > Date.now();// - 8.64e7
                    }
                },
                searchForm: {
                    order_sn:'',
                    flag:'000',
                    // drash:'0'
                },
                row_model:null,
                dbRow:null,
                bubble:null,
                multipleSelection:[]
            }
        },
        computed:{
            ...mapGetters({
                'user_id':'user_id',
                'getUser':'user_id',
                'entrepots':'getEntrepots'
            }),
            
        },
        methods:{
            onSearchChange(param){
                this.mainparam = JSON.stringify(param);
            },
            // startDateChange(v){
            //     this.searchForm.start = v;
            // },
            // endDateChange(v){
            //     this.searchForm.end = v;
            // },
            rowCellClick(row){
                this.row_model = row;
            },
            rowDbClick(row){
                this.dbRow = row;
            },
            uploadExcel(){
                this.$modal.show('upload-excel');
            },
            matchTable(){
                // this.ajaxProxy.getMatch().then(){}
                this.$modal.show('match-table');
            },
            
            handleSelectionChange(val){
                // this.multipleSelection = val;
                if(val.length != 0){
                    if(val[val.length-1].is_brusher == 1){
                        val.pop();
                    }
                    this.multipleSelection = val;
                }
            },
            handleSelectionAll(val){
                if(val.length != 0){
                    for (let i = 0; i < val.length; i++) {
                        if(val[i].is_brusher == 1){
                            val.splice(i,1);
                        }
                    }
                }
                this.multipleSelection = val;
            },
            handleMatch(){
                let vmThis = this;
                let ids = [];
                if(this.multipleSelection.length == 0){
                    this.$message.error('请勾选要匹配的订单');
                    return ;
                }
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    if(this.multipleSelection[i].id){
                        ids.push(this.multipleSelection[i].id);
                    }
                }
                
                this.$modal.show('manual-match',{ids:ids});
            },
            getAjaxProxy(){
                return  this.ajaxProxy;
            },
            setFlag(value){
                this.searchForm.flag = value;
                // console.log(this.searchForm);
                this.onSearchChange(this.searchForm);
            }
        },
        created(){
            let o = {};
            // this.$store.dispatch('initDepartments');
            this.$store.dispatch('initEntrepots');
            this.$on('search-tool-change', this.onSearchChange);
            this.onSearchChange(this.searchForm);
            
            // o['current-change'] = this.onCurrentChange;
            o['selection-change'] = this.handleSelectionChange;
            o['select-all'] = this.handleSelectionAll;
            this.bubble = o;
        }
    }
    </script>
    <style scoped>
        .form-item-unique{
            width: 140px !important;
        }
        .name-input{
            max-width: 170px;
        }
        .name-input-area{
            max-width: 220px;
        }
        .pull-right {
            float: right;
        }
    
        .input-width {
            width: 120px;
        }
    </style>
    
    