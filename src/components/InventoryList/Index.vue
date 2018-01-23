<template>
    <div >
        <!-- <el-alert
            title="需要跟据实际情况进行修改,功能不完鄯"
            type="error"
            show-icon>
          </el-alert> -->
        <el-row>
            <el-col>
                <el-form :inline="true" ref="searchForm" class="demo-form-inline"  :model="searchForm">
                    <el-form-item style="width:170px" prop="name">
                        <el-input v-model="searchForm.name" size="small" placeholder="商品名称"></el-input>
                    </el-form-item>

                    <el-form-item style="width:170px" prop="contact">
                        <el-input v-model="searchForm.contact" size="small" placeholder="商品批次"></el-input>
                    </el-form-item>
                    <el-form-item style="width:170px" prop="contact">
                        <el-input v-model="searchForm.contact" size="small" placeholder="商品型号"></el-input>
                    </el-form-item>

                    <el-form-item prop="start" >
                        <el-date-picker size="small" v-model="searchForm.start"
                                        placeholder="入库开始时间"
                                        @change="startDateChange"
                                        :editable="false">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item prop="end">
                        <el-date-picker size="small" v-model="searchForm.end"
                                        placeholder="入库截止时间"
                                        @change="endDateChange"
                                        :editable="false">
                        </el-date-picker>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="info" size="small" icon="search" @click="searchToolChange('searchForm')">查询</el-button>
                        <el-button type="info" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                        <el-tooltip content="点击刷新当前页面" placement="right" style="margin-left:15px;">
                            <el-button  size="small" type="danger">刷新</el-button>
                        </el-tooltip>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <br>
        <el-row >
            <el-col :span="24">
                <TableProxy 
                    :url="mainurl" 
                    :param="mainparam"
                    @dbclick="doubleclick"
                    :reload="dataTableReload">
                    <el-table-column label="序号" align="center"  type="index" width="65"></el-table-column>
                    <el-table-column prop="type_text" label="库类型" align="center" ></el-table-column>
                    <el-table-column prop="goods_name" label="商品名称" align="center" ></el-table-column>
                    <el-table-column prop="goods_type" label="商品类型" align="center" ></el-table-column>
                    <el-table-column prop="goods_sum" label="商品数量" align="center" ></el-table-column>
                    <el-table-column prop="goods_version" label="商品型号" align="center" ></el-table-column>
                    <el-table-column prop="goods_batch" label="商品批次" align="center" ></el-table-column>
                    <el-table-column prop="create_time" label="操作时间" align="center" ></el-table-column>
                    <el-table-column prop="user" label="操作人" align="center" ></el-table-column>

                    <div slot="buttonbar">
                        <el-button type="primary" size="small" @click="intoStorage">商品入库</el-button>
                        <el-button type="primary" size="small" @click="outStorage">商品出库</el-button>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>
        <br/>
        
        <intoStorage 
            name="intoStorage" 
            :ajax-proxy="ajaxProxy" 
            :goods-type="goods_type" 
            :users = "users"
            @submit-success="handleReload" />
        <outStorage 
            name="outStorage" 
            :ajax-proxy="ajaxProxy" 
            :goods-type="goods_type"  
            :users = "users" 
            @submit-success="handleReload" />
    </div>
</template>
      
<script>
    import PageMix from '../../mix/Page';
    import DataProxy from '../../packages/DataProxy';
    // import EmployeeSelectProxy from '../../packages/EmployeeSelectProxy';
    import DepartSelectProxy from '../../packages/DepartSelectProxy';
    import GroupSelectProxy from '../../packages/GroupSelectProxy';
    import DataTable from '../../mix/DataTable';
    import SearchTool from '../../mix/SearchTool';
    import intoStorage from './intoStorage.vue';
    import outStorage from './outStorage.vue';
    import InventoryAjaxProxy from '../../ajaxProxy/Inventory'

    import GoodsTypeAjaxProxy from '../../ajaxProxy/GoodsType';
    import EmployeeSelectProxy from '../../packages/EmployeeSelectProxy';


