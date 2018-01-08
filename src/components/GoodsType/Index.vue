<template>
  <div class="hello">
    <el-row>
      <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
        <el-form-item prop="spec_name">
          <el-input v-model="searchForm.type_name" placeholder="请输入类型名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询
          </el-button>
          <el-button type="primary" size="small" @click="searchToolReset('searchForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-table :data="tableData" v-loading="dataLoad" border style="width: 100%">
          <el-table-column type="selection" align="center" width="50"></el-table-column>

          <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>

          <el-table-column prop="type_name" label="类型名称" width="180" align="center">
          </el-table-column>

          <el-table-column prop="type_attr" label="属性标签" align="center">
          </el-table-column>

          <!-- <el-table-column prop="status" label="是否启用" align="center">
            <template slot-scope="scope">
                <el-switch
                        v-model="scope.row.status"
                        on-color="#13ce66"
                        off-color="#ff4949">
                </el-switch>
            </template>
          </el-table-column> -->
          

          <el-table-column prop="created_at" label="添加时间" align="center">
          </el-table-column>

          <el-table-column  label="操作" align="center" width="140">
            <template slot-scope="scope">
              <el-button type="info"    size="small" @click="showEdit(scope.row)">编辑</el-button>
              <el-button type="danger"  size="small" @click="handleDelete(1)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple" style="float: left;margin-top: 5px">
          <el-button size="small" type="danger" @click="handleDeletes">批量删除 </el-button>
          <el-button size="small" type="primary" @click="showAdd">添加类型</el-button>
        </div>
      </el-col>
      <el-col :span="6">
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
      </el-col>
    </el-row>

    <Add  name='add-goods-type' :ajax-proxy="ajaxProxy"></Add>
    <Edit name='edit-goods-type':ajax-proxy="ajaxProxy"></Edit>

  </div>
</template>

<script>
import Add from './Add';
import Edit from './Edit';
import DataProxy from '../../packages/DataProxy';
import PageMix from '../../mix/Page';
import SearchTool from '../../mix/SearchTool';

import GoodsTypeAjaxProxy from '../../ajaxProxy/GoodsType';
import TableProxy from '../common/TableProxy';
export default {
    name: 'GoodsType',
    pageTitle: "商品类型",
    mixins: [PageMix, SearchTool],
    components:{
      Add,Edit
    },
    data() {
        return {
            ajaxProxy:GoodsTypeAjaxProxy,
            searchForm: {
                type_name: '',
            },
            currentPage4: 1,
            total: 100,
            dataLoad: false,
            tableData:[ 
              {
                'type_name':'手机',
                'type_attr':'颜色,内存',
                'created_at':'2018-08-08 08:08:08',
              },{
                'type_name':'女装',
                'type_attr':'产地,颜色',
                'created_at':'2018-08-08 08:08:08',
              },{
                'type_name':'男装',
                'type_attr':'尺寸,颜色',
                'created_at':'2018-08-08 08:08:08',
              },
            ],

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
            this.$modal.show('add-goods-type');
        },
        showEdit(row){
            this.$modal.show('edit-goods-type',{model:row});
        },
        getAjaxProxy(){
           return this.ajaxProxy
        },


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
