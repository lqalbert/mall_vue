<template>
    <div>
        <MyDialog title="添加申请" :name="name" :width="width" :height="height" >
            <br>
            <el-steps :space="400" :active="active" process-status="finish" finish-status="success" center align-center>
                <el-step title="添加商品"></el-step>
                <el-step title="采购明细"></el-step>

            </el-steps>
            <el-form ref="addForm" :model="addForm" :label-width="labelWidth" :label-position="labelPosition">
                <div v-show="active==0">
                    <el-table
                            border
                            :data="orderData"
                            style="width: 100%">
                        <el-table-column label="序号" type="index" width="80 px"></el-table-column>
                        <el-table-column prop="goods_name" label="商品名称" align="center"></el-table-column>
                        <el-table-column prop="goods_specification" label="商品规格" align="center"></el-table-column>
                        <el-table-column prop="purchasing_unit_price" label="采购单价" align="center"></el-table-column>
                        <el-table-column prop="purchasing_unit_number" label="采购数量" align="center"></el-table-column>
                        <el-table-column prop="purchasing_unit_id" label="采购单位" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.purchasing_unit_id==1">瓶</span>
                                <span v-if="scope.row.purchasing_unit_id==2">只</span>
                                <span v-if="scope.row.purchasing_unit_id==3">片</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="moneyNotes" label="小 记" align="center"></el-table-column>
                        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
                        <el-table-column  label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="danger" @click="deleteAddress(scope.row)">删 除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item prop="goods_name" label="商品名称">

                                    <el-input size="small" class="name-input"  v-model="addForm.goods_name" ></el-input>

                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="purchasing_unit_id" label="采购单位">
                                <el-select v-model="addForm.purchasing_unit_id" >
                                    <el-option  value="1"  label="瓶"></el-option>
                                    <el-option  value="2"  label="片"></el-option>
                                    <el-option  value="3"  label="只"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="goods_specification" label="商品规格">
                                <el-input size="small" class="name-input"  v-model="addForm.goods_specification" ></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item prop="purchasing_unit_price" label="采购单价">
                                <el-input size="small" class="name-input" v-model="addForm.purchasing_unit_price" >
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="purchasing_unit_number" label="商品数量">
                                <el-input-number size="small" :min="1" :max="gdsInpurNum" v-model="addForm.purchasing_unit_number" >
                                </el-input-number>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item prop="remark" label="备注">
                                <el-input type="textarea" class="name-input"  v-model="addForm.remark"  placeholder="备注" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div style="float: right">
                        <el-button @click="addOrder" type="primary" class="right">添 加</el-button>
                    </div>
                    <br>
                </div>
                <div v-show="active==1">
                    <div>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="采购单号" prop="purchase_number" >
                                <el-input v-model="addForm.purchase_number" class="name-input" disabled placeholder="系统自动生成"  >
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="entrepot_id"  label="配送中心">
                                <el-select v-model="addForm.entrepot_id" placeholder="请选择配送中心" @change="entrepotChange">
                                    <el-option v-for="v in distributors" :label="v.name"
                                               :value="v.id" :key="v.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="发货单位" prop="contact_name">
                                <el-input class="name-input" v-model="addForm.contact_name" placeholder="请填写发货单位"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="采购状态" prop="contact_tel" >
                                <el-select v-model="addForm.contact_tel" placeholder="请选择">
                                    <el-option label="申请" value="1"></el-option>
                                    <el-option label="审核通过" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item prop="contact_user_id" label="采购人">
                                <el-select v-model="addForm.contact_user_id" placeholder="请选择成交员工" disabled @change="userChange">
                                    <el-option v-for="v in users" :value="v.id" :key="v.id" :label="v.realname"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="采购时间" prop="contact_time">
                                <el-date-picker
                                        v-model="addForm.contact_time"
                                        type="datetime"
                                        @change="timeChange"
                                        placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    </div>
                    <br>
                    <div slot="dialog-foot" class="right" style="float: right">
                        <el-button @click="handleClose">取 消</el-button>
                        <submit-button
                                @click="handleSubmit"
                                :observer="dialogThis">
                            保 存
                        </submit-button>
                    </div>
                </div>

            </el-form>
            <br>
            <el-button  style="margin-top: 12px;" v-show="active>0" @click="last">上一步</el-button>
            <el-button  style="margin-top: 12px;" v-show="active<1" @click="next">下一步</el-button>
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
    computed:{
        ...mapGetters({
            'this_user':'getUser',
        })
    },
    props:{
        distributors:{
            type: Array,
            default:function(){
                return [];
            }
        },
    },
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'120px',
            totalMoney:0,
            active:0,
            cus_id:'',
            deal_id:'',
            id:'',
            types:[],
            goodsInfo:{},
            data2:{},
            gdsInpurNum:100000,
            allNum:'',
            users:[],
            address:[],
            addressList:[],
            addressListData:[],
            addForm:{
                purchase_number:'',
                entrepot_id:'',
                entrepot_name:'',
                contact_name:'',
                contact_tel:'',
                contact_user_id:'',
                contact_user_name:'',
                contact_time:'',

                goods_name:'',
                goods_specification:'',
                purchasing_unit_id:'',
                purchasing_unit_price:'',
                purchasing_unit_number:'',
                remark:'',
                order_all_money:0,
                order_goods:[],



                //
                // deal_name:'',
                // goods_id:"",
                // address_id:"",

                // order_address:[],
                // dev:[],
                // goods_number:'',
                // dep_group_realname:'',
                // cus_name:'',
                // group_id:'',
                // department_id:'',

            },

            orderData:[],
            orderAddressData:[],
            goodsIds:[],
            orderBasicData:[],
            fullAddressData:[],
            model:'',
            deal_name:'',
            depositMoney:0,

        }
    },
    methods:{
        getAjaxPromise(model){
            return this.ajaxProxy.create(model);
        },
        last() {
            if (this.active-- < 1) this.active = 0;
        },
        next() {
            if (this.active++ > 1) this.active = 2;
        },
        timeChange(v) {
            this.addForm.contact_time=v;
        },
        entrepotChange(v){
            let i =''
            for (i in this.distributors){
                if(this.distributors[i]['id'] == v){
                    this.addForm.entrepot_name =this.distributors[i]['name']
                }
            }
        },
        userChange(contact_user_id){
            this.deal_id=contact_user_id;
            this.addForm.deal_id=contact_user_id;
            for (let i = 0; i < this.users.length; i++) {
                if(this.users[i].id == contact_user_id){
                    this.deal_name = this.users[i].realname;
                    this.addForm.deal_name = this.deal_name;
                    this.addForm.dep_group_realname = this.setDepGroupRealname(deal_id);
                }
            }

        },
        addOrder(){
            var vmthis = this;
            let moneyNotes =parseInt(vmthis.addForm.purchasing_unit_price) * parseInt(vmthis.addForm.purchasing_unit_number);
            let item = vmthis.data2[vmthis.addForm.goods_id];
            let addData ={
                goods_name:  vmthis.addForm.goods_name,
                goods_specification:  vmthis.addForm.goods_specification,
                purchasing_unit_id:  vmthis.addForm.purchasing_unit_id,
                purchasing_unit_price:  vmthis.addForm.purchasing_unit_price,
                purchasing_unit_number:  vmthis.addForm.purchasing_unit_number,
                remark:  vmthis.addForm.remark,
                moneyNotes:  moneyNotes,
            };
            this.totalMoney += moneyNotes;
            this.orderData.push(addData);
            this.$refs.addForm.resetFields();

        },
        deleteAddress(row){
            let index = this.orderData.indexOf(row);
            let goods_id = this.goodsIds.indexOf(row.goods_id);
            let vmThis = this;
            if( index > -1){
                this.$confirm('确定删除?', '警告',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.orderData.splice(index,1);
                    this.goodsIds.splice(goods_id,1);
                    this.totalMoney -= row.moneyNotes;
                    vmThis.$message.success("操作成功");
                });
            }
        },
        handleSubmit(){
            this.addForm.order_all_money = this.totalMoney;
            this.addForm.order_goods = this.orderData;
            this.addForm.contact_user_id = this.this_user.id;
            this.addForm.contact_user_name = this.this_user.realname;
            console.log(this.addForm)
            // this.formSubmit('addForm');
        },
        // formSubmit(){
        //     console.log(this.addForm)
        // }
    },
    created(){
        console.log(this.this_user);
    }


}
</script>
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
