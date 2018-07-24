<template>
    <div>
        <el-row>
            <el-form :inline="true"  ref="searchForm" :model="searchForm" class="search-bar">
                <el-form-item prop="name">
                    <el-input v-model="searchForm.name" size="small" placeholder="名称"> 
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small" @click="searchToolChange('searchForm')" icon="search">查询</el-button>
                    <el-button size="small" type="primary" @click="searchToolReset('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-col :span="24">
                    <TableProxy 
                        :url="mainurl" 
                        :param="mainparam"
                        :reload="dataTableReload" :page-size="15">
                        <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>
                        <el-table-column label="名称" prop="name"></el-table-column>
                        <el-table-column label="包邮" prop="is_include_text"></el-table-column>
                        <el-table-column label="折扣" prop="discount"></el-table-column>
                        <!-- <el-table-column label="状态" prop="status_text"></el-table-column> -->
                        <el-table-column   align="center" width="180" fixed="right"  label="操作"  >
                            <template slot-scope="scope">
                                <el-button type="success" @click="openEdit(scope.row)"     size="small">编辑</el-button>
                                <el-button type="danger"  @click="handleDelete(scope.row.id)"   size="small" >删除</el-button>
                            </template>
                        </el-table-column>
                        <div slot="buttonbar">
                            <el-button size="small" icon="plus" type="info" @click="showadd" >添加</el-button>
                        </div>
                    </TableProxy>
            </el-col>
        </el-row>

        <!-- 弹窗 -->
        <Add :ajax-proxy="mainurl" @submit-success="handleReload"  name="add-order-type" ></Add>
        <Edit :ajax-proxy="mainurl" @submit-success="handleReload"  name="edit-order-type" ></Edit>
    </div>
</template>
      
<script>
import PageMix from '@/mix/Page';
import SearchTool from '@/mix/SearchTool';
import DataTable from '@/mix/DataTable';
import Add from './Add';
import Edit from './Edit';

import OrderTypeAjax from  '@/ajaxProxy/OrderType';

export default {
    name: 'OrderType',
    pageTitle:"订单类型",
    mixins:[PageMix,SearchTool,DataTable],
    components:{
        Add,
        Edit
    },
    data () {
        return {
            mainurl:OrderTypeAjax,
            mainparam:"",

            searchForm:{
                name:"",
            }
        }
    },
    methods:{
        showadd(){
            this.$modal.show('add-order-type');
        },
        onSearchChange(param){
            param['appends'] = ['is_include_text','status_text']
            this.mainparam = JSON.stringify(param);
        },
        openEdit(row){
            this.$modal.show('edit-order-type', {model:row});
        }
    },
    created(){
        this.$on('search-tool-change', this.onSearchChange);
        this.onSearchChange(this.searchForm);
    }
}
</script>
      
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
      