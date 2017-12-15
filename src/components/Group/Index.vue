<template>
    <div>
        <el-row>
            <el-form :inline="true" ref="searchForm" :model="searchForm">
                <el-form-item prop="department_id">
                    <el-select v-model="searchForm.department_id" placeholder="部门">
                        <el-option v-for="v in departments" :label="v.name"
                         :value="v.id" :key="v.id">
                         </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop="group_id">
                    <el-select v-model="searchForm.group_id" placeholder="团队小组">
                        <el-option v-for="v in groups" :label="v.name"
                         :value="v.id" :key="v.id">
                         </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop="realname" style="width: 120px">
                    <el-input v-model="searchForm.realname" size="small" placeholder="输入负责人姓名">
                    </el-input>
                </el-form-item>

                <el-form-item prop="phone" style="width: 120px">
                    <el-input v-model="searchForm.phone" size="small" placeholder="输入联系电话">
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small" @click="searchToolChange('searchForm')" icon="search">查询
                    </el-button>
                    <el-button size="small" type="primary" @click="searchToolReset('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-col>
                <el-table :data="tableData" v-loading.body="dataLoad" border style="width: 100%">
                    <el-table-column label="序号" align="center" type="index" width="65"> 
                    </el-table-column>

                    <el-table-column label="部门" prop="departmentname" align="center">
                    </el-table-column>

                    <el-table-column label="团队小组名称" prop="name" align="center">
                    </el-table-column>

                    <el-table-column prop="realname" label="联系人(负责人)" align="center">
                    </el-table-column>

                    <el-table-column label="联系电话" prop="phone" align="center">
                    </el-table-column>

                    <el-table-column label="是否启用" :context="_self" align="center" prop="status">
                        <template slot-scope="scope">
                            <div>
                                <el-switch v-model="scope.row.switch" on-color="#13ce66"
                                 off-color="#ff4949" @change="switchHandle(scope.$index, scope.row)">
                                </el-switch>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="remark" label="说明备注" align="center">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <div class="pull-right">
                <el-col :span="12" :offset="12">
                    <div style="float:right">
                        <el-pagination
                                :current-page="currentPage4"
                                :page-size="100"
                                layout="total, prev, pager, next, jumper"
                                :total="total"
                                @current-change="currentChange">
                        </el-pagination>
                    </div>
                </el-col>
            </div>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-tabs>
                    <el-tab-pane label="团队成员">
                        <el-table :data="tableData1" empty-text="请点击小组" border>
                            <el-table-column prop="user_id" label="员工ID" width="180" align="center">
                            </el-table-column>
                            <el-table-column prop="realname" label="员工姓名" width="180" align="center">
                            </el-table-column>
                            <el-table-column prop="type" label="员工类型" width="180" align="center">
                            </el-table-column>
                            <el-table-column prop="phone" label="手机" align="center">
                            </el-table-column>
                            <el-table-column prop="qq" label="QQ号" align="center">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
        <!--添加公告 -->


        <!--<addDialog :add-open="addDialog" @add-window-close="handleAddWindow"/>-->

        <!--&lt;!&ndash; / 添加公告 &ndash;&gt;-->
        <!--&lt;!&ndash;修改公告 &ndash;&gt;-->


        <!--<editDialog :edit-open="editDialog" @add-window-close="handleAddWindow"/>-->

        <!-- / 修改公告 -->

    </div>


</template>

<script>
    //import addDialog from './addDialog';
    //import editDialog from './editDialog';
    import PageMix from '../../mix/Page';
    import DataProxy from '../../packages/DataProxy';
    import DepartSelectProxy from '../../packages/DepartSelectProxy';
    import GroupSelectProxy from '../../packages/GroupSelectProxy';
    import SearchTool from '../../mix/SearchTool';

    export default {
        name: 'Group',
        pageTitle: "团队小组",
        mixins: [PageMix, SearchTool],
//    components: {
//        addDialog,
//       editDialog
//    },
        data() {
            return {
                depTypeName: "选择单位类型",
                typeList: ["销售部", "客服部", "风控部", "人事部", "推广部", "投顾部"],
                departments: [],
                groups: [],
                addDialog: false,
                editDialog: false,
                searchForm: {
                    realname: "",
                    department_id: '',
                    group_id: '',
                    phone: "",

                },
                total: 100,
                dataLoad: false,
                currentPage4: 1,
                tableData: [
                    {
                        departmentname: '推广二部',
                        name: '超越队',
                        realname: '李青',
                        phone: '13526458712',
                        status: '0',
                        switch: true,
                        remark: '推广部王牌'
                    },
                ],
                tableData1: [
                    {user_id: '123', type: '队员', realname: '李青', phone: '13526458712', qq: '1245624'},
                ]
            }
        },
        methods: {
            dataReload: function () {
                console.log(this.searchForm);
            },
            searchReset: function () {
                this.$refs['searchForm'].resetFields();
            },
            refresh: function () {
                this.$refs['searchForm'].resetFields();
            },
            depTypeChange: function (v) {
                this.searchForm.type = v;
                this.depTypeName = this.typeList[v];
            },
            handleEdit: function () {
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
                this.tableData1 = data.items1;
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
        created() {

            this.toggleTableLoad();
            let mainProxy = new DataProxy("/group", this.pageSize, this.mainTableLoad, this);
            this.mainProxy = mainProxy;
            // this.mainProxy
            this.mainProxy.load(); 

            let departProxy = new DepartSelectProxy({'type': 'sale'}, this.loadDepartment, this);
            this.departProxy = departProxy;
            this.departProxy.load();

            let groupProxy = new GroupSelectProxy({'depart_id': 1}, this.loadGroup, this);
            this.groupProxy = groupProxy;
            this.groupProxy.load();


        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
