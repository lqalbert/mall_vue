<template>
    <div >
        <MyDialog title="改名和排序" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="orderForm"  ref="orderForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="图片名称" prop="name" >
                             <el-input class="name-input" type="primary" v-model="orderForm.name" placeholder="请输入该图片名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="图片展示顺序" prop="picture_sort" >
                             <el-input class="name-input" type="primary" v-model.number="orderForm.picture_sort" placeholder="请输入该图片展示顺序"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        @click="formSubmit('orderForm')"
                        :observer="dialogThis">
                    保 存
                </submit-button>
            </div>
        </MyDialog>

    </div>
</template>

<script>
import DialogForm from '@/mix/DialogForm';
import DataProxy from '@/packages/DataProxy';
import { mapGetters, mapMutations } from 'vuex';
import APP_CONST from '@/config';

export default {
    name: 'Order',
    mixins:[DialogForm],
    props:{

    },
    data () {
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'120px',
            orderForm:{
                id:"",
                picture_sort:"",
                name:"",
            },
            rules:{
                picture_sort:[
                    { required: true, type:"number",  message: '请选择展示位置', trigger: 'blur'},
                    // { required: true, type:"number",  message: '请选择展示位置', trigger: 'blur'},
                ],
            },
            model:null,
        }
    },
    methods:{
        onOpen(param){
            this.model = param.params.model;
        },
        getAjaxPromise(model){
            return this.ajaxProxy.update(model.id, model);
        },
        realSubmit(model, name){
            let ajaxPromise =  this.getAjaxPromise(model);
            let vmthis = this;
            ajaxPromise.then(function(response){
                if (response.data.status　==　0) {
                    vmthis.$message.error(response.data.msg ? response.data.msg : "操作失败" );
                    vmthis.$emit('submit-error', name);

                } else {
                    vmthis.$message.success(response.data.msg);
                    vmthis.$refs[name].resetFields();
                    vmthis.$emit('submit-success', name);
                    vmthis.$emit('order-ok', name);
                }

            })
        },
    },
    watch:{
        model:function(val, oldVal){
            for (const key in this.orderForm) {
                if (this.orderForm.hasOwnProperty(key)) {
                    this.orderForm[key] = val[key];
                }
            }
        }
    },
    created(){

    }
}
</script>
<style scoped>
    .name-input{
        max-width: 217px;
    }
    .ql-toolbar.ql-snow {
        line-height: normal;
    }
    .ql-container.ql-snow {
        height: 300px !important;
        max-height: 400px;
    }
</style>
      