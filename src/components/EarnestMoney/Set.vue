<template>
    <div>
        <MyDialog title="设置" :name="name" :width="width" :height="height" @before-open="onBeforeOpen">
            <el-form :model="addForm"  ref="addForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="返还类型" prop="type">
                            <el-select clearable  placeholder="请选择"  v-model="addForm.type" >
                                <el-option v-for="(v, index) in types"
                                    :label="v" 
                                    :value="index"
                                    :key="index">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="赠品扣除比例" prop="appendage_rate" >
                            <el-input placeholder="请输入内容" v-model="addForm.appendage_rate">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="正常销售扣除比例" prop="sale_rate" >
                            <el-input placeholder="请输入内容" v-model="addForm.sale_rate">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="返还比例" prop="return_rate">
                            <el-input placeholder="请输入内容" v-model="addForm.return_rate">
                                <template slot="append">%</template>
                            </el-input>
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
import DialogForm from '@/mix/DialogForm';

import { mapGetters } from 'vuex';

export default {
    name: 'Add',
    mixins:[DialogForm],
    data () {
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            types:[
                "即时返还",
                "发货时返还",
                "签收时返还"
            ],
            
            addForm:{
                type:"",
                appendage_rate:"",
                sale_rate:"",
                return_rate:""
            },
            rules:{
                // money:[
                //     { required: true, message:'金额未输入或输入的格式不正确', pattern:/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/ , trigger:'blur',min:0 }
                // ],
                // department_id:[
                //     {required: true, message:'请选择部门', type: 'number', trigger:'blur'}
                // ] ,
                // remark:[
                //     { message:'输入内容最大长度为200', type: 'string', trigger:'blur', max:200}
                // ]
            }
        }
    },
    computed:{
        ...mapGetters({
            // 'creator_id':'user_id',
        })
    },
    methods:{
        getAjaxPromise(model){
            return this.ajaxProxy.saveSet(model);
        },
        onBeforeOpen(){
            this.ajaxProxy.getSet().then((response)=>{
                const model = response.data.data;
                this.addForm.type = model.type;
                this.addForm.appendage_rate = model.appendage_rate;
                this.addForm.sale_rate = model.sale_rate;
                this.addForm.return_rate = model.return_rate;
            });
        } 
    },
    created(){
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
      