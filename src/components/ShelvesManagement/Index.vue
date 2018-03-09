<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="shelves_num">
                    <el-input v-model="searchForm.shelves_num" size="small" placeholder="货架编号"></el-input>
                </el-form-item>
                <el-form-item prop="shelves_name">
                    <el-input v-model="searchForm.shelves_name" size="small" placeholder="货架名称"></el-input>
                </el-form-item>
                <el-form-item prop="dc">
                    <el-select v-model="searchForm.dc" size="small" placeholder="配送中心">
                        <el-option label="郑州配送中心" value="1"></el-option>
                        <el-option label="广州配送中心" value="2"></el-option>
                        <el-option label="深圳配送中心" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="shelves_manager">
                    <el-input v-model="searchForm.shelves_manager" size="small" placeholder="货架负责人"></el-input>
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

                    <el-table-column prop="shelves_num" label="货架编号" align="center">
                    </el-table-column>

                    <el-table-column prop="shelves_name" label="货架名称" align="center">
                    </el-table-column>

                    <el-table-column prop="remark" label="备注" align="center">
                    </el-table-column>

                    <el-table-column prop="dc" label="所属配送中心" align="center">
                    </el-table-column>

                    <el-table-column prop="shelves_manager" label="货架负责人" align="center">
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
    name: 'ShelvesManagement',
    pageTitle:"货架管理",
    mixins:[PageMix,SearchTool,DataTable],
    components:{

    },
    data(){
        return {
            mainparam:"",
            mainurl:'',
            ajaxProxy:'',
            searchForm:{
                shelves_num:'',
                shelves_name:'',
                dc:'',
                shelves_manager:'',
            },
            mainData:[
                {id:'17166',shelves_num:'20180309',shelves_name:'大大大大',remark:'很好很好的',dc:'广州配送中心',shelves_manager:'张三丰',},
                {id:'17166',shelves_num:'20180309',shelves_name:'大大大大',remark:'很好很好的',dc:'广州配送中心',shelves_manager:'张三丰',},
                {id:'17166',shelves_num:'20180309',shelves_name:'大大大大',remark:'很好很好的',dc:'广州配送中心',shelves_manager:'张三丰',},
                {id:'17166',shelves_num:'20180309',shelves_name:'大大大大',remark:'很好很好的',dc:'广州配送中心',shelves_manager:'张三丰',},
                {id:'17166',shelves_num:'20180309',shelves_name:'大大大大',remark:'很好很好的',dc:'广州配送中心',shelves_manager:'张三丰',},
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

