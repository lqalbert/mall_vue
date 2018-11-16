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

                    <el-form-item label="京东订单号" prop="order_sn">
                        <el-input size="small" v-model="searchForm.order_sn" placeholder="订单号" 
                            class="form-item-unique">
                        </el-input>
                    </el-form-item>


                    <el-form-item label="批次号" prop="flag">
                        <el-input size="small" v-model="searchForm.flag" placeholder="导入批次号" 
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
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload"  
                    @dbclick="rowDbClick" :page-size="15" :bubble="bubble" >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="flag" label="导入批次" width="140"></el-table-column>
                    <el-table-column prop="prefix_order_sn" label="订单号" width="180"></el-table-column>
                    <el-table-column prop="order_sn" label="京东订单号" width="140"></el-table-column>
                    <el-table-column label="分配状态" prop="match_text" width="100"></el-table-column>
                    <el-table-column label="客户姓名" width="120">
                        <template slot-scope="scope">
                            {{ scope.row.customer.cus_name }}
                        </template>
                    </el-table-column>
                    <el-table-column label="联系电话" width="130">
                        <template slot-scope="scope">
                            {{ scope.row.customer.tel }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="order_money" label="商品金额" width="100"></el-table-column>
                    <el-table-column prop="all_money" label="应收金额" width="100"></el-table-column>
                    <el-table-column prop="pay_money" label="实付金额" width="100"></el-table-column>
                    <el-table-column prop="express_fee" label="自付邮费" width="100"></el-table-column>
                    <el-table-column prop="order_at" label="下单时间" width="180"></el-table-column>
                    <el-table-column prop="pay_confirm_at" label="付款时间" width="180"></el-table-column>
                    <el-table-column label="快递公司" prop="express_name" width="140"></el-table-column>
                    <el-table-column label="快递号"   prop="express_sn" width="140"></el-table-column>
                    <el-table-column prop="status" label="订单状态" width="140"></el-table-column>
                    <el-table-column prop="remark" label="订单备注" width="140" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" width="140" align="center" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="small" type="primary" @click="$modal.show('jd-edit', scope.row )">录入快递</el-button>
                        </template>
                    </el-table-column>
                    <div slot="buttonbar">
                    </div>
                </TableProxy>
            </el-col>
        </el-row>

        <sub-detail :row="dbRow"/>
        <EditExpress name="jd-edit" :ajax-proxy="ajaxProxy" @submit-success="handleReload"></EditExpress>
    </div>
</template>

<script>
import SearchTool from '@/mix/SearchTool';
import DataTable from '@/mix/DataTable';
import JdOrderBasicAjax from '@/ajaxProxy/JdOrderBasic';
import { mapGetters } from 'vuex';
import SubDetail from '../SubDetail';
import deleteMix from '@/mix/Delete';
import EditExpress from '../EditExpress';

export default {
    name:"JdOrderBasic",
    pageTitle:"京东订单",
    mixins:[SearchTool,DataTable,deleteMix],
    components:{
        SubDetail,
        EditExpress
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
                order_account:'',
                flag:'',
                group_id:''
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
            'entrepots':'getEntrepots',
            'isAdmin':'isAdmin',
            'group_id':'group_id'
        })
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
        },
        rowDbClick(row){
            this.dbRow = row;
        },

        setBrusherChange(row){
            let vmThis = this;
            this.ajaxProxy.setBrusher(row.flag,row.order_sn).then(function(response){
                if(response.data.status == 0){
                    vmThis.$message.error(response.data.msg ? response.data.msg : "操作失败" );
                }else{
                    vmThis.$message.success(response.data.msg);
                }
            }).catch(function(error){
                vmThis.$message.error("出错了");
            });
        },
        handleSelectionChange(val){
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
        getAjaxProxy(){
            return  this.ajaxProxy;
        },
    },
    created(){
        let o = {};
        this.$store.dispatch('initEntrepots');
        this.$on('search-tool-change', this.onSearchChange);
        this.searchForm.group_id = this.group_id;
        this.onSearchChange(this.searchForm);
        
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

