<template>
    <div>
        <MyDialog title="上传JD订单exdel文件" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-row>
                <el-form ref="addForm" :model="addForm" :rules="rules">
                    <el-form-item label="配送中心" prop="entrepot_id">
                        <el-select
                                clearable
                                v-model.number="addForm.entrepot_id"
                                size="small"
                                placeholder="配送中心" class="name-input">
                            <el-option v-for="vv in entrepots" :label="vv.name"
                                    :value="vv.id" :key="vv.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row>
                <el-upload
                    ref="upload"
                    name="avatar"
                    class="upload-demo"
                    :data="addForm"
                    :auto-upload="false"
                    :action="uploadUrl"
                    accept=".csv,.xls,.xlsx"
                    :file-list="fileList"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                    :before-upload="beforeAvatarUpload"
                    :on-change="handleChange">
                    <el-button size="small" type="info">选择文件</el-button>
                    <div slot="tip" class="el-upload__tip">一次只能上传excel格式的文件一个</div>
                </el-upload>
            </el-row>
            <br>
            <el-row>
                <el-col :span="12">
                    <el-button size="small" type="primary" @click="beforeFormSubmit()">点击上传</el-button>
                </el-col>
            </el-row>
            <br>
            <el-row>
                <el-col :span="12">
                    <div v-show="matchButton">
                        <hr>
                        <span>本次导入数据共{{ sum }}条</span>
                        点击匹配员工<el-button size="small" type="info" @click="matchUser()">智能匹配</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div v-show="minusButton">
                        <hr>
                        <span>本次导入数据共{{ sum }}条</span>
                        点击扣除库存<el-button size="small" type="info" @click="inventoryMinus()">扣除库存</el-button>
                    </div>
                </el-col>
            </el-row>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleDialogClose">取 消</el-button>
                <el-button type="primary" @click="handleDialogClose">确 定</el-button>
            </div>
        </MyDialog>
    </div>
</template>
 
<script>
import DialogForm from '@/mix/DialogForm';
import { mapGetters } from 'vuex';
import URL_CONST from '../../config';

export default {
    name: 'upload-excel',
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
            labelPosition:"right",
            labelWidth:'80px',
            uploadUrl:URL_CONST.EXCEL_UPLOAD,
            fileList:[],
            matchButton:false,
            minusButton:false,
            sum:0,
            flag:'',
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
            console.log(URL_CONST.EXCEL_UPLOAD);
        },
        beforeFormSubmit(){
            let vmThis = this;
            this.$refs.addForm.validate((valid)=>{
                if (valid) {
                    vmThis.$refs.upload.submit();
                }else{
                    console.log('error submit!!', name);
                    return false;
                }
            });
            
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        uploadSuccess(response, file, fileList){
            if(response.status == 0){
                this.$message.error(response.msg);
                this.handleClose();
            }else{
                this.matchButton = true;
                this.minusButton = true;
                this.sum = response.data.sum;
                this.flag = response.data.flag;
                this.$message.success(response.msg);
                console.log(response);//data{sum: 9, flag: 1539917338}
                // this.$emit('submit-success');
            } 
        },
        uploadError(err, file, fileList){
            this.$message.error(response.data.msg);
            this.handleClose();
        },
        beforeAvatarUpload(file){
            // this.$message.error(file);
        },
        handleChange(file, fileList) {
            console.log(fileList);
            if(fileList.length>1){
                fileList.splice(0,1);
            }

        },
        matchUser(){
            let vmThis = this;
            this.ajaxProxy.matchUser(this.flag).then(function(response){
                if(response.data.status == 0){
                    vmThis.$message.error(response.data.msg ? response.data.msg : "操作失败" );
                }else{
                    vmThis.$message({
                        message: response.data.msg,
                        duration:5000
                    });
                    vmThis.matchButton = false;
                    // vmThis.$refs.addForm.resetFields();
                    // vmThis.$emit('submit-success');
                }
            }).catch(function(error){
                console.log(error);
                vmThis.$message.error("出错了");
            });
        },
        inventoryMinus(){
            let vmThis = this;
            let entrepot_id = this.addForm.entrepot_id;
            this.ajaxProxy.minusInventory(vmThis.flag).then(function(response){
                if(response.data.status == 0){
                    vmThis.$message.error(response.data.msg ? response.data.msg : "操作失败" );
                    // vmThis.$refs.addForm.resetFields();
                }else{
                    vmThis.$message({
                        message: response.data.msg,
                        duration:5000
                    });
                    vmThis.minusButton = false;
                    // vmThis.$refs.addForm.resetFields();
                    // vmThis.$emit('submit-success');
                }
            }).catch(function(error){
                console.log(error);
                vmThis.$message.error("出错了");
            });
            // this.$emit('submit-success');
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

 