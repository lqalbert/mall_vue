<template>
    <!-- 只有销售经理有权 处理这个页面 -->
    <el-row>
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="跟踪记录" name="first">
                <el-table :data="TrackLogData" border style="width: 100%">
                    <el-table-column prop="cus_name" label="客户姓名" align="center"></el-table-column>
                    <el-table-column prop="user_name" label="录入人姓名" align="center"></el-table-column>
                    <el-table-column prop="content" label="跟踪内容" align="center"></el-table-column>
                    <el-table-column prop="created_at" label="录入时间" align="center"></el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </el-row>
</template>
  
<script>
    import CustomerTrackLogProxy from '@/packages/CustomerTrackLogProxy';

    export default {
        name: 'SubDetail',
        props:{
            row:{
                type: Object,
                default:null
            }
        },
        data () {
            return {
                activeName:'first',
                TrackLogData:[]
            }
        },
       
        methods:{
            showRow(row){
                let customerTrackLogProxy = new CustomerTrackLogProxy(null,this.getTrackLog,this);
                customerTrackLogProxy.setParam({cus_id:row.id,business:'theCus'}).load();
            },
            getTrackLog(data){
                this.TrackLogData = data;
            },
        },
        watch:{
            row(val, oldVal){
                this.showRow(val);
            }
        },
        created(){
            
            
        }
    }
</script>
<style scoped>

</style>
  