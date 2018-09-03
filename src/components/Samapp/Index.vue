<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" ref="searchForm" :model="searchForm">
                    <el-form-item label="开始时间" prop="start">
                        <el-date-picker size="small" v-model="searchForm.start" 
                        placeholder="请选择起日期" :picker-options="setPicker"
                        @change="startDateChange" :clearable="false" class="form-item-unique">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="截止时间" prop="end">
                        <el-date-picker size="small" 
                        v-model="searchForm.end" 
                        placeholder="请选择止日期" :picker-options="setPicker"
                        @change="endDateChange" :clearable="false" class="form-item-unique">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="申请人" prop="applicant">
                        <el-input size="small" v-model="searchForm.applicant" placeholder="申请人" class="form-item-unique">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="审核状态" prop="check_status">
                        <el-select size="small" placeholder="请选择" v-model="searchForm.check_status" class="form-item-unique" clearable>
                            <el-option value="0" label="待审核"></el-option>
                            <el-option value="1" label="审核通过"></el-option>
                            <el-option value="2" label="审核未通过"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="info" size="small" @click="searchToolChange('searchForm')" 
                            icon="search">查询
                        </el-button>
                        <el-button type="info" size="small"  @click="searchToolReset('searchForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" @cellclick="rowCellClick" :page-size="15">
                    <el-table-column label="序号" align="center" width="65" type="index"></el-table-column>

                    <el-table-column prop="app_time" label="申请时间" width="180"></el-table-column>

                    <el-table-column prop="use_remark" label="用途备注" show-overflow-tooltip></el-table-column>

                    <!-- <el-table-column prop="goods_name" label="申请商品"></el-table-column> -->

                    <!-- <el-table-column prop="num" label="数量"></el-table-column> -->

                    <el-table-column prop="applicant" label="申请人"></el-table-column>

                    <el-table-column prop="operator" label="操作人"></el-table-column>

                    <el-table-column prop="check_status" label="审核状态" width="120">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.check_status == 0">待审核</el-tag>
                            <el-tag v-else-if="scope.row.check_status == 1" type="primary">审核通过</el-tag>
                            <el-tag v-else-if="scope.row.check_status == 2" type="danger">审核未通过</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column prop="check_remark" label="审核备注" show-overflow-tooltip></el-table-column>

                    <el-table-column prop="check_time" label="审核时间" width="180"></el-table-column>

                    <div slot="buttonbar">
                        <el-button type="primary" size="small" @click="sampleAdd">申请</el-button>
                        <el-button type="primary" size="small" @click="sampleCheck" if="isAdmin" >审核</el-button>
                        <el-button type="info" size="small" @click="showGoods">查看商品</el-button>
                    </div>

                </TableProxy>
            </el-col>
        </el-row>
        <!-- 弹窗 -->
        <Add :ajax-proxy="ajaxProxy" @submit-success="handleReload" name="add-sample" ></Add>
        <Check :ajax-proxy="ajaxProxy" @submit-success="handleReload" name="check-sample"></Check>
        <show-goods name="show-goods"></show-goods>
    </div>
</template>

<script>
    import PageMix from '@/mix/Page';
    import SearchTool from '@/mix/SearchTool';
    import DataTable from '@/mix/DataTable';
    import SampleApplicationAjax from '../../ajaxProxy/SampleApplication.js';
    import { mapGetters } from 'vuex';
    import Add from './Add';
    import Check from './Check';
    import showGoods from './ShowGoods';

    export default {
        name:'Samapp',
        pageTitle:"样品申请",
        mixins: [PageMix, SearchTool,DataTable],
        components:{
            Add,
            Check,
            showGoods
        },
        data(){
            return {
                mainparam:"",
                mainurl:SampleApplicationAjax.getUrl(),
                ajaxProxy:SampleApplicationAjax,
                setPicker:{
                    disabledDate:function(time) {
                        return time.getTime() > Date.now();// - 8.64e7
                    }
                },
                searchForm: {
                    start:'',
                    end:'',
                    applicant:'',
                    check_status:''
                },
                row_model:null,
                
            }
        },
        computed:{
            ...mapGetters([
                'getUser',
                'isAdmin'
            ]),
            // departments(){
            //     return this.$store.getters.getDepartments;
            // },
            // groups(){
            //     return this.$store.getters.getGroupsByDepartment(this.searchForm.department_id);
            // }
        },
        methods:{
            hasCurrentRow(){
                if (this.row_model) {
                    return true;
                } else {
                    return false;
                }
            },
            openDialogCheck(){
                if (!this.hasCurrentRow()) {
                    this.$message.error('请选择一行');
                    return false;
                } else {
                    return true;
                }
            },
            onSearchChange(param){
                this.mainparam = JSON.stringify(param);
            },
            startDateChange(v){
                this.searchForm.start = v;
            },
            endDateChange(v){
                this.searchForm.end = v;
            },
            sampleAdd(){
                this.$modal.show('add-sample');
            },
            sampleCheck(){
                if (this.openDialogCheck()) {
                    if (this.row_model.check_status >0) {
                        this.$message.error('已审核，不能再审核');
                        return ;
                    }
                    // console.log(this.row_model);
                    this.$modal.show('check-sample', {row: this.row_model});
                }
            },
            rowCellClick(row){
                this.row_model=row;
            },
            showGoods(){
                if (this.openDialogCheck()) {
                    this.$modal.show('show-goods', {row: this.row_model});
                }
            }
        },
        created(){
            // this.$store.dispatch('initDepartments');

            this.$on('search-tool-change', this.onSearchChange);
            this.onSearchChange(this.searchForm);
        }
    }
</script>

<style scoped>
    .form-item-unique{
        width: 140px !important;
    }
    .name-input{
        max-width: 170px;
    }
    .name-input-area{
        max-width: 220px;
    }
    .pull-right {
        float: right;
    }

    .input-width {
        width: 120px;
    }
</style>
