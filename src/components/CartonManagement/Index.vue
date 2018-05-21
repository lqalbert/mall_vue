<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="carton_name">
                    <el-input v-model="searchForm.carton_name" size="small" placeholder="纸箱类型"></el-input>
                </el-form-item>
                <el-form-item prop="carton_model">
                    <el-input v-model="searchForm.carton_model" size="small" placeholder="纸箱型号"></el-input>
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
                 <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :page-size="15">

                    <el-table-column label="ID" align="center"  prop="id" width="65">
                    </el-table-column>

                    <el-table-column prop="carton_name" label="纸箱类型" align="center">
                    </el-table-column>

                    <el-table-column prop="carton_model" label="纸箱型号" align="center">
                    </el-table-column>

                    <el-table-column prop="carton_long" label="纸箱长度(mm)" align="center">
                    </el-table-column>

                    <el-table-column prop="carton_wide" label="纸箱宽度(mm)" align="center">
                    </el-table-column>

                     <el-table-column prop="carton_high" label="纸箱高度(mm)" align="center">
                    </el-table-column>

                     <el-table-column prop="carton_weight" label="纸箱重量(g)" align="center">
                    </el-table-column>

                     <el-table-column prop="carton_number" label="纸箱数量" align="center">
                    </el-table-column>

                    <el-table-column prop="remark" label="备注" align="center" :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column  label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="showEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>

                   <div slot="buttonbar">
                        <el-button type="primary" size="small" @click="showAdd">添加</el-button>
                    </div>

                 </TableProxy>
            </el-col>
        </el-row>

        <!-- 写弹窗组件 -->
        <Add name='add-carton-company'
            :ajax-proxy="ajaxProxy"
             @submit-success="handleReload">
        </Add>

        <Edit name='edit-carton-company'
            :ajax-proxy="ajaxProxy"
            @submit-success="handleReload">
        </Edit>
    </div>
</template>
<script>
import PageMix from '../../mix/Page';
import SearchTool from '../../mix/SearchTool';
import DataTable from '../../mix/DataTable';
import config from '../../mix/Delete';
import CartonManagementAjaxProxy from '../../ajaxProxy/CartonManagement';
import Add from './Add';
import Edit from './Edit';
export default {
    name: 'CartonManagement',
    pageTitle:"纸箱管理",
    mixins:[PageMix,SearchTool,DataTable,config,CartonManagementAjaxProxy],
    components:{
        Add,
        Edit,
    },
    data(){
        return {
            mainparam:"",
            mainurl:CartonManagementAjaxProxy.getUrl(),
            ajaxProxy:CartonManagementAjaxProxy,
            searchForm:{
                carton_name:'',
                carton_model:'',
            },
        }
    },
    methods:{
        onSearchChange(param){
            this.mainparam = JSON.stringify(param);
        },
        showAdd(){
            this.$modal.show('add-carton-company');
        },
        showEdit(row){
            this.$modal.show('edit-carton-company',{model:row});
        },
        getAjaxProxy(){
            return  this.ajaxProxy;
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

