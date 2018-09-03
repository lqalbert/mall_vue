<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="department_id">
                    <el-select size="small" v-model="searchForm.department_id" placeholder="部门" @change="departmentChange">
                        <el-option v-for="v in departments" :label="v.name"
                                   :value="v.id" :key="v.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop="group_id">
                    <el-select size="small" v-model="searchForm.group_id" placeholder="小组" @change="groupChange">
                        <el-option v-for="v in groups" :label="v.name"
                                   :value="v.id" :key="v.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="user_id" >
                    <el-select v-model.number="searchForm.user_id" size="small" placeholder="员工" >
                        <el-option
                                v-for="user in users"
                                :label="user.realname"
                                :value="user.id"
                                :key="user.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询</el-button>
                    <el-button type="primary" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                    <!-- <el-button type="primary" size="small" @click="refreshTable">刷新</el-button> -->
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-col :span="8" :offset="8">
                <h4 style="color: red">如果有多个员工启用，则默认使用最新添加的那个员工！</h4>
            </el-col>
            <el-col>
                 <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :page-size="20">
                    <el-table-column type="index" width="80" label="序号"></el-table-column>

                    <el-table-column prop="department_name" label="部门名称" align="center" ></el-table-column>

                    <el-table-column prop="group_name" label="小组名称" align="center"></el-table-column>

                    <el-table-column prop="user_name" label="员工姓名" align="center"></el-table-column>

                    <!--<el-table-column prop="max_number" label="最大接纳人数" align="center"></el-table-column>-->

                    <el-table-column prop="now_number" label="已接收人数" align="center"></el-table-column>

                     <el-table-column label="是否启用" align="center" prop="status">
                         <template slot-scope="scope">
                             <el-switch
                                     v-model="scope.row.status"
                                     :on-value="1"
                                     :off-value="0"
                                     on-color="#13ce66"
                                     off-color="#ff4949"
                                     @change="setStatusChange(scope.row)">
                             </el-switch>
                         </template>
                     </el-table-column>

                    <el-table-column prop="remark" label="备注" align="center" :show-overflow-tooltip="true"></el-table-column>

                    <el-table-column  label="操作" align="center" width="200">
                        <template slot-scope="scope">
                            
                            <!--<el-button type="info" size="small" @click="showEdit(scope.row)">修改</el-button>-->
                            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>

                   <div slot="buttonbar">
                        <el-button type="primary" size="small" @click="add">导入设置</el-button>
                    </div>

                 </TableProxy>
            </el-col>
        </el-row>

        <add-dialog
                name="add"
                :ajax-proxy="ajaxProxy"
                :departments="departments"
                @submit-success="handleReload">
        </add-dialog>
        <edit-dialog
                name="edit"
                :ajax-proxy="ajaxProxy"
                :departments="departments"
                @submit-success="handleReload">
        </edit-dialog>

    </div>
</template>
<script>
import addDialog from './add.vue';
import editDialog from './edit.vue';
import config from '../../mix/Delete';
import PageMix from '../../mix/Page';
import SearchTool from '../../mix/SearchTool';
import DataTable from '../../mix/DataTable';
import { mapGetters } from 'vuex';
import AccountSettings from '../../ajaxProxy/AccountSettings';
import DepartSelectProxy from '../../packages/DepartSelectProxy';
import GroupSelectProxy from '../../packages/GroupSelectProxy';
import getGroupsByPid from '../../ajaxProxy/getGroupsByPid';
import getUsersByGid from '../../ajaxProxy/getUsersByGid';

export default {
    name: 'AccountSettings',
    pageTitle:"导入账号设置",
    mixins:[PageMix,SearchTool,config,DataTable,getGroupsByPid,getUsersByGid],
    components:{
        addDialog,
        editDialog,
    },
    data(){
        return {
            mainparam:"",
            mainurl:AccountSettings.getUrl(),
            ajaxProxy:AccountSettings,
            searchForm:{
                department_id: '',
                group_id: '',
                user_id: '',
            },

            departments: [],
            groups: [],
            users: [],

        }
    },
    methods:{
        departmentChange(pid){
            if(pid){
                this.groups=[];
                this.searchForm.group_id='';
                this.getGroupsAjax(pid);
            }

        },
        groupChange(gid){
            if(gid){
                this.users=[];
                this.searchForm.user_id='';
                this.getUsersAjax(gid);
            }
        },
        setStatusChange(row){
            this.ajaxProxy.update(row.id, {status:row.status}).then((response)=>{
                this.$message.success('设置成功');
            }).catch((response)=>{
                this.$message.error('更新失败');
                row.status = row.status == 1 ? 0 : 1 ;
            });
        },
        loadDepartment(data) {
            this.departments = data.items;
        },
        add(){
            this.$modal.show('add', {model:this.model});
        },
        showEdit(row){
            this.$modal.show('edit',{model:row});
        },
        getAjaxProxy(){
            return  this.ajaxProxy;
        },
        onSearchChange(param){
            this.mainparam = JSON.stringify(param);
        },

    },
    created(){
        //获取部门
        let departProxy = new DepartSelectProxy(null, this.loadDepartment, this);
        this.departProxy = departProxy;
        this.departProxy.load();

        this.$on('search-tool-change', this.onSearchChange);

    },
    mounted(){

    },
    
}
</script>
<style scoped>

</style>

