<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" ref="searchForm" :model="searchForm">
                    <el-form-item prop="start">
                        <el-date-picker size="small" v-model="view_start" 
                        placeholder="请选择起日期" :picker-options="setPicker"
                        @change="startDateChange" :clearable="false" class="form-item-unique">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="end">
                        <el-date-picker size="small" 
                        v-model="view_end" 
                        placeholder="请选择止日期" :picker-options="setPicker"
                        @change="endDateChange" :clearable="false" class="form-item-unique">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" @click="setField('lastWeek')">上周</el-button>
                        <el-button size="small" @click="setField('lastMonth')">上月</el-button>
                        <el-button size="small" @click="setField('week')">本周</el-button>
                        <el-button size="small" @click="setField('month')">本月</el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="info" size="small" @click="searchToolChange('searchForm')" icon="search">查询
                        </el-button>
                        <el-button type="info" size="small"  @click="searchToolReset('searchForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" show-summary :page-size="15" :default-sort="{prop: 'cus_count', order: 'descending'}">
                    <el-table-column label="序号" align="center" width="65" type="index"></el-table-column>
                    <el-table-column prop="user_name"  label="员工" width="180"  ></el-table-column>
                    <el-table-column prop="cus_count" sortable='custom' label="录入客户"></el-table-column>
                    <el-table-column prop="obcus_count" sortable='custom' label="购买人数"></el-table-column>
                    <el-table-column prop="ob_count" sortable='custom' label="购买单数"></el-table-column>
                    <el-table-column prop="sobcus_count"  label="成交客户数"></el-table-column>
                    <el-table-column prop="c_cus_count" sortable='custom' label="一般客户数量"></el-table-column>
                    <el-table-column prop="b_cus_count" sortable='custom' label="意向客户数量"></el-table-column>
                    <el-table-column prop="a_cus_count" sortable='custom' label="A类型数量"></el-table-column>
                    <el-table-column prop="d_cus_count" sortable='custom' label="D类型数量"></el-table-column>
                    <el-table-column prop="f_cus_count" sortable='custom' label="F类型数量"></el-table-column>
                    <el-table-column prop="n_cus_count" sortable='custom' label="N类型数量"></el-table-column>
                    <el-table-column prop="track_count" sortable='custom' label="跟踪数"></el-table-column>
                    <el-table-column prop="in_count"  sortable='custom' label="转入"></el-table-column>
                    <el-table-column prop="out_count" sortable='custom' label="转出"></el-table-column>
                    <el-table-column prop="sum_freight"   label="自付邮费"></el-table-column>
                    <el-table-column prop="company_freight"  label="公司邮费"></el-table-column>
                </TableProxy>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import localMix from '../mix/index';

    export default {
        name:'SalesQuantization',
        pageTitle:"销售量化",
        mixins:[localMix],
        data(){
            return {
               
                ajaxProxy:{},

                setPicker:{
                    disabledDate:function(time) {
                        return time.getTime() > Date.now();// - 8.64e7
                    }
                },
                searchForm: {
                    start:"",
                    end:"",
                    type:'user_id',
                    group_id:'',
                },
                
                saleCtrlSelect:true,
                depClearable:true,
                groupClearable:true,
            }
        },
        computed:{
            ...mapGetters([
                'getUser'
            ]),
            
            groups(){
                return this.$store.getters.getGroupsByDepartment(this.searchForm.department_id);
            }
        },
        methods:{
           
            startDateChange(v){
                this.searchForm.start = v;
            },
            endDateChange(v){
                this.searchForm.end = v;
            },
            saleGroupChange(v){
                // console.log(v);
                
            },
        },
        created(){
            this.searchForm.group_id = this.$store.getters.group_id;
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
