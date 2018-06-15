<template>
    <div>
        <MyDialog title="确认发货" :name="name" :width="width" :height="height"  @before-open="onOpen">

            <el-steps :space="300" :active="active" process-status="finish" finish-status="success" center align-center>
                <el-step title="商品信息"></el-step>
                <el-step title="发货信息"></el-step>
            </el-steps>
            <el-form :model="deliverForm" ref="deliverForm" :label-width="labelWidth"  :label-position="labelPosition">
                <div v-show="active==0">
                    <el-table :data="goodsList" border>
                        <el-table-column label="ID" align="center"  prop="id" width="65"></el-table-column>
                        <!--<el-table-column label="SKU编号" align="center"  prop="sku_sn" ></el-table-column>-->
                        <el-table-column label="商品名称" align="center"  prop="goods_name" width="150px"></el-table-column>
                        <el-table-column label="商品规格" align="center"  prop="specifications" width="150px"></el-table-column>
                        <el-table-column label="采购数量" align="center"  prop="goods_purchase_num" width="120px"></el-table-column>
                        <el-table-column label="实发数量" align="center"  prop="actual_goods_num" width="120px">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.actual_goods_num"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="每箱数量" align="center"  prop="every_case_goods_num" width="120px">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.every_case_goods_num"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="纸箱个数" align="center"  prop="case_num" width="120px">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.goods_case_num"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="生产日期" align="center"  prop="goods_manufacture_time" width="150px">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.goods_manufacture_time"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="该类商品重量" align="center"  prop="case_weight" width="150px">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.goods_case_weight"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <br>
                <div v-show="active==1">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="快递单号" prop="express_num" >
                                    <el-input class="name-input" v-model="deliverForm.express_num" placeholder="快递单号"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="快递公司" prop="express_company" >
                                    <el-input class="name-input" v-model="deliverForm.express_company" placeholder="快递公司"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="快递费用" prop="postage">
                                    <el-input class="name-input" v-model="deliverForm.postage" placeholder="快递费用"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="确认人" prop="confirm_user" >
                                    <el-input  class="name-input" v-model="deliverForm.confirm_user" placeholder="确认人"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="发货日期" prop="deliver_goods_time">
                                    <el-date-picker
                                            v-model="deliverForm.deliver_goods_time"
                                            type="datetime"
                                            @change="dateChange"
                                            placeholder="选择发货日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="14">
                                <el-form-item label="备注" prop="remarks">
                                    <el-input  type="textarea" v-model="deliverForm.remarks" placeholder="请填写备注"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                </div>
            </el-form>
            <div slot="dialog-foot" >
                <el-row type="flex" justify="space-between">
                    <el-col :span="10" class="text-left">
                        <el-button   v-if="active > 0"   @click="last">上一步</el-button>
                        <el-button   v-show="active == 0" @click="next">下一步</el-button>
                    </el-col>

                    <el-col :span="10" v-show="active==1">
                        <el-button @click="handleClose">取 消</el-button>
                        <submit-button
                                @click="submit('deliverForm')"
                                :observer="dialogThis">
                            保 存
                        </submit-button>
                    </el-col>
                </el-row>
            </div>
        </MyDialog>
    </div>
</template>
<script>
import DialogForm from '../../mix/DialogForm';
import FormMix from '../../mix/Form';
import APP_CONST from '../../../config/index';
import DialogMix from '../../mix/Dialog';
import { mapGetters } from 'vuex';
import { PHONE_REG } from "@/config/index";
export default {
    name: 'Add',
    mixins:[DialogForm,FormMix],
    components: {
        
    },
    props:{

    },
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'150px',
            active:0,
            deliverForm:{
                id:'',
                purchase_status:0,
                express_num:'',
                express_company:'',
                total_case_num:0,
                confirm_user:'',
                deliver_goods_time:'',
                postage:'',
                remarks:'',
                deliverGoodsList:[],
            },
            model:null,
            goodsList:[],

        }
    },
    methods:{
        getAjaxPromise(model){
            return this.ajaxProxy.create(model);
        },
        onOpen(param){
            this.goodsList = [];
            this.active = 0;
            this.model = param.params.row;
            this.goodsList=this.goodsList.concat(this.model.goods);
            this.goodsList.forEach(value => {
                value.actual_goods_num='';
                value.every_case_goods_num='';
                value.goods_case_num='';
                value.goods_manufacture_time='';
                value.goods_case_weight='';
            })
        },
        dateChange(v) {
           this.deliverForm.deliver_goods_time = v;
        },

        last() {
            if (this.active-- < 1) this.active = 0;
        },
        next() {
            if (this.active++ > 1) this.active = 1;
        },
        submit(name){
            this.deliverForm.deliverGoodsList = this.goodsList;
            this.deliverForm.purchase_status =3;
            console.log(this.deliverForm);
            this.formSubmit(name);
            // this.$emit('submit-ok');
        }
    },
    watch:{
        model:function(val, oldVal){
            for (const key in this.deliverForm) {
                if (this.deliverForm.hasOwnProperty(key)) {
                    this.deliverForm[key] = val[key];
                }
            }
        }
    },

}
</script>
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
