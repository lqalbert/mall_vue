<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" ref="searchForm" :model="searchForm">
                    <el-form-item  prop="start">
                        <el-date-picker size="small" v-model="view_start" 
                        placeholder="请选择起日期" :picker-options="setPicker"
                        @change="startDateChange" :clearable="false" class="form-item-unique">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item  prop="end">
                        <el-date-picker size="small"
                        v-model="view_end" 
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
                    
                    <el-form-item prop="department_id">
                        <el-select size="small" style="width:120px;" :clearable="depClearable" filterable v-model="searchForm.department_id"
                            @change="saleDepChange" placeholder="请选择部门">
                            <el-option v-for="dep in departments" :key="dep.id" :value="dep.id" :label="dep.name"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="group_id">
                        <el-select size="small" style="width:120px;" :disabled="saleCtrlSelect" :clearable="groupClearable" filterable
                            v-model="searchForm.group_id" @change="saleGroupChange" placeholder="请选择小组">
                            <el-option v-for="group in groups" :key="group.id" :value="group.id" :label="group.name"></el-option>
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
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" show-summary :page-size="15" @dbclick="dbclick" :default-sort="{prop: 'out_cus_cout', order: 'descending'}">
                    <el-table-column label="序号" align="center" width="65" type="index"></el-table-column>
                    <el-table-column prop="department_name" label="部门" width="180" align="center"></el-table-column>
                    <el-table-column prop="group_name" label="小组" width="180" align="center" v-if="searchForm.type=='user_id' || searchForm.type=='group_id'"></el-table-column>
                    <el-table-column prop="user_name"  label="员工" width="180" align="center" v-if="searchForm.type=='user_id'"></el-table-column>
                    <el-table-column prop="out_cus_cout" sortable="custom" label="成交客户数" align="center"></el-table-column>
                    <el-table-column prop="all_sale_count" sortable="custom" label="销售单数" align="center"></el-table-column>
                    <el-table-column prop="all_pay2" sortable="custom" label="销售金额" align="center"></el-table-column>
                    <el-table-column prop="append_sum" sortable="custom" label="赠品金额" align="center"></el-table-column>
                    <el-table-column prop="refund2" sortable="custom" label="退款金额" align="center"></el-table-column>

                    <el-table-column prop="inner_count"  label="内购单数" align="center"></el-table-column>
                    <el-table-column prop="inner_sum"  label="内购金额" align="center"></el-table-column>

                    <el-table-column prop="jd_count" label="京东单数" ></el-table-column>
                    <el-table-column prop="jd_sum" label="京东金额" ></el-table-column>

                    <el-table-column prop="i_freight"  label="自付邮费" align="center"></el-table-column>
                    <el-table-column prop="b_freight"  label="包邮邮费" align="center"></el-table-column>
                    <!-- <el-table-column prop="express_fee"  label="实付邮费" align="center"></el-table-column> -->
                    

                    <!-- 加两列 客户邮费、公司邮费 -->
                    <el-table-column prop="deposit"   label="部门充值剩余" >
                        <template slot-scope="scope">
                            <span v-if="searchForm.type=='department_id'">
                                 {{ scope.row.deposit }}
                            </span>
                        </template>
                    </el-table-column>
                   
                </TableProxy>
            </el-col>
        </el-row>
        
        <sub-detail :row="model"
                    :params="param"
                    :ajax-proxy="salesPerformanceOrderInfo">
        </sub-detail>

    </div>
</template>

<script>
    
    import SalesPerformanceAjaxProxy from '@/ajaxProxy/SalesPerformance';

    import { mapGetters } from 'vuex';
    import LocalMix from '../mix/index';
    
    
    export default {
        name:'SalesPerformance',
        
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
                    start:"",
                    end:"",
                    type:'department_id',
                    department_id:'',
                    group_id:''
                },
                searchType:[
                    {value:'user_id', key:"按队员查询"},
                    {value:'group_id', key:"按团组查询"},
                    {value:'department_id', key:'按部门查询'},
                ],
                saleCtrlSelect:true,
                depClearable:true,
                groupClearable:true,
                orderDetail:[],
                param:{},
                model:null,
                dataTotal:null,   
            }
        },
        computed:{
            ...mapGetters([
                'getUser'
            ]),
            departments(){
                return this.$store.getters.getDepartments;
            },
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
            saleQueryType(v){
                this.saleCtrlSelect = v=="department_id" ? true : false;
            },
            saleDepChange(v){
                this.$store.dispatch('initGroups', {department_id:v});
                this.searchForm.group_id= "";
            },
            saleGroupChange(v){
                console.log(v);
            },

            // onSearchChange(param){
                
            //     this.mainparam = JSON.stringify(param);
            // }
        },
        created(){
            this.$on('search-tool-change', this.onSearchChange);
            this.$store.dispatch('initDepartments');
            this.onSearchChange(this.searchForm);
        },
        mounted(){
            
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
