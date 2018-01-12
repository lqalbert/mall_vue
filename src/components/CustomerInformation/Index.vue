<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
                <el-form-item prop="name">
                    <el-input v-model="searchForm.name" placeholder="客户姓名" size="small"></el-input>
                </el-form-item>
                <el-form-item prop="phone" >
                    <el-input v-model="searchForm.phone" placeholder="客户手机号" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small"  @click="searchToolChange('searchForm')">查询</el-button>
                    <el-button type="primary" size="small"  @click="searchToolReset('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-col >
                <TableProxy
                        :url="mainurl"
                        :param="mainparam"
                        :reload="dataTableReload">
                    <el-table-column label="序号"  type="index" align="center"></el-table-column>
                    <el-table-column prop="name" label="客户姓名" align="center"></el-table-column>
                    <el-table-column prop="sex" label="性别"  align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.sex==0">未定义</span>
                            <span v-else-if="scope.row.sex==1" >男</span>
                            <span v-else-if="scope.row.sex==2">女</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="age" label="客户年龄" align="center" width="160"></el-table-column>
                    <el-table-column prop="qq" label="QQ号"  align="center" width="160"></el-table-column>
                    <el-table-column prop="qq_nickname" label="QQ昵称" align="center" width="160"></el-table-column>
                    <el-table-column prop="phone" label="手机"  align="center" width="160"></el-table-column>
                    <el-table-column prop="weixin" label="微信号"  align="center" width="160"></el-table-column>
                    <el-table-column prop="weixin_nickname" label="微信昵称"  align="center" width="160"></el-table-column>

                    <el-table-column fixed="right" label="操作" width="280" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small"  @click="openEdit(scope.row)">编辑</el-button>
                            <el-button size="small" type="success" @click="$modal.show('buy-customerinformation')">购买</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                    <div slot="buttonbar">
                            <el-button size="small"  type="info" @click="$modal.show('add-customerinformation')" >添加客户</el-button>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>

        <Add name='add-customerinformation'
             :ajax-proxy="ajaxProxy"
             @submit-success="handleReload">

        </Add>

        <Edit name='edit-customerinformation'
              :ajax-proxy="ajaxProxy"
              @submit-success="handleReload">

        </Edit>

        <!--<ShowAdvQueryDialog name='showadvquerydialog' ></ShowAdvQueryDialog>-->
        <!--<Chat name='chat'></Chat>-->
        <Buy name='buy-customerinformation'
             :ajax-proxy="ajaxProxy"
             :CategoryList="this.CategoryList"
             @submit-success="handleReload"></Buy>


    </div>

</template>

<script>
    import advancedQuery from "./advancedQuery";
    import Add from "./Add";
    import Edit from "./Edit";
    import Chat from "./Chat";
    import Buy from "./Buy";
    import ShowAdvQueryDialog from "./ShowAdvQueryDialog";
    import DataTable from '../../mix/DataTable';

    import PageMix from '../../mix/Page';
    import config from '../../mix/Delete';
    //import DataProxy from '../../packages/DataProxy';
    import SearchTool from '../../mix/SearchTool';
    import SelectProxy from  '../../packages/SelectProxy';

    import Customer from '../../ajaxProxy/Customer';
    import TableProxy from '../common/TableProxy';
    import Category from '../../ajaxProxy/Category';

    export default {
        name: 'CustomerInformation',
        pageTitle: "客户资料",
        mixins: [PageMix,SearchTool,DataTable,config,Customer],
        components: {
           // advancedQuery,
            Add,
            // Chat,
           Edit,
            Buy,
            // ShowAdvQueryDialog
        },
        data() {
            return {
                searchForm: {
                    name:'',
                    phone:''
                },
                currentPage4: 1,
                total: 100,
                dataLoad: false,
                ajaxProxy:Customer,
                mainurl:Customer.getUrl(),
                mainparam:'',
                CategoryList:''

            }
        },
        methods: {
            openEdit(row){
                 //console.log(row);
                this.$modal.show('edit-customerinformation', {model:row});
            },
            getAjaxProxy(){
                return  this.ajaxProxy;
            },
            onSearchChange(param){
                this.mainparam = JSON.stringify(param);
            },
            getCategoryList(data){
                this.CategoryList=data.items;
            },
            getCategory(){
                let selectProxy = new SelectProxy('http://localhost:8000/tree', this.getCategoryList, this);
                 selectProxy.load();
            },
        },
        created(){
            this.$on('search-tool-change', this.onSearchChange);
            this.getCategory();
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-tabs__header {
        border-top: 2px solid #ea4b4b;
        border-bottom: 1px solid #c51f1f;
    }

    .el-tabs--border-card .el-tabs__header {
        background-color: #fff;
        margin: 0;
    }

    .el-form-item {
        margin-bottom: 2px;
    }
</style>
