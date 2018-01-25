<template>
    <div >
        <MyDialog title="添加订单" :name="name" :width="width" :height="height" @before-open="onOpen">
            <br>
            <el-steps :space="400" :active="active" finish-status="success">
                <el-step title="添加商品"></el-step>
                <el-step title="选择收货地址"></el-step>
                <el-step title="确认订单"></el-step>
            </el-steps>
            <el-form ref="addOrderForm" :model="addOrderForm" :label-width="labelWidth"   :label-position="labelPosition"  label-width="140px">
                <div v-show="this.active==0">
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
                            <el-form-item label="商品类型" prop="dev">
                                <el-cascader
                                        v-model="dev"
                                        :options="CategoryList"
                                        change-on-select
                                        @change="categoryChange"
                                ></el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="goods_id" label="商品名称">
                                <el-select v-model="addOrderForm.goods_id" @change="getGoodsInfo">
                                    <el-option v-for="v in goods" :value="v.id" :key="v.id" :label="v.goods_name"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="goods_number" label="商品数量">
                                <el-input-number size="small" :min="1" v-model="goods_number" ></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="remark" label="备注">
                                <el-input type="textarea" class="name-input"  v-model="remark"  placeholder="备注" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-button @click="addOrder" type="primary" class="right" >添 加</el-button>
                </div>
                <br>
                <div v-show="this.active==1">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item prop="addressID" label="请选择收货地址">
                                <el-select v-model="addressID" placeholder="请选择收货地址" @change="addressChange">
                                    <el-option v-for="v in address" :value="v.id" :key="v.id" :label="v.name" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="deal_id" label="请选择成交员工">
                                <el-select v-model="deal_id" placeholder="请选择成交员工"  @change="userChange">
                                    <el-option v-for="v in users" :value="v.id" :key="v.id" :label="v.realname" ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </div>
                <br>
                <div v-show="this.active==2">
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
                    <h3> <span>商品总金额:{{this.totalMoney}}</span></h3>
                    <br>
                    <el-table
                            border
                            :data="addressList"
                            style="width: 100%">
                        <el-table-column label="序号" type="index" width="80 px"></el-table-column>
                        <el-table-column prop="name" label="收货人姓名"></el-table-column>
                        <el-table-column prop="phone" label="收货人手机号"></el-table-column>
                        <el-table-column prop="address" label="收货地址"></el-table-column>
                        <el-table-column prop="deal_name" label="成交员工"></el-table-column>
                    </el-table>
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
            <el-button  style="margin-top: 12px;" v-show="this.active>0" @click="last">上一步</el-button>
            <el-button  style="margin-top: 12px;" v-show="this.active<2" @click="next">下一步</el-button>
        </MyDialog>
    </div>
</template>

