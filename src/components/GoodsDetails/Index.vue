<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="goods_name">
                    <el-input v-model="searchForm.goods_name" placeholder="请输入商品名称" size="small"></el-input>
                </el-form-item>
                <el-form-item prop="goods_number">
                    <el-input v-model="searchForm.goods_number" placeholder="请输入商品货号" size="small"></el-input>
                </el-form-item>
                <el-form-item prop="cate_id">
                    <el-cascader
                        expand-trigger="hover"
                        :options="cateOptions"
                        v-model="searchForm.cate_id"
                        @change="handleCateChange"
                        filterable change-on-select 
                        placeholder="选择商品分类" size="small" style="line-height:28px;">
                    </el-cascader>
                </el-form-item>
                <el-form-item prop="start">
                    <el-date-picker v-model="searchForm.start" size="small" type="date"
                        placeholder="商品添加始日期" :picker-options="pickerOptions" @change="getStartTime">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="end">
                    <el-date-picker v-model="searchForm.end" size="small" type="date"
                        placeholder="商品添加止日期" :picker-options="pickerOptions" @change="getEndTime">
                    </el-date-picker>
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
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload">
                    <!-- <el-table-column type="selection" align="center" width="50"></el-table-column> -->
                    <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>

                    <el-table-column prop="goods_name" label="商品名称" width="180" align="center">
                    </el-table-column>

                    <el-table-column prop="goods_price" label="商品价格" align="center">
                    </el-table-column>

                    <el-table-column prop="goods_number" label="商品货号" align="center">
                    </el-table-column>

                    <el-table-column prop="goods_type" label="商品分类" align="center">
                    </el-table-column>

                    <el-table-column prop="unit_type" label="商品单位" align="center">
                        <template slot-scope="scope">
                            {{setUnitTypes(scope.row.unit_type)}}
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="new_goods" label="新品" align="center">
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
                    </el-table-column> -->
                    <el-table-column prop="status" label="上下架" align="center">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.status" on-color="#13ce66" off-color="#ff4949" :on-value="1" :off-value="2">
                            </el-switch>
                        </template>
                    </el-table-column>

                    <el-table-column  label="操作" align="center" width="140">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="showEdit">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>

                    <div slot="buttonbar">
                        <!-- <el-button size="small" type="warning" icon="delete" @click="handleDeletes">批量删除 </el-button> -->
                        <el-button size="small" type="primary"  @click="showAdd">添加商品</el-button>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>

        <Add name='add-goods-details' 
            :ajax-proxy="ajaxProxy"
            :cate-options="cateOptions"
            :upload-url="uploadUrl"
            @submit-success="handleReload">
        </Add>

        <Edit name='edit-goods-details' 
            :ajax-proxy="ajaxProxy"
            :cate-options="cateOptions"
            @submit-success="handleReload">
        </Edit>
    </div>
</template>

<script>
    import Add from './Add';
    import Edit from './Edit';
    //import DataProxy from '../../packages/DataProxy';
    import PageMix from '../../mix/Page';
    import SearchTool from '../../mix/SearchTool';
    import DataTable from '../../mix/DataTable';
    import SelectProxy from  '../../packages/SelectProxy';
    import GoodsDetailsAjaxProxy from '../../ajaxProxy/GoodsDetails';
    import { quillRedefine } from 'vue-quill-editor-upload';
    import URL_CONST from '../../config';

    export default {
        name: 'GoodsDetails',
        pageTitle: "商品详情",
        mixins: [PageMix, SearchTool,DataTable,GoodsDetailsAjaxProxy],
	    components:{
            Add,
            Edit,
            quillRedefine,
        },
        data() {
            return {
                ajaxProxy:GoodsDetailsAjaxProxy,
                mainparam:"",
                mainurl:GoodsDetailsAjaxProxy.getUrl(),
                cateOptions:[],
                UnitTypes:{},
                getCateCascaderUrl:URL_CONST.DOMAIN + "/tree",
                uploadUrl: URL_CONST.UPLOAD_URL,
                searchForm: {
                    goods_name:'',
                    goods_number:'',
                    start:'',
                    end:'',
                    cate_id:[],
                },
                // mainData:[ {
                //     'goods_name':'自然堂护肤品',
                //     'goods_price':'399.00',
                //     'goods_number':25468137,
                //     'goods_type':'化妆品',
                //     'unit_type':'瓶',
                //     'status':true
                // }],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();//- 8.64e7
                    }
                },

            }
        },
        methods: {
            /* mainTableLoad(data) {
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
            }, */
            getAjaxProxy(){
                return this.ajaxProxy;
            },
            initCateOptions(data){
                this.cateOptions = data.items;
                //console.log(this.cateOptions);
            },
            initUnitTypes(data){
                this.UnitTypes = data;
            },
            getCateCascader(){
                let selectProxy = new SelectProxy(this.getCateCascaderUrl,this.initCateOptions,this);
                selectProxy.load();
            },
            getUnitTypes(){
                let selectProxy = new SelectProxy(URL_CONST.DOMAIN + "/goodsdetails",this.initUnitTypes,this);
                selectProxy.setExtraParam({business:'UnitTypes'}).load();
            },
            setUnitTypes(v){
                return this.UnitTypes[v];
            },
            onSearchChange(param) {
                console.log(param);
                if (this.searchForm.start > this.searchForm.end) {
                    this.$message.error("请选择正确的时间段");
                    return ;
                }
                this.mainparam = JSON.stringify(param);
            },
            showAdd(){
                this.$modal.show('add-goods-details',{model:this.UnitTypes});
            },
            showEdit(){
                this.$modal.show('edit-goods-details',{model:row});
            },
            handleCateChange(v){
                console.log(v);
                this.searchForm.cate_id = v;
            },
            getStartTime(v){
                this.searchForm.start = v;
            },
            getEndTime(v){
                this.searchForm.end = v;
            },


        },

        created() {
            this.$on('search-tool-change', this.onSearchChange);
            this.getCateCascader();
            this.getUnitTypes();
            
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-cascader--small .el-cascader__label {
        line-height: 38px;
    }
</style>
