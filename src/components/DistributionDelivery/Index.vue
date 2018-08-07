<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="search-bar" size="small">
                <el-form-item prop="entrepot_id">
                    <el-select v-model="searchForm.entrepot_id" size="small" placeholder="配送中心" clearable>
                        <el-option v-for="v in distributors" :label="v.name"
                                   :value="v.id" :key="v.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="times" class="date-item">
                    <el-date-picker
                            v-model="searchForm.times"
                            type="daterange"
                            size="small"
                            placeholder="选择日期范围"
                            @change="timeChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="pstatus">
                    <el-select v-model="searchForm.pstatus" size="small" placeholder="发货状态" >
                        <el-option label="未审核" value="0"></el-option>
                        <el-option label="已审核" value="1"></el-option>
                        <el-option label="审核未通过" value="2"></el-option>
                        <el-option label="已拦截" value="3"></el-option>
                        <el-option label="已发货" value="4"></el-option>
                        <el-option label="已打印" value="5"></el-option>
                        <el-option label="已验货" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询</el-button>
                    <el-button type="primary" size="small" @click="dataReset('searchForm')">重置</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small" @click="showDialog('advance')">高级查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <!-- table -->
        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :height="400" :page-size="20" :page-sizes="true" :bubble="bubble" :row-class-name="tableRowClassName" @dbclick="dbClick">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="序号" align="center"  type="index" width="65"></el-table-column>
                    <el-table-column label="备注" prop="order.express_remark" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column label="订单类型" prop="order.order_type.name" width="100"></el-table-column>
                    <el-table-column prop="assign_sn" label="发货单号" align="center" width="230">
                        <template slot-scope="scope">
                            {{ scope.row.assign_sn }} <span v-if="scope.row.is_stop==1">(已拦截)</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status_text" label="发货状态" align="center" width="160"></el-table-column>
                    <el-table-column prop="set_express" label="指定快递" align="center" width="160">
                        <!-- 如果没有指定就不显示 如果指定了就显示快递公司名 -->
                        <template slot-scope="scope">
                            <span v-if="scope.row.set_express==1">{{ scope.row.set_express_name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address.area_province_name" label="省份"></el-table-column>
                    <el-table-column prop="address.area_city_name" label="城市"></el-table-column>
                    <el-table-column prop="address.area_district_name" label="区县"></el-table-column>
                    <el-table-column prop="address.address" label="地址" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="address.name" label="收件人" width="90"></el-table-column>
                    <el-table-column prop="order.created_at" label="销售时间" align="center" width="200">
                    </el-table-column>
                    <el-table-column prop="created_at" label="导入时间" align="center" width="200"></el-table-column>
                    <el-table-column prop="express_sn" label="快递单号"  width="200"></el-table-column>
                    <el-table-column prop="express_name" label="快递公司" width="200"></el-table-column>
                    <el-table-column prop="corrugated_case" label="包装箱形" width="180"></el-table-column>
                    <el-table-column prop="send_time" label="发货时间" align="center" width="180"></el-table-column>
                    <el-table-column prop="self_express" label="自提" align="center" width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.self_express==0">否</span>
                            <span v-if="scope.row.self_express==1">是</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="real_weigth" label="实际重量" align="center" width="100"></el-table-column>
                    <el-table-column prop="reckon_weigth" label="估计重量" align="center" width="100"></el-table-column>
                    <el-table-column prop="pass_check" label="审核时间" align="center" width="180"></el-table-column>
                    <el-table-column prop="assign_print_status" label="清单打印状态" align="center" width="200">
                        <template slot-scope="scope">
                            <span v-if="scope.row.assign_print_status==0">未打印</span>
                            <span v-if="scope.row.assign_print_status==1">已打印</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="assign_print_at" label="清单打印时间" align="center" width="200"></el-table-column>
                    <el-table-column prop="express_print_status" label="快递单打印状态" align="center" width="200">
                        <template slot-scope="scope">
                            <span v-if="scope.row.express_print_status==0">未打印</span>
                            <span v-if="scope.row.express_print_status==1">已打印</span>
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="weight" label="重量" align="center" width="200">
                    </el-table-column>
                    <el-table-column prop="assign_fee" label="配送费" align="center" width="200">
                    </el-table-column>
                    <el-table-column prop="express_fee" label="实付运费" align="center" width="200">
                    </el-table-column>
                    <el-table-column prop="express_print_at" label="快递单打印时间" align="center" width="200">
                    </el-table-column>
                    <el-table-column prop="assign_print_at" label="发货单打印时间" align="center" width="200">
                    </el-table-column>
                    <el-table-column prop="sign_at" label="签收时间" align="center" width="200">
                    </el-table-column>
                    <div slot="buttonbar">
                        <el-button type="primary" size="small" @click="openCheck">审核</el-button>
                        <el-button type="primary" size="small" @click="updateWaybill">更新面单</el-button>
                        <!-- 面单还可以取消和回收 -->
                        <el-button type="primary" size="small" @click="openRepeat">返单</el-button>
                        <el-button type="primary" size="small" @click="openStop">拦截/取消</el-button>
                        <el-button type="primary" size="small" @click="editAddress">修改地址</el-button>     

                        <el-button type="primary" size="small"   @click="showExpress">快递单打印</el-button>
                        <el-button type="primary" size="small"   @click="showAssign">发货单打印</el-button>
                        <el-button type="primary" size="small"   @click="editExpressFee">修改实付运费</el-button>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>
        <!-- /table -->
        <br>
        <!-- 下部展示组件 -->
        <SubDetail :row="model">
        </SubDetail>
        <!-- 写弹窗组件 -->
        <edit-address name='edit-address'
            :ajax-proxy="ajaxProxy"
            @submit-success="handleReload">
        </edit-address>

        <Advance name="advance"></Advance>
        <Check name="check" :ajax-proxy="ajaxProxy" @submit-success="handleReload"></Check>
        <RepeatOrder name="repeat-order" :ajax-proxy="ajaxProxy" @submit-success="handleReload"></RepeatOrder>
        <EditExpressFee name="edit-express-free" :ajax-proxy="ajaxProxy" @submit-success="handleReload"></EditExpressFee>
        <StopOrder name="stop-order" :ajax-proxy="ajaxProxy"  @submit-success="handleReload"></StopOrder>

        <!-- <el-button @click="printList">获取打印机列表</el-button>
        <el-button @click="configprint">弹窗式配置打印机</el-button>
        <el-button @click="getPrinterConfig">Fax打印机的配置</el-button>
        <el-button @click="previewPrint">打印预览PDF</el-button>
        <el-button @click="staticPrint">打印静态数据</el-button> -->
        <el-button @click="printGoods2">批量打印清单</el-button>
        <el-button @click="showExpress2">批量打印快递单</el-button>
    </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
</template>
<script>
import PageMix from '@/mix/Page';
import SearchTool from '@/mix/SearchTool';
import DataTable from '@/mix/DataTable';

import EditAddress from './EditAddress';
import SubDetail from './SubDetail';

import Advance from './Advance';
import Check from './Check';
import RepeatOrder from './RepeatOrder';
import StopOrder from './StopOrder';
import EditExpressFee from './EditExpressFee';


import DistributionCenterProxy from '@/packages/DistributionCenterSelectProxy';
import AssignAjaxProxy from '../../ajaxProxy/Assign';
import SelectProxy from  '@/packages/SelectProxy';

//打印
import ws from '@/packages/Print';

const MAX_DAN_LENGTH = 10;

export default {
    name: 'DistributionDelivery',
    pageTitle:"发货单",
    mixins:[PageMix,SearchTool,DataTable],
    components:{       
        EditAddress,
        SubDetail,
        Advance,
        Check,
        RepeatOrder,
        StopOrder,
        EditExpressFee
    },
    data(){
        return {
            mainparam:"",
            mainurl:AssignAjaxProxy.getUrl(),
            ajaxProxy:AssignAjaxProxy,
            searchForm:{
                entrepot_id:'',
                cate_type_id:'',
                cate_kind_id:'',
                goods_name:'',
                sale_name:'',
                range:"",
                deliver_name:'',
                deliver_phone:'',
                express_name:'',
                pstatus:'0',
                assign_type:'',
                user_name:'',
                is_stop:"",
                times:'',
                // with:['order','address'],
                // appends:['status_text'],
            },
            distributors:[],
            CategoryList:[],
            CategoryChildrenList:[],
            times:'',

            activeName:'first',

            bubble:null,
            currentRow: null,
            model:null,

            multipleSelection:[]
        }
    },

    methods:{
        pstatusChange(param){
            switch(parseInt(param.pstatus)){
                case 0:
                case 1:
                case 2:
                    param.status = param.pstatus;
                    break;
                case 3:
                    param.is_stop = 1;
                    break;
                case 4:
                    param.status = 3;
                    break;
                case 5:
                    param.assign_print_status = 1;
                    param.express_print_status  = 1;
                    break;
                case 6:
                    param.status = 4;
                    break;
                default :
                    param.status = '';
                    param.is_stop = '';
                    param.assign_print_status = '';
                    param.express_print_status = '';
                    break;
            }
        },
        dbClick(row){
            this.model=row;
        },
        dataReset(name){
            this.searchForm.range = '';
            this.searchToolReset(name);
        },
        // searchToolReset(name){
        //     this.times='';
        // },
        getDistributionCenter(data){
            this.distributors = data.items;
        },
        getDistributionDeliveryTabPane(data){
            this.delivery_details_data = data.delivery_details_data;
            this.delivery_addresses_data = data.delivery_addresses_data;
            this.communication_data = data.communication_data;
            this.operation_data = data.operation_data[0];
        },
        tableRowClassName(row, index){
            //如果同时有两个颜色呢？ 订单类型 修改 这里也要改
            if (row.is_stop) {
                return 'erro-row';
            }else if(row.order && row.order.order_type && row.order.order_type.name == "内部订单") {
                return 'info-row';
            } else if(row.order && row.order.express_remark && row.order.express_remark.length > 0) {
                return 'warning-row';
            }
        },
        timeChange(v){
            if (v!="") {
                this.searchForm.range = v.split(' - ');
            } else {
                this.searchForm.range = "";
            }
        },
        editAddress(){
            if (this.openDialogCheck()) {
                this.$modal.show('edit-address',this.currentRow);//.address
            }
        },  
        handleClick(tab, event){
            // console.log(tab, event);
        },
        onSearchChange(param){
            param['with'] = ['order.orderType','address'];
            param['appends'] = ['status_text'];
            this.pstatusChange(param);
            this.mainparam = JSON.stringify(param);
        },
        onCurrentChange(currentRow) {
            this.currentRow = currentRow;
        },
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        hasCurrentRow(){
            if (this.currentRow) {
                return true;
            } else {
                return false;
            }
        },
        openDialogCheck(){
            if (!this.hasCurrentRow()) {
                // this.$message.error('请选择一行');
                this.$alert('请选择一行', '警告', {
                    confirmButtonText: '确定',
                })
                return false;
            } else {
                return true;
            }
        },
        openCheck(){
            let ar = this.multipleSelection.concat([]);
            let checked = [];
            ar.forEach(element => {
                if (element.check_status !=0) {
                    checked.push(element.assign_sn);
                }
            });

            if (ar.length == 0) {
                this.$message.error('请勾选');
                return ;
            }
            //调试暂时注释
            if (checked.length != 0) {
                this.$message.error(checked.join() +" 已审核");
                return ;
            }

            if (ar.length > MAX_DAN_LENGTH) {
                this.$message.error('最多'+MAX_DAN_LENGTH+'个');
                return ;
            }
            this.$modal.show('check', { rows : ar });
        },
        openRepeat(){
            if (this.openDialogCheck()) {
                this.$modal.show('repeat-order', { row : this.currentRow });
            }
        },
        editExpressFee(){
            if (this.openDialogCheck()) {
                this.$modal.show('edit-express-free', { row : this.currentRow });
            }
        },
        openStop(){
            if (this.openDialogCheck()) {
                this.$modal.show('stop-order', { row : this.currentRow });
            }
        },
        showExpress(){
            if (this.openDialogCheck()) {
                if (this.currentRow.express_sn == "") {
                    this.$message.error('还未分配快递单号,不能打印');
                    return ;
                }
                let pr = true;
                // if (this.currentRow.express_print_status == 1) {
                //     pr = false;
                //     this.$confirm('已打印过快递单, 是否继续?', '提示', {
                //         confirmButtonText: '确定',
                //         cancelButtonText: '取消',
                //         type: 'warning'
                //         }).then(() => {
                //             pr = true;

                //         }).catch(() => {
                                
                        // });
                // }
                // todo 
                // this.$modal.show('express', param);
                //与打印机通讯 要面单什么的
                if (pr) {
                    //更新记录的打印时间　打印状态 返回打印的数据？　估计还要设置一下格式
                    AssignAjaxProxy.waybillPrint(this.currentRow.id).then((response)=>{
                        //获取打印的数据　估计还要设置一下格式
                        let data = response.data;
                        if (data.status !=1 ) {
                            this.$message.error('打印数据出错');
                            return ;
                        }

                        if(data.data.express_sn.toString().length==0){
                            this.$message.error('没有面单号');
                            return ;
                        }
                        delete data.data.print_data.encryptedData;
                        delete data.data.print_data.ver;
                        ws.doPrint(data.data.printer, data.data.print_data);

                    });
                }
            }
        },
        showAssign(){
            if (this.openDialogCheck()) {
                
                let pr = true;
                if (this.currentRow.assign_print_status == 1) {
                    pr = false;
                    this.$confirm('已打印过清单单, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            AssignAjaxProxy.goodsPrint(this.currentRow.id).then((response)=>{
                                //获取打印的数据　估计还要设置一下格式
                                // window.open("/print/assign/"+this.currentRow.id);
                                //组合数据
                                let data = this.getPrintGoodsListData(response.data.data, this.currentRow);
                                ws.goodsList(data);
                            });
                        }).catch(() => {
                                
                        });
                }
                // todo 
                // this.$modal.show('express', param);
                //与打印机通讯 要面单什么的
                if (pr) {
                    AssignAjaxProxy.goodsPrint(this.currentRow.id).then((response)=>{
                        //获取打印的数据　估计还要设置一下格式
                        // window.open("/print/assign/"+this.currentRow.id);
                        //组合数据
                        let data = this.getPrintGoodsListData(response.data.data, this.currentRow);
                        ws.goodsList(data);
                    });
                    
                }
            }
        },
        getPrintGoodsListData(goodsList, row){
            let tabletest = [];
            let total = 0;
            for (let index = 0; index < goodsList.length; index++) {
                const element = goodsList[index];
                let tmp = {
                    name:"["+ element.goods_number +"]" + "个  "+ element.sku_sn + "  " + element.goods_name + "  " + element.specifications ,
                    goods_number: element.goods_number 
                };
                tabletest.push(tmp);
                total += parseInt(element.goods_number);
            }

            let entrepot = this.distributors.find(function(value){
                return value.id = row.entrepot_id;
            })
            return {
                data:{
                    tabletest:tabletest,
                    address:row.address,
                    assign_sn:row.assign_sn,
                    total:total,
                    entrepot:entrepot.name
                },
                //http://cloudprint.cainiao.com/template/standard/251026
                templateURL:"http://cloudprint.cainiao.com/template/standard/251026"
            }
        },
        printList(){
            ws.getPrinterList();
        },
        configprint(){
            ws.dialogConfig();
        },
        getPrinterConfig(){
            ws.getPrinterConfig("针式打印机");
        },
        previewPrint(){
           alert('取消了');
            // ws.testView(b);
        },
        staticPrint(){
            ws.staticPrint();
        },
        updateWaybill(){
            if (!this.hasCurrentRow()) {
                this.$message.error('请勾选一行');
                return ;
            }
            let row = this.currentRow;
            this.$confirm('更新'+row.assign_sn+"面单信息", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //请求更新面单
                AssignAjaxProxy.updateWaybill(row.id).then((response)=>{
                    if (response.data.status == 1) {
                        this.$message.success('操作成功');
                    } else {
                        this.$message.error(response.data.msg);
                    }
                    
                }).catch((response)=>{
                    this.$message.error('出错了');
                })
            }).catch(()=>{
                
            })
            // console.log('yes');
        },
        printGoods2(){
            if (this.multipleSelection.length == 0) {
                this.$message.error("勾选多个");
                return ;
            }

            let ids = [];
            this.multipleSelection.forEach((element)=>{
                ids.push(element.id);
            });

            AssignAjaxProxy.goodsPrints(ids).then((response)=>{
                if (response.data.status == 1)  {
                    ws.multiGoodsLists(response.data.data);
                }
            }).catch((response)=>{

            })
        },
        showExpress2(){
            if (this.multipleSelection.length == 0) {
                this.$message.error("勾选多个");
                return ;
            }

            let ids = [];
            this.multipleSelection.forEach((element)=>{
                ids.push(element.id);
            });

            AssignAjaxProxy.waybillPrints(ids).then((response)=>{
                if (response.data.status == 1)  {
                    let print_data = response.data.print_data.map((element)=>{
                        return JSON.parse(element);
                    })

                    ws.doPrints(response.data.printer, print_data);
                }
            })
        }
    },
    created(){
        let DistributionCenterSelect = new DistributionCenterProxy({}, this.getDistributionCenter, this);
        DistributionCenterSelect.load();

        this.$on('search-tool-change', this.onSearchChange);
        this.onSearchChange(this.searchForm);
        
        let o = {};
        o['current-change'] = this.onCurrentChange;
        o['selection-change'] = this.handleSelectionChange;
        this.bubble = o;
    },
    beforeDestroy(){
        ws.close();
        
    }   
}
</script>

<style scoped>
    .search-bar .el-form-item {
        width: 140px;
    }
    .date-item{
        width: 220px !important;
    }

    
</style>

