<template>
    <div>
        <MyDialog title="添加申请" :name="name" :width="width" :height="height" @before-open="onOpen">
            <br>
            <el-steps :space="300" :active="active" process-status="finish" finish-status="success" center align-center>
                <el-step title="添加商品"></el-step>
                <el-step title="添加详细信息"></el-step>
                <el-step title="确认订单"></el-step>
            </el-steps>
            <el-form ref="addOrderForm" :model="addOrderForm" :label-width="labelWidth" :label-position="labelPosition">
                <div v-show="active==0">
<<<<<<< HEAD
=======
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="配送中心" prop="danwei" >
                                <el-select v-model="addOrderForm.danwei" placeholder="请选择配送中心"  @change="userChange">
                                    <el-option label="成都配送中心" value="1"></el-option>
                                    <el-option label="天津配送中心" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="发货单位" prop="contact_name">
                                <el-input class="name-input" v-model="addOrderForm.contact_name" placeholder="请填写发货单位"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item prop="deal_id" label="采购人">
                                <el-select v-model="addOrderForm.deal_id" placeholder="请选择成交员工" disabled @change="userChange">
                                    <el-option v-for="v in users" :value="v.id" :key="v.id" :label="v.realname"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="采购时间" prop="contact_name">
                                <el-date-picker
                                        v-model="addOrderForm.contact_name"
                                        type="datetime"
                                        placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>

                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="采购状态" prop="contact_tel" >
                                <el-select v-model="addOrderForm.contact_tel" placeholder="请选择">
                                    <el-option label="申请" value="1"></el-option>
                                    <el-option label="审核通过" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!--<el-row>-->
                    <!--<el-col :span="12">-->
                    <!--<el-form-item prop="address_id" label="收货地址" >-->
                    <!--<el-radio-group v-for="v in fullAddressData" :key="v.id" v-model="addOrderForm.address_id" @change="addressChange">-->
                    <!--<template slot-scope="scope">-->
                    <!--<el-radio  :label="v.id" >{{v.fullAddress}}</el-radio>-->
                    <!--</template>-->
                    <!--</el-radio-group>-->

                    <!--&lt;!&ndash;<el-select v-model="addressID" placeholder="请选择收货地址" @change="addressChange">&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-option v-for="v in address" :value="v.id" :key="v.id" :label="v.name" ></el-option>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
                    <!--</el-form-item>-->
                    <!--</el-col>-->

                    <!--</el-row>-->

                </div>
                <div v-show="active==1">
