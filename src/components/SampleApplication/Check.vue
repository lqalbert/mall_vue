<template>
    <div>
        <MyDialog title="样品审核" :name="name" :width="width" :height="height" @before-open="onOpen">
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
                            <el-table-column label="序号"  width="70" type="index">
                            </el-table-column>
                            <el-table-column label="商品编号" prop="sku_sn" width="150" >
                            </el-table-column>
                            <el-table-column label="商品名称" prop="goods_name" >
                            </el-table-column>
                            <el-table-column label="商品单价" prop="price"  width="100">
                            </el-table-column>
                            <el-table-column label="申请数量" prop="goods_number"  width="100">
                            </el-table-column>
                            <el-table-column label="小记" prop="moneyNotes" width="100" >
                                <template slot-scope="scope">
                                    {{parseInt(scope.row.price) * parseInt(scope.row.goods_number)}}
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="100" align="center">
                                <template slot-scope="scope">
                                    <el-button size="small" type="danger" @click="deleteRow(scope.row)">删 除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <br>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="审核意见" prop="check_status">
                            <el-select size="small" placeholder="请选择" v-model="checkForm.check_status" class="form-item-unique">
                                <el-option value="1" label="审核通过"></el-option>
                                <el-option value="2" label="审核不通过"></el-option>
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
                // num:0,
                goodsData:[],

                id:1,
                check_remark:'',
                check_status:'1'
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
            // console.log(param);
            this.checkForm = Object.assign({},param.params.row);
            this.checkForm.check_status = '1';
            this.checkForm.del_ids = [];
            // console.log(this.checkForm);
            this.goodsData = this.checkForm.goods.concat();
            // this.goodsData = this.checkForm.goods;
        },
        handleSubmit(){
            // console.log(this.checkForm);
            this.formSubmit('checkForm');
        },
        getAjaxPromise(model){
            return this.ajaxProxy.update(model.id, model);
        },
        deleteRow(row){
            let index = this.goodsData.indexOf(row);
            if( index > -1){
                this.goodsData.splice(index,1);
                this.totalMoney -= row.moneyNotes;
            }
            this.checkForm.del_ids.push(row.id);
        },
        handleClose(){
            // this.$modal.hide(name);
            if(this.goodsData.length < this.checkForm.goods.length){
                // console.log(this.checkForm.goods);
                this.goodsData = this.checkForm.goods;
            }
            
            this.$modal.hide(this.name);
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

 