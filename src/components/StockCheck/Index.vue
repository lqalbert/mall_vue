<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true"  ref="searchForm" :model="searchForm" >
                    <el-form-item prop="check_sn" class="form-item-unique">
                        <el-input v-model="searchForm.check_sn" size="small" placeholder="盘点单号"></el-input>
                    </el-form-item>

                    <el-form-item prop="date_range" class="form-item-unique">
                        <el-date-picker v-model="searchForm.date_range" size="small"
                            type="daterange" placeholder="选择日期范围" @change="dateRangeChange">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item class="form-item-unique-one">
                        <el-button type="primary" size="small" @click="searchToolChange('searchForm')" icon="search">查询
                        </el-button>
                        <el-button size="small" type="primary" @click="searchToolReset('searchForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :page-size="6">
                    <el-table-column prop="check_sn" label="盘点单号" header-align="center">
                    </el-table-column>

                    <el-table-column prop="check_name" label="开单人员" header-align="center">
                    </el-table-column>

                    <el-table-column prop="check_status" label="盘点状态" align="center">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.check_status == 1">待盘点</el-tag>
                            <el-tag v-else type="primary">已盘点</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column prop="remark" label="备注" header-align="center">
                    </el-table-column>

                    <el-table-column prop="created_at" label="开单日期" align="center">
                    </el-table-column>

                    <el-table-column label="操作" fixed="right" align="center" width="140">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="getCheckGoods(scope.row,'get')">查看</el-button>
                            <!-- <el-button type="warning" size="small">维护</el-button> -->
                        </template>
                    </el-table-column>

                    <!-- <div slot="buttonbar">
                        <el-button size="small" type="info" @click="showAdd">录入盘点</el-button>
                    </div>  -->
                </TableProxy>
            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-form :model="editForm" ref="editForm" :rules="rules">
                <el-table :data="tableData" style="width: 100%" border empty-text="请单击查看">
                    <el-table-column label="商品名称" prop="goods_name" header-align="center" width="140">
                    </el-table-column>
                    <!-- <el-table-column label="商品类型" prop="cate_type" header-align="center" width="140">
                    </el-table-column> -->
                    <el-table-column label="配送中心" prop="check.entrepot_name" header-align="center" width="140">
                    </el-table-column>
                    <el-table-column label="商品编号" prop="sku_sn" header-align="center" width="140">
                    </el-table-column>
                    <el-table-column label="仓库数量" prop="entrepot_count" header-align="center" width="120">
                    </el-table-column>
                    <el-table-column label="盘点数量" prop="check_count" header-align="center" width="120">
                        <template slot-scope="scope">
                            <el-input size="small" v-model.number="scope.row.check_count"
                                placeholder="盘点数量" @change="handleChange(scope.row)">
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品价格" prop="goods_price" header-align="center" width="120">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.goods_price" 
                                placeholder="必填" @change="handlePrice(scope.row)">
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="盘盈" align="center">
                        <el-table-column label="盘盈数量" prop="profit_count" header-align="center" width="120">
                        </el-table-column>
                        <el-table-column label="释放金额" prop="profit_money" header-align="center" width="120">
                        </el-table-column>
                    </el-table-column>

                    <el-table-column label="盘亏" align="center">
                        <el-table-column label="盘亏数量" prop="loss_count" header-align="center" width="120">
                        </el-table-column>
                        <el-table-column label="责任金额" prop="loss_money" header-align="center" width="120">
                        </el-table-column>
                    </el-table-column>

                    <!-- <el-table-column label="备注" prop="remark" header-align="center" width="150">
                        <template slot-scope="scope">
                            <el-input size="small" v-model="scope.row.remark" placeholder="填写备注"></el-input>
                        </template>
                    </el-table-column> -->

                    <el-table-column label="操作" fixed="right" header-align="center" width="140">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="checkGoodsOne(scope.row)">盘点</el-button>
                            <el-button type="warning" size="small">维护</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
        </el-row>
        <edit name="check-goods-dialog" 
              :ajax-proxy="ajaxProxy" @check-success="handleReload">
        </edit>
        <!-- <add name="add-dialog" 
              :ajax-proxy="ajaxProxy"
              :types="types"
              @submit-success="handleReload">
        </add> -->
    </div>
</template>

