<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item  prop="start">
                    <el-date-picker size="small" v-model="searchForm.start"
                                    placeholder="请选择起日期" :picker-options="setPicker"
                                    @change="startDateChange" :clearable="false" class="form-item-unique">
                    </el-date-picker>
                </el-form-item>
                <el-form-item  prop="end">
                    <el-date-picker size="small"
                                    v-model="searchForm.end"
                                    placeholder="请选择止日期" :picker-options="setPicker"
                                    @change="endDateChange" :clearable="false" class="form-item-unique">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="type">
                    <el-select v-model.number="searchForm.type"
                                placeholder="类型" size="small" >
                        <el-option v-for="v in types" :label="v.name"
                                   :value="v.id" :key="v.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="express_sn">
                    <el-input v-model="searchForm.express_sn" size="small" placeholder="快递单号"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询</el-button>
                    <el-button type="primary" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-col>
                 <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :page-size="20" :bubble="bubble" @dbclick="dbClick">
                    <el-table-column type="selection" width="55"> </el-table-column>
                    <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
                    <el-table-column prop="express_name" label="快递名称" align="center" ></el-table-column>
                    <el-table-column prop="express_sn" label="快递单号" align="center"></el-table-column>
                    <el-table-column prop="area_province_name" label="省" align="center"></el-table-column>
                    <el-table-column prop="area_city_name" label="市" align="center"></el-table-column>
                    <el-table-column prop="area_district_name" label="区/县" align="center"></el-table-column>
                    <el-table-column prop="address" label="具体地址" align="center" ></el-table-column>
                    <el-table-column prop="name" label="收件人姓名" align="center"></el-table-column>
                    <el-table-column prop="phone" label="联系电话" align="center" width="140px"></el-table-column>
                    <el-table-column prop="remark" label="备注" align="center" ></el-table-column>
                    <el-table-column  label="操作" align="center" width="250">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="showEdit(scope.row)">编辑</el-button>
                            <el-button size="small" @click="editGoods(scope.row)">添加商品</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                   <div slot="buttonbar">
                        <el-button type="primary" size="small" @click="add">自行寄件</el-button>
                        <el-button type="primary" size="small" @click="addSplit">拆分寄件</el-button>
                        <el-button type="primary" size="small" @click="getWaybillCode">获取面单</el-button>
                        <el-button type="primary" size="small" @click="prints">打印面单</el-button>
                    </div>
                 </TableProxy>
            </el-col>
        </el-row>
        <br>
        <Subdetail :row="model"></Subdetail>
        <add-dialog
                name="add"
                :ajax-proxy="ajaxProxy"
                :distributors="distributors"
                :companys="companys"
                @submit-success="handleReload">
        </add-dialog>
        <add-split-dialog
                name="addSplitDialog"
                :ajax-proxy="ajaxProxy"
                :distributors="distributors"
                :companys="companys"
                @submit-success="handleReload">
        </add-split-dialog>
        <edit-dialog
                name="edit"
                :ajax-proxy="ajaxProxy"
                :distributors="distributors"
                :companys="companys"
                @submit-success="handleReload">
        </edit-dialog>

        <AddGoods name="mail-add-goods"></AddGoods>
        <Waybill name="get-way" :ajax-proxy="ajaxProxy"></Waybill>

    </div>
</template>
<script>
import addDialog from './add.vue';
import editDialog from './edit.vue';
import addSplitDialog from './addSplit.vue';
import config from '@/mix/Delete';
import PageMix from '@/mix/Page';
import SearchTool from '@/mix/SearchTool';
import DataTable from '@/mix/DataTable';
import { mapGetters } from 'vuex';
// import Dialog from '../common/Dialog';
import DistributionCenterAjaxProxy from '@/ajaxProxy/DistributionCenter';
import MailAjaxProxy from '@/ajaxProxy/Mail';
import AreaSelect from '@/packages/AreaSelectProxy';
import ExpressCompanySelectProxy from '@/packages/ExpressCompanySelectProxy';
import Subdetail from './Subdetail';
import AddGoods from './Goods';
import Waybill from './Waybill';
import Print from '@/packages/Print';

export default {
    name: 'Mail',
    pageTitle:"寄件",
    mixins:[PageMix,SearchTool,config,DataTable,],
    components:{
        addDialog,
        editDialog,
        addSplitDialog,
        Subdetail,
        AddGoods,
        Waybill
    },
    data(){
        return {
            setPicker:{
                disabledDate:function(time) {
                    return time.getTime() > Date.now();// - 8.64e7
                }
            },
            mainparam:"",
            mainurl:MailAjaxProxy.getUrl(),
            ajaxProxy:MailAjaxProxy,
            searchForm:{
                start:'',
                end:'',
                type:'',
                express_sn:'',
            },
            distributors:[],
            provinces:[],
            companys:[],
            types:[
                {id:1,name:'自行寄件'},
                {id:2,name:'拆分寄件'},
            ],

            bubble:null,
            model:null,
            multiSelection:[]

        }
    },
    methods:{
        startDateChange(v){
            this.searchForm.start = v;
        },
        endDateChange(v){
            this.searchForm.end = v;
        },
        dbClick(row){
            this.model=row;
        },
        add(){
            this.$modal.show('add', {model:this.model,provinces: this.provinces});
        },
        addSplit(){
            this.$modal.show('addSplitDialog', {model:this.model,provinces: this.provinces});
        },
        showEdit(row){
            this.$modal.show('edit',{model:row,provinces: this.provinces});
        },
        getAjaxProxy(){
            return  this.ajaxProxy;
        },
        onSearchChange(param){
            this.mainparam = JSON.stringify(param);
        },
        getAreaProvinces(data){
            this.provinces = data;
        },
        setAreaProvinces(){
            let areaSelect = new AreaSelect({pid:1},this.getAreaProvinces,this);
            areaSelect.load();
        },
        getExpressCompanySelect(data){
            this.companys = data.items;
        },
        getWaybillCode(){
            if (this.multiSelection.length == 0) {
                this.$message.error('勾选至少一个');
            }else{
                let ids = [];
                this.multiSelection.forEach(element => {
                    ids.push(element.id);
                });

                this.$modal.show('get-way', {ids:ids});
            }
            

        },
        editGoods(row){
            this.$modal.show('mail-add-goods', row);
        },
        handleSelectionChange(val){
            this.multiSelection = val;
        },
        prints(){
            if (this.multiSelection.length == 0) {
                this.$message.error('勾选至少一个');
            }
            let ids = [];
            this.multiSelection.forEach(element => {
                ids.push(element.id);
            });

            MailAjaxProxy.goodsPrint(ids).then((response)=>{
                if (response.data.status == 1) {
                    let printsdata = response.data.data.print_data.map((element)=>{
                        return JSON.parse(element);
                    })
                    Print.doPrints(response.data.data.printer, printsdata);
                }
            });
        }
    },
    created(){
        this.$on('search-tool-change', this.onSearchChange);
        //    获取省份
        this.setAreaProvinces();
        //获取物流公司数据
        let ExpressCompanySelect = new ExpressCompanySelectProxy({}, this.getExpressCompanySelect, this);
        ExpressCompanySelect.load();

        let o = {};
        o['selection-change'] = this.handleSelectionChange;
        this.bubble = o;
    },
    
    
}
</script>
<style scoped>

</style>

