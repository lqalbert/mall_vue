<template>
    <div>
        <MyDialog title="快递信息" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form ref="addForm" :model="addForm"  :label-width="labelWidth" :label-position="labelPosition">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="快递公司" prop="express_name">
                            <el-input v-model="addForm.express_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="快递号" prop="express_sn">
                            <el-input v-model="addForm.express_sn"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                    :observer="dialogThis"
                    @click="formSubmit('addForm')" >
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>
 
<script>
import DialogForm from '@/mix/DialogForm';
import deleteMix from '@/mix/Delete';

export default {
    name: 'match-table',
    mixins:[DialogForm,deleteMix],
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            addForm:{
                id:'',
                express_name:'',
                express_sn:""
            },
            model:null
        }
    },
    methods:{
        onOpen(param){
            this.model = param.params;
        },
        handleDialogClose(){
            this.handleClose();
        },
        //需要实现一个
        getAjaxPromise(model){
            let id = model.id;
            return this.ajaxProxy.update(id, model) 
        },
    },
    watch:{
        model:function(val, oldVal){
            for (const key in this.addForm) {
                if (this.addForm.hasOwnProperty(key)) {
                    this.addForm[key] = val[key];
                }
            }
        }
    },
    created(){

    }
    
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

 