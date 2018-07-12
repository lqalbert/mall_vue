<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                    <el-form-item prop="entrepot_id"  label="">
                        <el-select v-model="searchForm.entrepot_id" placeholder="请选择配送中心" size="small">
                            <el-option v-for="v in distributors" :label="v.name"
                                       :value="v.id" :key="v.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="express_id" label="">
                        <el-select v-model="searchForm.express_id"  placeholder="请选择物流公司" size="small">
                            <el-option v-for="v in companys" :value="v.id" :key="v.id" :label="v.company_name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item prop="order_number">
                    <el-input v-model="searchForm.order_number" size="small" placeholder="订单编号"></el-input>
                </el-form-item>
                <el-form-item prop="express_number">
                    <el-input v-model="searchForm.express_number" size="small" placeholder="快递编号"></el-input>
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
                    <el-table-column type="index" width="80" label="序号"></el-table-column>
                    <!-- <el-table-column label="ID" align="center" prop="id"></el-table-column> -->

                    <el-table-column prop="entrepot_name" label="配送中心" align="center"></el-table-column>

                    <el-table-column prop="express_name" label="物流公司" align="center"></el-table-column>

                    <el-table-column prop="deliver_time" label="发货时间" align="center" width="200"></el-table-column>

                    <el-table-column prop="order_number" label="订单编号" align="center"></el-table-column>

                    <el-table-column prop="express_number" label="快递单号" align="center" ></el-table-column>

                    <el-table-column prop="compensation_type" label="赔偿类型" align="center" ></el-table-column>

                    <el-table-column prop="compensation_money" label="赔偿金额" align="center" ></el-table-column>

                    <el-table-column prop="processing_progress" label="处理进度" align="center" ></el-table-column>

                    <el-table-column prop="remark" label="备注" align="center" :show-overflow-tooltip="true"></el-table-column>

                    <el-table-column  label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="showEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>

                   <div slot="buttonbar">
                        <el-button type="primary" size="small" @click="add">添加</el-button>
                    </div>

                 </TableProxy>
            </el-col>
        </el-row>

        <add-dialog
                name="add"
                :ajax-proxy="ajaxProxy"
                :distributors="distributors"
                :companys="companys"
                @submit-success="handleReload">
        </add-dialog>
        <edit-dialog
                name="edit"
                :ajax-proxy="ajaxProxy"
                :distributors="distributors"
                :companys="companys"
                @submit-success="handleReload">
        </edit-dialog>

    </div>
</template>
<script>
import addDialog from './add.vue';
import editDialog from './edit.vue';
import config from '../../mix/Delete';
import PageMix from '../../mix/Page';
import SearchTool from '../../mix/SearchTool';
import DataTable from '../../mix/DataTable';
import { mapGetters } from 'vuex';
// import Dialog from '../common/Dialog';
import ExpressCompensationAjaxProxy from '../../ajaxProxy/ExpressCompensation';
import DistributionCenterProxy from '../../packages/DistributionCenterSelectProxy';
import ExpressCompanySelectProxy from '../../packages/ExpressCompanySelectProxy';


export default {
    name: 'ExpressCompensation',
    pageTitle:"快递赔偿",
    mixins:[PageMix,SearchTool,config,DataTable,ExpressCompensationAjaxProxy],
    components:{
        addDialog,
        editDialog,
    },
    data(){
        return {
            mainparam:"",
            mainurl:ExpressCompensationAjaxProxy.getUrl(),
            ajaxProxy:ExpressCompensationAjaxProxy,
            searchForm:{
                entrepot_id:'',
                express_id:'',
                order_number:'',
                express_number:'',
            },
            distributors:[],
            companys:[],
        }
    },
    methods:{
        add(){
            this.$modal.show('add');
        },
        showEdit(row){
            this.$modal.show('edit',{model:row});
        },
        getAjaxProxy(){
            return  this.ajaxProxy;
        },
        onSearchChange(param){
            this.mainparam = JSON.stringify(param);
        },
        getDistributionCenter(data){
            this.distributors = data.items;
        },
        getExpressCompanySelect(data){
            this.companys = data.items;
        },
    },
    created(){

        //获取配送中心数据
        let DistributionCenterSelect = new DistributionCenterProxy({}, this.getDistributionCenter, this);
        DistributionCenterSelect.load();
        //获取物流公司数据
        let ExpressCompanySelect = new ExpressCompanySelectProxy({}, this.getExpressCompanySelect, this);
        ExpressCompanySelect.load();
        this.$on('search-tool-change', this.onSearchChange);
    },
    mounted(){

    },
    
}
</script>
<style scoped>

</style>

