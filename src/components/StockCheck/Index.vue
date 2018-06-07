<template>
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
                            <el-option v-for="v in distributors" :label="v.name"
                                        :value="v.id" :key="v.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item prop="cate_type_id" class="form-item-unique">
                        <el-select
                                v-model="searchForm.cate_type_id"
                                size="small"
                                placeholder="商品类型">
                            <el-option v-for="v in types" :label="v.label" :value="v.id" :key="v.id"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item prop="check_num" class="form-item-unique">
                        <el-input v-model="searchForm.check_num" size="small" placeholder="盘点单号"></el-input>
                    </el-form-item>

                    <el-form-item prop="sku_sn" class="form-item-unique">
                        <el-input v-model="searchForm.sku_sn" size="small" placeholder="商品编号"></el-input>
                    </el-form-item>

                    <el-form-item prop="goods_name" class="form-item-unique">
                        <el-input v-model="searchForm.goods_name" size="small" placeholder="商品名称"></el-input>
                    </el-form-item>

                    <el-form-item prop="date_range">
                        <el-date-picker v-model="searchForm.date_range" size="small"
                            type="daterange" placeholder="选择日期范围" @change="dateRangeChange">
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
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :page-size="15">
                    <el-table-column label="序号" align="center" type="index" width="65">
                    </el-table-column>
                    <el-table-column prop="check_num" label="盘点单号" width="140" header-align="center">
                    </el-table-column>
                    <el-table-column prop="sku_sn" label="商品编号" width="140" header-align="center">
                    </el-table-column>

                    <el-table-column prop="entrepot_name" label="配送中心" width="140" header-align="center">
                    </el-table-column>

                    <el-table-column prop="goods_name" label="商品名称" width="140" header-align="center">
                    </el-table-column>

                    <el-table-column prop="cate_type" label="商品类型" width="120" align="center">
                    </el-table-column>
                    
                    <el-table-column prop="created_at" label="盘点日期" align="center" width="180">
                    </el-table-column>

                    <el-table-column prop="entrepot_count" label="库存数量" width="120" header-align="center">
                    </el-table-column>

                    <el-table-column prop="check_count" label="盘点数量" width="120" header-align="center">
                    </el-table-column>

                    <el-table-column prop="goods_price" label="商品单价(元)" width="120" header-align="center">
                    </el-table-column>

                    <el-table-column label="盘盈" align="center">
                        <el-table-column prop="profit_count" label="盘盈数量" width="120" header-align="center">
                        </el-table-column>
                        <el-table-column prop="profit_money" label="盘盈金额(元)" width="120" header-align="center">
                        </el-table-column>
                    </el-table-column>

                    <el-table-column label="盘亏" align="center">
                        <el-table-column prop="loss_count" label="盘亏数量" width="120" header-align="center">
                        </el-table-column>
                        <el-table-column prop="loss_money" label="盘亏金额(元)" width="120" header-align="center">
                        </el-table-column>
                    </el-table-column>
 
                    <el-table-column prop="check_name" label="盘点人" width="140" header-align="center">
                    </el-table-column>

                    <el-table-column prop="remark" label="备注" header-align="center" show-overflow-tooltip> 
                    </el-table-column>

                    <el-table-column label="操作" fixed="right" header-align="center" width="140">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="showEdit(scope.row)">修改</el-button>
                            <el-button type="warning" size="small">维护</el-button>
                        </template>
                    </el-table-column>

                    <div slot="buttonbar">
                        <el-button size="small" type="info" @click="showAdd">录入盘点</el-button>
                    </div> 
                </TableProxy>
            </el-col>
        </el-row>

        <edit name="edit-dialog" 
              :ajax-proxy="ajaxProxy"
              @submit-success="handleReload">
        </edit>
        <add name="add-dialog" 
              :ajax-proxy="ajaxProxy"
              :types="types"
              @submit-success="handleReload">
        </add>
    </div>
</template>

<script>
    import PageMix from '../../mix/Page';
    import SearchTool from '../../mix/SearchTool';
    import DataTable from '../../mix/DataTable';
    import StockCheckAjaxProxy from '@/ajaxProxy/StockCheck';
    import DistributionCenterProxy from '../../packages/DistributionCenterSelectProxy';
    import CategorySelectProxy from '../../packages/CategorySelectProxy';
    import edit from "./Edit";
    import add from "./Add";
    import { mapGetters } from 'vuex';

    export default {
        name:'StockCheck',
        pageTitle:"盘存盘点",
        mixins: [PageMix, SearchTool,DataTable],
        components:{
            edit,
            add,
        },
        data(){
            return {
                mainparam:"",
                mainurl:StockCheckAjaxProxy.getUrl(),
                ajaxProxy:StockCheckAjaxProxy,
                searchForm: {
                    entrepot_id:'',
                    // cate_type_id:'',
                    sku_sn:'',
                    goods_name:'',
                    check_num:'',
                    start:'',
                    end:'',
                    date_range:"",
                },
                distributors:[],
                types:[],

            }
        },
        computed:{
            ...mapGetters([
                'getUser'
            ])
        },
        methods:{
            sb(){
                this.table1 = !this.table1;
                this.table2 = !this.table2;
            },
            handleReload(){
                this.dataTableReload++;
                // this.cate_kinds = [];
            },
            showEdit(row){
                this.$modal.show('edit-dialog',{model:row});
            },
            showAdd(){
                this.$modal.show('add-dialog',{model:this.distributors});
            },
            onSearchChange(param){
                this.mainparam = JSON.stringify(param);
            },
            getDistributionCenter(data){
                this.distributors = data.items;
            },
            getTypes(data){
                this.types = data.items;
            },
            dateRangeChange(v){
                let dateArr = v.split(" - ");
                this.searchForm.start = dateArr[0];
                this.searchForm.end = dateArr[1];
            }

        },
        created(){
            this.$on('search-tool-change', this.onSearchChange);
            //获取配送中心数据
            let DistributionCenterSelect = new DistributionCenterProxy({}, this.getDistributionCenter, this);
            DistributionCenterSelect.load();
            //获取商品类型数据
            let CategorySelect = new CategorySelectProxy({}, this.getTypes, this);
            CategorySelect.load();

        }
    }
</script>

<style scoped>
    .form-item-unique{
        width: 170px !important;
    }
</style>