<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" ref="searchForm" :model="searchForm">
                    <el-form-item label="下单时间" prop="start">
                        <el-date-picker size="small" v-model="searchForm.start" 
                        placeholder="请选择起日期" :picker-options="setPicker"
                        @change="startDateChange" :clearable="false" class="form-item-unique">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="下单时间" prop="end">
                        <el-date-picker size="small" 
                        v-model="searchForm.end" 
                        placeholder="请选择止日期" :picker-options="setPicker"
                        @change="endDateChange" :clearable="false" class="form-item-unique">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="订单号" prop="order_sn">
                        <el-input size="small" v-model="searchForm.order_sn" placeholder="订单号" 
                            class="form-item-unique">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="下单帐号" prop="order_account">
                        <el-input size="small" v-model="searchForm.order_account" placeholder="下单帐号" 
                            class="form-item-unique">
                        </el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="info" size="small" @click="searchToolChange('searchForm')" 
                            icon="search">查询
                        </el-button>
                        <el-button type="info" size="small"  @click="searchToolReset('searchForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" @cellclick="rowCellClick" 
                    @dbclick="rowDbClick" :page-size="15">
                    <el-table-column label="序号" align="center" width="65" type="index"></el-table-column>
                    <el-table-column prop="order_sn" label="订单号" width="140"></el-table-column>
                    <el-table-column prop="entrepot" label="部门小组员工" width="220">
                        <template slot-scope="scope">
                            {{ setDepGroupUser(scope.row) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="order_account" label="下单账号" width="180"></el-table-column>
                    <el-table-column label="客户姓名" width="120">
                        <template slot-scope="scope">
                            {{ scope.row.customer[0].cus_name }}
                        </template>
                    </el-table-column>
                    <el-table-column label="联系电话" width="130">
                        <template slot-scope="scope">
                            {{ scope.row.customer[0].tel }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="order_at" label="下单时间" width="180"></el-table-column>
                    <el-table-column prop="order_money" label="订单金额" width="100"></el-table-column>
                    <el-table-column prop="all_money" label="结算金额" width="100"></el-table-column>
                    <el-table-column prop="pay_money" label="应付金额" width="100"></el-table-column>
                    <el-table-column prop="pay_balance" label="余额支付" width="100"></el-table-column>
                    <el-table-column prop="status" label="订单状态" width="140"></el-table-column>
                    <el-table-column prop="type" label="京东订单类型" width="140"></el-table-column>
                    <el-table-column prop="remark" label="订单备注" width="140" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="express_fee" label="运费金额" width="100"></el-table-column>
                    <el-table-column prop="pay_way" label="支付方式" width="120"></el-table-column>
                    <el-table-column prop="order_source" label="订单来源" width="120"></el-table-column>
                    <el-table-column prop="order_channel" label="订单渠道" width="120"></el-table-column>
                    <div slot="buttonbar">
                        <el-button size="small" type="primary" @click="uploadExcel">上传excel</el-button>
                        <el-button size="small" type="primary" @click="matchTable()">客户匹配</el-button>
                        <el-button size="small" type="primary" @click="minusTable()">扣除库存</el-button>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>

        <sub-detail :row="dbRow"/>
        <upload-excel name="upload-excel" :ajax-proxy="ajaxProxy" :entrepots="entrepots"
            @submit-success="handleReload"/>

        <match-data name="match-table" :ajax-proxy="ajaxProxy"
            @submit-success="handleReload"/>

        <minus-inventory name="minus-inventory" :ajax-proxy="ajaxProxy" :entrepots="entrepots"
        @submit-success="handleReload"/>
    </div>
</template>

<script>
import PageMix from '@/mix/Page';
import SearchTool from '@/mix/SearchTool';
import DataTable from '@/mix/DataTable';
import JdOrderBasicAjax from '../../ajaxProxy/JdOrderBasic.js';
import { mapGetters } from 'vuex';
import SubDetail from './SubDetail';
import UploadExcel from './UploadExcel';
import MatchData from './Match';
import MinusInventory from './Inventory';

export default {
    name:"JdOrderBasic",
    pageTitle:"京东订单",
    mixins:[PageMix, SearchTool,DataTable],
    components:{
        SubDetail,
        UploadExcel,
        MatchData,
        MinusInventory
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
                start:'',
                end:'',
                order_sn:'',
                order_account:''
            },
            row_model:null,
            dbRow:null
        }
    },
    computed:{
        ...mapGetters({
            'user_id':'user_id',
            'getUser':'user_id',
            'entrepots':'getEntrepots'
        }),
        // departments(){
        //     return this.$store.getters.getDepartments;
        // },
        // groups(){
        //     return this.$store.getters.getGroupsByDepartment(this.searchForm.department_id);
        // }
    },
    methods:{
        setDepGroupUser(row){
            let fullName = "";
            if(row.department){
                fullName = row.department.name;
            }
            if(row.group){
                fullName +="-"+row.group.name;
            }
            if(row.user){
                fullName +="-"+row.user.realname;
            }
            return fullName;
        },
        onSearchChange(param){
            this.mainparam = JSON.stringify(param);
        },
        startDateChange(v){
            this.searchForm.start = v;
        },
        endDateChange(v){
            this.searchForm.end = v;
        },
        rowCellClick(row){
            this.row_model = row;
            console.log(this.row_model);
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
        minusTable(){
            this.$modal.show('minus-inventory');
        }
    },
    created(){
        // this.$store.dispatch('initDepartments');
        this.$store.dispatch('initEntrepots');
        this.$on('search-tool-change', this.onSearchChange);
        this.onSearchChange(this.searchForm);
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

