<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true"  ref="searchForm" :model="searchForm">
                <el-form-item style="display: none;" prop="id">
                    <el-input  v-model="searchForm.id">
                    </el-input>
                </el-form-item>

                <el-form-item prop="name" >
                    <el-input size="small" placeholder="请输入单位名"  v-model="searchForm.name">
                    </el-input>
                </el-form-item>

                <el-form-item prop="contact" >
                    <el-input size="small" placeholder="请输入联系人"  v-model="searchForm.contact">
                    </el-input>

                </el-form-item>
                <el-form-item prop="tel" >
                    <el-input size="small" placeholder="联系人电话"  v-model="searchForm.tel">
                    </el-input>
                </el-form-item>

                <el-form-item prop="type">
                    <el-select size="small" placeholder="请选择" v-model="searchForm.type" clearable>
                        <el-option v-for="(item,index) in typeList" :value="index" :label="item" :key="index"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button size="small" type="primary" icon="search" @click="searchToolChange('searchForm')" >查询</el-button>
                    <el-tooltip content="清空搜索框并刷新表格数据" placement="bottom-start">
                        <el-button size="small" @click="searchToolReset('searchForm')" type="primary" style="margin-left:10px;">重置</el-button>
                    </el-tooltip>
                </el-form-item>

            </el-form>
        </el-row>


        <el-row>
            <el-col>
                <TableProxy
                        :url="mainurl"
                        :param="mainparam"
                        :reload="dataTableReload">
                    <el-table-column label="序号" align="center"  type="index" width="65">
                    </el-table-column>
                    <el-table-column label="单位名"  prop="name" >
                    </el-table-column>

                    <el-table-column prop="type_text" label="类型" align="center">
                    </el-table-column>

                    <el-table-column label="联系人"  prop="user" align="center">
                    </el-table-column>

                    <el-table-column label="联系电话" prop="phone" align="center">
                    </el-table-column>

                    <el-table-column label="是否启用" align="center" prop="status">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.status"
                                    :on-value="1"
                                    :off-value="0"
                                    on-color="#13ce66"
                                    off-color="#ff4949"
                                    @change="switchHandle(scope.$index, scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>

                    <el-table-column prop="remarks" label="备注" >
                    </el-table-column>

                    <el-table-column   align="center" width="180" fixed="right"  label="操作"  >
                        <template slot-scope="scope">
                            <el-button type="success" @click="openEdit(scope.row)"     size="small">编辑</el-button>
                            <el-button type="danger"  @click="handleDelete(scope.row.id)"   size="small" >删除</el-button>
                            <!-- <el-button type="info"  size="small"> 导出人员 </el-button> -->
                        </template>
                    </el-table-column>
                    <div slot="buttonbar">
                        <el-tooltip content="点击填写公告并发布" placement="right">
                            <el-button size="small" icon="plus" type="info" @click="$modal.show('add-department')" >添加</el-button>
                        </el-tooltip>

                        <el-button size="small" type="info" @click="showSetHr">人事专员</el-button>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>


        <!--<el-row>-->
            <!--<el-col>-->
                <!--<el-table :data="tableData" v-loading="dataLoad" border style="width: 100%">-->
                    <!--<el-table-column label="序号" align="center"  type="index" width="65">-->
                    <!--</el-table-column>-->

                    <!--<el-table-column label="单位名"  prop="name" align="center">-->
                    <!--</el-table-column>-->

                    <!--<el-table-column prop="typeText" label="类型" align="center">-->
                    <!--</el-table-column>-->

                    <!--<el-table-column label="联系人"  prop="contact" align="center">-->
                    <!--</el-table-column>-->

                    <!--<el-table-column prop="tel" label="联系电话" align="center">-->
                    <!--</el-table-column>-->

                    <!--<el-table-column label="是否启用" :context="_self" align="center" prop="status">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-switch-->
                                    <!--v-model="scope.row.switch"-->
                                    <!--on-color="#13ce66"-->
                                    <!--off-color="#ff4949"-->
                                    <!--@change="switchHandle(scope.$index, scope.row)">-->
                            <!--</el-switch>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <!---->
                    <!--<el-table-column prop="remark" label="备注" align="center">-->
                    <!--</el-table-column>-->

                    <!--<el-table-column  :context="_self"  align="center" width="250" fixed="right"  label="操作"  >-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-button type="success" @click="showEdit"     size="small">编辑</el-button>-->
                            <!--<el-button type="danger"  @click="handleDelete()"   size="small" >删除</el-button>-->
                            <!--<el-button type="info"  size="small"> 导出人员 </el-button>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                <!--</el-table>-->
            <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row >-->
            <!--<el-col :span="12">-->
                <!--<div class="grid-content bg-purple">-->

                    <!--<el-button size="small" icon="plus" type="info" @click="showAdd" >添加</el-button>-->

                    <!--<el-button size="small" type="info" @click="showSetHr">人事专员</el-button>-->
                <!--</div>-->
            <!--</el-col>-->
            <!--<div class="pull-right">-->
                <!--<el-col :span="12">-->
                    <!--<el-pagination-->
                            <!--:current-page="currentPage4"-->
                            <!--:page-size="100"-->
                            <!--layout="total, prev, pager, next, jumper"-->
                            <!--:total="total"-->
                            <!--@current-change="currentChange">-->
                    <!--</el-pagination>-->
                <!--</el-col>-->
            <!--</div>-->
        <!--</el-row>-->

        <!--添加公告 -->







        <!-- / 修改公告 -->

        <Add name='add-department'
             :type-list="typeList"
             :ajax-proxy="ajaxProxy"
             @submit-success="handleReload"
        />


        <Edit name='edit-department'
              :type-list="typeList"
              :ajax-proxy="ajaxProxy"
              @submit-success="handleReload"
        />

        <SetHr name='sethr-department'
               :ajax-proxy="ajaxProxy"
               @submit-success="handleReload"
        />

    </div>

