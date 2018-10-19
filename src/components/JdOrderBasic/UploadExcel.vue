<template>
    <div>
        <MyDialog title="上传JD订单exdel文件" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-row>
                <el-upload
                    ref="upload"
                    name="avatar"
                    class="upload-demo"
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
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">一次只能上传excel格式的文件一个</div>
                </el-upload>
            </el-row>
            <el-row>
                <br>
                <div v-show="showButton">
                    <span>本次导入数据共{{ sum }}条</span>
                    点击匹配员工<el-button size="small" type="info" @click="matchUser()">智能匹配</el-button>
                </div>
            </el-row>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                    ref="submit-button"
                    @click="beforeFormSubmit()"
                    :observer="dialogThis"
                    :is_load="false">
                    保 存
                </submit-button>
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
    components:{
        
    },
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            uploadUrl:URL_CONST.EXCEL_UPLOAD,
            fileList:[],
            showButton:false,
            sum:0,
            flag:''
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
            console.log(URL_CONST.EXCEL_UPLOAD);
        },
        beforeFormSubmit(){
            this.$refs.upload.submit();
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
                this.showButton = true;
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
            this.ajaxProxy.matchUser(this.flag);
            this.showButton = false;
            this.$emit('submit-success');
            this.$message({
                message: "数据在后台匹配中,不影响操作其他页面",
                duration:5000
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

 