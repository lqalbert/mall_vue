<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="user">
                    <el-input v-model="searchForm.user" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item  prop="type_id">
                    <el-select v-model="searchForm.type_id" placeholder="请选择商品类型">
                        <el-option  v-for="item in items"  :value="item.id"  :label="item.name" :key="item.id"></el-option>
                    </el-select>
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
                    <el-table-column prop="unit_type" label="单位类型" align="center">
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
                            <el-button type="info"    size="small" @click="showEdit">编辑</el-button>
                            <el-button type="danger"  size="small">删除</el-button>
                        </template>

                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple" style="float: left;margin-top: 5px">

                        <el-button size="small" type="warning" icon="delete" @click="handleDeletes">批量删除 </el-button>
                        <el-button size="small" type="primary"  @click="showAdd">添加 </el-button>

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

        <Add  name='add-cosmetics' ></Add>
        <Edit name='edit-cosmetics'></Edit>

    </div>
</template>

<script>
    import Add from './Add';
    import Edit from './Edit';
    import DataProxy from '../../packages/DataProxy';
    import PageMix from '../../mix/Page';
    import SearchTool from '../../mix/SearchTool';
    import TableProxy from '../common/TableProxy';

    export default {
        name: 'Cosmetics',
        pageTitle: "商品详情",
        mixins: [PageMix, SearchTool],
	    components:{Add,Edit},
        data() {
            return {

                items:[
                    {id:1,name:'化妆品'},
                    {id:2,name:'保健品'},
                    ],
                searchForm: {
                    user: '',
                    type_id:''
                },
                currentPage4: 1,
                total: 100,
                dataLoad: false,
                tableData:[ {

                    'goods_name':'自然堂护肤品',
                    'goods_price':'399.00',
                    'goods_number':25468137,
                    'goods_type':'化妆品',
                    'unit_type':'瓶',
                    'new_goods':true,
                    'hot_goods':true,
                    'recommend_goods':true,
                    'status':true
                },{

                    'goods_name':'自然堂护肤品',
                    'goods_price':'399.00',
                    'goods_number':25468137,
                    'goods_type':'化妆品',
                    'unit_type':'瓶',
                    'new_goods':true,
                    'hot_goods':true,
                    'recommend_goods':true,
                    'status':true
                },{

                    'goods_name':'自然堂护肤品',
                    'goods_price':'399.00',
                    'goods_number':25468137,
                    'goods_type':'化妆品',
                    'unit_type':'瓶',
                    'new_goods':true,
                    'hot_goods':true,
                    'recommend_goods':true,
                    'status':true
                },{

                    'goods_name':'自然堂护肤品',
                    'goods_price':'399.00',
                    'goods_number':25468137,
                    'goods_type':'化妆品',
                    'unit_type':'瓶',
                    'new_goods':true,
                    'hot_goods':true,
                    'recommend_goods':true,
                    'status':true
                },],

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
                  // console.log(res_data[x]);
                  res_data[x].new_goods = res_data[x].new_goods ==1 ? true : false;
                  res_data[x].hot_goods = res_data[x].hot_goods ==1 ? true : false;
                  res_data[x].recommend_goods = res_data[x].recommend_goods ==1 ? true : false;
                  res_data[x].status = res_data[x].status ==1 ? true : false;

              }
                 console.log(res_data);
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

            showAdd(){
                this.$modal.show('add-cosmetics');
            } , showEdit(){
                this.$modal.show('edit-cosmetics');
            }


        },

        created() {
            // this.toggleTableLoad();
            // let mainProxy = new DataProxy("/cosmetics", this.pageSize, this.mainTableLoad, this);
            // this.mainProxy = mainProxy;
            // this.mainProxy.load();

            // this.$on('search-tool-change', this.onSearchChange);

        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
