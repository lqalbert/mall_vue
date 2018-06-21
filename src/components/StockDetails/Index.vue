<template>
    <!-- 完全改 -->
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true"  ref="searchForm" :model="searchForm" >
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
                    <!-- <el-form-item prop="cate_type_id" class="form-item-unique">
                        <el-select
                                v-model="searchForm.cate_type_id"
                                size="small"
                                placeholder="商品类型"
                                @change="typeChange">
                            <el-option v-for="v in types" :label="v.label" :value="v.id" :key="v.id"></el-option>
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
                    <el-form-item prop="searchTime">
                        <el-date-picker
                                v-model="searchForm.searchTime"
                                type="daterange"
                                size="small"
                                placeholder="选择日期时间"
                                @change="timeChange">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="searchToolChange('searchForm')" icon="search">查询
                        </el-button>
                        <el-button size="small" type="primary" @click="searchToolReset('searchForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload"   :page-size="20" >
                    <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>
                    <el-table-column prop="entrepot_name" label="配送中心" width="180" align="center"></el-table-column>
                    <el-table-column prop="goods_name" label="商品名称" width="180" ></el-table-column>
                    <el-table-column prop="sku_sn" label="商品编号" width="180" align="center"></el-table-column>
                    <el-table-column prop="entrepot_in" label="生产入库" align="center"></el-table-column>
                    <el-table-column prop="return_num" label="生产出库" align="center"></el-table-column>
                    <el-table-column prop="order_lock" label="销售锁定" align="center"></el-table-column>
                    <el-table-column prop="assign_lock" label="发货锁定" align="center"></el-table-column>
                    <el-table-column prop="exchange_lock" label="换货锁定" align="center"></el-table-column>
                    <!-- <el-table-column prop="entry_at" label="最后生产入库时间" align="center"></el-table-column> -->
                    <!-- <div slot="buttonbar">
                        <el-button size="small"  type="info" @click="addProduction2" >生产入库</el-button>
                        <el-button size="small" type="info" @click="backProduction">退货登记</el-button>
                        <el-button size="small" type="info" @click="badProduction">坏货登记</el-button>
                        <el-button size="small" type="info" @click="exchangeProduction">换货登记</el-button>
                    </div>  -->
                </TableProxy>
               
            </el-col>
        </el-row>
    </div>
</template>

<script>

    import PageMix from '@/mix/Page';
    import SearchTool from '@/mix/SearchTool';
    import DataTable from '@/mix/DataTable';
    import InventoryDetailAjaxProxy from '@/ajaxProxy/InventoryDetail';
    import DistributionCenterProxy from '@/packages/DistributionCenterSelectProxy';
    import { DateRange2timestampRange } from '@/utils/time'; 

    import { mapGetters } from 'vuex';

    export default {
        name: 'StockDetails',
        pageTitle: "库存明细",
        mixins: [PageMix,SearchTool,DataTable],
        data() {
            return {
                ajaxProxy: InventoryDetailAjaxProxy,
                mainurl:InventoryDetailAjaxProxy,
                mainparam:"",
                searchForm: {
                    entrepot_id: "",
                    sku_sn:"",
                    goods_name:"",
                    searchTime:'',

                    start: "",
                    end: "",
                },
                currentRow:null,
            }
        },
        computed:{
            ...mapGetters({
                'entrepots':'getEntrepots'
            })
        },
        methods: {
            getAjaxProxy(){
                return  this.ajaxProxy;
            },
            onSearchChange(param) {
                if (this.searchForm.searchTime.length!=2) {
                    param.start = "";
                    param.end = "";
                }
                this.mainparam = JSON.stringify(param);
            },
            timeChange(v){
                let re = DateRange2timestampRange(v);
                this.searchForm.start = re[0];
                this.searchForm.end = re[1];
            }
        },
        created() {
            this.$store.dispatch('initEntrepots');
            this.$on('search-tool-change', this.onSearchChange);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .form-item-unique{
        width: 140px !important;
    }
</style>
