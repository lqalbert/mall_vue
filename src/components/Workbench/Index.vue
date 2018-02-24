<template>
    <div class="container">
        <div class="wrapp" >
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-card id="one" class="box-card">
                        <div slot="header" class="head">
                            个人信息
                        </div>
                        <div id="two" style="display: table-cell;vertical-align:middle;">
                            <!--<php>-->
                            <!--$userInfo = session('account')['userInfo'];-->
                            <!--$arr=M('user_info')->where(array('user_id'=>$userInfo['user_id']))->find();-->
                            <!--$arr['g_name']=M('group_basic')->where(array('id'=>$arr['group_id']))->getField('name');-->
                            <!--$arr['d_name']=M('department_basic')->where(array('id'=>$arr['department_id']))->getField('name');-->
                            <!--$arr['role_name']=M('rbac_role')->where(array('id'=>$arr['role_id']))->getField('name');-->
                            <!--</php>-->
                            <img src="#" class="image"  style="width:200px;height:200px;border-radius:100%; vertical-align:middle;">

                            <div id="th" style="float:right;width:200px;border-left:1px solid #e2e2e2;line-height:180%">
                                &nbsp;&nbsp;&nbsp;<span>姓名：管理员</span><br>
                                &nbsp;&nbsp;&nbsp;<span>I  D：1</span><br>
                                &nbsp;&nbsp;&nbsp;<span>职位类型：总经办</span><br>
                                &nbsp;&nbsp;&nbsp;<span>单位：成都总部</span><br>
                                &nbsp;&nbsp;&nbsp;<span>Q  Q：254135264</span><br>
                                &nbsp;&nbsp;&nbsp;<span>电话：13542156248</span><br>
                                &nbsp;&nbsp;&nbsp;<span>地址：成都青阳区</span>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="16">
                    <el-card class="box-card">
                        <div slot="header" class="head">
                            系统公告
                        </div>
                        <div>
                            <el-table :data="dataList"   border stripe  >
                                <el-table-column prop="type" label="公告类型"  align="center"></el-table-column>
                                <el-table-column prop="title" label="公告标题" align="center"></el-table-column>
                                <!-- <el-table-column prop="start" label="开始日期" align="center"></el-table-column> -->
                            </el-table>
                            <el-col :span="24" style="padding:3px;">
                                <div class="grid-content bg-purple-light pull-right" style="padding:2px;">
                                    <!-- page -->
                                    <include file="Common:_pagination" />
                                    <!-- / page -->
                                </div>
                            </el-col>
                        </div>
                    </el-card>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-tabs  id="two" class="box-card" v-model="selectedCard">
                    <el-tab-pane label="重要联系人"  name="first">
                        <el-table  :data="userData"   highlight-current-row border ref="select" style="width: 100%">
                            <el-table-column prop="name" label="姓名" align="center"></el-table-column>

                            <el-table-column prop="relationship" label="与本人关系" align="center">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.relationship==0">未定义</span>
                                    <span v-else-if="scope.row.relationship==1" >父子(女)</span>
                                    <span v-else-if="scope.row.relationship==2">母子(女)</span>
                                    <span v-else-if="scope.row.relationship==3">兄弟(姐妹)</span>
                                    <span v-else-if="scope.row.relationship==4">朋友</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="phone" label="电话" align="center"></el-table-column>

                            <el-table-column prop="qq" label="qq" align="center"></el-table-column>

                            <el-table-column prop="weixin" label="微信" align="center"></el-table-column>

                        </el-table>
                    </el-tab-pane>

                    <el-tab-pane label="常用网址" name="second">
                        <el-table  :data="Website"   highlight-current-row border ref="select" style="width: 100%">
                            <el-table-column prop="describe" label="网址描述" align="center"></el-table-column>

                            <el-table-column prop="url" label="具体网址" align="center"></el-table-column>

                            <el-table-column prop="remark" label="备注" align="center"></el-table-column>

                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-row>
        </div>
    </div>



</template>

<script>
    import PageMix from '../../mix/Page';
    import SearchTool from '../../mix/SearchTool';
    import DataTable from '../../mix/DataTable';

    import ArticleAjaxProxy from '../../ajaxProxy/Article';

    export default {
        name: 'Workbench',
        pageTitle: "我的工作台",
        mixins: [PageMix, SearchTool,DataTable],
        data() {
            return {
                ajaxProxy: ArticleAjaxProxy,
                mainurl:ArticleAjaxProxy,
                mainparam:"",

                selectedCard:'first',
                userData: [
                    {name:'张三',relationship:1,phone:1352462154,qq:325412456,weixin:'wx0001'},
                    {name:'李四',relationship:2,phone:1352462154,qq:325412456,weixin:'wx0002'},
                ],
                Website: [
                    {describe:'在公司使用',url:'www.company.com',remark:'很安全'},
                    {describe:'在家使用',url:'www.home.com',remark:'仅限本人使用'},

                ],
                dataList: [
                    {type:'系统维护',title:'工作台维护中'},
                    {type:'功能升级',title:'下单功能升级中'},

                ]
            }
        },
        methods: {
            getAjaxProxy(){
                return  this.ajaxProxy;
            },
            onSearchChange(param) {
                this.mainparam = JSON.stringify(param);
            },

            doubleClick(row, event){
                console.log(row);
            }
        },
        created() {
            this.$on('search-tool-change', this.onSearchChange);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*#one #two{*/
        /*padding:22px;*/
    /*}*/
    .head {
        padding: 15px 20px;
        border-bottom: 1px solid #D3DCE6;
        box-sizing: border-box;
        background-color: #3fc3e2;
        color: #ffffff;
    }
    .container > .wrapp > {
        margin-bottom: 10px;
    }
</style>