export default {
    name: 'InventoryList',
    pageTitle:"库存详情",
    mixins: [PageMix,SearchTool,DataTable],
    components:{
        intoStorage,
        outStorage
    },
    data () {
        return {
            goods_type:[],


            ajaxProxy:InventoryAjaxProxy,
            mainurl:InventoryAjaxProxy.getUrl(),
            mainparam:"",
            users:[],
            groups:[],
            departments:[],
            total:100,
            dataLoad:false,
            searchForm:{
                name:'',
                contact:'',
                department_id:'',
                group_id:'',
                user_id:'',
                range:'',
                state:'',
            },
            currentPage4:1,
            tableData:[
                {
                    types:'出库',
                    name:'老白金',
                    type:'保健品',
                    amount:'15',
                    version:'324568554',
                    branch:'012',
                    action_time:'15645555555555',
                    action_user:'李清',
                },
                {
                    types:'出库',
                    name:'老白金',
                    type:'保健品',
                    amount:'15',
                    version:'324568554',
                    branch:'012',
                    action_time:'15645555555555',
                    action_user:'李清',
                },
                {
                    types:'出库',
                    name:'老白金',
                    type:'保健品',
                    amount:'15',
                    version:'324568554',
                    branch:'012',
                    action_time:'15645555555555',
                    action_user:'李清',
                },
                {
                    types:'出库',
                    name:'老白金',
                    type:'保健品',
                    amount:'15',
                    version:'324568554',
                    branch:'012',
                    action_time:'15645555555555',
                    action_user:'李清',
                },
                {
                    types:'出库',
                    name:'老白金',
                    type:'保健品',
                    amount:'15',
                    version:'324568554',
                    branch:'012',
                    action_time:'15645555555555',
                    action_user:'李清',
                },
                {
                    types:'出库',
                    name:'老白金',
                    type:'保健品',
                    amount:'15',
                    version:'324568554',
                    branch:'012',
                    action_time:'15645555555555',
                    action_user:'李清',
                },
            ],
            tableData1:[],
            tableData2:[],
            tableData3:[],
        }
    },
    methods:{
        dataReload:function(){
          console.log(this.searchForm);
        },
        searchReset:function(){
          //this.$refs.searchForm.resetFields();
        },
        handleDeletes:function(){

        },
        mainTableLoad(data){
            this.toggleTableLoad();
            this.tableData = data.items;
            this.tableData1 = data.items1;
            this.tableData2 = data.items2;
            this.tableData3 = data.items3;
            this.total = data.total;
        },
        currentChange(v){
            this.toggleTableLoad();
            this.mainProxy.setPage(v).load();
        },
        toggleTableLoad(){
            this.dataLoad = !this.dataLoad;
        },
        loadEmployee(data){
            this.users = data;
        },
        loadDepartment(data){
            this.departments = data.items;
        },
        loadGroup(data){
            this.groups = data.items;
        },
        onSearchChange(param){
          this.toggleTableLoad();
          this.mainProxy.setExtraParam(param).load();
          this.toggleTableLoad();
        },
        intoStorage:function(row){
            this.$modal.show('intoStorage', {model:row});
            },
        outStorage:function(row){
            this.$modal.show('outStorage', {model:row});
        },
        startDateChange:function () {

        },
        action:function (row) {
            if(row['types']=='入库'){
                this.$modal.show('outStorage', {model:row});
            }
        },
        endDateChange:function () {

        },
        dataChange:function(data){
            this.tableData.push(data)
            console.log(data)
        }

    },
     created(){
//         this.toggleTableLoad();
//         let mainProxy = new DataProxy("/riskcheck", this.pageSize, this.mainTableLoad, this);
//         this.mainProxy = mainProxy;
//         this.mainProxy.load();
//
//         let departProxy = new DepartSelectProxy({'type': 'sale'}, this.loadDepartment, this);
//         this.departProxy = departProxy;
//         this.departProxy.load();
//
//         let groupProxy = new GroupSelectProxy({'depart_id':1}, this.loadGroup, this);
//         this.groupProxy = groupProxy;
//         this.groupProxy.load();
//
//         let employeeProxy = new EmployeeSelectProxy({'depart_id':1,'group_id':1}, this.loadEmployee, this);
//         this.employeeProxy = employeeProxy;
//         this.employeeProxy.load();

            GoodsTypeAjaxProxy.get().then((response)=>{
                this.goods_type = response.data.items;
            });

            let employeeProxy = new EmployeeSelectProxy({}, this.loadEmployee, this);
            this.employeeProxy = employeeProxy;
            this.employeeProxy.load();
     }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-form-item {
      margin-bottom: 2px;
  }
</style>
