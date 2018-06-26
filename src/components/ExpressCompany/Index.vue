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
                 <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" @cellclick="rowCellClick" :page-size="10">

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
<el-table :data="ExpressPriceData">
    <!--<TableProxy :url="expresspriceamainurl" :param="expresspricemainparam" :reload="expressPriceDataTableReload" @cellclick="rowExpressPriceCellClick" :page-size="15">-->
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

        <el-table-column  label="操作" align="center" width="200">
            <template slot-scope="scope">
                <el-button type="info" size="small" @click="showEditExpressPrice(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="rowDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>

    <!--</TableProxy>-->

</el-table>

        <el-row type="flex" justify="end">
            <el-col :span="12">
                <div >
                    <el-form :inline="true" :model="searchExpressPriceForm" ref="searchExpressPriceForm" class="demo-form-inline" size="small">
                        <el-form-item prop="area_province_id" label="">
                            <el-select v-model.number="searchExpressPriceForm.area_province_id"
                                       @change="provinceChange" placeholder="请选择省份" size="small" clearable filterable>
                                <el-option v-for="province in provinces" :label="province.name"
                                           :value="province.id" :key="province.id">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item prop="area_city_id" label="">
                            <el-select v-model.number="searchExpressPriceForm.area_city_id"
                                       @change="cityChange" placeholder="请选择城市" size="small" clearable filterable>
                                <el-option v-for="city in cities" :label="city.name"
                                           :value="city.id" :key="city.id">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item prop="area_district_id" label="">
                            <el-select v-model.number="searchExpressPriceForm.area_district_id"
                                       @change="districtChange" placeholder="区/县" size="small" clearable filterable>
                                <el-option v-for="district in districts" :label="district.name"
                                           :value="district.id" :key="district.id">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" size="small" icon="search" @click="searchExpressPrice('searchExpressPriceForm')">查询</el-button>
                            <el-button type="primary" size="small" @click="searchExpressPriceReset('searchExpressPriceForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <!--<slot name="buttonbar"></slot>-->
            </el-col>
            <el-col :span="12" >
                <div class="pull-right">
                    <el-pagination
                            :current-page="currentPage"
                            :page-size="page_size"
                            layout="total, prev, pager, next, jumper"
                            :total="ExpressPriceDataTotal"
                            @current-change="currentChange">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>


        <!--<div slot="buttonbar">-->
            <!--<el-form :inline="true" :model="searchExpressPriceForm" ref="searchExpressPriceForm" class="demo-form-inline" size="small">-->
                <!--<el-form-item prop="area_province_id" label="">-->
                    <!--<el-select v-model.number="searchExpressPriceForm.area_province_id"-->
                               <!--@change="provinceChange" placeholder="请选择省份" size="small" clearable filterable>-->
                        <!--<el-option v-for="province in provinces" :label="province.name"-->
                                   <!--:value="province.id" :key="province.id">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->

                <!--<el-form-item prop="area_city_id" label="">-->
                    <!--<el-select v-model.number="searchExpressPriceForm.area_city_id"-->
                               <!--@change="cityChange" placeholder="请选择城市" size="small" clearable filterable>-->
                        <!--<el-option v-for="city in cities" :label="city.name"-->
                                   <!--:value="city.id" :key="city.id">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->

                <!--<el-form-item prop="area_district_id" label="">-->
                    <!--<el-select v-model.number="searchExpressPriceForm.area_district_id"-->
                               <!--@change="districtChange" placeholder="区/县" size="small" clearable filterable>-->
                        <!--<el-option v-for="district in districts" :label="district.name"-->
                                   <!--:value="district.id" :key="district.id">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->

                <!--<el-form-item>-->
                    <!--<el-button type="primary" size="small" icon="search" @click="searchExpressPrice('searchExpressPriceForm')">查询</el-button>-->
                    <!--<el-button type="primary" size="small" @click="searchExpressPriceReset('searchExpressPriceForm')">重置</el-button>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
        <!--</div>-->


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
             @onBeforeClose="beforeclose"
             @resetData="resetData"
        >
        </ExpressPrice>
        <EditExpressPrice name='edit-express-price'
            :ajax-proxy="expresspriceajaxproxy"
            :distributors="distributors"
             @submit-success="handleReload"
             @onBeforeClose="beforeclose"
             @resetData="resetData"
        >
        </EditExpressPrice>

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
import EditExpressPrice from './EditExpressPrice';


