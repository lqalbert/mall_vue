<template>
    <div>
        <MyDialog title="编辑/修改" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm" ref="editForm" :label-width="labelWidth" :rules="rules" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="盘点单号" prop="check_num" >
                            <el-input class="name-input" v-model="editForm.check_num" placeholder="请填写盘点单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品名称" prop="goods_name" >
                            <el-input class="name-input" v-model="editForm.goods_name" placeholder="商品名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="商品类型" prop="cate_type_id">
                            <el-select class="name-input" v-model="editForm.cate_type_id" placeholder="商品类型">
                                <el-option label="国产神油" value="1"></el-option>
                                <el-option label="印度神油" value="2"></el-option>
                                <el-option label="美国神油" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品数量" prop="entrepot_count">
                            <el-input-number v-model="editForm.entrepot_count" :min="0"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="释放金额" prop="release_money">
                            <el-input class="name-input" v-model="editForm.release_money" placeholder="释放金额(比实际多)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="责任金额" prop="resp_money" >
                            <el-input class="name-input" v-model="editForm.resp_money" placeholder="责任金额(比实际少)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        :observer="dialogThis"
                        @click="formSubmit('editForm')">
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

export default {
    name: 'add-dialog',
    mixins:[DialogForm,FormMix],
    components: {
        
    },
    props:{

    },
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'100px',
            editForm:{
                check_num:'',
                goods_name:'',
                cate_type_id:'',
                entrepot_count:0,
                release_money:'',
                resp_money:'',
            },
            model:null,
            rules:{

            }
        }
    },
    methods:{
        onOpen(param){
            this.model = param.params.model;
        },
        getAjaxPromise(model){
            // return this.ajaxProxy.update(model.id, model);
        },
        formSubmit(){
            console.log(this.editForm);
        }
    },

    created(){
        
    },
    watch:{
        model:function(val, oldVal){
            for (const key in this.editForm) {
                if (this.editForm.hasOwnProperty(key)) {
                    this.editForm[key] = val[key];
                }
            }
        }
    }

}
</script>
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
