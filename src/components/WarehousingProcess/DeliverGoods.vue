<template>
    <div>
        <MyDialog title="确认发货" :name="name" :width="width" :height="height">
            要改
            <el-form :model="addForm" ref="addForm" :label-width="labelWidth"  :label-position="labelPosition">
                <el-table
                        border
                        :data="orderData"
                        style="width: 100%">
                    <el-table-column label="商品ID" prop="id" width="80 px" align="center"></el-table-column>
                    <el-table-column prop="goods_name" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="goods_number" label="商品发货数量" align="center"></el-table-column>
                    <el-table-column prop="unit" label="商品发货单位" align="center"></el-table-column>
                    <el-table-column prop="make_date" label="产品日期" align="center"></el-table-column>

                    <!--<el-table-column  label="操作" align="center">-->
                        <!--<template slot-scope="scope">-->
                            <!--<el-button size="small" type="danger" @click="deleteAddress(scope.row)">删 除</el-button>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                </el-table>
                <br>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="快递单号" prop="company_name" >
                            <el-input class="name-input" v-model="addForm.company_name" placeholder="系统生成"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="快递公司" prop="eng" >
                            <el-input class="name-input" v-model="addForm.eng" placeholder="请填写采购单位"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="快递费用" prop="contact_name">
                            <el-input class="name-input" v-model="addForm.contact_name" placeholder="请填写发货单位"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="总箱数" prop="contact_tel" >
                            <el-input class="name-input" v-model="addForm.contact_tel" placeholder="请填写发货单位"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="纸箱型号" prop="contact_name">
                            <el-input class="name-input"  v-model="addForm.contact_name" placeholder="请填写发货单位"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="每箱数量" prop="contact_tel" >
                            <el-input class="name-input"  v-model="addForm.contact_tel" placeholder="请填写发货单位"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="每箱重量" prop="contact_name">
                            <el-input  class="name-input" v-model="addForm.contact_name" placeholder="请填写发货单位"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="纸箱个数" prop="contact_tel" >
                            <el-input  class="name-input" v-model="addForm.contact_tel" placeholder="请填写发货单位"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="确认人" prop="contact_tel" >
                            <el-input  class="name-input" v-model="addForm.contact_name" placeholder="请填写采购人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="发货日期" prop="contact_name">
                            <el-date-picker
                                    v-model="addForm.contact_name"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="14">
                        <el-form-item label="备注" prop="remark">
                            <el-input  type="textarea" v-model="addForm.remark" placeholder="请填写备注"></el-input>
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
            addForm:{
                company_name:'',
                contact_name:'',
                contact_tel:'',
                remark:'',
            },
            orderData:[
                {id:1,goods_name:'洗面奶',goods_number:50,unit:'瓶',make_date:'2018-05-24',carton_type:'中号',each_carton_number:10,carton_weight:800,carton_number:5},
                {id:2,goods_name:'面膜',goods_number:20,unit:'套',make_date:'2018-05-24',carton_type:'小号',each_carton_number:20,carton_weight:200,carton_number:1},
            ]

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
    .name-input{
        max-width: 217px;
    }
</style>
