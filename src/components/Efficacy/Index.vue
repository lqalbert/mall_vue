<template>
    <div>
        <el-row>
            <el-form :inline="true"  ref="searchForm" class="demo-form-inline" :model="searchForm">
                <el-form-item label="方案名称" prop="name">
                    <el-input size="small" v-model="searchForm.name" class="form-item-unique"></el-input>
                </el-form-item>
                <el-form-item label="关键字" prop="key_words">
                    <el-input size="small" v-model="searchForm.key_words" class="form-item-unique"></el-input>
                </el-form-item>
                <el-form-item label="适用情况" prop="situation">
                    <el-input size="small" v-model="searchForm.situation" class="form-item-unique"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询
                    </el-button>
                    <el-button size="small" type="primary" @click="searchToolReset('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-col>
                <TableProxy
                        :url="mainurl"
                        :param="mainparam"
                        @dbclick="rowDbClick"
                        :reload="dataTableReload" :page-size="15">
                    <el-table-column label="序号" align="center" type="index" width="65">
                    </el-table-column>

                    <el-table-column label="编号" align="center" prop="plan_id" header-align="center">
                    </el-table-column>

                    <el-table-column label="方案名称" align="center" prop="name" header-align="center">
                    </el-table-column>

                    <el-table-column label="关键字" show-overflow-tooltip align="center" prop="key_words" header-align="center">
                    </el-table-column>

                    <el-table-column label="适用情况" show-overflow-tooltip align="center" prop="situation" header-align="center">
                    </el-table-column>

                    <el-table-column label="搭配建议" show-overflow-tooltip align="center" prop="suggestion" header-align="center">
                    </el-table-column>

                    <el-table-column label="修改时间" align="center" prop="updated_at" header-align="center">
                    </el-table-column>

                    <el-table-column label="编写人员" align="center" prop="user.realname" header-align="center">
                    </el-table-column>

                    <el-table-column width="180" fixed="right"  label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="success" @click="showEdit(scope.row)" size="small">编辑</el-button>
                            <el-button type="danger"  @click="handleDelete(scope.row.id)" size="small" >删除</el-button>
                        </template>
                    </el-table-column>

                    <div slot="buttonbar">
                        <el-button size="small" icon="plus" type="info" @click="showAdd" >添加</el-button>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>

        <Add
            name="add-efficacy"
            :ajax-proxy="ajaxProxy"
            :cate-options="cateOptions"
            @submit-success="handleReload">
        </Add>

        <Edit
            name="edit-efficacy"
            :ajax-proxy="ajaxProxy"
            :cate-options="cateOptions"
            @submit-success="handleReload">
        </Edit>

        <sub-detail :row="dbRow"/>
    </div>
</template>

<script>
  import Add from './Add.vue';
  import Edit from './Edit.vue';
  import PageMix from '../../mix/Page';
  import SelectProxy from  '../../packages/SelectProxy';
  import SearchTool from '../../mix/SearchTool';
  import DataTable from '../../mix/DataTable';
  import EfficacyAjaxProxy from '../../ajaxProxy/Efficacy';
  import SubDetail from './SubDetail';

  export default {
    name: 'Efficacy',
    pageTitle: "护理方案",
    mixins: [PageMix, SearchTool,DataTable],
    components: {
      SubDetail,
      Add,
      Edit
    },
    data() {
      return {
        ajaxProxy: EfficacyAjaxProxy,
        mainurl:EfficacyAjaxProxy,
        mainparam:"",
        searchForm: {
          name: "",
          key_words: "",
          situation: ""
        },
        cateOptions:[],
        currentRow:null,
        tableData1: [],
        getCateCascaderUrl:"/tree",
        dbRow:null,
      }
    },
    methods: {
      getAjaxProxy(){
        return  this.ajaxProxy;
      },
      onSearchChange(param) {
        this.mainparam = JSON.stringify(param);
      },
      showAdd(){
        this.$modal.show('add-efficacy');
      },
      showEdit: function (row) {
        // this.currentRow = row;
        this.$modal.show('edit-efficacy', {model:row});
      },
      doubleClick(row, event){
        console.log(row);
      },
      initCateOptions(data){
        this.cateOptions = data.items;
      },
      getCateCascader(){
        let selectProxy = new SelectProxy(this.getCateCascaderUrl,this.initCateOptions,this);
        selectProxy.load();
      },
      rowDbClick(row){
        this.dbRow = row;
      },
    },
    created() {
      this.$on('search-tool-change', this.onSearchChange);
      this.getCateCascader();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