</template>

<script>

import Add from './Add';
import Edit from './Edit';
import SetHr from './SetHr';

import DataTable from '../../mix/DataTable';

import PageMix from '../../mix/Page';
import config from '../../mix/Delete';
import DataProxy from '../../packages/DataProxy';
import SearchTool from '../../mix/SearchTool';
import SelectProxy from  '../../packages/SelectProxy';

import DepartAjaxProxy from '../../ajaxProxy/Department';
import TableProxy from '../common/TableProxy';

export default {
    name: 'Department',
    pageTitle:"组织单位",
    mixins: [PageMix,SearchTool,DataTable,config,DepartAjaxProxy],
    components: {
        Add,
        Edit,
        SetHr
    },
    data () {
        return {
            ajaxProxy:DepartAjaxProxy,
            mainurl:DepartAjaxProxy.getUrl(),
            mainparam:"",
            depTypeName:"选择单位类型",
            typeList:["销售部", "客服部", "风控部", "人事部", "推广部", "投顾部"],

            total:100,
            dataLoad:false,
            searchForm:{
                name:"",
                id:"0",
                contact:"",
                tel:"",
                type:""
            },

        }
    },
    methods:{
        getAjaxProxy(){
            return  this.ajaxProxy;
        },
        dataReload:function(){
          console.log(this.searchForm);
        },
        searchReset:function(){
            this.$refs['searchForm'].resetFields();
        },
        refresh:function(){
            this.$refs['searchForm'].resetFields();
        },
        depTypeChange:function(v){
            this.searchForm.type=v;
            this.depTypeName = this.typeList[v];
        },

         addFormSubmit:function(){
          console.log(this.addForm);
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
        },

        onSearchChange(param){
            this.mainparam = JSON.stringify(param);
        },initDepartmentType(data){
            this.typeList = data;
        },
        departMentInit(){
            let selectProxy = new SelectProxy(DepartAjaxProxy.getUrl(), this.initDepartmentType, this);
            selectProxy.setExtraParam({business:'DepartmentType'}).load();
        },

        showAdd(){
            this.$modal.show('add-department');
        } ,
        openEdit(row){
            // this.editRow = row;
            this.$modal.show('edit-department', {model:row});
        } ,
        showSetHr(){
            // this.$modal.show('sethr-department');
        }

    },
    created(){

        this.$on('search-tool-change', this.onSearchChange);

        this.departMentInit();



    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
