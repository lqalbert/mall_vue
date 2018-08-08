<template>
    <div >
        <MyDialog title="查看" :name="name" :width="width" :height="height" @before-open="onOpen" @opened="checkEditable">
            <el-form ref="rowInfoForm" :model="rowInfoForm" :label-width="labelWidth" :label-position="labelPosition">
                        <el-row >
                            <el-col :span="6" class="col">
                                <el-form-item  label="订单号:" prop="id">
                                    {{ model.order_sn }}
                                </el-form-item>
                            </el-col>
                            <el-col :span="6" class="col">
                                <el-form-item label="总金额" prop="order_all_money">
                                    {{ model.order_all_money }}
                                </el-form-item>
                            </el-col>
                            <el-col :span='6' class="col">
                                <el-form-item label="应付金额:" prop="order_pay_money">
                                    {{model.order_pay_money}}
                                </el-form-item>
                            </el-col>
                            <el-col :span='6' class="col">
                                <el-form-item label="购买客户:"  prop="cus_id">
                                    {{ model.cus_name }}
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row >
                            <el-col :span='6' class="col">
                                <el-form-item label="成交员工:" prop="deal_name">
                                    {{ model.deal_name }}
                                </el-form-item>
                            </el-col>
                            <el-col :span='6' class="col">
                                <el-form-item label="收货人姓名:"  prop="name">
                                    {{ addresstableData.name }}
                                </el-form-item>
                            </el-col>
                            <el-col :span='6' class="col">
                                <el-form-item label="收货电话:"  prop="phone">
                                    {{ addresstableData.phone }}
                                </el-form-item>
                            </el-col>
                            <el-col :span='6' class="col">
                                <el-form-item label="省:"  prop="area_province_name">
                                    {{ addresstableData.area_province_name }}
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span='6' class="col">
                                <el-form-item label="市:"  prop="area_city_name">
                                    {{ addresstableData.area_city_name }}
                                </el-form-item>
                            </el-col>
                            <el-col :span='6' class="col">
                                <el-form-item label="区/县:"  prop="area_district_name">
                                    {{ addresstableData.area_district_name }}
                                </el-form-item>
                            </el-col>
                            <el-col :span='6' class="col">
                                <el-form-item label="邮编:"  prop="zip_code">
                                    {{ addresstableData.zip_code }}
                                </el-form-item>
                            </el-col>
                        </el-row>
                    <el-row>
                        <el-col :span='20' class="col">
                            <el-form-item label="详细地址:"  prop="address">
                                {{ addresstableData.address }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <hr>
                        <el-table
                            v-loading.body="loading"
                            :data="goodstableData"
                            style="width: 100%">
                            <el-table-column prop="goods_name"  label="商品名称" :show-overflow-tooltip="true" width="100"></el-table-column>
                            <el-table-column prop="specifications" label="商品规格"  width="100"></el-table-column>
                            <el-table-column prop="goods_number" label="数量" width="140">
                                <template slot-scope="scope">
                                    <span v-show="!scope.row.editState" >{{scope.row.goods_number}}</span>
                                    <el-input-number v-show="scope.row.editState" size="small" v-model="scope.row.goods_number"></el-input-number> 
                                </template>
                            </el-table-column>
                            <el-table-column prop="unit_type" label="单位" align="center" width="70"> </el-table-column>
                            <el-table-column prop="price" label="价格" width="90"> </el-table-column>
                            <el-table-column prop="sku_sn" label="编号"> </el-table-column>
                            <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true" width="180">
                                <template slot-scope="scope">
                                    <span v-show="!scope.row.editState" >{{scope.row.remark}}</span>
                                    <el-input
                                        v-show="scope.row.editState"
                                        size="small"
                                        type="textarea"
                                        autosize
                                        v-model="scope.row.remark">
                                    </el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  label="操作" width="140" >
                                <template slot-scope="scope">
                                    <el-button-group>
                                        <el-button size="mini" v-if="!scope.row.editState" type="primary" @click="setEdit(scope.row)">编辑</el-button>
                                        <el-button size="mini" v-if="scope.row.editState" @click="saveGoods(scope.row)">保存</el-button>
                                        <el-button size="mini" type="danger" @click="ifDelete(scope.row.id)">删除</el-button>
                                    </el-button-group>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row>
                            <el-col :span="24">
                                <br>
                                <AddGoods :category-list="cates" @add-goods="addGoods"></AddGoods>
                            </el-col>
                        </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        :observer="dialogThis"
                        @click="formSubmit('rowInfoForm')" >
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>

<script>
    import DialogForm from '../../mix/DialogForm';
    import OrderGoodsAjaxProxy from "@/packages/OrderGoodsAjaxProxy";
    import OrderAddressAjaxProxy from "@/packages/OrderAddressAjaxProxy";
    import OrederGoodsAjax2 from '@/ajaxProxy/Ordergoods';
    import status from './status';

    import AddGoods from '@/components/CustomerInfo/AddGoods';


    export default {
        name: 'addDialog',
        mixins:[DialogForm,status],
        components:{
            AddGoods
        },
        props:{

        },
        ajaxProxy:{
            required:true,
            type: Object,
            default: null
        },
        data () {
            return {
                loading:false,
                check_status:[
                    {id:'0', status:'通过'},
                    {id:'1', status:'未通过'},
                    {id:'2', status:'未审核'}
                ],
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'100px',
                rowInfoForm:{
                    goods_name:'',
                    consignee:'',
                    order_all_money:'',
                    order_pay_money:'',
                    order_status:'',
                    pay_name:'',
                    shipping_status:'',
                    shipping_name:'',
                    order_time:'',
                    id:""
                },
                model:{},
                row:null,
                activeName:'First',
                addresstableData:{},
                goodstableData:[],

                tabFirst:false,
                tabSecond:false,
                tabThird:false,
                visible2:false
                
            }
        },
        computed:{
            cates(){
                return this.$store.getters.getCates;
            }
        },
        methods:{
            checkEditable(){
                if (this.model.status >=1) {
                    this.$message.error('已通过审核环节，不能编辑');
                    this.handleClose();
                    return false;
                }
            },
            onOpen(param){
                this.model = param.params.rowData;
                this.row = param.params.rowData;
                this.handleSecond(this.row);
                this.handleThird(this.row);
                },
            getAjaxPromise(model){
                delete model.cus_name;
                delete model.buyer;
                delete model.user_name;
                delete model.users;
                model.order_sn = this.model.order_sn;
                return this.ajaxProxy.update(model.id, model);
            },
            getOrderAddress(data){
                this.addresstableData = data.items[0];
            },
            getOrderGoods(data){
                // console.log(data);
                data.items.forEach(element => {
                    element.editState = false;
                });

                this.loading = false;
                this.goodstableData = data.items;
                
            },
            handleSecond(row){
                this.OrderAddressProxy.setParam({
                    order_id:row.id,
                }).load();
                this.tabSecond = true;
            },
            handleThird(row){
                this.loading =true;
                this.OrderGoodsProxy.setParam({
                    order_id:row.id,
                }).load();
                this.tabThird = true;
            },
            setEdit(row){
                row.editState = true;
                // console.log(row);
            },
            saveGoods(row){
                // console.log(row);
                let data = {
                    order_id:row.order_id,
                    goods_number:row.goods_number, 
                    remark:row.remark
                };
                OrederGoodsAjax2.update(row.id, data).then((response)=>{
                    if (response.data.status==0) {
                        this.$message.error(response.data.msg);
                    } else {
                        row.editState = false;
                        this.$message.success(response.data.msg);
                    }
                }).catch(response=>{
                    row.editState = true;
                    this.$message.error(response.data.msg);
                });
            },
            ifDelete(id){
                let vmthis = this;
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    OrederGoodsAjax2.delete(id).then((response)=>{
                        if (response.data.status==0) {
                            this.$message.error(response.data.msg);
                        } else {
                            row.editState = false;
                            this.$message.success(response.data.msg);
                            let index = vmthis.goodstableData.findIndex((element)=>{
                                return element.id == id;
                            });

                            if (index !=-1) {
                                vmthis.goodstableData.splice(index,1);
                            }
                        }
                    }).catch(response=>{
                        row.editState = true;
                        this.$message.error(response.data.msg);
                    });
                })
            },
            addGoods(goods){
                goods.order_id = this.row.id;
                if(this.goodstableData.length >0){
                    goods.assign_id = this.goodstableData[0].assign_id;
                }else{
                    goods.assign_id = '';
                }
                console.log(goods);
                OrederGoodsAjax2.create(goods).then((response)=>{
                    if (response.data.status==0) {
                        this.$message.error(response.data.msg);
                    } else {
                        this.$message.success(response.data.msg);
                        this.goodstableData.push(goods);
                    }
                }).catch((response)=>{
                    this.$message.error('出错了');
                })
                
            }
        },
        watch:{
            model:function(val, oldVal){
                for (const key in this.rowInfoForm) {
                    if (this.rowInfoForm.hasOwnProperty(key)) {
                        // console.log(key);
                        this.rowInfoForm[key] = val[key]
                    }
                }
            },
            row:function(val, oldVal) {
                if(this.activeName != 'First'){
                    this['handle'+ this.activeName].call(this, this.model);
                    this.tabSecond = false;
                    this.tabThird = false;
                }
            },
            activeName:function(val, olvVal){
                // console.log(this.activeName);
                if (!this['tab'+ val] && this.row !== null && val != 'First') {
                    this['handle'+ val].call(this, this.row);
                }
            }
        },
        created(){
            this.OrderAddressProxy = new OrderAddressAjaxProxy({fields:["*"]},    this.getOrderAddress,this);
            this.OrderGoodsProxy = new OrderGoodsAjaxProxy({fields:["*"]},    this.getOrderGoods,this);
        },
        beforeDestroy(){
            this.OrderAddressProxy = null;
            this.OrderGoodsProxy = null;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        /* max-width: 217px; */
        max-width: 140px;
    }
    .el-input-number {
        width: 100px;
    }
    .col{
        height: 36px;
    }
</style>