<script>
    import DialogForm from '../../mix/DialogForm';
    import DataProxy from '../../packages/DataProxy';
    import SelectProxy from  '../../packages/SelectProxy';
    export default {
        name: 'DeliveryAddress',
        mixins:[DialogForm],
        props:{
            CategoryList:'',
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
                goods:[],
                users:[],
                address:[],
                addressList:[],
                usersListData:[],
                addressListData:[],
                addOrderForm:{
                    cus_id:'',
                    deal_id:'',
                    deal_name:'',
                    goods_id:'',
                    address_id:"",
                    order_all_money:0,
                    order_pay_money:0,
                    order_goods:[],
                },
                orderData:[],
                goodsIds:[],
                orderBasicData:[],
                model:'',
                deal_name:'',
                remark:'',
                goods_number:'',
                addressID:'',
                realname:'',
                dev:[]
            }
        },
        methods:{
            addOrder(){
                let moneyNotes =parseInt(this.goodsInfoData[this.goods_id].goods_price) * parseInt(this.goods_number);
                let addData ={
                    goods_id:this.goods_id,
                    goods_name:this.goodsInfoData[this.goods_id].goods_name,
                    price:this.goodsInfoData[this.goods_id].goods_price,
                    goods_number:this.goods_number,
                    remark:this.remark,
                    moneyNotes:moneyNotes,
                };
                this.totalMoney += moneyNotes;
                this.orderData.push(addData);
                this.goodsIds.push(this.goods_id);
                this.$refs.addOrderForm.resetFields();
                this.dev=[];
                this.remark='';
                this.goods_number='';
            },
            getGoodsInfo(goods_id){
                this.goods_id=goods_id;
            },
            userChange(deal_id){
                this.deal_id=deal_id;
                this.deal_name=this.usersListData[this.deal_id].realname;
                this.addressList=[];
                let data={
                    name : this.addressListData[this.address_id].name,
                    phone : this.addressListData[this.address_id].phone,
                    address: this.addressListData[this.address_id].address,
                    deal_name:this.deal_name,
                };
                this.addressList.push(data);
            },
            addressChange(address_id){
                this.address_id=address_id;
            },
            handleSubmit(){
                this.addOrderForm.cus_id = this.cus_id;
                this.addOrderForm.deal_id = this.deal_id;
                this.addOrderForm.deal_name = this.deal_name;
                this.addOrderForm.goods_id = this.goodsIds.join(',');
                this.addOrderForm.address_id = this.address_id;
                this.addOrderForm.order_all_money = this.totalMoney;
                this.addOrderForm.order_pay_money = this.totalMoney;
                this.addOrderForm.order_goods = this.orderData;
                this.formSubmit('addOrderForm');
            },
            handleClose(){
                this.addressList=[];
                this.orderData=[];
                this.goodsIds=[];
                this.addressID='';
                this.deal_id='';
                this.totalMoney=0;
                this.active=0;
                this.$modal.hide(this.name);
            },
            getAjaxProxy(){
                return  this.ajaxProxy;
            },
            formSubmit(name){
                let model = this[name];
                if (this.$refs[name].rules) {
                    this.$refs[name].validate((valid)=>{
                        if (valid) {
                            this.realSubmit(model, name);
                        } else {
                            console.log('error submit!!', name);
                            this.$emit('valid-error', name);
                            return false;
                        }
                    })
                } else {
                    this.realSubmit(model, name);
                }
            },
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            },
            realSubmit(model, name){
                let ajaxPromise =  this.getAjaxPromise(model);
                let vmthis = this;
                ajaxPromise.then(function(response){
                    vmthis.$message.success('操作成功');
                    vmthis.$refs[name].resetFields();
                    vmthis.addressList=[];
                    vmthis.orderData=[];
                    vmthis.goodsIds=[];
                    vmthis.addressID='';
                    vmthis.deal_id='';
                    vmthis.totalMoney=0;
                    vmthis.active=0;
                })
                    .catch(function(error){
                        if(error.response){
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        }else{
                            console.log('Error',error.message);
                        }
                        vmthis.$message.error('出错了');
                    })
                    .then(function(){
                        vmthis.$emit('submit-final', name);
                    });
            },
            onOpen(param){
                this.cus_id = param.params.model.cus_id;
                this.id = param.params.model.id;
                this.getAddress(this.cus_id);
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
            last() {
                if (this.active-- < 1) this.active = 0;
            },
            next() {
                if (this.active++ > 1) this.active = 2;
            },
            categoryChange(cate_id){
                let orderDataProxy = new DataProxy('http://localhost:8000/admin/goodsdetails',this.pageSize,this.getOrderData, this);
                this.orderDataProxy = orderDataProxy;
                let cates = {cate_id:cate_id};
                this.orderDataProxy.setExtraParam(cates);
                this.orderDataProxy.load();
            },
            getOrderData(data) {
                this.goods=data.items;
                this.goodsInfoData=data.goods;
            },
            getAddress(cus_id){
                let selectProxy = new SelectProxy('http://localhost:8000/admin/deliveryaddress?cus_id='+cus_id, this.getAddressData, this);
                selectProxy.load();
            },
            getAddressData(data){
                this.address=data.items;
                this.addressListData=data.address;
            },
            getUsersData(data){
                this.users=data.items;
                this.usersListData=data.users;
                console.log( this.usersListData)
            },

        },
        created(){
            let userDataProxy = new DataProxy('http://localhost:8000/admin/users',this.pageSize,this.getUsersData, this);
            userDataProxy.load();

        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
    .right  {
        float:right
    }
</style>
      