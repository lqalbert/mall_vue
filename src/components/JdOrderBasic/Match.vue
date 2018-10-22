<template>
    <div>
        <MyDialog title="客户匹配" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-row>
                <el-table :data="tableData" empty-text="暂无数据" border style="width: 100%" max-height="500">
                    <el-table-column prop="created_at" label="导入时间" width="180"></el-table-column>
                    <el-table-column prop="sum" label="导入条数" width="100"></el-table-column>
                    <el-table-column prop="flag" label="批次" width="140"></el-table-column>
                    <el-table-column prop="file_name" label="导入文件名" width="140" show-overflow-tooltip></el-table-column>
                    <el-table-column label="匹配状态" width="140">
                        <template slot-scope="scope">
                            <div v-if="scope.row.match_status ==0 ">未匹配</div>
                            <div v-else-if="scope.row.match_status ==1 ">匹配中</div>
                            <div v-else-if="scope.row.match_status ==2 ">匹配完成</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.match_status ==0" size="small" type="info" 
                                @click="userMatch(scope.row)">智能匹配</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button @click="handleClose" type="info">确 定</el-button>
            </div>
        </MyDialog>
    </div>
</template>
 
<script>
import DialogForm from '@/mix/DialogForm';
import { mapGetters } from 'vuex';

export default {
    name: 'match-table',
    mixins:[DialogForm],
    components:{
        
    },
    data(){
        return {
            dialogThis:this,
            tableData:[],
        }
    },
    computed:{
        ...mapGetters([
            'user_id',
            'getUser',
        ]),
    },
    methods:{
        onOpen(param){
            this.getData();
        },
        userMatch(row){
            console.log(row);
            let vmThis = this;
            this.ajaxProxy.matchUser(row.flag).then(function(response){
                if(response.data.status == 0){
                    vmThis.$message.error(response.data.msg ? response.data.msg : "操作失败" );
                }else{
                    vmThis.$message({
                        message: response.data.msg,
                        duration:5000
                    });
                    vmThis.getData();
                }
            }).catch(function(error){
                console.log(error);
                vmThis.$message.error("出错了");
            });
            // this.$emit('submit-success');
        },
        getData(){
            let vmThis = this;
            this.ajaxProxy.getMatch().then(function(response){
                console.log(response);
                vmThis.tableData = response.data;
            });
        }
    },
    created(){

    },
    
}
</script>
<style scoped>
    .form-item-unique{
        width: 140px !important;
    }
    .name-input{
        max-width: 170px;
    }
    .name-input-area{
        max-width: 220px;
    }
    .pull-right {
        float: right;
    }

    .input-width {
        width: 120px;
    }
</style>

 