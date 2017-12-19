<template>
    <div>
        <el-row>
            <el-form :inline="true" ref="searchForm" :model="searchForm">
                <el-form-item style="width: 140px" prop="typeNumber">
                    <el-select v-model="searchForm.typeNumber" size="small" clearable placeholder="查询类型">
                        <el-option v-for="item in types" :label="item.name" 
                        :value="item.value" :key="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop="typeValue">
                    <el-input v-model="searchForm.typeValue" size="small" 
                    placeholder="请输入查询数据">
                    </el-input>
                </el-form-item>

                <el-form-item prop="department_id">
                    <el-select size="small" v-model="searchForm.department_id" placeholder="部门">
                        <el-option v-for="v in departments" :label="v.name" 
                        :value="v.id" :key="v.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop="group_id">
                    <el-select size="small" v-model="searchForm.group_id" placeholder="团队小组">
                        <el-option v-for="v in groups" :label="v.name" 
                        :value="v.id" :key="v.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop="status" style="width: 90px;">
                    <el-select size="small" v-model="searchForm.status">
                        <el-option value="1" label="在职"></el-option>
                        <el-option value="-1" label="离职"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small" icon="search" 
                    @click="searchToolChange('searchForm')">查询
                    </el-button>
                    <el-button @click="searchToolReset('searchForm')" 
                    size="small" type="primary">重置
                    </el-button>
                </el-form-item>

                <el-form-item>
                    <el-tooltip content="点击刷新当前页面" placement="right">
                        <el-button  size="small" type="danger">刷新</el-button>
                    </el-tooltip>
                </el-form-item>
            </el-form>
        </el-row>

        <el-row>
            <el-col>
                <el-table :data="tableData" v-loading="dataLoad" style="width: 100%" border>
                    <el-table-column label="序号" width="70" type="index">
                    </el-table-column>

                    <el-table-column prop="head" label="头像" width="100" align="center">
                    </el-table-column>

                    <el-table-column prop="account" label="登录账号" width="100">
                    </el-table-column>

                    <el-table-column prop="realname" label="员工姓名" width="150">
                    </el-table-column>

                    <el-table-column prop="department_name" label="部门" width="100">
                    </el-table-column>

                    <el-table-column prop="role" label="职位" width="100">
                    </el-table-column>

                    <el-table-column prop="sex" label="性别" width="80" align="center">
                    </el-table-column>

                    <el-table-column prop="id_card" label="身份证号" width="192">
                    </el-table-column>

                    <el-table-column prop="phone" label="固话" width="140" align="center">
                    </el-table-column>

                    <el-table-column prop="mphone" label="手机" width="140" align="center">
                    </el-table-column>

                    <el-table-column prop="qq" label="QQ号" width="140" align="center">
                    </el-table-column>

                    <el-table-column prop="qq_nickname" label="QQ昵称" width="180" align="center">
                    </el-table-column>

                    <el-table-column prop="weixin" label="微信号" width="160" align="center">
                    </el-table-column>

                    <el-table-column prop="weixin_nikname" label="微信昵称" width="190" align="center">
                    </el-table-column>

                    <el-table-column prop="address" label="地址" width="190" align="center">
                    </el-table-column>

                    <el-table-column prop="ip" label="登录IP" width="170" header-align="center">
                    </el-table-column>

                    <el-table-column prop="location" label="登录地点" width="170" align="center">
                    </el-table-column>

                    <el-table-column prop="lg_time" label="最后登录时间" width="175" align="center">
                    </el-table-column>

                    <el-table-column prop="out_time" label="最后退出时间" width="175" align="center">
                    </el-table-column>

                    <el-table-column prop="creator" label="创建员工" width="190" align="center">
                    </el-table-column>

                    <el-table-column prop="created_at" label="创建时间" width="190">
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" width="220" align="center">
                        <template slot-scope="scope">
                            <el-button type="success"  size="small" @click="showEdit">编辑
                            </el-button>
                            <el-button type="info" size="small" @click="showRole">职能</el-button>
                            <el-button type="danger" size="small">离职</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>

                <el-col :span="12">

                        <el-button type="primary" size="small" @click="showAdd">添加员工</el-button>
                        <el-button type="primary" size="small" @click="showEditPassWord">修改密码</el-button>

                </el-col>
                <el-col :span="12">
                    <el-pagination
                            :current-page="currentPage4"
                            :page-size="100"
                            layout="total, prev, pager, next, jumper"
                            :total="total"
                            @current-change="currentChange">
                    </el-pagination>
                </el-col>

        </el-row>


        <!--添加公告 -->
        <addDialog :add-open="addDialog" @add-window-close="handleAddWindow"/>

        <!--&lt;!&ndash; / 添加公告 &ndash;&gt;-->
        <!--&lt;!&ndash;修改公告 &ndash;&gt;-->


        <editDialog :edit-open="editDialog" @add-window-close="handleAddWindow"/>

        <!-- / 修改公告 -->


        <Add name='add-employee'></Add>
        <Edit name='edit-employee'></Edit>
        <Role name='role'></Role>
        <EditPassWord name='editpassword'></EditPassWord>
    </div>


