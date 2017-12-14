<template>
        <div class="hello">
        <el-row>
            <el-form :inline="true"  ref="searchForm" :model="searchForm">

                <el-form-item prop="name" >
                    <el-input size="small" placeholder="请输入单位名"  v-model="searchForm.name">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="dataReload" >查询</el-button>
                    <el-tooltip content="清空搜索框并刷新表格数据" placement="right">
                        <el-button icon="close" type="primary" size="small" @click="searchReset">重置</el-button>
                    </el-tooltip>

                </el-form-item>
            </el-form>
        </el-row>

        <el-row>
            <el-col>
                    <el-table
                    :data="tableData"
                    v-loading.body="dataLoad"
                    border
                    style="width: 100%">
                     <el-table-column label="序号" align="center"  type="index" width="65"></el-table-column>
                    <el-table-column
                            prop="name" label="名称"
                      align="center">
                    </el-table-column>
                    <el-table-column
                            prop="brief" label="备注"
                      align="center"
                     >
                    </el-table-column>



                        <el-table-column label="操作"  align="center" width="180">
                            <template slot-scope="scope">
                                <el-button type="success" @click="editDialog = true"  size="small">编辑</el-button>
                                <el-button type="danger"   size="small">删除</el-button>
                            </template>
                        </el-table-column>

                  </el-table>
            </el-col>
        </el-row>
        <br>
        <el-row >

            <el-col :span="12">
                <div class="grid-content bg-purple">
                <span class="wrapper">
                    <el-tooltip content="事业区" placement="right">
                        <el-button size="small"  @click="addDialog = true" icon="plus" type="primary">添加</el-button>

                    </el-tooltip>
                </span>
                </div>
            </el-col>
             <div class="pull-right">

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

            <!--添加公告 -->


            <addDialog :add-open="addDialog" @add-window-close="handleAddWindow"/>


            <editDialog :edit-open="editDialog" @add-window-close="handleAddWindow"/>

            <!-- / 添加公告 -->

    </div>




</template>

<script>
    import addDialog from './addDialog';
    import editDialog from './editDialog';
    import PageMix from '../../mix/Page';
    import DataProxy from '../../packages/DataProxy';
export default {
    name: 'DepartmentDivision',
    pageTitle:"组织区",
    mixins: [PageMix],
    components: {
        addDialog,
        editDialog

    },
    data () {
        return {
            addDialog:false,
            editDialog:false,
            searchForm:{
                 name:'',

            },
            total:100,
            dataLoad:false,
            currentPage4:1,
            tableData:[
            {name:'哥伦比亚新区',brief:'新新潜力区域'},
            {name:'哥伦比亚新区',brief:'新新潜力区域'},
            {name:'哥伦比亚新区',brief:'新新潜力区域'},
            {name:'哥伦比亚新区',brief:'新新潜力区域'},

            ]
        }
    },
    methods:{
        dataReload:function(){
          console.log(this.searchForm);
        },
        searchReset:function(){
            this.$refs['searchForm'].resetFields();
        },
        refresh:function(){
            this.$refs['searchForm'].resetFields();
        },
        handleEdit:function(){
            this.editDialog =true;
          this.searchForm='';
        },
        handleDelete:function(){
          this.searchForm='';
        },
         openAddDialog:function(){
          this.searchForm='';
        },
         closeDialog:function(){
          this.searchForm='';
        },
         addFormSubmit:function(){
          console.log(this.searchForm);
        },
        startDateChange:function(v){
            this.searchForm.start = v;
        },
        endDateChange:function(v){
            this.searchForm.end = v;
        },

        handleAddWindow(){
             this.addDialog = false;
             this.editDialog = false;

        },
        mainTableLoad(data){
            this.toggleTableLoad();
            this.tableData = data.items;
            this.total = data.total;
        },
        currentChange(v){
            this.toggleTableLoad();
            this.mainProxy.setPage(v).load();
        },
        toggleTableLoad(){
            this.dataLoad = !this.dataLoad;
        }

    },
    created(){
        this.toggleTableLoad();
        let mainProxy = new DataProxy("/DepartmentDivision", this.pageSize, this.mainTableLoad, this);
        this.mainProxy = mainProxy;
        this.mainProxy.load();

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
