<template>
    <div>
        <MyDialog title="审核" :name="name" :width="width" :height="height">
            <el-form :model="checkForm" ref="checkForm" :label-width="labelWidth" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="是否通过" prop="status">
                            <el-select size="small" placeholder="是否通过" v-model="checkForm.status">
                                <el-option
                                        v-for="check in c_status"
                                        :label="check.status"
                                        :value="check.id"
                                        :key="check.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        :observer="dialogThis"
                        @click="formSubmit('addForm')">
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>
<script>
import DialogForm from '../../mix/DialogForm';
import FormMix from '../../mix/Form';
import APP_CONST from '../../config';
import DialogMix from '../../mix/Dialog';
import { mapGetters } from 'vuex';
import { PHONE_REG } from "@/config/index";
export default {
    name: 'DeliverGoods',
    mixins:[DialogForm,FormMix],
    components: {
        
    },
    props:{

    },
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            checkForm:{
                status:'',
            },
            c_status:[
                {id:'1', status:'通过'},
                {id:'6', status:'未通过'}
            ],

        }
    },
    methods:{
        getAjaxPromise(model){
            return this.ajaxProxy.create(model);
        },
        // formSubmit(){
        //     console.log(this.addForm)
        // }
    },


}
</script>
<style scoped>

</style>