</template>

<script>
    import Add from './Add';
    import Edit from './Edit';
    import Role from './Role';
    import EditPassWord from './EditPassWord';
    import addDialog from './addDialog';
    import editDialog from './editDialog';
    import PageMix from '../../mix/Page';
    import DataProxy from '../../packages/DataProxy';
    import DepartSelectProxy from '../../packages/DepartSelectProxy';
    import GroupSelectProxy from '../../packages/GroupSelectProxy';
    import SearchTool from '../../mix/SearchTool';

    export default {
        name: 'Employee',
        pageTitle: "员工管理",
        mixins: [PageMix, SearchTool],
        components: {
            Add,
            Edit,
            Role,
            editDialog,
            EditPassWord
        },
        data() {
            return {
                depTypeName: "选择单位类型",
                typeList: ["销售部", "客服部", "风控部", "人事部", "推广部", "投顾部"],

                addDialog: false,
                editDialog: false,
                dataLoad:false,
                total:100,
                searchForm: {
                    typeValue: "",
                    department: '',
                    group: '',
                    status: "",
                    typeNumber: ''

                },
                departments: [],
                groups: [],
                currentPage4: 1,
                types: [
                    {value: '1', name: '员工账号'},
                    {value: '2', name: '员工姓名'},
                    {value: '3', name: '手机号'},
                    {value: '4', name: 'QQ号'},
                    {value: '5', name: '微信号'},
                ],
                tableData: [
                    {
                        head: '',
                        account: '李青',
                        realname: '李青',
                        department_name: '成都部',
                        role: '普通员工',
                        sex: '男',
                        id_card: '52148962466558875112',
                        phone: '028-12354',
                        mphone: '13524674554',
                        qq: '325641574',
                        qq_nickname: 'sb',
                        weixin: 'sdfsdf',
                        weixin_nikname: 'fsdfs',
                        address: '天堂一街',
                        ip: '192.168.0.11',
                        location: '成都',
                        lg_time: '2017-11-24 17:08:41',
                        out_time: '2017-11-24 19:08:41',
                        creator: '系统管理员',
                        created_at: '2017-11-28 14:35:10'
                    },


                ],

            }
        },
        methods: {
        showAdd(){

            this.$modal.show('add-employee');
        },  showRole(){

            this.$modal.show('role');
        }, showEdit(){

            this.$modal.show('edit-employee');
        },
            showEditPassWord(){

            this.$modal.show('editpassword');
        },
            dataReload: function () {
                console.log(this.searchForm);
            },
            searchReset: function () {
                this.$refs['searchForm'].resetFields();
            },
            refresh: function () {
                this.$refs['searchForm'].resetFields();
            },

            handleEdit: function (index, row) {
                console.log(row);
                this.editDialog = true;

            },
            handleDelete: function (index, row) {

            },
            switchHandle: function (index, row) {

            },
            openAddDialog: function () {

            },
            closeDialog: function () {

            },
            addFormSubmit: function () {
                console.log(this.addForm);
            },

            handleAddWindow() {
                this.addDialog = false;
                this.editDialog = false;
            },
            mainTableLoad(data) {
                this.toggleTableLoad();
                this.tableData = data.items;
                this.total = data.total;
            },
            currentChange(v) {
                this.toggleTableLoad();
                this.mainProxy.setPage(v).load();
            },
            toggleTableLoad() {
                this.dataLoad = !this.dataLoad;
            },
            loadDepartment(data) {
                this.departments = data.items;
            },
            loadGroup(data) {
                this.groups = data.items;
            },

            onSearchChange(param) {
                this.toggleTableLoad();
                this.mainProxy.setExtraParam(param).load();
            },

        },
        // created() {
        //     this.toggleTableLoad();
        //     let mainProxy = new DataProxy("/employee", this.pageSize, this.mainTableLoad, this);
        //     this.mainProxy = mainProxy;
        //     this.mainProxy.load();
        //
        //     let departProxy = new DepartSelectProxy({'type': 'sale'}, this.loadDepartment, this);
        //     this.departProxy = departProxy;
        //     this.departProxy.load();
        //
        //     let groupProxy = new GroupSelectProxy({'depart_id': 1}, this.loadGroup, this);
        //     this.groupProxy = groupProxy;
        //     this.groupProxy.load();
        //
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
