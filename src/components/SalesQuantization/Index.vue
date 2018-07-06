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
                    <el-form-item>
                        <el-select size="small" style="width:120px;" v-model="searchForm.type" placeholder="查询类型"
                            @change="saleQueryType">
                            <el-option v-for="item in searchType" :key="item.value" :label="item.key" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item prop="dep_id">
                        <el-select size="small" style="width:120px;" :clearable="depClearable" filterable v-model="searchForm.dep_id"
                            @change="saleDepChange" placeholder="请选择部门">
                            <el-option v-for="dep in saleDeps" :key="dep.id" :value="dep.id" :label="dep.name"></el-option>
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
                <el-table :data="AddTableData" border highlight-current-row
                    element-loading-text="请添加商品" style="width: 100%" show-summary>

                    <el-table-column label="序号" align="center" width="65" type="index">
                    </el-table-column>

                    <el-table-column prop="name" label="部门/小组/员工" width="180">
                    </el-table-column>

                    <el-table-column prop="lock_cus" label="录入客户">
                    </el-table-column>

                    <el-table-column prop="trade" label="成交客户数">
                    </el-table-column>

                    <el-table-column prop="trade_order" label="成交单数">
                    </el-table-column>

                    <el-table-column prop="c_cus" label="一般客户数量">
                    </el-table-column>

                    <el-table-column prop="b_cus" label="意向客户数量">
                    </el-table-column>

                    <el-table-column prop="track" label="跟踪数">
                    </el-table-column>

                    <el-table-column prop="switch" label="转入客户数">
                    </el-table-column>

                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12" :offset="12">
                <div class="pull-right">
                    <el-pagination
                        :current-page="currentPage"
                        :page-size="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="total"
                        @current-change="currentChange">
                    </el-pagination>   
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import PageMix from '../../mix/Page';
    import SearchTool from '../../mix/SearchTool';
    import Caculate from '../../config/caculate';
    import { mapGetters } from 'vuex';

    export default {
        name:'SalesQuantization',
        pageTitle:"销售量化",
        mixins: [PageMix, SearchTool],
        components:{

        },
        data(){
            return {
                ajaxProxy:{},

                currentPage:1,
                pageSize:20,
                total:100,

                pickerOptions: {
                    shortcuts: [{
                            text: '上一周',
                            onClick:function(picker) {
                                var start = Caculate.showLastWeekFirstDay();
                                var end = Caculate.showLastWeekLastDay();
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '上个月',
                            onClick:function(picker) {
                                var start = Caculate.showLastMonthFirstDay();
                                var end = Caculate.showLastMonthLastDay();
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '本周',
                            onClick:function(picker) {
                                var start = Caculate.showWeekFirstDay();
                                var end = Caculate.showWeekLastDay();
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '本月',
                            onClick:function(picker) {
                                var start = Caculate.showMonthFirstDay();
                                var end = Caculate.showMonthLastDay();
                                picker.$emit('pick', [start, end]);
                            }
                        }
                    ],
                    disabledDate:function(time) {
                        return time.getTime() > Date.now();// - 8.64e7
                    }
                },
                setPicker:{
                    disabledDate:function(time) {
                        return time.getTime() > Date.now();// - 8.64e7
                    }
                },
                searchForm: {
                    start:Caculate.showLastWeekFirstDay(),
                    end:Caculate.showLastWeekLastDay(),
                    type:'',
                    dep_id:'',
                    group_id:''
                },
                searchType:[
                    {value:'user', key:"按队员查询"},
                    {value:'group', key:"按团组查询"},
                    {value:'department', key:'按部门查询'},
                ],
                saleDeps:[
                    {id:1,name:'销售一部'},
                    {id:2,name:'销售二部'},
                    {id:3,name:'销售三部'},
                ],
                groups:[
                    {id:1,name:'飞机一队'},
                    {id:2,name:'飞机二队'},
                    {id:3,name:'飞机三队'},
                ],
                saleCtrlSelect:true,
                depClearable:true,
                groupClearable:true,

                AddTableData:[
                    {name:'东北销售一部',lock_cus:888,trade:88,trade_order:88,c_cus:888,b_cus:111,track:666,switch:222},
                    {name:'东北销售一部',lock_cus:888,trade:88,trade_order:88,c_cus:888,b_cus:111,track:666,switch:222},
                    {name:'东北销售一部',lock_cus:888,trade:88,trade_order:88,c_cus:888,b_cus:111,track:666,switch:222},
                    {name:'东北销售一部',lock_cus:888,trade:88,trade_order:88,c_cus:888,b_cus:111,track:666,switch:222},
                    {name:'东北销售一部',lock_cus:888,trade:88,trade_order:88,c_cus:888,b_cus:111,track:666,switch:222},
                    {name:'东北销售一部',lock_cus:888,trade:88,trade_order:88,c_cus:888,b_cus:111,track:666,switch:222},
                    {name:'东北销售一部',lock_cus:888,trade:88,trade_order:88,c_cus:888,b_cus:111,track:666,switch:222},
                ],
            }
        },
        computed:{
            ...mapGetters([
                'getUser'
            ])
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
            },
            saleQueryType(v){
                this.saleCtrlSelect = v=="department" ? true : false;
            },
            saleDepChange(v){
                console.log(v);
            },
            saleGroupChange(v){
                console.log(v);
            },
            currentChange(v){
                console.log(v);
            },

        },
        created(){
            this.$on('search-tool-change', this.onSearchChange);
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