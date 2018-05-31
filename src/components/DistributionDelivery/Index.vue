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
                <!-- <el-form-item prop="cate_type_id" >
                    <el-select v-model="searchForm.cate_type_id" size="small" placeholder="商品类型" clearable @change="cate_type_change">
                        <el-option v-for="v in CategoryList" :label="v.label"
                                   :value="v.id" :key="v.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="cate_kind_id" >
                    <el-select v-model="searchForm.cate_kind_id" size="small" placeholder="商品品类" >
                        <el-option v-for="v in CategoryChildrenList" :label="v.label"
                                   :value="v.id" :key="v.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="goods_name">
                    <el-input v-model="searchForm.goods_name" size="small" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item prop="sale_name">
                    <el-input v-model="searchForm.sale_name" size="small" placeholder="销售人员"></el-input>
                </el-form-item> -->

                <el-form-item prop="times" class="date-item">
                    <el-date-picker
                            v-model="times"
                            type="daterange"
                            size="small"
                            placeholder="选择日期范围"
                            @change="timeChange">
                    </el-date-picker>
                </el-form-item>

                <!-- <el-form-item prop="deliver_name">
                    <el-input v-model="searchForm.deliver_name" size="small" placeholder="收货人姓名"></el-input>
                </el-form-item>
                <el-form-item prop="deliver_phone">
                    <el-input v-model="searchForm.deliver_phone" size="small" placeholder="收货人电话"></el-input>
                </el-form-item>
                <el-form-item prop="express_name">
                    <el-input v-model="searchForm.express_name" size="small" placeholder="快递公司"></el-input>
                </el-form-item> -->
                <el-form-item prop="status">
                    <el-select v-model="searchForm.status" size="small" placeholder="发货状态">
                        <el-option label="未审核" value="0"></el-option>
                        <el-option label="已审核" value="1"></el-option>
                        <el-option label="审核未通过" value="2"></el-option>
                        <el-option label="已拦截" value="2"></el-option>
                        <el-option label="已发货" value="2"></el-option>
                        <el-option label="已打印" value="2"></el-option>
                        <el-option label="已验货" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item prop="assign_type">
                    <el-select v-model="searchForm.assign_type" size="small" placeholder="发货类型">
                        <el-option label="正常" value="0"></el-option>
                        <el-option label="退货" value="1"></el-option>
                        <el-option label="换货" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="user_name">
                    <el-input v-model="searchForm.user_name" size="small" placeholder="发货人员"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询</el-button>
                    <el-button type="primary" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small" @click="showDialog('advance')">高级查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <!-- table -->
        <el-row>
            <el-col>
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :page-size="20" :bubble="bubble" :row-class-name="tableRowClassName" @dbclick="dbClick">
                    <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                    <el-table-column label="序号" align="center"  type="index" width="65">
                    </el-table-column>

                    <el-table-column prop="assign_sn" label="发货单号" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="status_text" label="发货状态" align="center" width="200"></el-table-column>

                    <el-table-column prop="set_express" label="指定快递" align="center" width="200">
                        <template slot-scope="scope">
                            <span v-if="scope.row.set_express==1">是</span>
                            <span v-else >否</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="address.area_province_name" label="省份"></el-table-column>
                    <el-table-column prop="address.area_city_name" label="城市"></el-table-column>
                    <el-table-column prop="address.area_district_name" label="区县"></el-table-column>
                    <el-table-column prop="address.address" label="地址"></el-table-column>
                    <el-table-column prop="address.name" label="收件人"></el-table-column>


                    <el-table-column prop="order.created_at" label="销售时间" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="created_at" label="导入时间" align="center" width="200"></el-table-column>

                    <el-table-column prop="express_sn" label="快递单号"  width="200"></el-table-column>

                    <el-table-column prop="express_name" label="快递公司" width="200"></el-table-column>

                    <el-table-column prop="corrugated_case" label="包装箱形" width="180"></el-table-column>

                    <el-table-column prop="send_time" label="发货时间" align="center" width="180"></el-table-column>

                    <el-table-column prop="self_express" label="自提" align="center" width="200">
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
                    <el-table-column prop="express_print_at" label="快递单打印时间" align="center" width="200"></el-table-column>

                    <el-table-column prop="weight" label="重量" align="center" width="200">
                    </el-table-column>

                    <!-- <el-table-column prop="assign_fee" label="配送费" align="center" width="200">
                    </el-table-column> -->

                    <el-table-column prop="express_fee" label="实付运费" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="express_print_at" label="快递单打印时间" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="assign_print_at" label="发货单打印时间" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="sign_at" label="签收时间" align="center" width="200">
                    </el-table-column>

                    <el-table-column prop="is_stop" label="是否拦截" align="center" width="200">
                        <template slot-scope="scope">
                            <div v-if="scope.is_stop == 0">否</div>
                            <div v-else>是</div>
                        </template>
                    </el-table-column>
                    

                    <!-- <el-table-column prop="sale_name" label="销售人员" align="center" width="200">
                    </el-table-column> -->

                    <!-- <el-table-column  label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="showEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column> -->

                    <div slot="buttonbar">
                        <!-- <el-button type="primary" size="small" @click="addDelivery">发 货</el-button>
                        <el-button type="primary" size="small" @click="handleEdit">修 改</el-button>
                        <el-button type="primary" size="small" @click="setDropOrder">废 单</el-button>     
                        <el-button type="primary" size="small" @click="handleReceive">签 收</el-button>     
                        <el-button type="primary" size="small" @click="addContact">沟 通</el-button>      -->

                        <el-button type="primary" size="small" @click="openCheck">审核</el-button>
                        <el-button type="primary" size="small" @click="openRepeat">返单</el-button>
                        <el-button type="primary" size="small" @click="openStop">拦截/取消</el-button>
                        <el-button type="primary" size="small" @click="editAddress">修改地址</el-button>     

                        <el-button type="primary" size="small"   @click="showExpress">快递单打印</el-button>
                        <el-button type="primary" size="small"   @click="showAssign">发货单打印</el-button>

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
        <!-- <add-delivery name='add-delivery'
            :ajax-proxy="ajaxProxy"
            @submit-success="handleReload">
        </add-delivery>

        <handle-edit name='handle-edit'
            :ajax-proxy="ajaxProxy"
            @submit-success="handleReload">
        </handle-edit>

        <set-drop-order name='set-drop-order'
            :ajax-proxy="ajaxProxy"
            @submit-success="handleReload">
        </set-drop-order>

        <handle-receive name='handle-receive'
             @submit-success="handleReload"
            :ajax-proxy="ajaxProxy">
        </handle-receive>

        <add-contact name='add-contact'
            :ajax-proxy="ajaxProxy"
             @submit-success="handleReload">
        </add-contact> -->

        <edit-address name='edit-address'
            :ajax-proxy="ajaxProxy"
            @submit-success="handleReload">
        </edit-address>

        <!-- <Express name="express"></Express>
        <Assign name="assign"></Assign> -->

        <Advance name="advance"></Advance>
        <Check name="check" :ajax-proxy="ajaxProxy" @submit-success="handleReload"></Check>
        <RepeatOrder name="repeat-order" :ajax-proxy="ajaxProxy" @submit-success="handleReload"></RepeatOrder>
        <StopOrder name="stop-order" :ajax-proxy="ajaxProxy"  @submit-success="handleReload"></StopOrder>
    </div>
