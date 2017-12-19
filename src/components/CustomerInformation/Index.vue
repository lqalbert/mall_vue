<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
                <el-form-item prop="name">
                    <el-input v-model="searchForm.name" placeholder="客户姓名" size="small"></el-input>
                </el-form-item>
                <el-form-item prop="text">
                    <el-input v-model="searchForm.text" placeholder="手机/QQ/微信" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small"  @click="searchToolChange('searchForm')">查询</el-button>
                    <el-button type="primary" size="small" @click="showAdvQueryDialog">高级查询</el-button>
                    <el-button type="primary" size="small"  @click="searchToolReset('searchForm')">重置</el-button>
                    <el-button    size="small" type="danger" >刷新</el-button>

                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-col>
                <el-table :data="tableData" v-loading.body="dataLoad" empty-text="请录入客户信息" 
                highlight-current-row border ref="select" style="width: 100%">
                    <el-table-column label="序号" width="65" type="index" align="center"></el-table-column>
                    <el-table-column prop="name" label="客户姓名" width="200" align="center"></el-table-column>
                    <el-table-column prop="type" label="客户类型" width="140" align="center"></el-table-column>
                    <el-table-column prop="realname" label="跟踪员工" width="200" align="center"></el-table-column>
                    <el-table-column prop="lock_name" label="锁定员工" width="200" align="center"></el-table-column>
                    <el-table-column prop="qq" label="QQ号" width="200" align="center"></el-table-column>
                    <el-table-column prop="qq_nickname" label="QQ昵称" width="200"
                                     align="center"></el-table-column>
                    <el-table-column prop="phone" label="手机" width="200" align="center"></el-table-column>
                    <el-table-column prop="weixin_nickname" label="微信昵称" width="200"
                                     align="center"></el-table-column>
                    <el-table-column prop="dis_time" label="分配时间" width="180" align="center"></el-table-column>
                    <el-table-column prop="recommend" label="是否推荐" width="140" align="center"></el-table-column>
                    <el-table-column prop="important" label="是否自选" width="140" align="center"></el-table-column>
                    <el-table-column prop="last_track" label="最后跟踪时间" width="180"
                                     align="center"></el-table-column>
                    <el-table-column prop="share_benefit" label="分成比例" width="140"
                                     align="center"></el-table-column>
                    <el-table-column prop="plan" label="计划跟踪时间" width="180" align="center"></el-table-column>
                    <el-table-column prop="conflict" label="最后冲突时间" width="180" align="center"></el-table-column>
                    <el-table-column prop="province_name" label="地区" width="100"
                                     align="center"></el-table-column>
                    <el-table-column prop="sex" label="性别" width="80" align="center"></el-table-column>
                    <!--<el-table-column label="操作" width="180" fixed="right" align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-button size="small" type="primary">购买</el-button>-->
                            <!--&lt;!&ndash;<el-button size="small" type="info">续费</el-button>&ndash;&gt;-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-row style="margin-bottom:6px">
                    <el-col :span="24">
                        <el-tooltip content="录入新的客户" placement="bottom-start" style="margin-left:0px;">
                            <el-button size="small" type="primary" @click="showAdd">添加客户</el-button>
                        </el-tooltip>
                        <el-tooltip content="编辑客户资料" placement="bottom-start" style="margin-left:10px;">
                            <el-button size="small" type="primary" @click="showEdit">修改客户</el-button>
                        </el-tooltip>
                        <el-tooltip content="编辑客户资料" placement="bottom-start" style="margin-left:10px;">
                            <el-button size="small" type="primary"  @click="showChat" >聊天记录</el-button>
                        </el-tooltip>
                    </el-col>
                </el-row>

            </el-col>
            <el-col :span="12">
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
        <div id="app2" class="b" style="margin-top:5px;">
            <el-row>
                <el-col :span="24">
                    <el-tabs type="border-card">
                        <el-tab-pane label="跟踪记录">
                            <el-table :data="tableData1" empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                                <el-table-column prop="user" label="操作员工" align="center">
                                </el-table-column>

                                <el-table-column prop="type" label="客户类型(当前)" align="center">
                                </el-table-column>

                                <el-table-column prop="name" label="客户姓名" align="center">
                                </el-table-column>

                                <el-table-column label="内容" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.content | handleString}}
                                    </template>
                                </el-table-column>

                                <el-table-column prop="created_at" label="跟踪时间" width="180" align="center">
                                </el-table-column>

                                <el-table-column prop="track_text" label="跟踪类型" align="center">
                                </el-table-column>

                            </el-table>
                        </el-tab-pane>

                        <!-- <el-tab-pane label="软件账号">软件账号</el-tab-pane>
                        <el-tab-pane label="通话记录">通话记录</el-tab-pane> -->
                        <el-tab-pane label="投诉记录">
                            <el-table :data="tableData2" empty-text="请点击客户显示跟踪信息" border style="width: 100%">
                                <el-table-column prop="user" label="操作员工" align="center">
                                </el-table-column>

                                <el-table-column label="投诉内容" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.content | handleString}}
                                    </template>
                                </el-table-column>

                                <el-table-column prop="created_at" label="投诉时间" width="180" align="center">
                                </el-table-column>

                                <el-table-column prop="type_text" label="投诉类型" align="center">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
        </div>
        <div>
            <!-- 添加高级查询 -->
            <advanced-query :advance-query.sync="advancedQueryDialog"
                            @update:advance-query="val => advancedQueryDialog = val">
            </advanced-query>

        </div>


        <ShowAdvQueryDialog name='showadvquerydialog'></ShowAdvQueryDialog>
        <Add name='add-customerinformation'></Add>
        <Chat name='chat'></Chat>
        <Edit name='edit-customerinformation'></Edit>

    </div>

