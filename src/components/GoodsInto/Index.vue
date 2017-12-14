<template>
    <div >
        <el-row>
            <el-col>
                <el-form :inline="true" ref="searchForm" class="demo-form-inline"  :model="searchForm">
                    <el-form-item prop="state">
                        <el-select size="small" v-model="searchForm.state" placeholder="请选择审核状态">
                            <el-option value="0" label="待审核"></el-option>
                            <el-option value="1" label="通过"></el-option>
                            <el-option value="-1" label="未通过"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" size="small" icon="search" @click="searchToolChange('searchForm')">查询</el-button>
                        <el-tooltip content="点击刷新当前页面" placement="right"  style="margin-left:15px;">
                            <el-button  size="small" type="info" @click="searchToolReset('searchForm')">重置</el-button>
                        </el-tooltip>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-table :data="tableData" v-loading="dataLoad" border style="width: 100%">
                    <el-table-column type="selection"  align="center" width="50" ></el-table-column>
                    <el-table-column label="序号" align="center"  type="index" width="65"></el-table-column>
                    <el-table-column prop="type" label="类型" width="180" align="center"></el-table-column>
                    <el-table-column prop="cb_name" label="客户" align="center"></el-table-column>
                    <el-table-column prop="realname" label="操作员工" align="center"></el-table-column>
                    <el-table-column prop="product_name" label="商品" align="center"></el-table-column>
                    <el-table-column prop="product_money" label="价格" align="center"></el-table-column>
                    <el-table-column prop="state_text" label="审核状态" align="center"></el-table-column>
                    <el-table-column prop="name7" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="small" >查看客户</el-button>
                            <!-- <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-button size="small" type="primary">审核</el-button>
                    <el-button size="small" type="primary">刷新</el-button>
                </div>
            </el-col>
                <el-col :span="12" >
                    <el-pagination
                            :current-page="currentPage4"
                            :page-size="100"
                            layout="total, prev, pager, next, jumper"
                            :total="total"
                            @current-change="currentChange">
                    </el-pagination>
                </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-tabs  type="border-card">
                    <el-tab-pane label="跟踪记录">
                        <el-table :data="tableData1" empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                            <el-table-column prop="user" label="操作员工" header-align="center">
                            </el-table-column>
                            <el-table-column prop="content" label="内容" header-align="center">

                            </el-table-column>

                            <el-table-column prop="created_at" label="跟踪时间" width="180" align="center">
                            </el-table-column>

                            <el-table-column prop="track_text" label="跟踪类型" header-align="center">
                            </el-table-column>
                            <el-table-column prop="track_text" label="跟踪步骤" header-align="center">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="购买纪录">
                        <el-table :data="tableData2" empty-text="请点击客户显示其客户资料" border style="width: 100%">
                            <el-table-column label="产品金额" prop="product_money" header-align="center">
                            </el-table-column>
                            <el-table-column label="产品名称" prop="product_name" header-align="center">
                            </el-table-column>
                            <el-table-column label="产品周期" prop="product_t" header-align="center">
                            </el-table-column>
                            <el-table-column label="购买时间" prop="buy_time" align="center">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="投诉记录">
                        <el-table :data="tableData3"  empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                            <el-table-column prop="user" label="操作员工" header-align="center">
                            </el-table-column>

                            <el-table-column prop="content" label="投诉内容" header-align="center">

                            </el-table-column>

                            <el-table-column prop="created_at" label="投诉时间" width="180" align="center">
                            </el-table-column>

                            <el-table-column prop="type_text" label="投诉类型" align="center">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>

    </div>
</template>
      
<script>
    import PageMix from '../../mix/Page';
    import DataProxy from '../../packages/DataProxy';
    import SearchTool from '../../mix/SearchTool';
export default {
    name: 'GoodsInto',
    pageTitle:"商品入库",
    mixins: [PageMix,SearchTool],
    data () {
        return {
            total:100,
            dataLoad:false,
            searchForm:{
                state:"",
            },
            currentPage4:1,
            tableData:[
                {
                    type:'购买',
                    cb_name:'李四',
                    realname:'李曼曼',
                    product_name:'点金手高端版',
                    product_money:'1888',
                    state_text:'待审核',
                },
            ],
            tableData1:[],
            tableData2:[],
            tableData3:[],
        }
    },
    methods:{
        dataReload:function(){
          console.log(this.searchForm);
        },
        searchReset:function(){

        },
        handleDeletes:function(){

        },
        mainTableLoad(data){
            this.toggleTableLoad();
            this.tableData = data.items;
            this.tableData1 = data.items1;
            this.tableData2 = data.items2;
            this.tableData3 = data.items3;
            this.total = data.total;
        },
        currentChange(v){
            this.toggleTableLoad();
            this.mainProxy.setPage(v).load();
        },
        toggleTableLoad(){
            this.dataLoad = !this.dataLoad;
        },
        onSearchChange(param){
          this.toggleTableLoad();
          this.mainProxy.setExtraParam(param).load();
          this.toggleTableLoad();
        }

    },
    created(){
        this.toggleTableLoad();
        let mainProxy = new DataProxy("/buycheck", this.pageSize, this.mainTableLoad, this);
        this.mainProxy = mainProxy;
        this.mainProxy.load();
       
        this.$on('search-tool-change',this.onSearchChange);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-form-item {
      margin-bottom: 2px;
  }
</style>