>>>>>>> yrg
                    <el-table
                            border
                            :data="orderData"
                            style="width: 100%">
                        <el-table-column label="序号" type="index" width="80 px"></el-table-column>
                        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
                        <el-table-column prop="price" label="商品单价"></el-table-column>
                        <el-table-column prop="goods_number" label="商品数量">
                        </el-table-column>
                        <el-table-column prop="moneyNotes" label="小 记"></el-table-column>
                        <el-table-column prop="remark" label="备注"></el-table-column>
                        <el-table-column  label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button size="small" type="danger" @click="deleteAddress(scope.row)">删 除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="商品分类" prop="dev">
                                <el-cascader
                                        v-model="addOrderForm.dev"
                                        :options="CategoryList"
                                        @change="categoryChange"
                                ></el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="goods_id" label="商品名称">
                                <el-select v-model="addOrderForm.goods_id" @change="getGoodsInfo">
                                    <el-option v-for="(value, item) in data2" :value="item" :key="item" :label="value.goods_name+'-'+value.sku_name+'-'+value.price">
                                        <span>{{value.goods_name}}{{ (value.sku_name && value.sku_name.length > 0) ? '-'+value.sku_name: ''  }}-{{value.price}}</span>
                                        <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{value}}</span> -->
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="goods_number" label="商品数量">
                                <el-input-number size="small" :min="1" :max="gdsInpurNum" v-model="addOrderForm.goods_number" >
                                </el-input-number>
                                <span style="color:red;">当前库存：{{alertNum}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="remark" label="备注">
                                <el-input type="textarea" class="name-input"  v-model="addOrderForm.remark"  placeholder="备注" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div style="float: left;margin-left: 50%;">
                        <el-button @click="addOrder" type="primary" class="right">添 加</el-button>
                    </div>
                </div>
                <br>
                <div v-show="active==1">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="配送中心" prop="danwei" >
                                <el-select v-model="addOrderForm.danwei" placeholder="请选择配送中心"  @change="userChange">
                                    <el-option label="成都配送中心" value="1"></el-option>
                                    <el-option label="天津配送中心" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="发货单位" prop="contact_name">
                                <el-input v-model="addOrderForm.contact_name" placeholder="请填写发货单位"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item prop="deal_id" label="采购人">
                                <el-select v-model="addOrderForm.deal_id" placeholder="请选择成交员工" disabled @change="userChange">
                                    <el-option v-for="v in users" :value="v.id" :key="v.id" :label="v.realname"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="采购时间" prop="contact_name">
                                <el-date-picker
                                        v-model="addOrderForm.contact_name"
                                        type="datetime"
                                        placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>

                    </el-row>

                    <el-row>

                        <el-col :span="12">
                            <el-form-item label="采购状态" prop="contact_tel" >
                                <el-select v-model="addOrderForm.contact_tel" placeholder="请选择">
                                    <el-option label="申请" value="1"></el-option>
                                    <el-option label="审核通过" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!--<el-row>-->
                        <!--<el-col :span="12">-->
                            <!--<el-form-item prop="address_id" label="收货地址" >-->
                                <!--<el-radio-group v-for="v in fullAddressData" :key="v.id" v-model="addOrderForm.address_id" @change="addressChange">-->
                                    <!--<template slot-scope="scope">-->
                                        <!--<el-radio  :label="v.id" >{{v.fullAddress}}</el-radio>-->
                                    <!--</template>-->
                                <!--</el-radio-group>-->

                                <!--&lt;!&ndash;<el-select v-model="addressID" placeholder="请选择收货地址" @change="addressChange">&ndash;&gt;-->
                                <!--&lt;!&ndash;<el-option v-for="v in address" :value="v.id" :key="v.id" :label="v.name" ></el-option>&ndash;&gt;-->
                                <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->

                    <!--</el-row>-->

                </div>
                <br>
                <div v-show="active==2">
                    <el-table
                            border
                            :data="orderData"
                            style="width: 100%">
                        <el-table-column label="序号" type="index" width="80 px"></el-table-column>
                        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
                        <el-table-column prop="price" label="商品单价"></el-table-column>
                        <el-table-column prop="goods_number" label="商品数量"></el-table-column>
                        <el-table-column prop="moneyNotes" label="小 记"></el-table-column>
                        <el-table-column prop="remark" label="备注"></el-table-column>
                    </el-table>
                    <br>
                    <h3> <span>商品总金额:{{ totalMoney }}</span></h3>
                    <!--<h3> <span>当前保证金:{{ depositMoney }}</span></h3>-->
                    <br>
                    <div slot="dialog-foot" class="right">
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
            <el-button  style="margin-top: 12px;" v-show="active<2" @click="next">下一步</el-button>
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
            labelWidth:'80px',
            totalMoney:0,
            active:0,
            cus_id:'',
            deal_id:'',
            id:'',
            types:[],
            goodsInfo:{},
            data2:{},
            gdsInpurNum:100000,
            alertNum:0,
            allNum:'',
            users:[],
            address:[],
            addressList:[],
            addressListData:[],
            addOrderForm:{
                cus_id:'',
                deal_id:'',
                deal_name:'',
                goods_id:"",
                address_id:"",
                order_all_money:0,
                order_pay_money:0,
                order_goods:[],
                order_address:[],
                dev:[],
                goods_number:'',
                remark:'',
                dep_group_realname:'',
                cus_name:'',
                group_id:'',
                department_id:'',
                danwei:'',
                contact_name:'',
                contact_tel:'',

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
        // formSubmit(){
        //     console.log(this.addForm)
        // }
    },


}
</script>
<style scoped>

</style>
