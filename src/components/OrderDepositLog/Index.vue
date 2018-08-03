<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true"  ref="searchForm" :model="searchForm" >
                    <el-form-item prop="order_sn">
                        <el-input v-model="searchForm.order_sn" size="small" placeholder="订单号"></el-input>
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
                    <el-table-column prop="order.order_sn" label="订单编号" width="180"></el-table-column>
                    <el-table-column prop="action_text" label="操作动作" width="120"></el-table-column>
                    <el-table-column prop="operator" label="操作人员" width="120"></el-table-column>
                    <el-table-column prop="remark" label="操作说明"></el-table-column>
                    <el-table-column prop="created_at" label="操作时间" width="180"></el-table-column>
                </TableProxy>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import PageMix from '../../mix/Page';
    import SearchTool from '../../mix/SearchTool';
    import DataTable from '../../mix/DataTable';
    import OrderDepositLogAjaxProxy from '@/ajaxProxy/OrderDepositLog';

    export default {
        name:'OrderDepositLog',
        pageTitle:"保证金日志",
        mixins: [PageMix, SearchTool,DataTable,OrderDepositLogAjaxProxy],
        components:{

        },
        data(){
            return {
                mainparam:"",
                mainurl:OrderDepositLogAjaxProxy.getUrl(),
                ajaxProxy:OrderDepositLogAjaxProxy,
                searchForm: {
                    order_sn:''
                },
            }
        },
        methods:{
            handleReload(){
                this.dataTableReload++;
            },
            onSearchChange(param){
                param['appends'] =['category'];
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