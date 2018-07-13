<template>
    <div>
        <el-row>
            <el-col :span="24">
                    <el-tabs v-model="activeName" type="border-card">
                        <el-tab-pane label="收件人信息" name="Customer">
                            <el-table :data="customer_address" border >
                                <el-table-column  prop="name"  label="收件人姓名"  width="180"></el-table-column>
                                <el-table-column  prop="fixed_telephone"  label="收件人固话"  width="180"></el-table-column>
                                <el-table-column  prop="phone"  label="收件人手机"  width="180"></el-table-column>
                                <el-table-column  prop="address"  label="地址"> </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="商品信息" name="Products">
                            <el-table :data="assign_product" border >
                                <el-table-column  prop="goods_name"  label="名称"  width="180"></el-table-column>
                                <el-table-column  prop="sku_sn"  label="编号"  width="180"></el-table-column>
                                <el-table-column  prop="goods_number"  label="数量"> </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="销售信息" name="Order">
                            <el-table :data="orderRow" border >
                                <el-table-column  prop="user_name" label="部门"  width="180"></el-table-column>
                                <el-table-column  prop="group_name" label="小组"  width="180"></el-table-column>
                                <el-table-column  prop="department_name" label="员工"  width="180"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="发货物流" name="Assign">
                            <el-table :data="tableData" border >
                                <el-table-column  prop="user_name"  label="发货人"  width="180"></el-table-column>
                                <el-table-column  prop="out_entrepot_at"  label="发货时间"  width="180"></el-table-column>
                                <el-table-column  prop="assign_fee"  label="配送费"  width="180"></el-table-column>
                                <el-table-column  prop="express_fee"  label="快递费"  width="180"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
            </el-col>    
        </el-row>
    </div>
</template>

<script>

import AssignSelectProxy from "@/packages/AssignSelectProxy";
import OrderListSelectProxy from "@/packages/OrderSelectProxy";
import OrderAddressSelectProxy from "@/packages/OrderAddressAjaxProxy";
import OrderGoodsSelectProxy from "@/packages/OrderGoodsSelectProxy";

export default {
    name: 'SubDetail',
    props:{
        row:{
            type:Object,
            default:null
        }
    },
    data () {
        return {
            activeName:"Customer",
            
            tabCustomer:false,
            tabProducts:false,
            tabOrder:false,
            tabAssign:false,

            tableData:[],
            customer_address:[],
            assign_product:[],
            express_sn:"",
            order_id:"",
            assign_id:"",
            orderRow:[],
        }
    },
    methods:{
        setAssign(express_sn){
            this.assignProxy.setParam({'express_sn': express_sn, 'fields':['*']}).load();
            this.tabAssign = true;
        },
        setOrder(order_id){
            this.OrderListProxy.setParam({id:order_id, fields:[
                'user_id',
                'user_name',
                'group_name',
                'department_name',
            ]}).load();
            this.tabOrder = true;
        },
        loadAssign(data){
            this.tableData = data.items;
            this.order_id = this.tableData[0].order_id;
            this.assign_id = this.tableData[0].id;
            this.handleCustomer();
            // console.log(this.order_id);
        },
        loadOrder(data){
            this.orderRow = data.items;
        },
        loadAddress(data){
            console.log(data);
            this.customer_address = data.items;
        },
        loadProducts(data){
            this.assign_product = data.items;
        },
        handleCustomer(){
            //请求加载客户信息
            this.OrderAddressProxy.setParam({order_id: this.order_id}).load(); 
            this.tabCustomer = true;
        },
        handleProducts(){
            //请求加载商品
            this.OrderGoodsSelectProxy.setParam({assign_id: this.assign_id}).load();
            this.tabProducts = true;
        },
        handleOrder(){
            //请求加载订单
        },
        handleAssign(){
            //估计不用请求
        }
    },
    watch:{
        row(val, oldVal){
            this.express_sn = val.express_sn; 
            // this['handle'+ this.activeName].call(this, this.row);
            this.tabCustomer = false;
            this.tabProducts = false;
            this.tabOrder = false;
            this.tabAssign = false;
        },
        express_sn(val, oldVal){
            this.setAssign(val);
        },
        order_id(val, oldVal){       
            this.setOrder(val);
        },
        activeName(val,oldVal){
            if (!this['tab'+ val] && this.order_id != "") {
                this['handle'+ val].call(this, this.row);
            }
        },
    },
    created(){
        this.assignProxy = new AssignSelectProxy({}, this.loadAssign, this);
        this.OrderListProxy = new OrderListSelectProxy({}, this.loadOrder, this);
        this.OrderAddressProxy = new OrderAddressSelectProxy({}, this.loadAddress, this);
        this.OrderGoodsSelectProxy = new OrderGoodsSelectProxy({}, this.loadProducts, this);
    },
    beforeDestroy(){
        this.assignProxy = null;
        this.OrderListProxy = null;
        this.OrderAddressProxy = null;
        this.OrderGoodsSelectProxy = null;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
  