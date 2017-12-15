<template>
    <div >
        <el-row>
            <el-col>
                <el-form :inline="true" ref="searchForm" class="demo-form-inline"  :model="searchForm">
                    <el-form-item  style="width:170px" prop="name">
                        <el-input v-model="searchForm.name" size="small" placeholder="请输入查询姓名"></el-input>
                    </el-form-item>

                    <el-form-item prop="department_id">
                        <el-select size="small" placeholder="审查专员" v-model="searchForm.department_id">
                            <el-option value="1" label="未审核"></el-option>
                            <el-option value="2" label="审核通过"></el-option>
                            <el-option value="3" label="审核未通过"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="group_id">
                        <el-select size="small" placeholder="回访专员" v-model="searchForm.group_id">
                            <el-option value="1" label="未审核"></el-option>
                            <el-option value="2" label="审核通过"></el-option>
                            <el-option value="3" label="审核未通过"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="user_id">
                        <el-select size="small" placeholder="材料专员" v-model="searchForm.user_id" >
                            <el-option value="1" label="未开单"></el-option>
                            <el-option value="2" label="已开单"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="info" size="small" icon="search" @click="searchToolChange('searchForm')">查询</el-button>
                        <el-button type="info" size="small" icon="search"  @click="addDialog = true">高级查询</el-button>
                        <el-button type="info" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                        <el-tooltip content="点击刷新当前页面" placement="right"  style="margin-left:15px;">
                            <el-button  size="small" type="danger">刷新</el-button>
                        </el-tooltip>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col>
                <el-table :data="tableData" v-loading="dataLoad" border style="width: 100%">
                    <el-table-column label="序号" align="center"  type="index" width="65"></el-table-column>
                    <el-table-column prop="type" label="类型" width="180" align="center"></el-table-column>
                    <el-table-column prop="cb_name" label="客户姓名" align="center"></el-table-column>
                    <el-table-column prop="db_realname" label="跟踪员工" align="center"></el-table-column>
                    <el-table-column prop="product_name" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="product_money" label="商品价格" align="center"></el-table-column>
                    <el-table-column prop="risk_state" label="风控审核" align="center"></el-table-column>
                    <el-table-column prop="risk_name" label="审查专员" align="center"></el-table-column>
                    <el-table-column prop="callback_state" label="回访审核" align="center"></el-table-column>
                    <el-table-column prop="callback_name" label="回访专员" align="center"></el-table-column>
                    <el-table-column prop="buy_time" label="购买时间" align="center"></el-table-column>
                    <el-table-column prop="datastaff_name" label="材料专员" align="center"></el-table-column>
                    <el-table-column prop="status" label="开单" align="center"></el-table-column>
                    <el-table-column prop="name13" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="small" type="info" >查看客户</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row >
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

        <addDialog :add-open="addDialog" @add-window-close="handleAddWindow"/>
    </div>
</template>
      
<script>
    import addDialog from './addDialog';
    import PageMix from '../../mix/Page';
    import DataProxy from '../../packages/DataProxy';
    import SearchTool from '../../mix/SearchTool';
export default {
    name: 'GoodsOut',
    pageTitle:"商品出库",
    mixins: [PageMix,SearchTool],
    components: {
        addDialog
    },
    data () {
        return {
            total:100,
            dataLoad:false,
            addDialog:false,
            searchForm:{
                name:'',
                department_id:'',
                group_id:'',
                user_id:''
            },
            currentPage4:1,
            tableData:[
                {
                    type:'购买',
                    cb_name:'李四',
                    db_realname:'李曼曼',
                    product_name:'点金手高端版',
                    product_money:'8888',
                    risk_state:'通过',
                    risk_name:'审查专员',
                    callback_state:'通过',
                    callback_name:'回访A',
                    buy_time:'2017-11-28',
                    datastaff_name:'刘科',
                    status:'已开单',
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
        handleAddWindow(){
            this.addDialog = false;
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
        let mainProxy = new DataProxy("/riskmanager", this.pageSize, this.mainTableLoad, this);
        this.mainProxy = mainProxy;
        this.mainProxy.load();
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-form-item {
      margin-bottom: 2px;
  }
</style>
