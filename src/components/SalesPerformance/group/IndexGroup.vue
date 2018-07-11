<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" ref="searchForm" :model="searchForm">
                    <el-form-item>
                        <el-date-picker size="small" v-model="searchForm.start" 
                        placeholder="请选择起日期" :picker-options="setPicker"
                        @change="startDateChange" :clearable="false" class="form-item-unique">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker size="small" 
                        v-model="searchForm.end" 
                        placeholder="请选择止日期" :picker-options="setPicker"
                        @change="endDateChange" :clearable="false" class="form-item-unique">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" @click="setField('lastWeek')">上周</el-button>
                        <el-button size="small" @click="setField('lastMonth')">上月</el-button>
                        <el-button size="small" @click="setField('week')">本周</el-button>
                        <el-button size="small" @click="setField('month')">本月</el-button>
                    </el-form-item>
                    <el-form-item prop="type">
                        <el-select size="small" style="width:120px;" v-model="searchForm.type" placeholder="查询类型"
                            @change="saleQueryType">
                            <el-option v-for="item in searchType" :key="item.value" :label="item.key" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                  

                    <el-form-item>
                        <el-button type="info" size="small" @click="searchToolChange('searchForm')" icon="search">查询
                        </el-button>
                        <el-button type="info" size="small"  @click="searchToolReset('searchForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :page-size="15" @dbclick="dbclick">
                    <el-table-column label="序号" align="center" width="65" type="index" >
                    </el-table-column>

                    <el-table-column prop="user_name"  label="员工" width="180"  align="center"></el-table-column>

                    <el-table-column prop="cus_count" label="成交客户数" align="center">
                    </el-table-column>

                    <el-table-column prop="c_cus_count" label="成交单数" align="center">
                    </el-table-column>

                    <el-table-column prop="all_pay" label="成交金额" align="center">
                    </el-table-column>

                    <el-table-column prop="refund" label="退款金额" align="center">
                    </el-table-column>

                    <el-table-column prop="deposit"  label="部门充值剩余" align="center" v-if="searchForm.type!='department_id'">
                    </el-table-column>
                   
                </TableProxy>
            </el-col>
        </el-row>

        <sub-detail :row="model" :orderDetail="orderDetail">
        </sub-detail>

    </div>
</template>

<script>
    import Caculate from '../../config/caculate';
    import SalesPerformanceAjaxProxy from '../../ajaxProxy/SalesPerformance';
    import { mapGetters } from 'vuex';
    import LocalMix from '../mix/index';
    
    export default {
        name:'SalesPerformance',
        pageTitle:"销售业绩",
        mixins: [LocalMix],
        data(){
            return {
                mainparam:"",
                mainurl:SalesPerformanceAjaxProxy.getUrl(),
                ajaxProxy:SalesPerformanceAjaxProxy,

                setPicker:{
                    disabledDate:function(time) {
                        return time.getTime() > Date.now();// - 8.64e7
                    }
                },
                searchForm: {
                    start:Caculate.showLastWeekFirstDay(),
                    end:Caculate.showLastWeekLastDay(),
                    type:'user_id',
                    group_id:''
                },
                searchType:[
                    {value:'user_id', key:"按队员查询"},
                    {value:'group_id', key:"按团组查询"},
                   
                ],
                saleCtrlSelect:true,
                depClearable:true,
                groupClearable:true,
                orderDetail:[],
                param:{},
                model:null,
            }
        },
        computed:{
            ...mapGetters([
                'getUser'
            ]),
           
            groups(){
                return this.$store.getters.getGroupsByDepartment(this.searchForm.department_id);
            }
        },
        methods:{
            handleReload(){
                // this.clearTable();
            },
            startDateChange(v){
                this.searchForm.start = v;
            },
            endDateChange(v){
                this.searchForm.end = v;
            },
            setField(v){
                // console.log(Caculate.showWeekFirstDay());
                switch (v) {
                    case 'week':
                        this.searchForm.start = Caculate.showWeekFirstDay();
                        this.searchForm.end   = Caculate.showWeekLastDay();
                        break;
                    case 'month':
                        this.searchForm.start = Caculate.showMonthFirstDay();
                        this.searchForm.end   = Caculate.showMonthLastDay();
                        break;
                    case 'lastMonth':
                        this.searchForm.start = Caculate.showLastMonthFirstDay();
                        this.searchForm.end   = Caculate.showLastMonthLastDay(); 
                        break;
                    case 'lastWeek':
                        this.searchForm.start = Caculate.showLastWeekFirstDay();
                        this.searchForm.end   = Caculate.showLastWeekLastDay(); 
                        break;
                    default:
                        break;
                }
                this.onSearchChange(this.searchForm);
            },
            saleQueryType(v){
                this.saleCtrlSelect = v=="department_id" ? true : false;
            },
            
            saleGroupChange(v){
                console.log(v);
            },
            
            dbclick(row){
                this.param = Object.assign(this.param,this.searchForm);
                this.param.department_id = row.department_id;
                this.param.group_id = row.group_id;
                this.loadOrderData(this.param);
            },
            loadOrderData(param){
                let vmthis =this;
                SalesPerformanceAjaxProxy.selectOrder({params:param}).then((response)=>{
                    vmthis.orderDetail=response.data.items;
                }).catch((response)=>{
                    vmthis.$message.error('加载数据出错');
                });
            },
           
        },
        created(){
            this.searchForm.group_id = this.$store.getters.group_id;
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
</style>