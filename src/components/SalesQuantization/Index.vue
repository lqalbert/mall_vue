<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" ref="searchForm" :model="searchForm">
                    <el-form-item>
                        <el-date-picker size="small" v-model="searchForm.start" 
                        placeholder="请选择起日期" :picker-options="setPicker"
                        @change="startDateChange" :clearable="false">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker size="small" 
                        v-model="searchForm.end" 
                        placeholder="请选择止日期" :picker-options="setPicker"
                        @change="endDateChange" :clearable="false">
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
                <!-- <el-table :data="AddTableData" border highlight-current-row
                    element-loading-text="请添加商品" style="width: 100%">

                    <el-table-column prop="sku_sn" label="商品编号" header-align="center">
                    </el-table-column>

                    <el-table-column prop="entrepot_name" label="配送中心" header-align="center">
                        <template slot-scope="scope">
                            {{setFieldEntrepot(scope.row)}}
                        </template>
                    </el-table-column>

                    <el-table-column prop="goods_name" label="商品名称" header-align="center">
                    </el-table-column>

                    <el-table-column prop="cate_type" label="商品类型" align="center">
                        <template slot-scope="scope">
                            {{setFieldType(scope.row)}}
                        </template>
                    </el-table-column>

                    <el-table-column prop="cate_kind" label="商品分类" align="center">
                        <template slot-scope="scope">
                            {{setFieldKind(scope.row)}}
                        </template>
                    </el-table-column>

                    <el-table-column prop="entrepot_count" label="库存数量" header-align="center">
                    </el-table-column>

                    <el-table-column label="操作" fixed="right" header-align="center" width="100">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="deleteAddress(scope.row)">
                                删除</el-button>
                        </template>
                    </el-table-column>
                </el-table> -->
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import PageMix from '../../mix/Page';
    import SearchTool from '../../mix/SearchTool';
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

                pickerOptions: {
                    shortcuts: [{
                            text: '上一周',
                            onClick:function(picker) {
                                var start = showLastWeekFirstDay();
                                var end = showLastWeekLastDay();
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '上个月',
                            onClick:function(picker) {
                                var start = showLastMonthFirstDay();
                                var end = showLastMonthLastDay();
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '本周',
                            onClick:function(picker) {
                                var start = showWeekFirstDay();
                                var end = showWeekLastDay();
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '本月',
                            onClick:function(picker) {
                                var start = showMonthFirstDay();
                                var end = showMonthLastDay();
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
                    start:showLastWeekFirstDay(),
                    end:showLastWeekLastDay(),
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
                switch (v) {
                    case 'week':
                        this.searchForm.start = showWeekFirstDay();
                        this.searchForm.end   = showWeekLastDay();
                        break;
                    case 'month':
                        this.searchForm.start = showMonthFirstDay();
                        this.searchForm.end   = showMonthLastDay();
                        break;
                    case 'lastMonth':
                        this.searchForm.start = showLastMonthFirstDay();
                        this.searchForm.end   = showLastMonthLastDay(); 
                        break;
                    case 'lastWeek':
                        this.searchForm.start = showLastWeekFirstDay();
                        this.searchForm.end   = showLastWeekLastDay(); 
                        break;
                    default:
                        break;
                }
            },
            saleQueryType(v){
                this.saleCtrlSelect = v=="department" ? true : false;
            },
            saleDepChange(v){

            },
            saleGroupChange(v){

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
</style>