<script>
    import PageMix from '../../mix/Page';
    import SearchTool from '../../mix/SearchTool';
    import DataTable from '../../mix/DataTable';
    import StockCheckAjaxProxy from '../../ajaxProxy/StockCheck';
    // import DistributionCenterProxy from '../../packages/DistributionCenterSelectProxy';
    // import CategorySelectProxy from '../../packages/CategorySelectProxy';
    import GetCheckGoodsSelectProxy from '../../packages/GetCheckGoodsSelectProxy';
    import edit from "./Edit";
    // import add from "./Add";
    import { mapGetters } from 'vuex';

    export default {
        name:'StockCheck',
        pageTitle:"盘存盘点",
        mixins: [PageMix, SearchTool,DataTable],
        components:{
            edit,
            // add,
        },
        data(){
            let validateFormat = (rule, value, callback) =>{
                if (value == '') {
                    callback(new Error('请输入数量'));
                }else if(this.editForm.goods_price == '' || this.editForm.goods_price == null){
                    callback(new Error('输入价格才能计算盘盈/盘亏'));
                } else {
                    callback();
                }
            };
            return {
                mainparam:"",
                mainurl:StockCheckAjaxProxy.getUrl(),
                ajaxProxy:StockCheckAjaxProxy,
                searchForm: {
                    check_sn:'',
                    start:'',
                    end:'',
                    date_range:"",
                },
                distributors:[],
                types:[],
                tableData:[],
                editForm:{
                    goods_price:'',
                    check_count:'',
                },
                rules:{
                    goods_price:[
                        {required: true,pattern:/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,message: '格式xx.xx', trigger:'blur'}
                    ],
                    check_count:[
                        {required: true,type:'number',validator: validateFormat, trigger:'blur'}//message: '纯数字',
                    ]
                },

            }
        },
        computed:{
            ...mapGetters([
                'getUser'
            ])
        },
        methods:{
            handleReload(model){
                this.dataTableReload++;
                // console.log(model);
                this.getCheckGoods(model,'check');
                // this.$modal.hide('check-goods-dialog');
                // this.cate_kinds = [];
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
            },
            getCheckGoods(row,field){
                if(field == 'get'){
                    this.GetCheckGoodsProxy.setParam({
                        check_sn:row.check_sn,
                        check_id:row.id,
                    });
                }else if(field == 'check'){
                    this.GetCheckGoodsProxy.setParam({
                        check_sn:row.check_sn,
                        check_id:row.check_id,
                    });
                }
                this.GetCheckGoodsProxy.load();
            },
            checkGoodsData(data){
                this.tableData = data.items;
            },
            checkGoods(row){
                this.$modal.show('check-goods-dialog',{model:row});
            },
            checkGoodsOne(row){
                let vmThis = this;
                if(row.goods_price == '' || row.check_count == ''){
                    this.$message.error('价格或者数量不能为空');
                    return;
                }
                this.ajaxProxy.update(row.id, row).then(function(response){
                    if (response.data.status　==　0) {
                        vmThis.$message.error(response.data.msg ? response.data.msg : "操作失败" );
                    } else {
                        vmThis.$message.success('操作成功');
                        vmThis.handleReload(row);
                    }
                }).catch(function(error){
                    vmThis.$message.error('出错了');
                });
            },
            handlePrice(row){
                let priceFormat = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
                if(!priceFormat.test(row.goods_price)){
                    this.$message.error('价格格式为xx.xx');
                }else{
                    // this.editForm.goods_price = row.goods_price;
                    this.handleChange(row);
                }
            },
            handleChange(row){
                // console.log(row);
                let number = /^[0-9]+$/;
                if(!number.test(row.check_count)){
                    this.$message.error('数量为纯数字');
                    return;
                }
                // this.editForm.check_count = row.check_count;
                let check_count = row.check_count;
                let entrepot_count = row.entrepot_count;
                let goods_price = row.goods_price;
                let $num = check_count-entrepot_count;
                if(goods_price == '' || goods_price == null){
                    this.$message.error('请输入价格才能计算盘盈/盘亏');
                    return;
                }
                if($num>0){
                    row.profit_count = $num;
                    row.profit_money = $num*goods_price;
                    row.loss_count = 0;
                    row.loss_money = 0;
                }else if($num<0){
                    row.profit_count = 0;
                    row.profit_money = 0;
                    row.loss_count = Math.abs($num);
                    row.loss_money = Math.abs($num*goods_price);
                }else{
                    row.profit_count = 0;
                    row.profit_money = 0;
                    row.loss_count = 0;
                    row.loss_money = 0;
                }
                return row;
            },

        },
        created(){
            this.$on('search-tool-change', this.onSearchChange);
            this.GetCheckGoodsProxy = new GetCheckGoodsSelectProxy({},this.checkGoodsData,this);
            //获取配送中心数据
            // let DistributionCenterSelect = new DistributionCenterProxy({}, this.getDistributionCenter, this);
            // DistributionCenterSelect.load();
            // //获取商品类型数据
            // let CategorySelect = new CategorySelectProxy({}, this.getTypes, this);
            // CategorySelect.load();

        }
    }
</script>

<style scoped>
    .form-item-unique{
        width: 170px !important;
    }
    .form-item-unique-one{
        margin-left: 50px;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 30%;
    }
</style>