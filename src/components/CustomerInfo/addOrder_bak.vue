<template>
    <div >
        <MyDialog title="添加订单" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-steps :space="200" :active="active" process-status="finish" finish-status="success" center align-center>
                <el-step title="添加商品"></el-step>
                <el-step title="选择收货地址"></el-step>
                <el-step title="确认订单"></el-step>
                <el-step title="订单备注"></el-step>
            </el-steps>
            <el-form ref="addOrderForm" :model="addOrderForm" :label-width="labelWidth" :label-position="labelPosition">
                <div v-show="active==0">
                    <el-table
                            border
                            height="160"
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
                                <el-button size="small" type="danger" @click="deleteRow(scope.row)">删 除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br>
                    <el-row>
                        <AddGoods :category-list="cates" @add-goods="addGoods"></AddGoods>
                    </el-row>
                    <!-- <div style="float: left;margin-left: 50%;">
                        <el-button @click="addOrder" type="primary" class="right">添 加</el-button>
                    </div> -->
                </div>
                <div v-show="active==1">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item prop="deal_id" label="成交员工">
                                {{ addOrderForm.deal_name }}
                                <!-- <el-select v-model.number="addOrderForm.deal_id" placeholder="请选择成交员工"  @change="userChange">
                                    <el-option v-for="v in users" :value="v.id" :key="v.id" :label="v.realname"></el-option>
                                </el-select> -->
                            </el-form-item>
                        </el-col>
                     </el-row>
                        <el-row>
                        <el-col :span="12">
                            <el-form-item prop="address_id" label="收货地址" >
                                <el-radio-group v-model="addOrderForm.address" @change="addressChange">
                                    <el-radio v-for="v in address" :label="v" :key="v.id" >{{v.id}}-{{v.area_province_name}}-
                                        {{v.area_city_name}}-{{v.area_district_name}}-{{v.name}}-{{v.fixed_telephone}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div v-show="active==2">
                    <el-table border :data="orderData" style="width: 100%" height="160">
                        <el-table-column label="序号" type="index" width="80 px"></el-table-column>
                        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
                        <el-table-column prop="price" label="商品单价"></el-table-column>
                        <el-table-column prop="goods_number" label="商品数量"></el-table-column>
                        <el-table-column prop="moneyNotes" label="小 记"></el-table-column>
                        <el-table-column prop="remark" label="备注"></el-table-column>
                    </el-table>
                    <h3> <span>商品总金额:{{ totalMoney }}</span></h3>
                    <el-table
                            border
                            :data="addressListData"
                            style="width: 100%">
                        <el-table-column label="序号" type="index" width="80 px"></el-table-column>
                        <el-table-column prop="name" label="收货人姓名"></el-table-column>
                        <el-table-column prop="fixed_telephone" label="固定电话"></el-table-column>
                        <el-table-column prop="phone" label="手机"></el-table-column>
                        <el-table-column prop="address" label="收货地址"></el-table-column>
                        <el-table-column prop="zip_code" label="收货邮编"></el-table-column>
                        <!-- <el-table-column prop="deal_name" label="成交员工"></el-table-column> -->
                    </el-table>
                    
                </div>
                <div v-if="active==3">
                    
                    <el-row>
                        <el-col :span="12">
                            <el-form-item prop="type" label="订单类型" required>
                                <el-select v-model="addOrderForm.type" @change="typeChange">
                                    <el-option v-for="ordertype in orderTypes" :value="ordertype.id" :label="ordertype.name" :key="ordertype.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                            <el-col :span="20" >
                                <el-form-item prop="remark" label="指定快递">
                                    <el-col :span="11">
                                        <el-input v-model="addOrderForm.express_delivery" placeholder="不填发默认快递" @change="deliverChange"></el-input>
                                    </el-col>
                                    <el-col :span="1">&nbsp;</el-col>
                                    <el-col :span="12">
                                        <el-radio-group v-model="set_express" @change="setExpressChange">
                                            <el-radio-button v-for="item in freitemp" :label="item.id" :key="item.id" >{{ item.express }}</el-radio-button>
                                        </el-radio-group>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item   label="运费">
                                <!-- 应该是个计算属性 关联订单类型和运费模板 -->
                                <el-col :span="12" v-show="!isIncludeFreight">
                                    {{ realfreight }}
                                </el-col>
                                <el-col :span="12" v-show="isIncludeFreight">包邮</el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="18">
                            <el-form-item   label="费用">
                               {{ totalMoney }} * {{ discount() }}% + {{ realfreight }} = {{payMoney}}
                               <span>&nbsp;&nbsp;&nbsp;&nbsp;商品金额 * 打折优惠 + 运费 </span>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item prop="order_remark" label="订单备注">
                                <el-input v-model="addOrderForm.order_remark" type="textarea" placeholder="订单备注"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item prop="express_remark" label="配送发货备注">
                                <el-input v-model="addOrderForm.express_remark" type="textarea" placeholder="配送发货备注"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <div slot="dialog-foot" >
                <el-row type="flex" justify="space-between">
                    <el-col :span="6" class="text-left">
                        <el-button   v-if="active>0" @click="last">上一步</el-button>
                        <el-button   v-show="active< 3" @click="next">下一步</el-button>
                    </el-col>
                    
                    <el-col :span="6" v-show="active== 3 ">
                        <el-button @click="handleClose">取 消</el-button>
                        <submit-button
                                @click="handleSubmit"
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
    import DialogForm from '@/mix/DialogForm';
    import DataProxy from '@/packages/DataProxy';
    import SelectProxy from  '@/packages/SelectProxy';
    import GoodsSelectProxy from '@/packages/GoodsSelectProxy';
    import FreightAlgorithm from '@/packages/Freight';
    import EntrepotProductAjaxProxy from '@/ajaxProxy/EntrepotProduct';
    import ExpressCompanySelectProxy from '@/packages/ExpressCompanySelectProxy';
    import AddGoods from './AddGoods';

    import APP_CONST from '@/config';
    import { mapGetters, mapMutations } from 'vuex';

    const ACTIVE_LAST = 3



    export default {
        name: 'addOrderBasic',
        mixins:[DialogForm],
        components:{
            AddGoods
        },
        props:{
            // CategoryList:'',
        },
        data(){
            return {
                companys:[],
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
                users:[],
                address:[],
                addressList:[],
                addressListData:[],
                addOrderForm:{
                    cus_id:'',
                    user_id:"",
                    deal_id:'',
                    deal_name:'',
                    goods_id:"",
                    // address_id:"",
                    address:null,
                    order_all_money:0,
                    discounted_goods_money:0,
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
                    express_delivery:'',
                    express_id:'',
                    order_remark:'',
                    express_remark:'',
                    express_name:'',
                    type:'',
                    include_freight:0, // 不包邮 包邮,
                    freight:0.00 //运费
                },
                orderData:[],
                orderAddressData:[],
                goodsIds:[],
                orderBasicData:[],
                fullAddressData:[],
                model:'',
                deal_name:'',
                depositMoney:0,
                set_express:"",
                realfreight:"",
            }
        },
        computed:{
            ...mapGetters([
                'user_id',
                'getUser',
            ]),
            cates(){
                return this.$store.getters.getCates;
            },
            // isNotIncludeFreight(){ //不包邮吗
            //     return true;
            //     // return !(this.addOrderForm.type != 1 &&  parseInt(this.totalMoney * 100) >= 26800) && this.addOrderForm.express_delivery.length == 0
            // },
            isIncludeFreight(){ //包邮吗
                this.addOrderForm.type;
                this.totalMoney;
                let currentOrdertype = this.getCurrentOrderType(); //还没选的时候 currentOrdertype为undefined
                let template = this.getCurrentFreightTemplate(); //还没选的时候 currentOrdertype为undefined
                if (currentOrdertype) {
                    return currentOrdertype.is_include == 1 &&  template.is_include == 1 &&  template.stand_fee *100 <= this.totalMoney*100;
                } else {
                    return false;
                }
            },
            // calcuFreight(){
            //     this.addOrderForm.address;
            //     this.addOrderForm.type;
            //     this.set_express;
            //     return FreightAlgorithm.getFreight();
            // },
            freitemp(){
                return this.$store.getters.getFreightTemplatesByEntrepot(this.$store.getters.userEntrepotId);
            },
            orderTypes(){
                
                return this.$store.getters.getOrderTypes;
            },
            payMoney(){
                let d = this.totalMoney * this.discount()/100;
                return parseFloat(d.toFixed(2)) + parseFloat(this.realfreight);
            }
        },
        methods:{
            onOpen(param){
                this.addOrderForm.cus_name = param.params.model.name;
                this.addOrderForm.user_id = param.params.model.mid_relative.user_id;
                // this.addOrderForm.user_id = param.params.model.
                // this.addOrderForm.group_id = this.getUser.group_id;
                // this.addOrderForm.department_id = this.getUser.department_id;
                this.addOrderForm.deal_id=this.user_id;
                this.addOrderForm.deal_name=this.getUser.realname;
                this.cus_id = param.params.model.id;
                this.addOrderForm.cus_id = this.cus_id;
                // this.addOrderForm.dep_group_realname = this.setDepGroupRealname(this.user_id);
                this.getAddress(this.cus_id);

                this.setDefaultTemplate();//设置默认模板
            },
            expressChange(v){
                let i ='';
                for (i in this.companys){
                    if(this.companys[i]['id'] == v){
                        this.addOrderForm.express_name =this.companys[i]['company_name']
                    }
                }
            },
            addGoods(goods){
                console.log(goods);
                this.addOrder(goods);
            },
            addOrder(goods){
                //console.log(this.data2);
                this.totalMoney += goods.moneyNotes;
                this.orderData.push(goods);
                this.goodsIds.push(goods.goods_id);
                this.$refs.addOrderForm.resetFields();

                this.$emit('cacul-freight');
            },
            userChange(deal_id){
                // console.log(this.users);
                this.deal_id=deal_id;
                this.addOrderForm.deal_id=deal_id;
                for (let i = 0; i < this.users.length; i++) {
                    if(this.users[i].id == deal_id){
                        this.deal_name = this.users[i].realname;
                        this.addOrderForm.deal_name = this.deal_name;
                        this.addOrderForm.dep_group_realname = this.setDepGroupRealname(deal_id);
                    }  
                }
                
            },
            handleSubmit(){
                this.addOrderForm.goods_id = this.goodsIds.join(',');
                this.addOrderForm.order_all_money = this.totalMoney; //商品金额
                this.addOrderForm.order_pay_money = this.payMoney; //计算打折 + 运费
                this.addOrderForm.discounted_goods_money = this.addOrderForm.order_pay_money - parseFloat(this.realfreight);
                this.addOrderForm.freight = this.realfreight;
                this.addOrderForm.include_freight = this.isIncludeFreight;
                this.addOrderForm.order_goods = this.orderData;
                // this.addOrderForm.order_address = this.orderAddressData;

                if (this.addOrderForm.order_goods.length == 0) {
                    this.$message.error('商品数量不能为0');
                    return ;
                }

                if ( Object.entries(this.address).length==0 ) {
                    this.$message.error('请选地址');
                    return ;
                }


                this.formSubmit('addOrderForm');
            },
            handleClose(){
                this.addressList=[];
                this.orderData=[];
                this.orderAddressData=[];
                this.goodsIds=[];
                this.$refs.addOrderForm.resetFields();
                this.deal_id='';
                this.cus_id = '',
                this.deal_name = '',
                this.totalMoney=0;
                this.active=0;
                this.depositMoney = 0;
                this.$modal.hide('add-orderBasic');
            },
            getAjaxProxy(){
                return  this.ajaxProxy;
            },
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            },
            setDepGroupRealname(id){
                let dep_group_realname = '';
                for (let i = 0; i < this.users.length; i++) {
                    if (this.users[i].id == id) {
                        if(this.users[i].department){
                            dep_group_realname = this.users[i].department.name+'-';
                        }

                        if(this.users[i].group){
                            dep_group_realname = dep_group_realname + this.users[i].group.name +'-';
                        }

                        dep_group_realname = dep_group_realname+this.users[i].realname;
                        this.depositMoney = this.users[i].deposit_money;
                    }
                    
                }
                return dep_group_realname;
            },
            deleteRow(row){
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
                if(this.active == 0 && this.orderData.length == 0){
                    this.$message.error('添加商品');
                    return
                }

                if (this.active == 1 && this.addOrderForm.address == null) {
                    //检查地址？
                    this.$message.error('选择地址');
                    return ;
                }

                if (this.active++ > 3) this.active = 3;
            },

            getAddress(cus_id){
                let selectProxy = new SelectProxy('/deliveryaddress?cus_id='+cus_id, this.getAddressData, this);
                selectProxy.load();
            },
            getAddressData(data){
                this.address=data.items;
                // this.addressListData=data.address;
                // this.fullAddressData=data.fullAddress;
            },
            getUsersData(data){
                // console.log(data);
                this.users=data.items;
                //this.usersListData=data.users;
            },
            resetForms(name){
                this.$refs[name].resetFields();
                this.addressList=[];
                this.orderData=[];
                this.orderAddressData=[];
                this.goodsIds=[];
                this.deal_id='';
                this.cus_id = '',
                this.deal_name = '',
                this.totalMoney=0;
                this.active=0;
                this.depositMoney = 0;
            },
            getExpressCompanySelect(data){
                this.companys = data.items;
            },
            setExpressChange(v){
                let cu = this.getCurrentFreightTemplate();
                this.addOrderForm.express_delivery = cu.express;
                FreightAlgorithm.setTemplate(cu);

                this.$emit('cacul-freight');
            },
            addressChange(v){
                this.addressListData = [];
                this.addressListData.push(v);

                FreightAlgorithm.setAddress(v);
                
            },
            getCurrentOrderType(){
                let selectedId = this.addOrderForm.type;
                return  this.orderTypes.find((element)=>{
                    return element.id == selectedId;
                });
            },
            getCurrentFreightTemplate(){
                let selectedId = this.set_express;
                return  this.freitemp.find((element)=>{
                    return element.id == selectedId;
                });
            },
            setDiscount(money){
                let currentOrderType = this.getCurrentOrderType();
                if (currentOrderType) {
                    return money * currentOrderType.discount / 100;
                } else {
                    return money
                }
            },
            setDefaultTemplate(){
                this.freitemp.forEach(element => {
                    if (element.is_default == 1) {
                        // this.addOrderForm.express_delivery = element.express;
                        this.set_express = element.id;
                        FreightAlgorithm.setTemplate(element);
                    }
                });
            },
            typeChange(v){
                FreightAlgorithm.setOrderType(this.getCurrentOrderType());
                FreightAlgorithm.setPrice(this.totalMoney);

                this.$emit('cacul-freight');
            },
            deliverChange(v){
                let has = false;
                this.freitemp.forEach(element => {
                    if (element.express == v) {
                        has = true;
                        this.set_express = element.id;
                    }
                });
                if (!has) {
                    this.setDefaultTemplate();
                }
            },

            freight(){
                this.realfreight =  FreightAlgorithm.getFreight();
            },
            discount(){
                let o = this.getCurrentOrderType();
                return o ? o.discount : 100;
            }

        },
        created(){

            this.$on('submit-error', this.resetForms)
            let user = this.getUser;
            this.addOrderForm.deal_id =  user.id;
            this.addOrderForm.deal_name = user.realname;

            this.$store.dispatch('initFreightTemplate', this.$store.getters.userEntrepotId);
            this.$store.dispatch('initOrderTypes');
            
            FreightAlgorithm.setScope(this);

            this.$on('cacul-freight', this.freight);
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

    .el-radio+.el-radio {
        margin-left: 0px; 
        margin-right: 15px;
    }
</style>
      