export default {
    name: 'ExpressCompany',
    pageTitle:"快递公司",
    mixins:[PageMix,SearchTool,DataTable,config],
    components:{
        Add,
        Edit,
        ExpressPrice,
        EditExpressPrice,
        Address
    },
    data(){
        return {
            page:1,
            currentPage:1,
            pageSize:15,
            mainparam:"",
            expresspricemainparam:"",
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
            searchExpressPriceForm:{
                area_province_id:'',
                area_city_id:'',
                area_district_id:'',
                page_size:15,
            },
            distributors:[],
            provinces:[],
            cities:[],
            districts:[],
            ExpressPriceData:[],
            model:null,
            expressPriceModel:null,
            dataTableReload1:0,
            ExpressPriceDataTotal:0,
            expressPriceDataTableReload:1,
            deleteType:null,
            expresspriceselect:null,
        }
    },
    methods:{
        currentChange(v){
            this.expresspriceselect.setPage(v);
            this.expresspriceselect.load();
        },
        provinceChange(id){
            let areaSelect = new AreaSelect({pid:id,business:'city'},this.getAreaCities,this);
            areaSelect.load();
        },
        cityChange(id){
            let areaSelect = new AreaSelect({pid:id,business:'district'},this.getAreaDistricts,this);
            areaSelect.load();
        },
        districtChange(id){
        },
        getAreaCities(data){
            this.cities = data;
        },
        getAreaDistricts(data){
            this.districts = data;
        },
        searchExpressPrice(name){
            console.log(this[name]);
            this.expresspriceselect.setParam(this[name]);
            this.expresspriceselect.load();
        },
        searchExpressPriceReset(name){
            this.$refs[name].resetFields();
            this.expresspriceselect.setParam({page_size:this.page_size});
            this.expresspriceselect.load();
        },
        handleDelete(id){
            let vmthis = this;
            let ajaxProxy = this.getAjaxProxy();
            if(!ajaxProxy){
                return ;
            }
            this.$confirm('确定删除?', '警告',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                ajaxProxy.delete(id).then(function(response){
                    vmthis.$message.success("操作成功");
                    vmthis.resetData();
                    vmthis.$emit('delete-success');
                }).catch(function(error){
                    vmthis.$message.error("出错了")
                });
            });
        },

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
        showEditExpressPrice(row){
            this.$modal.show('edit-express-price',{model:row,provinces: this.provinces});
        },
        rowDelete(row){
            if(row.area_city_id){
                this.deleteType = 1;
                this.handleDelete(row.id);
            }


            // return  this.ajaxProxy;
        },
        getAjaxProxy(){
            if(this.deleteType){
                return this.expresspriceajaxproxy;
            }else{
                return  this.ajaxProxy;
            }

        },
        rowCellClick(row){
            this.model=row;
            this.express_id=row.id;
            // this.setExpressPrice();
        },
        beforeclose(){
            this.setExpressPrice();
        },
        resetData(name){
            this.searchExpressPrice(name);
            // this.searchToolReset('searchForm');
            // this.searchToolReset('searchExpressPriceForm');

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
            this.ExpressPriceDataTotal = data.total;
        },
        setAreaProvinces(){
            let areaSelect = new AreaSelect({pid:1},this.getAreaProvinces,this);
            areaSelect.load();
        },
        setExpressPrice(){//获取快递价格信息
            // let expresspriceselect = new ExpressPriceSelect({express_id:this.express_id,pageSize:15},this.getExpressPrice,this);
            let expresspriceselect = new ExpressPriceSelect({},this.getExpressPrice,this);
           this.expresspriceselect = expresspriceselect;
           this.expresspriceselect.setPageSize(this.pageSize);
            this.expresspriceselect.load();
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
        //获取快递价格
        this.setExpressPrice();
    },
    mounted(){

    },
    
}
</script>
<style scoped>

</style>

