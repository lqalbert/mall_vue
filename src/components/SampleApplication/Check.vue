<template>
    <div>
        <MyDialog title="样品申请" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form ref="checkForm" :model="checkForm" :label-width="labelWidth" :label-position="labelPosition">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="申请时间" prop="app_time">
                            {{checkForm.app_time}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="申请人" prop="applicant">
                            {{checkForm.applicant}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="操作人" prop="operator">
                            {{checkForm.operator}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                   <el-col :span="16">
                        <el-form-item label="用途备注" prop="use_remark">
                            {{checkForm.use_remark}}
                        </el-form-item>
                    </el-col> 
                </el-row>
                
                <el-row>
                    <el-col :span="24">
                        样品列表
                        <el-table height="200" border :data="goodsData">
                            <el-table-column label="序号"  width="60" type="index">
                            </el-table-column>
                            <el-table-column label="商品编号" prop="sku_sn" width="150" >
                            </el-table-column>
                            <el-table-column label="商品名称" prop="goods_name" >
                            </el-table-column>
                            <el-table-column label="商品单价" prop="price"  width="100">
                            </el-table-column>
                            <el-table-column label="购买数量" prop="goods_number"  width="100">
                            </el-table-column>
                            <el-table-column label="小记" prop="moneyNotes" width="100" >
                            </el-table-column>
                            <!-- <el-table-column label="操作" width="100" align="center">
                                <template slot-scope="scope">
                                    <el-button size="small" type="danger" @click="deleteRow(scope.row)">删 除</el-button>
                                </template>
                            </el-table-column> -->
                        </el-table>
                    </el-col>
                </el-row>
                <br>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="审核意见" prop="check_status">
                            <el-select size="small" placeholder="请选择" v-model="checkForm.check_status" class="form-item-unique">
                                <el-option value="3" label="审核通过"></el-option>
                                <el-option value="4" label="审核不通过"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="审核备注" prop="check_remark">
                            <el-input type="textarea" size="small" v-model="checkForm.check_remark"></el-input>
                        </el-form-item>
                    </el-col> 
                </el-row>
            </el-form>
            <div slot="dialog-foot" >
                <el-row type="flex" justify="end">
                    <el-col :span="6" >
                        <el-button @click="handleClose">取 消</el-button>
                        <submit-button
                                ref="submitbutton"
                                @click="handleSubmit"
                                :observer="dialogThis">
                            提交审核
                        </submit-button>
                    </el-col>
                </el-row>
            </div>
        </MyDialog>
    </div>
</template>
 
<script>
import DialogForm from '@/mix/DialogForm';
import { mapGetters } from 'vuex';

export default {
    name: 'checkSample',
    mixins:[DialogForm],
    components:{
        
    },
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',

            checkForm:{
                app_time:'',
                applicant:'',
                operator:'',
                use_remark:'',
                totalMoney:0,
                num:0,
                goods:[],

                id:1,
                check_remark:'',
                check_status:'3'
            },
            goodsData:[],
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
            console.log(param);
            this.checkForm = Object.assign({},param.params.row);
            this.checkForm.check_status = '3';
            this.checkForm.id = 1;
            console.log(this.checkForm);
            this.goodsData = this.checkForm.goods;
        },
        handleSubmit(){
            console.log(this.checkForm);
            // this.formSubmit('checkForm');
        },
        getAjaxPromise(model){
            // return this.ajaxProxy.update(model.id, model);
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

 