<template>
    <!-- 只有销售经理有权 处理这个页面 -->
    <el-row>
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="跟踪记录" name="First">
                <el-table :data="TrackLogData" border style="width: 100%">
                    <el-table-column prop="cus_name" label="客户姓名" align="center"></el-table-column>
                    <el-table-column prop="user_name" label="录入人姓名" align="center"></el-table-column>
                    <el-table-column prop="content" label="跟踪内容" align="center"></el-table-column>
                    <el-table-column prop="created_at" label="录入时间" align="center"></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="投诉记录" name="Second">
                <el-table :data="ComplainData" border style="width: 100%">
                    <el-table-column prop="cus_name" label="客户姓名" align="center"></el-table-column>
                    <el-table-column prop="user_name" label="投诉人姓名" align="center"></el-table-column>
                    <el-table-column prop="type" label="投诉类型" align="center">
                        <template slot-scope="scope">
                            {{ setComplainType(scope.row.type) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="content" label="投诉内容" align="center"></el-table-column>
                    <el-table-column prop="created_at" label="投诉时间" align="center"></el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </el-row>
</template>
  
<script>
    import CustomerTrackLogProxy from '@/packages/CustomerTrackLogProxy';
    import CustomerComplainProxy from '@/packages/CustomerComplainProxy';

    export default {
        name: 'SubDetail',
        props:{
            row:{
                type: Object,
                default:null
            },
            complainType:{
                type: Object,
                default:null
            }
        },
        data () {
            return {
                activeName:'First',
                TrackLogData:[],
                ComplainData:[],
                tabFirst:false,
                tabSecond:false,
            }
        },
       
        methods:{
            setComplainType(type){
                return this.complainType[type];
            },
            handleFirst(row){
                this.customerTrackLogProxy.setParam({
                    cus_id:row.id,
                    business:'theCus'
                }).load();
                this.tabFirst = true;
            },
            handleSecond(row){
                this.customerComplainProxy.setParam({
                    cus_id:row.id,
                    business:'theCus'
                }).load();
                this.tabSecond = true;
            },
            getTrackLog(data){
                this.TrackLogData = data;
            },
            getComplainLog(data){
                this.ComplainData = data;
            },
        },
        watch:{
            row(val, oldVal){
                this['handle'+ this.activeName].call(this, this.row);
                this.tabFirst = false;
                this.tabSecond = false;
            },
            activeName(val,oldVal){
                if (!this['tab'+ val] && this.row !== null) {
                    this['handle'+ val].call(this, this.row);
                }
            },

        },
        created(){
            this.customerTrackLogProxy = new CustomerTrackLogProxy(null,this.getTrackLog,this);
            this.customerComplainProxy = new CustomerComplainProxy(null,this.getComplainLog,this);
            
        }
    }
</script>
<style scoped>

</style>
  