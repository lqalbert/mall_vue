<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-tabs v-model="activeName" type="border-card">
                    <el-tab-pane label="部门详情" name="First">
                        <el-table :data="depSaleGoodsData" border empty-text="双击一行显示详情" v-loading="loading">
                            <el-table-column prop="department_name" sortable='custom' label="部门名称"></el-table-column>
                            <el-table-column prop="department_manager" sortable='custom' label="部门经理"></el-table-column>
                            <el-table-column prop="sale_num" sortable='custom' label="销售数量"></el-table-column>
                            <el-table-column prop="sale_money" sortable='custom' label="销售金额"></el-table-column>
                            <el-table-column prop="inner_num" sortable='custom' label="内购数量"></el-table-column>
                            <el-table-column prop="inner_sale_money" sortable='custom' label="内购金额"></el-table-column>
                            <el-table-column prop="shop_num"  sortable='custom' label="商城数量"></el-table-column>
                            <el-table-column prop="shop_sale_money"  sortable='custom' label="商城金额"></el-table-column>
                            <el-table-column prop="ref_num" sortable='custom' label="退货数量"></el-table-column>
                            <el-table-column prop="destroy_count" sortable='custom' label="损坏数量">
                                <template slot-scope="scope">暂无 </template>
                            </el-table-column>
                            <el-table-column prop="sample_num" sortable='custom' label="样品数量">
                                <template slot-scope="scope">暂无 </template>
                            </el-table-column>
                            <el-table-column prop="sample_sale_money" sortable='custom' label="样品金额">
                                <template slot-scope="scope">暂无 </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
  </template>
  
  <script>
    // import OrderGoodsAjaxProxy from '../../ajaxProxy/Ordergoods';
    // import AfterSaleAjaxProxy from '../../ajaxProxy/AfterSale';
    
    export default {
        name: 'SubDetail',
        props:{
            row :{
                type: Object,
                default:null
            },
            ajaxProxy:{
                type:Object,
                default:null
            }
        },
        data () {
            return {
                activeName:'First',
                depSaleGoodsData:[],
                tabFirst:false,
                loading:false
            }
        },
        methods:{
            handleFirst(row){
                let sku = row.sku_sn;
                this.loading = true;
                this.ajaxProxy.getDepSale(sku,row).then((response)=>{
                    
                    this.depSaleGoodsData = response.data.items;
                    this.loading = false;
                });
                this.tabFirst = true;
            },
        },
        watch:{
            row:function(val, oldVal) {
                this['handle'+ this.activeName].call(this, this.row);
                this.tabFirst = false;
            },
            activeName:function(val, olvVal){
                // console.log(this.activeName);
                if (!this['tab'+ val] && this.row !== null) {
                    this['handle'+ val].call(this, this.row);
                }
            }
        },
        created(){
            
        },
    }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  