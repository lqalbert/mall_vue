<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="user">
                    <el-input v-model="searchForm.user" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="info" >全部</el-button>
                    <el-button size="small" type="info" >化妆品</el-button>
                    <el-button size="small" type="info" >保健品</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询
                    </el-button>
                    <el-button type="primary" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-col>
                <el-table :data="tableData" v-loading="dataLoad" border style="width: 100%">
                    <el-table-column type="selection" align="center" width="50"></el-table-column>

                    <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>

                    <el-table-column prop="goods_name" label="商品名称" width="180" align="center">
                    </el-table-column>

                    <el-table-column prop="goods_price" label="商品价格" align="center">
                    </el-table-column>
                    <el-table-column prop="goods_number" label="商品货号" align="center">
                    </el-table-column>

                    <el-table-column prop="goods_type" label="商品分类" align="center">
                    </el-table-column>
                    <el-table-column prop="goods_sum" label="总库存量" align="center">
                    </el-table-column>
                    <el-table-column prop="sale_goods" label="已销售量" align="center">
                    </el-table-column>
                    <el-table-column prop="surplus_goods" label="剩余库存" align="center">
                    </el-table-column>
                    <el-table-column prop="new_goods" label="新品" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.new_goods"
                                    on-color="#13ce66"
                                    off-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="hot_goods" label="热卖" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.hot_goods"
                                    on-color="#13ce66"
                                    off-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="recommend_goods" label="推荐" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.recommend_goods"
                                    on-color="#13ce66"
                                    off-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="上下架" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.status"
                                    on-color="#13ce66"
                                    off-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column  label="操作" align="center" width="140">
                        <template slot-scope="scope">
                            <el-button type="info"    size="small">编辑</el-button>
                            <el-button type="danger"  size="small">删除</el-button>
                        </template>

                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple" style="float: left;margin-top: 5px">
                    <el-tooltip content="多选批量删除" placement="right">
                        <el-button size="small" type="warning" icon="delete" @click="handleDeletes">批量删除
                        </el-button>
                    </el-tooltip>
                </div>
            </el-col>
            <div class="pull-right" style="float: right;margin-top: 5px">
                <el-col :span="12">
                    <el-pagination
                            :current-page="currentPage4"
                            :page-size="100"
                            layout="total, prev, pager, next, jumper"
                            :total="total"
                            @current-change="currentChange">
                    </el-pagination>
                </el-col>
            </div>
        </el-row>
	<el-row>
            
            <!--<TableProxy -->
                <!--:url="mainurl" -->
                <!--:param="mainparam"-->
                <!--:bubble="tableEvents"-->
                <!--&gt;-->
                <!--<el-table-column type="selection" align="center" width="50"></el-table-column>-->
                <!--<el-table-column label="序号" align="center"  type="index" width="80"></el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="title"-->
                    <!--label="标题"-->
                    <!--width="180"-->
                    <!--align="center"-->
                    <!--sortable='custom'>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="content"-->
                    <!--label="内容"-->
                    <!--align="center"-->
                <!--&gt;-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="time"-->
                    <!--label="发送时间"-->
                    <!--align="center">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="operator"-->
                    <!--label="操作人员"-->
                    <!--align="center">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--prop="operator"-->
                <!--label="操作人员"-->
                <!--align="center">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button size="small" type="primary" @click="buy(scope.row)">购买</el-button>-->
                        <!--<el-button size="small" type="info">续费</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<div slot="buttonbar">-->
                    <!--<el-button>abc</el-button>-->
                <!--</div>-->
            <!--</TableProxy>-->



        </el-row>
    </div>
</template>

<script>
    import DataProxy from '../../packages/DataProxy';
    import PageMix from '../../mix/Page';
    import SearchTool from '../../mix/SearchTool';
    import TableProxy from '../common/TableProxy';

    export default {
        name: 'Cosmetics',
        pageTitle: "商品列表",
        mixins: [PageMix, SearchTool],
	    components:{TableProxy},
        data() {
            return {
                searchForm: {
                    user: '',
                },
                currentPage4: 1,
                total: 100,
                dataLoad: false,
                tableData: [
                    {title: '预查冲突', content: '手机号冲突:15642104241', time: '2017-11-23 10:19:20', operator: '王姣姣'},
                ],

                tableEvents:{
                    'row-click':this.onRowclick
                },

                mainparam:"",



            }
        },
        methods: {
            dataReload: function () {

                this.mainProxy.load();
            },
            searchReset: function () {

            },
            handleDeletes: function () {

            },
            mainTableLoad(data) {
                this.toggleTableLoad();
                let res_data = data.items;
                for(var x in res_data){
                    res_data[x].new_goods = res_data[x].new_goods ==1 ? true : false;
                    res_data[x].hot_goods = res_data[x].hot_goods ==1 ? true : false;
                    res_data[x].recommend_goods = res_data[x].recommend_goods ==1 ? true : false;
                    res_data[x].status = res_data[x].status ==1 ? true : false;
                }
                this.tableData = res_data;
                this.total = data.total;
            },
            currentChange(v) {
                this.toggleTableLoad();
                this.mainProxy.setPage(v).load();
            },
            toggleTableLoad() {
                this.dataLoad = !this.dataLoad;
            },

            onSearchChange(param) {
                this.toggleTableLoad();

                this.mainProxy.setExtraParam(JSON.stringify(param)).load();
            },

            showTrack(field) {
                let param = {
                    user_id: 1,
                    track_num: 1212,
                }
                this.$emit('search-tool-change', param);
            },

            onRowclick(asdf){

            }


        },

        created() {
            this.toggleTableLoad();
            let mainProxy = new DataProxy("/cosmetics", this.pageSize, this.mainTableLoad, this);
            this.mainProxy = mainProxy;
            this.mainProxy.load();

            this.$on('search-tool-change', this.onSearchChange);

        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