</template>

<script>
    import advancedQuery from "./advancedQuery";
    import Add from "./Add";
    import Edit from "./Edit";
    import Chat from "./Chat";
    import ShowAdvQueryDialog from "./ShowAdvQueryDialog";
    import PageMix from '../../mix/Page';
    import DataProxy from '../../packages/DataProxy';
    import SearchTool from '../../mix/SearchTool';

    export default {
        name: 'CustomerInformation',
        pageTitle: "客户资料",
        mixins: [PageMix,SearchTool],
        components: {
            advancedQuery,
            Add,
            Chat,
            Edit,
            ShowAdvQueryDialog
        },
        data() {
            return {
                advancedQueryDialog: false,
                msg: '',
                searchForm: {},
                currentPage4: 1,
                total: 100,
                dataLoad: false,
                tableData: [
                    {
                        name: '张三',
                        type: 'C.一般客户',
                        realname: '本.拉登',
                        lock_name: '小布什',
                        qq: 1008611,
                        qq_nickname: '移动客户',
                        phone: 13666666666,
                        weixin_nickname: '联通客户',
                        dis_time: '2017-11-12 00:00:00',
                        recommend: '是',
                        important: '否',
                        last_track: '2017-11-11 10:37:50',
                        share_benefit: '3/7',
                        plan: '2017-11-22 14:08:05',
                        conflict: '2017-11-22 14:08:05',
                        province_name: '旧金山',
                        sex: '女'
                    },

                ],
                tableData1: [
                    {
                        user: '推广A部-王姣姣',
                        type: 'C.一般客户',
                        name: '44N4D',
                        content: '手机号冲突:15642104241',
                        created_at: '2017-11-22 14:55:36',
                        track_text: '预查冲突'
                    },

                ],
                tableData2: [
                    {user: 'KFC-CFK', content: '这个鸡腿太好吃了', created_at: '2017-09-29 12:28:07', type_text: '味道问题'},
                ],
            }
        },
        methods: {
            // refresh(){
            //   window.location.reload();
            // },
            advQueryDialog: function () {
                this.advancedQueryDialog = true;
                console.log(this.advancedQueryDialog);
            },
            showAdvQueryDialog: function () {
                this.$modal.show('showadvquerydialog');
            },
            showAdd: function () {
                this.$modal.show('add-customerinformation');
            }, showEdit: function () {
                this.$modal.show('edit-customerinformation');
            }, showChat: function () {
                this.$modal.show('chat');
            },
            mainTableLoad(data) {
                this.toggleTableLoad();
                this.tableData = data.items;
                this.tableData1 = data.items1;
                this.tableData2 = data.items2;
                this.total = data.total;
            },
            currentChange(v) {
                this.toggleTableLoad();
                this.mainProxy.setPage(v).load();
            },
            toggleTableLoad() {
                this.dataLoad = !this.dataLoad;
            },
            onSearchChange(param) {
                this.toggleTableLoad();
                this.mainProxy.setExtraParam(param).load();
            },
            typeOption(name){
                console.log(name);
                let data={
                    name:name
                }
                // this.mainProxy.setExtraParam(data).load();
                this.$emit('search-tool-change', data);
            }
        },
        // created() {
        //     this.toggleTableLoad();
        //     let mainProxy = new DataProxy("/customerinformation", this.pageSize, this.mainTableLoad, this);
        //     this.mainProxy = mainProxy;
        //     this.mainProxy.load();
        //
        //
        //
        // },
        filters: {
            handleString: function (v) {
                if (v.length > 6) {
                    return v.substring(0, 6) + '......';
                } else {
                    return v;
                }
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-tabs__header {
        border-top: 2px solid #ea4b4b;
        border-bottom: 1px solid #c51f1f;
    }

    .el-tabs--border-card .el-tabs__header {
        background-color: #fff;
        margin: 0;
    }

    .el-form-item {
        margin-bottom: 2px;
    }
</style>
