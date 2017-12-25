<template>
    <div >
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
        
        <el-row >
            <el-col :span="24">
                <el-table :data="tableData" v-loading="dataLoad" border >
                    <el-table-column label="序号" align="center"  type="index" width="65"></el-table-column>
                    <el-table-column prop="name" label="商品名称" align="center" ></el-table-column>
                    <el-table-column prop="type_text" label="商品类型" align="center" ></el-table-column>
                    <el-table-column prop="phone" label="商品数量" align="center" ></el-table-column>
                    <el-table-column prop="qq" label="商品型号" align="center" ></el-table-column>
                    <el-table-column prop="weixin" label="商品批次" align="center" ></el-table-column>
                    <el-table-column prop="address" label="入库时间" align="center" ></el-table-column>
                    <el-table-column prop="id_card" label="入库人" align="center" ></el-table-column>

                </el-table>
            </el-col>
        </el-row>

        <el-row >
            <div class="pull-right" style="float: right;margin-top: 5px">
                <el-col :span="12">
                    <el-pagination
                            :current-page="currentPage4"
                            :page-size="100"
                            layout="total, prev, pager, next, jumper"
                            :total="total"
                            @current-change="currentChange">
                    </el-pagination>
                </el-col>
            </div>
        </el-row>

    </div>
</template>
      
<script>
    import PageMix from '../../mix/Page';
    import DataProxy from '../../packages/DataProxy';
    import EmployeeSelectProxy from '../../packages/EmployeeSelectProxy';
    import DepartSelectProxy from '../../packages/DepartSelectProxy';
    import GroupSelectProxy from '../../packages/GroupSelectProxy';
    import SearchTool from '../../mix/SearchTool';
export default {
    name: 'InventoryList',
    pageTitle:"库存详情",
    mixins: [PageMix,SearchTool],
    data () {
        return {
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
                    name:'老白金',
                    type_text:'保健品',
                    phone:'15',
                    qq:'324568554',
                    weixin:'012',
                    address:'15645555555555',
                    id_card:'李清',
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
            this.users = data.items;
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
        }

    },
    // created(){
    //     this.toggleTableLoad();
    //     let mainProxy = new DataProxy("/riskcheck", this.pageSize, this.mainTableLoad, this);
    //     this.mainProxy = mainProxy;
    //     this.mainProxy.load();
    //
    //     let departProxy = new DepartSelectProxy({'type': 'sale'}, this.loadDepartment, this);
    //     this.departProxy = departProxy;
    //     this.departProxy.load();
    //
    //     let groupProxy = new GroupSelectProxy({'depart_id':1}, this.loadGroup, this);
    //     this.groupProxy = groupProxy;
    //     this.groupProxy.load();
    //
    //     let employeeProxy = new EmployeeSelectProxy({'depart_id':1,'group_id':1}, this.loadEmployee, this);
    //     this.employeeProxy = employeeProxy;
    //     this.employeeProxy.load();
    //
    // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-form-item {
      margin-bottom: 2px;
  }
</style>
