<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="company_name">
                    <el-input v-model="searchForm.company_name" size="small" placeholder="物流公司名称"></el-input>
                </el-form-item>
                <el-form-item prop="contact_name">
                    <el-input v-model="searchForm.contact_name" size="small" placeholder="联系人名称"></el-input>
                </el-form-item>
                <el-form-item prop="contact_tel">
                    <el-input v-model="searchForm.contact_tel" size="small" placeholder="联系人号码"></el-input>
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
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" @cellclick="rowCellClick" :page-size="15">

                    <el-table-column label="ID" align="center"  prop="id" width="65">
                    </el-table-column>

                    <el-table-column prop="company_name" label="采购单号" align="center">
                    </el-table-column>

                    <el-table-column prop="contact_name" label="采购单位" align="center">
                    </el-table-column>

                    <el-table-column prop="contact_tel" label="发货单位" align="center">
                    </el-table-column>

                    <el-table-column prop="eng" label="采购状态" align="center">
                    </el-table-column>

                    <el-table-column prop="eng" label="采购人" align="center">
                    </el-table-column>

                    <el-table-column prop="eng" label="采购时间" align="center">
                    </el-table-column>

                    <el-table-column prop="eng" label="商品类型" align="center">
                    </el-table-column>

                    <el-table-column prop="eng" label="商品名称" align="center">
                    </el-table-column>

                    <el-table-column prop="eng" label="采购数量" align="center">
                    </el-table-column>

                    <el-table-column prop="eng" label="商品规格" align="center">
                    </el-table-column>

                    <el-table-column prop="eng" label="采购单价" align="center">
                    </el-table-column>

                    <el-table-column prop="eng" label="总金额" align="center">
                    </el-table-column>

                    <el-table-column prop="eng" label="采购单位" align="center">
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
                        <el-button type="primary" size="small" @click="showAdd">添加申请</el-button>
                        <el-button type="primary" size="small" @click="checkOrder">订单审核</el-button>
                        <el-button type="primary" size="small" @click="showDeliverGoods">确认发货</el-button>
                    </div>

                </TableProxy>
            </el-col>
        </el-row>

        <!-- 写弹窗组件 -->
        <Add name='add-express-company'
             :ajax-proxy="ajaxProxy"
             @submit-success="handleReload">
        </Add>
        <CheckOrder name='add-check-order'
             :ajax-proxy="ajaxProxy"
             @submit-success="handleReload">
        </CheckOrder>

        <DeliverGoods name='add-deliver-goods'
             :ajax-proxy="ajaxProxy"
             @submit-success="handleReload">
        </DeliverGoods>

        <Edit name='edit-express-company'
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
    import ExpressCompanyAjaxProxy from '../../ajaxProxy/ExpressCompany';
    import Add from './Add';
    import Edit from './Edit';
    import CheckOrder from './CheckOrder';
    import DeliverGoods from './DeliverGoods';
    export default {
        name: 'WarehousingProcess',
        pageTitle:"采购管理",
        mixins:[PageMix,SearchTool,DataTable,config,ExpressCompanyAjaxProxy],
        components:{
            Add,
            Edit,
            CheckOrder,
            DeliverGoods
        },
        data(){
            return {
                mainparam:"",
                mainurl:ExpressCompanyAjaxProxy.getUrl(),
                ajaxProxy:ExpressCompanyAjaxProxy,
                searchForm:{
                    company_name:'',
                    contact_name:'',
                    contact_tel:'',
                },
                reFundCheckShow:false
            }
        },
        methods:{
            onSearchChange(param){
                this.mainparam = JSON.stringify(param);
            },
            showAdd(){
                this.$modal.show('add-express-company');
            },

            showEdit(row){
                this.$modal.show('edit-express-company',{model:row});
            },
            getAjaxProxy(){
                return  this.ajaxProxy;
            },
            //订单审核
            checkOrder(){
                if (this.openDialogCheck()) {
                    this.$modal.show('add-check-order', {row: this.row_model});
                }
            },
            //确认发货
            showDeliverGoods(){
                if (this.openDialogCheck()) {
                    this.$modal.show('add-deliver-goods', {row: this.row_model});
                }
            },
            openDialogCheck(){
                if (!this.hasCurrentRow()) {
                    this.$alert('请选择一行', '警告', {
                        confirmButtonText: '确定',
                    })
                    return false;
                } else {
                    return true;
                }
            },
            hasCurrentRow(){
                if (this.row_model) {
                    return true;
                } else {
                    return false;
                }
            },
            rowCellClick(row){
                this.row_model=row;
                if(!this.row_model){
                    this.reFundCheckShow = true;
                }else{
                    this.reFundCheckShow = false;
                }
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

