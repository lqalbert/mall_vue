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
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :page-size="15" :default-sort="{prop: 'cus_count', order: 'descending'}">
                    <el-table-column label="序号" align="center" width="65" type="index"></el-table-column>

                    <el-table-column prop="sku_sn"  label="商品编号"></el-table-column>

                    <el-table-column prop="goods_name"  label="商品名称"></el-table-column>

                    <el-table-column prop="invent_num" sortable='custom' label="累计入库总数量"></el-table-column>

                    <el-table-column prop="saleable_count" sortable='custom' label="当前库存余量"></el-table-column>

                    <el-table-column prop="sale_num" sortable='custom' label="本次销售数量"></el-table-column>

                    <el-table-column prop="ref_num" sortable='custom' label="本次退货数量"></el-table-column>

                    <el-table-column prop="destroy_count" sortable='custom' label="本次损坏数量">
                        <template slot-scope="scope">
                            暂无
                        </template>
                    </el-table-column>

                    <el-table-column prop="sample_num" sortable='custom' label="样品"></el-table-column>

                    <el-table-column prop="inner_num" sortable='custom' label="内购"></el-table-column>
                </TableProxy>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import PageMix from '@/mix/Page';
    import SearchTool from '@/mix/SearchTool';
    import DataTable from '@/mix/DataTable';
    import SalesGoodsStatisticsAjax from '../../ajaxProxy/SalesGoodsStatistics';
    import Caculate from '@/config/caculate';
    import { mapGetters } from 'vuex';

    export default {
        name:'SalesGoodsStatistics',
        pageTitle:"商品销售统计",
        mixins: [PageMix, SearchTool,DataTable],
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