</template>
<script>
import PageMix from '@/mix/Page';
import SearchTool from '@/mix/SearchTool';
import DataTable from '@/mix/DataTable';

// import AddDelivery from './AddDelivery';
// import HandleEdit from './HandleEdit';
// import SetDropOrder from './SetDropOrder';
// import HandleReceive from './HandleReceive';
// import AddContact from './AddContact';
import EditAddress from './EditAddress';
import SubDetail from './SubDetail';
// import Express from './Express';
// import Assign from './Assign';

import Advance from './Advance';
import Check from './Check';
import RepeatOrder from './RepeatOrder';
import StopOrder from './StopOrder';

// import GoodsSelectProxy from '../../packages/GoodsSelectProxy';
import DistributionCenterProxy from '@/packages/DistributionCenterSelectProxy';
import AssignAjaxProxy from '@/ajaxProxy/Assign';
import SelectProxy from  '@/packages/SelectProxy';

export default {
    name: 'DistributionDelivery',
    pageTitle:"配送发货",
    mixins:[PageMix,SearchTool,DataTable],

    components:{
        // AddDelivery,
        // HandleEdit,
        // SetDropOrder,
        // HandleReceive,
        // AddContact,
        EditAddress,
        SubDetail,
        // Express,
        // Assign,
        Advance,
        Check,
        RepeatOrder,
        StopOrder
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
                status:'',
                assign_type:'',
                user_name:'',
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
        }
    },
    methods:{
        dbClick(row){
            this.model=row;
        },
        searchToolReset(name){
            this.$refs[name].resetFields();
            this.$refs[name].$emit('reset');
            this.$emit('search-tool-change', this[name]);
            this.times='';
        },
        getDistributionCenter(data){
            this.distributors = data.items;
        },
        getDistributionDeliveryTabPane(data){
            this.delivery_details_data = data.delivery_details_data;
            this.delivery_addresses_data = data.delivery_addresses_data;
            this.communication_data = data.communication_data;
            this.operation_data = data.operation_data[0];
        },
        // getCategoryList(data){
        //     this.CategoryList=data.items;
        // },
        // getCategoryChildrenList(data){
        //     this.CategoryChildrenList=data;
        // },
        // cate_type_change(v){
        //     this.searchForm.cate_kind_id = '';
        //     if(v){
        //         let selectProxy = new SelectProxy('/getCategorys/'+ v, this.getCategoryChildrenList, this);
        //         selectProxy.load();
        //     }
        // },
        tableRowClassName(row, index){
            if (row.is_stop) {
                return 'erro-row'
            } else {
                return '';
            }
        },
        timeChange(v){
            if (v!="") {
                this.searchForm.range = v.split(' - ');
            } else {
                this.searchForm.range = "";
            }
        },
        // addDelivery(){
        //     if (this.openDialogCheck()) {
        //         this.$modal.show('add-delivery', this.currentRow);
        //     }
        // },
        // handleEdit(){
        //     if (this.openDialogCheck()) {
        //         this.$modal.show('handle-edit', this.currentRow);
        //     }
        // },
        // setDropOrder(){
        //     if (this.openDialogCheck()) {
        //         this.$modal.show('set-drop-order', this.currentRow);
        //     }
        // },
        // handleReceive(){
        //     if (this.openDialogCheck()) {
        //         this.$modal.show('handle-receive',this.currentRow);
        //     }
        // },
        // addContact(){
        //     if (this.openDialogCheck()) {
        //         this.$modal.show('add-contact',this.currentRow);
        //     }
        // },
        editAddress(){
            if (this.openDialogCheck()) {
                this.$modal.show('edit-address',this.currentRow.address);
            }
        },  
        handleClick(tab, event){
            // console.log(tab, event);
        },
        onSearchChange(param){
            param['with'] = ['order','address'];
            param['appends'] = ['status_text'];
            this.mainparam = JSON.stringify(param);
        },
        onCurrentChange(currentRow) {
            this.currentRow = currentRow;
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
            if (this.openDialogCheck()) {
                if (this.currentRow.check_status ==0) {
                    this.$modal.show('check', { row : this.currentRow });
                } else {
                    this.$message.error("已审核过");
                }
            }
        },
        openRepeat(){
            if (this.openDialogCheck()) {
                this.$modal.show('repeat-order', { row : this.currentRow });
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
                if (this.currentRow.express_print_status == 1) {
                    pr = false;
                    this.$confirm('已打印过快递单, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                            pr = true;
                        }).catch(() => {
                                
                        });
                }
                // todo 
                // this.$modal.show('express', param);
                //与打印机通讯 要面单什么的
                if (pr) {
                    //更新记录的打印时间　打印状态
                    AssignAjaxProxy.update(this.currentRow.id, {express_print_status:1, express_print_at: Date.now() });


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
                            pr = true;
                        }).catch(() => {
                                
                        });
                }
                // todo 
                // this.$modal.show('express', param);
                //与打印机通讯 要面单什么的
                if (pr) {
                    //更新记录的打印时间　打印状态
                    AssignAjaxProxy.update(this.currentRow.id, {assign_print_status:1, assign_print_at: Date.now() });


                }
            }
        }
        
    },
    created(){
        //获取配送中心数据
        let DistributionCenterSelect = new DistributionCenterProxy({}, this.getDistributionCenter, this);
        DistributionCenterSelect.load();
        //获取商品类型
        // let selectProxy = new SelectProxy('/tree', this.getCategoryList, this);
        // selectProxy.load();

        

        this.$on('search-tool-change', this.onSearchChange);
        this.onSearchChange(this.searchForm);
        
        let o = {};
        o['current-change'] = this.onCurrentChange;
        this.bubble = o;
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

