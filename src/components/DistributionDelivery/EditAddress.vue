<template>
    <div>
        <MyDialog title="修改地址" :name="name" :width="width" :height="height" @before-open="onBeforeOpen">
            <el-form :model="addForm" ref="addForm" :label-width="labelWidth"  :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="收件人姓名" prop="deliver_name" >
                            {{model.deliver_name}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系方式" prop="deliver_phone">
                            {{model.deliver_phone}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="18">
                        <el-form-item label="旧地址" prop="deliver_address">
                            {{model.deliver_address}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="18">
                        <el-form-item label="新地址" prop="deliver_address">
                            <el-input v-model="addForm.deliver_address" type="textarea" placeholder="新收货地址"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                 <submit-button
                    @click="formSubmit('addForm')"
                    :observer="dialogThis">
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>
<script>
import DialogForm from '../../mix/DialogForm';
import APP_CONST from '../../config';
export default {
    name: 'add-delivery',
    mixins:[DialogForm],
    components: {
        
    },
    props:{

    },
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'120px',
            addForm:{
                id:'',
                deliver_address:'',
            },
            model:{}
        }
    },
    methods:{
        getAjaxPromise(model){
            return this.ajaxProxy.update(model.id, model);
        },
        // formSubmit(model){
        //     console.log(this.addForm)
        //     return false;
        // },
        onBeforeOpen(model) {
            this.model =  model.params;
        }
    },
    watch:{
        model:function(val, oldVal){
            this.initObject(val, this.addForm);
        }
    },
    mounted(){

    },
    created(){

    }

}
</script>
<style scoped>

</style>
