<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="center_name">
                    <el-input v-model="searchForm.center_name" size="small" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item prop="contact_name">
                    <el-input v-model="searchForm.contact_name" size="small" placeholder="联系人"></el-input>
                </el-form-item>
                <el-form-item prop="contact_tel">
                    <el-input v-model="searchForm.contact_tel" size="small" placeholder="联系方式"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询</el-button>
                    <el-button type="primary" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                    <!-- <el-button type="primary" size="small" @click="refreshTable">刷新</el-button> -->
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-col>
                <!-- <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload"> -->
                <el-table :data="mainData" border highlight-current-row style="width: 100%">
                    <el-table-column label="ID" align="center" prop="id">
                    </el-table-column>

                    <el-table-column prop="center_name" label="名称" align="center">
                    </el-table-column>

                    <el-table-column prop="contact_name" label="联系人" align="center">
                    </el-table-column>

                    <el-table-column prop="contact_tel" label="联系方式" align="center">
                    </el-table-column>

                    <el-table-column prop="address" label="地址" align="center">
                    </el-table-column>

                    <el-table-column prop="remark" label="备注" align="center">
                    </el-table-column>

                    <!-- <el-table-column  label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="showEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column> -->

                    <!-- <div slot="buttonbar">
                        <el-button type="primary" size="small" @click="showAdd">添加</el-button>
                    </div> -->
                </el-table>
                <!-- </TableProxy> -->
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="12">
                <!-- <el-button type="primary" size="small" @click="showAdd">添加</el-button>          -->
            </el-col>
            <el-col :span="12" :offset="12">
                <div class="pull-right">
                    <el-pagination
                        :current-page="currentPage"
                        :page-size="pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>   
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import PageMix from '../../mix/Page';
import SearchTool from '../../mix/SearchTool';
import DataTable from '../../mix/DataTable';
export default {
    name: 'DistributionCenter',
    pageTitle:"配送中心",
    mixins:[PageMix,SearchTool,DataTable],
    components:{

    },
    data(){
        return {
            mainparam:"",
            mainurl:'',
            ajaxProxy:'',
            searchForm:{
                center_name:'',
                contact_name:'',
                contact_tel:'',
            },
            mainData:[
                {id:'20180300',center_name:'广州配送中心',contact_name:'张无机',contact_tel:'13666666666',address:'广州市白云区啊啊啊',remark:'这个地方很好啊啊',},
                {id:'20180300',center_name:'广州配送中心',contact_name:'张无机',contact_tel:'13666666666',address:'广州市白云区啊啊啊',remark:'这个地方很好啊啊',},
                {id:'20180300',center_name:'广州配送中心',contact_name:'张无机',contact_tel:'13666666666',address:'广州市白云区啊啊啊',remark:'这个地方很好啊啊',},
                {id:'20180300',center_name:'广州配送中心',contact_name:'张无机',contact_tel:'13666666666',address:'广州市白云区啊啊啊',remark:'这个地方很好啊啊',},
                {id:'20180300',center_name:'广州配送中心',contact_name:'张无机',contact_tel:'13666666666',address:'广州市白云区啊啊啊',remark:'这个地方很好啊啊',},
                {id:'20180300',center_name:'广州配送中心',contact_name:'张无机',contact_tel:'13666666666',address:'广州市白云区啊啊啊',remark:'这个地方很好啊啊',},
            ],
            currentPage:1,
            pageSize:10,
            total:100,
        }
    },
    methods:{
        onSearchChange(param){
            //this.mainparam = JSON.stringify(param);
        },

    },
    created(){
        this.$on('search-tool-change', this.onSearchChange);
    },
    mounted(){

    },
    
}
</script>
<style scoped>

</style>

