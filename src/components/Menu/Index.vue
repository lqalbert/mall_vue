<template>
    <div>
        <el-row>
            <el-col>
                <el-table :data="tableData" v-loading.body="dataLoad" border style="width: 100%">
                    <el-table-column align="center" type="index" label="序号" width="100"></el-table-column>
                    <el-table-column align="center" prop="type" label="菜单分类"></el-table-column>
                    <el-table-column align="center" prop="name" label="菜单名称"></el-table-column>
                    <el-table-column align="center" prop="remark" label="访问地址"></el-table-column>
                    <el-table-column align="center" label="当前状态" width="100">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.switch" on-color="#13ce66" off-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">编辑
                            </el-button>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
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
        </el-row>


        <editDialog :edit-open="editDialog" @add-window-close="handleAddWindow"/>

    </div>


</template>

<script>
    import PageMix from '../../mix/Page';
    import editDialog from './editDialog';
    import DataProxy from '../../packages/DataProxy';
    export default {
        name: 'Menus',
        pageTitle: "权限管理",
        mixins: [PageMix],
        components: {
            editDialog
        },
        data() {
            return {
                depTypeName: "选择单位类型",
                typeList: ["销售部", "客服部", "风控部", "人事部", "推广部", "投顾部"],
                addDialog: false,
                editDialog: false,
                total: 100,
                dataLoad: false,
                currentPage4: 1,
                tableData: [
                    {type: '百宝箱', name: '百宝箱', switch: true, remark: ''},
                    {type: '', name: '我的工作台', switch: true, remark: 'Index/main'},
                    {type: '', name: '消息盒子', switch: true, remark: 'MsgBox/index'},
                    {type: '', name: '系统公告', switch: true, remark: 'SysNotice/index'},
                    {type: '', name: '集思信箱', switch: true, remark: 'GatherAdvice/index'},
                    {type: '组织员工', name: '组织员工', switch: true, remark: ''},
                    {type: '', name: '组织单位', switch: true, remark: 'Department/index'},
                    {type: '', name: '团队小组', switch: true, remark: 'Group/index'},
                    {type: '', name: '员工管理', switch: true, remark: 'Employee/index'},
                ],
            }
        },
        methods: {

            handleEdit: function () {
                this.editDialog = true;
            },
            handleAuthoriz: function () {
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
            }


        },
        created() {
            this.toggleTableLoad();
            let mainProxy = new DataProxy("/menu", this.pageSize, this.mainTableLoad, this);
            this.mainProxy = mainProxy;
            this.mainProxy.load();

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .el-form-item {
        margin-bottom: 2px;
    }


</style>
