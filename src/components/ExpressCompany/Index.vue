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
                <el-form-item prop="company_name">
                    <el-input v-model="searchForm.company_name" size="small" placeholder="快递公司"></el-input>
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

                    <el-table-column prop="company_name" label="快递公司" align="center">
                    </el-table-column>
                    <el-table-column prop="eng" label="cpcode" align="center">
                    </el-table-column>

                    <el-table-column prop="entrepot_name" label="配送中心" align="center">
                    </el-table-column>

                    <el-table-column prop="contact_name" label="联系人" align="center">
                    </el-table-column>

                    <el-table-column prop="contact_tel" label="联系方式" align="center">
                    </el-table-column>

                    

                    <el-table-column prop="remark" label="备注" align="center" :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column  label="操作" align="center" width="240">
                        <template slot-scope="scope">
                            <el-button size="small" @click.stop="setAddress(scope.row)">发货地址</el-button><el-button type="info" size="small" @click.stop="showEdit(scope.row)">编辑</el-button><el-button type="danger" size="small" @click.stop="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>

                   <div slot="buttonbar">
                        <el-button type="primary" size="small" @click="showAdd">添加</el-button>
                        <el-button type="primary" size="small" @click="showExpressPrice">快递价格</el-button>
                    </div>

                 </TableProxy>
            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-col>
                <el-table :data="ExpressPriceData">
                    <!--<TableProxy :url="expresspriceamainurl" :param="mainparam" :reload="dataTableReload1"  :page-size="15">-->

                        <el-table-column label="ID" align="center"  prop="id" width="65">
                        </el-table-column>

                        <el-table-column prop="express_name" label="快递公司" align="center" width="100px">
                        </el-table-column>

                        <el-table-column prop="area_province_name" label="省" align="center">
                        </el-table-column>

                        <el-table-column prop="area_city_name" label="市" align="center">
                        </el-table-column>

                        <el-table-column prop="area_district_name" label="区/县" align="center">
                        </el-table-column>

                        <el-table-column prop="time_limit" label="时效(天)" align="center" width="100px"></el-table-column>

                        <el-table-column prop="first_weight" label="首重" align="center"></el-table-column>
                        <el-table-column prop="first_price" label="首价" align="center"></el-table-column>
                        <el-table-column prop="continued_weight" label="续重" align="center"></el-table-column>
                        <el-table-column prop="continued_price" label="续价" align="center"></el-table-column>
                        <el-table-column prop="start_time" label="开始时间" align="center" width="150px"></el-table-column>
                        <el-table-column prop="end_time" label="结束时间" align="center" width="150px"></el-table-column>
                        <el-table-column prop="is_use" label="启用" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.is_use==1">是</span>
                                <span v-if="scope.row.is_use==0">否</span>
                            </template>
                        </el-table-column>

                        <el-table-column prop="remark" label="备注" align="center" :show-overflow-tooltip="true">
                        </el-table-column>

                        <!--<el-table-column  label="操作" align="center" width="200">-->
                            <!--<template slot-scope="scope">-->
                                <!--<el-button type="info" size="small" @click="showEdit(scope.row)">编辑</el-button>-->
                                <!--<el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>-->
                            <!--</template>-->
                        <!--</el-table-column>-->


                    <!--</TableProxy>-->

                </el-table>
            </el-col>
        </el-row>
        <!-- 写弹窗组件 -->
        <Add name='add-express-company'
            :ajax-proxy="ajaxProxy"
            :distributors="distributors"
             @submit-success="handleReload">
        </Add>

        <ExpressPrice name='add-express-price'
            :ajax-proxy="expresspriceajaxproxy"
            :distributors="distributors"
             @submit-success="handleReload"
             @onBeforeClose="beforeclose">
        </ExpressPrice>

        <Edit name='edit-express-company'
            :ajax-proxy="ajaxProxy"
            :distributors="distributors"
            @submit-success="handleReload">
        </Edit>

        <Address name="send-address" :ajax-proxy="ajaxProxy"></Address>



    </div>
</template>
<script>
import PageMix from '@/mix/Page';
import SearchTool from '@/mix/SearchTool';
import DataTable from '@/mix/DataTable';
import config from '@/mix/Delete';
import ExpressCompanyAjaxProxy from '@/ajaxProxy/ExpressCompany';
import ExpressPriceAjaxProxy from '@/ajaxProxy/ExpressPrice';
import DistributionCenterProxy from '@/packages/DistributionCenterSelectProxy';
import AreaSelect from '@/packages/AreaSelectProxy';
import ExpressPriceSelect from '@/packages/ExpressPriceProxy';

import Add from './Add';
import Edit from './Edit';
import ExpressPrice from './ExpressPrice';
import Address from './Address';


export default {
    name: 'ExpressCompany',
    pageTitle:"快递公司",
    mixins:[PageMix,SearchTool,DataTable,config],
    components:{
        Add,
        Edit,
        ExpressPrice,
        Address
    },
    data(){
        return {
            mainparam:"",
            mainurl:ExpressCompanyAjaxProxy.getUrl(),
            expresspriceamainurl:ExpressPriceAjaxProxy.getUrl(),
            ajaxProxy:ExpressCompanyAjaxProxy,
            expresspriceajaxproxy:ExpressPriceAjaxProxy,
            searchForm:{
                entrepot_id:'',
                company_name:'',
                contact_name:'',
                contact_tel:'',
            },
            distributors:[],
            provinces:[],
            ExpressPriceData:[],
            model:null,
            dataTableReload1:0,
        }
    },
    methods:{
        onSearchChange(param){
            this.mainparam = JSON.stringify(param);
        },
        showAdd(){
            this.$modal.show('add-express-company');
        },
        showExpressPrice(){
            if (this.selectRowCheck()) {
                this.$modal.show('add-express-price', {model:this.model,provinces: this.provinces});
            }
        },
        showEdit(row){
            this.$modal.show('edit-express-company',{model:row});
        },
        getAjaxProxy(){
            return  this.ajaxProxy;
        },
        rowCellClick(row){
            this.model=row;
            this.setExpressPrice(this.model.id);
        },
        beforeclose(){
            this.setExpressPrice(this.model.id);
        },
        hasCurrentRow(){
            if (this.model) {
                return true;
            } else {
                return false;
            }
        },
        selectRowCheck(){
            if (!this.hasCurrentRow()) {
                this.$alert('请选择一行', '警告', {
                    confirmButtonText: '确定',
                })
                return false;
            } else {
                return true;
            }
        },


        getDistributionCenter(data){
            this.distributors = data.items;
        },
        getAreaProvinces(data){
            this.provinces = data;
        },
        getExpressPrice(data){
            this.ExpressPriceData = data.items;
        },
        setAreaProvinces(){
            let areaSelect = new AreaSelect({pid:1},this.getAreaProvinces,this);
            areaSelect.load();
        },
        setExpressPrice(express_id){
            let expresspriceselect = new ExpressPriceSelect({express_id:express_id,pageSize:15},this.getExpressPrice,this);
            expresspriceselect.load();
        },
        setAddress(row){
            // this.$message.error('发货地址');
           this.$modal.show('send-address', {id:row.id});

        }
    },
    created(){
        this.$on('search-tool-change', this.onSearchChange);
        //获取配送中心数据
        let DistributionCenterSelect = new DistributionCenterProxy({}, this.getDistributionCenter, this);
        DistributionCenterSelect.load();

    //    获取省份
        this.setAreaProvinces();
    },
    mounted(){

    },
    
}
</script>
<style scoped>

</style>

