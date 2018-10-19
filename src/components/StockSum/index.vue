<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true"  ref="searchForm" :model="searchForm" class="demo-form-inline" size="small">
                    <el-form-item prop="entrepot_id" class="form-item-unique">
                        <el-select
                                clearable
                                v-model="searchForm.entrepot_id"
                                size="small"
                                placeholder="配送中心">
                            <el-option v-for="v in entrepots" :label="v.name"
                                       :value="v.id" :key="v.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
<!-- 
                    <el-form-item prop="cate_type_id" class="form-item-unique">
                            <el-select
                                    v-model="searchForm.cate_type_id"
                                    size="small"
                                    placeholder="商品类型"
                                    @change="typeChange">
                                <el-option v-for="v in types" :label="v.label"
                                           :value="v.id" :key="v.id">
                                </el-option>
                            </el-select>
                        </el-form-item>

                    <el-form-item prop="cate_kind_id" class="form-item-unique">
                        <el-select
                                v-model="searchForm.cate_kind_id"
                                size="small"
                                placeholder="商品品类">
                            <el-option v-for="v in cate_kinds" :label="v.label"
                                       :value="v.id" :key="v.id">
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item prop="sku_sn" class="form-item-unique">
                            <el-input v-model="searchForm.sku_sn" size="small" placeholder="商品编号"></el-input>
                        </el-form-item>
                    <el-form-item prop="goods_name" class="form-item-unique">
                        <el-input v-model="searchForm.goods_name" size="small" placeholder="商品名称"></el-input>
                    </el-form-item>

                    <!-- <el-form-item prop="searchTime">
                        <el-date-picker
                            size="small"
                            v-model="searchForm.searchTime"
                            type="daterange"
                            placeholder="选择时间范围"
                            @change='timeChange'>
                        </el-date-picker>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" size="small" @click="searchToolChange('searchForm')" icon="search">查询
                        </el-button>
                        <el-button size="small" type="primary" @click="searchToolReset('searchForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload"   :page-size="20" >
                    <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>
                    <el-table-column prop="entrepot.name" label="配送中心" width="180" align="center"></el-table-column>
                    <el-table-column prop="entrepot_count" label="仓库数量" width="180" align="center"></el-table-column>
                    <el-table-column prop="goods_name" label="商品名称" width="180"  ></el-table-column>
                    <el-table-column prop="sku_sn" label="商品编码" width="180" align="center"></el-table-column>
                    <!-- <el-table-column prop="goods.cate_kind" label="商品种类" width="180" align="center"></el-table-column> -->
                    <el-table-column prop="saleable_count" label="可用库存数" width="180" align="center"></el-table-column>
                    <el-table-column prop="sale_count" label="累计销售" align="center"></el-table-column>
                    <el-table-column prop="produce_in" label="累记生产入库数量" align="center"></el-table-column>
                    <el-table-column prop="destroy_count" label="损坏数量" align="center"></el-table-column>
                    <el-table-column prop="sale_lock" label="销售锁定" align="center"></el-table-column>
                    <el-table-column prop="assign_lock" label="发货锁定" align="center"></el-table-column>
                    <el-table-column prop="exchange_lock" label="换货锁定" align="center"></el-table-column>

                    <!-- <el-table-column prop="summary_time" label="汇总时间" align="center"></el-table-column> -->
                </TableProxy>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import PageMix from '@/mix/Page';
    import SearchTool from '@/mix/SearchTool';
    import DataTable from '@/mix/DataTable';
    // import DistributionCenterSelectProxy from '@/packages/DistributionCenterSelectProxy';
    // import CategorySelectProxy from '../../packages/CategorySelectProxy';

    import InventoryGather from '@/ajaxProxy/InventoryGather';
    import { mapGetters } from 'vuex';

    export default {
        name:'StockSum',
        pageTitle:"库存汇总",
        mixins: [PageMix, SearchTool,DataTable],
        data(){
            return {
                ajaxProxy:InventoryGather,
                mainurl:InventoryGather,
                mainparam:"",
                searchForm: {
                    entrepot_id: '',
                    sku_sn:"",
                    goods_name: ''
                },
                types: [],
                cate_kinds:[],
                distributors:[]
            }
        },
        computed:{
            ...mapGetters({
                'entrepots':'getEntrepots'
            })
        },
        methods:{
            handleReload(){
                this.dataTableReload++;
                this.cate_kinds = [];
            },
            onSearchChange(param){
                param['with'] = ['entrepot'];
                this.mainparam = JSON.stringify(param);
            },
        },
        created(){
            this.$on('search-tool-change', this.onSearchChange);
            this.$store.dispatch('initEntrepots');
            this.onSearchChange(this.searchForm);
        }
        
    }
</script>

<style scoped>
    .form-item-unique{
        width: 140px !important;
    }
</style>