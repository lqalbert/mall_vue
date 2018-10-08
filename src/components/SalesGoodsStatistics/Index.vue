<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" ref="searchForm" :model="searchForm">
                    <el-form-item label="开始时间" prop="start">
                        <el-date-picker size="small" v-model="searchForm.start" 
                        placeholder="请选择起日期" :picker-options="setPicker"
                        @change="startDateChange" :clearable="false" class="form-item-unique">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="截止时间" prop="end">
                        <el-date-picker size="small" 
                        v-model="searchForm.end" 
                        placeholder="请选择止日期" :picker-options="setPicker"
                        @change="endDateChange" :clearable="false" class="form-item-unique">
                        </el-date-picker>
                    </el-form-item>

                    <!-- <el-form-item label="商品名称" prop="goods_name">
                        <el-input size="small" v-model="searchForm.goods_name" placeholder="商品名称" class="form-item-unique">
                        </el-input>
                    </el-form-item> -->

                    <el-form-item>
                        <el-button type="info" size="small" @click="searchToolChange('searchForm')" icon="search">统计
                        </el-button>
                        <el-button type="info" size="small"  @click="searchToolReset('searchForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :page-size="15" 
                 @dbclick="showRow" :default-sort="{prop: 'cus_count', order: 'descending'}" show-summary>
                    <el-table-column label="序号" align="center" width="65" type="index"></el-table-column>
                    <el-table-column label="商品编号" width="140">
                        <template slot-scope="scope">
                            {{scope.row.sku_sn}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="goods_name"  label="商品名称"></el-table-column>
                    <el-table-column prop="invent_num" sortable='custom' label="累计入库总数量"></el-table-column>
                    <el-table-column prop="saleable_count" sortable='custom' label="当前库存余量"></el-table-column>
                    <el-table-column prop="sale_num" sortable='custom' label="销售数量"></el-table-column>
                    <el-table-column prop="sale_money" sortable='custom' label="销售金额"></el-table-column>
                    <el-table-column prop="inner_num" sortable='custom' label="内购数量"></el-table-column>
                    <el-table-column prop="inner_sale_money" sortable='custom' label="内购金额"></el-table-column>
                    <el-table-column prop="shop_num"  sortable='custom' label="商城数量"></el-table-column>
                    <el-table-column prop="shop_sale_money"  sortable='custom' label="商城金额"></el-table-column>
                    <el-table-column prop="ref_num" sortable='custom' label="退货数量"></el-table-column>
                    <el-table-column prop="destroy_count" sortable='custom' label="损坏数量">
                        <!--<template slot-scope="scope">-->
                            <!--暂无-->
                        <!--</template>-->
                    </el-table-column>
                    <el-table-column prop="sample_num" sortable='custom' label="样品数量">
                        <!-- <template slot-scope="scope">
                            <div v-if="scope.row.sample_num==null">0</div>
                            <div v-else>{{scope.row.sample_num}}</div>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="sample_sale_money" sortable='custom' label="样品金额"></el-table-column>

                    <div slot="buttonbar">
                        <el-button type="info" size="small" @click="downloadExcel">下载表格</el-button>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>
        <SubDetail :ajax-proxy="ajaxProxy" :row="dbRow"></SubDetail>
    </div>
</template>

<script>
    import PageMix from '@/mix/Page';
    import SearchTool from '@/mix/SearchTool';
    import DataTable from '@/mix/DataTable';
    import SalesGoodsStatisticsAjax from '../../ajaxProxy/SalesGoodsStatistics';
    import Caculate from '@/config/caculate';
    import { mapGetters } from 'vuex';
    import SubDetail from './SubDetail';

    export default {
        name:'SalesGoodsStatistics',
        pageTitle:"商品销售统计",
        mixins: [PageMix, SearchTool,DataTable],
        components:{
            SubDetail
        },
        data(){
            return {
                mainparam:"",
                mainurl:SalesGoodsStatisticsAjax.getUrl(),
                ajaxProxy:SalesGoodsStatisticsAjax,
                setPicker:{
                    disabledDate:function(time) {
                        return time.getTime() > Date.now();// - 8.64e7
                    }
                },
                searchForm: {
                    start:Caculate.showLastWeekFirstDay(),
                    end:Caculate.showLastWeekLastDay(),
                    goods_name:'',
                },
                dbRow:null
                
            }
        },
        computed:{
            ...mapGetters([
                'getUser'
            ]),
            // departments(){
            //     return this.$store.getters.getDepartments;
            // },
            // groups(){
            //     return this.$store.getters.getGroupsByDepartment(this.searchForm.department_id);
            // }
        },
        methods:{
            onSearchChange(param){
                this.mainparam = JSON.stringify(param);
            },
            startDateChange(v){
                this.searchForm.start = v;
            },
            endDateChange(v){
                this.searchForm.end = v;
            },
            showRow(row){
                // console.log(row);
                this.dbRow = {
                    sku_sn:row.sku_sn,
                    start:this.searchForm.start,
                    end:this.searchForm.end
                }
            },
            downloadExcel(){
                let start = this.searchForm.start;
                let end = this.searchForm.end;
                // this.ajaxProxy.downloadExcel({params:data});
                // window.open("http://localhost:8080/admin/sales-goods-statistics-download-excel?start=2018-09-17&end=2018-09-23");
                // window.open("admin/sales-goods-statistics-download-excel?start="+start+"&end="+end);
                //直接访问URL才能下载 用ajax访问不能下载
                let url = process.env.BASE_URL+this.ajaxProxy.downRouter()+"?start="+start+"&end="+end;
                window.open(url);
            }
            
        },
        created(){
            // this.$store.dispatch('initDepartments');

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
