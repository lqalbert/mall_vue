<template>
    <div>
        <MyDialog title="扣除库存操作" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-row>
                <el-form ref="addForm" :model="addForm" :rules="rules">
                    <el-form-item label="配送中心" prop="entrepot_id">
                        <el-select
                                clearable
                                v-model.number="addForm.entrepot_id"
                                size="small"
                                placeholder="配送中心" class="name-input">
                            <el-option v-for="v in entrepots" :label="v.name"
                                    :value="v.id" :key="v.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row>
                <el-table :data="tableData" empty-text="暂无数据" border style="width: 100%" max-height="500">
                    <el-table-column prop="created_at" label="导入时间" width="180"></el-table-column>
                    <el-table-column label="扣除状态" width="120">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.inventory_status ==0 ">未扣除</el-tag>
                            <el-tag type="gray" v-else-if="scope.row.inventory_status ==1 ">扣除中</el-tag>
                            <el-tag type="primary" v-else-if="scope.row.inventory_status ==2 ">扣除完成</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sum" label="导入条数" width="100"></el-table-column>
                    <el-table-column prop="flag" label="批次" width="140"></el-table-column>
                    <el-table-column prop="file_name" label="导入文件名" width="140" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" fixed="right" width="110">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.inventory_status ==0" size="small" type="info" 
                                @click="inventoryMinus(scope.row)">扣除库存</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleDialogClose">取 消</el-button>
                <el-button @click="handleDialogClose" type="info">确 定</el-button>
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
    props:{
        entrepots:{
            required:true,
            type: Array,
            default:[]
        }
    },
    components:{
        
    },
    data(){
        return {
            dialogThis:this,
            tableData:[],
            addForm:{
                entrepot_id:''
            },
            rules:{
                entrepot_id:[
                    { required: true, type:'number',message: '选择配送中心', trigger: 'blur' }
                ],
            }
        }
    },
    computed:{
        ...mapGetters({
            'user_id':'user_id',
            'getUser':'user_id'
            // 'entrepots':'getEntrepots'
        }),
    },
    methods:{
        onOpen(param){
            this.getData();
        },
        inventoryMinus(row){
            let vmThis = this;
            let entrepot_id = this.addForm.entrepot_id;
            this.$refs.addForm.validate((valid)=>{
                if (valid) {
                    this.ajaxProxy.minusInventory(row.flag,entrepot_id).then(function(response){
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
                } else {
                    console.log('error submit!!', name);
                    return false;
                }
            });
        },
        getData(){
            let vmThis = this;
            this.ajaxProxy.getMatch().then(function(response){
                console.log(response);
                vmThis.tableData = response.data;
            });
        },
        handleDialogClose(){
            this.$refs.addForm.resetFields();
            this.handleClose();
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

 