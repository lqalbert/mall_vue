<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true"  ref="searchForm" :model="searchForm" >
                    <el-form-item prop="check_num">
                        <el-input v-model="searchForm.check_num" size="small" placeholder="盘点单号"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" size="small" @click="searchToolChange('searchForm')" icon="search">查询
                        </el-button>
                        <el-button size="small" type="primary" @click="searchToolReset('searchForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :page-size="15">
                    <el-table-column label="序号" align="center" type="index" width="65"></el-table-column>

                    <el-table-column prop="check_num" label="盘点单号" width="180" align="center"></el-table-column>

                    <el-table-column prop="goods_name" label="商品名称" width="180" align="center"></el-table-column>

                    <el-table-column prop="cate_type_id" label="商品类型" width="180" align="center"></el-table-column>

                    <el-table-column prop="entrepot_count" label="商品数量" width="180" align="center"></el-table-column>

                    <el-table-column prop="release_money" label="释放金额(比实际多)" width="180" align="center"></el-table-column>
                    
                    <el-table-column prop="resp_money" label="责任金额(比实际少)" width="180" align="center"></el-table-column>

                    <el-table-column prop="created_at" label="录入时间" width="180" align="center"></el-table-column>

                    <el-table-column label="操作" fixed="right" align="center" width="110">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="showEdit(scope.row)">修改盘点</el-button>
                        </template>
                    </el-table-column>
                    <div slot="buttonbar">
                        <el-button size="small" type="info" @click="showAdd" >录入盘点</el-button>
                    </div> 
                </TableProxy>
            </el-col>
        </el-row>

        <edit name="edit-dialog" 
              :ajax-proxy="ajaxProxy"
              @submit-success="handleReload">
        </edit>
        <add name="add-dialog" 
              :ajax-proxy="ajaxProxy"
              @submit-success="handleReload">
        </add>
    </div>
</template>

<script>
    import PageMix from '../../mix/Page';
    import SearchTool from '../../mix/SearchTool';
    import DataTable from '../../mix/DataTable';
    import StockCheckAjaxProxy from '@/ajaxProxy/StockCheck';
    import edit from "./Edit";
    import add from "./Add";

    export default {
        name:'StockCheck',
        pageTitle:"盘存盘点",
        mixins: [PageMix, SearchTool,DataTable],
        components:{
            edit,
            add,
        },
        data(){
            return {
                mainparam:"",
                mainurl:StockCheckAjaxProxy.getUrl(),
                ajaxProxy:StockCheckAjaxProxy,
                searchForm: {
                    check_num:'',
                },

            }
        },
        methods:{
            handleReload(){
                this.dataTableReload++;
                this.cate_kinds = [];
            },
            showEdit(row){
                this.$modal.show('edit-dialog',{model:row});
            },
            showAdd(){
                this.$modal.show('add-dialog');
            },
            onSearchChange(param){
                this.mainparam = JSON.stringify(param);
            },


        },
        created(){
            this.$on('search-tool-change', this.onSearchChange);
            
        }
    }
</script>

<style scoped>

</style>