<template>
    <div >
        <MyDialog title="添加订单" :name="name" :width="width" :height="height" @before-open="onOpen">
            <br>
            <el-steps :space="250" :active="active" finish-status="success">
                <el-step title="添加商品"></el-step>
                <el-step title="选择收货地址"></el-step>
                <el-step title="确认订单"></el-step>
            </el-steps>
            <el-form ref="addOrderForm" :model="addOrderForm" :label-width="labelWidth" :label-position="labelPosition">
                <div v-show="active==0">
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
                                        change-on-select
                                        @change="categoryChange"
                                ></el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="goods_id" label="商品名称">
                                <el-select v-model="addOrderForm.goods_id" @change="getGoodsInfo">
                                    <el-option v-for="(value, item) in data2" :value="item" :key="item" :label="value.goods_name+'-'+value.sku_name+'-'+value.price">
                                        <span style="float: left">{{value.goods_name}}-{{value.sku_name}}-{{value.price}}</span>
                                        <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{value}}</span> -->
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="goods_number" label="商品数量">
                                <el-input-number size="small" :min="0" :max="gdsInpurNum" v-model="addOrderForm.goods_number" @change="gdsInpurNumChange">
                                </el-input-number>
                                <span style="color:red;">当前库存：{{alertNum}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="remark" label="备注">
                                <el-input type="textarea" class="name-input"  v-model="addOrderForm.remark"  placeholder="备注"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-button @click="addOrder" type="primary" class="right" >添 加</el-button>
                </div>
                <br>
                <div v-show="active==1">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item prop="deal_id" label="成交员工">
                                <el-select v-model="addOrderForm.deal_id" placeholder="请选择成交员工"  @change="userChange">
                                    <el-option v-for="v in users" :value="v.id" :key="v.id" :label="v.realname"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                     </el-row>
                        <el-row>
                        <el-col :span="12">
                            <el-form-item prop="address_id" label="收货地址" >
                                    <el-radio-group v-for="v in fullAddressData" :key="v.id" v-model="addOrderForm.address_id" @change="addressChange">
                                        <template slot-scope="scope">
                                            <el-radio  :label="v.id" >{{v.fullAddress}}</el-radio>
                                        </template>
                                    </el-radio-group>

                                <!--<el-select v-model="addressID" placeholder="请选择收货地址" @change="addressChange">-->
                                    <!--<el-option v-for="v in address" :value="v.id" :key="v.id" :label="v.name" ></el-option>-->
                                <!--</el-select>-->
                            </el-form-item>
                        </el-col>


                    </el-row>

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
                    <br>
                    <el-table
                            border
                            :data="addressList"
                            style="width: 100%">
                        <el-table-column label="序号" type="index" width="80 px"></el-table-column>
                        <el-table-column prop="name" label="收货人姓名"></el-table-column>
                        <el-table-column prop="phone" label="收货人手机号"></el-table-column>
                        <el-table-column prop="address" label="收货地址"></el-table-column>
                        <el-table-column prop="zip_code" label="收货邮编"></el-table-column>
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
            <el-button  style="margin-top: 12px;" v-show="active>0" @click="last">上一步</el-button>
            <el-button  style="margin-top: 12px;" v-show="active<2" @click="next">下一步</el-button>
        </MyDialog>
    </div>
</template>

<script>
    import DialogForm from '../../mix/DialogForm';
    import DataProxy from '../../packages/DataProxy';
    import SelectProxy from  '../../packages/SelectProxy';
    import GoodsSelectProxy from '../../packages/GoodsSelectProxy';

    import APP_CONST from '../../config';
    import { mapGetters, mapMutations } from 'vuex';
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
                goodsInfo:{},
                data2:{},
                gdsInpurNum:100000,
                alertNum:0,
                allNum:'',
                users:[],
                address:[],
                addressList:[],
                usersListData:[],
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
                    dev:[],
                    goods_number:'',
                    remark:'',
                    
                },
                orderData:[],
                goodsIds:[],
                orderBasicData:[],
                fullAddressData:[],
                model:'',
                deal_name:'',
                
            }
        },
        computed:{
            ...mapGetters([
                'user_id',
                'getUser'
            ])
        },
        methods:{
            addOrder(){
                var vmthis = this;
                let moneyNotes =parseInt(this.data2[this.addOrderForm.goods_id].price) * parseInt(this.addOrderForm.goods_number);
                let addData ={
                    goods_id:vmthis.data2[vmthis.addOrderForm.goods_id].goods_id,
                    sku_id:vmthis.data2[vmthis.addOrderForm.goods_id].sku_id,
                    sku_name:vmthis.data2[vmthis.addOrderForm.goods_id].sku_name,
                    goods_name:vmthis.data2[vmthis.addOrderForm.goods_id].goods_name,
                    price:vmthis.data2[vmthis.addOrderForm.goods_id].price,
                    goods_number:vmthis.addOrderForm.goods_number,
                    remark:vmthis.addOrderForm.remark,
                    moneyNotes:moneyNotes,
                };
                this.totalMoney += moneyNotes;
                this.orderData.push(addData);
                this.goodsIds.push(addData.goods_id);
                this.$refs.addOrderForm.resetFields();
                this.alertNum = 0;
            },
            getGoodsInfo(goods_id){
                if(this.data2[goods_id]){
                    this.gdsInpurNum = parseInt(this.data2[goods_id].num);
                    this.alertNum = parseInt(this.data2[goods_id].num);
                    this.allNum = this.alertNum;
                }
                    
            },
            gdsInpurNumChange(v){
                this.alertNum = this.allNum-v>0 ? this.allNum-v : 0;
            },
            userChange(deal_id){
                this.deal_id=deal_id;
                this.addOrderForm.deal_id=deal_id;
                for (let i = 0; i < this.users.length; i++) {
                    if(this.users[i].id == deal_id){
                        this.deal_name = this.users[i].realname;
                        this.addOrderForm.deal_name = this.deal_name;
                    }  
                } 
            },
            addressChange(address_id){
                this.address_id=address_id;
                this.addOrderForm.address_id = address_id;
                var vmThis = this;
                this.addressList=[];
                let data={
                    name : vmThis.addressListData[address_id].name,
                    phone : vmThis.addressListData[address_id].phone,
                    address: vmThis.addressListData[address_id].address,
                    zip_code: vmThis.addressListData[address_id].zip_code,
                    deal_name:vmThis.addOrderForm.deal_name,
                };
                this.addressList.push(data);
                
            },
            handleSubmit(){
                this.addOrderForm.goods_id = this.goodsIds.join(',');
                this.addOrderForm.order_all_money = this.totalMoney;
                this.addOrderForm.order_pay_money = this.totalMoney;
                this.addOrderForm.order_goods = this.orderData;
                this.formSubmit('addOrderForm');
            },
            handleClose(){
                this.addressList=[];
                this.orderData=[];
                this.goodsIds=[];
                this.$refs.addOrderForm.resetFields();
                this.deal_id='';
                this.cus_id = '',
                this.data2 = {},
                this.gdsInpurNum = 100000,
                this.alertNum = 0,
                this.allNum = '',
                this.deal_name = '',
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
                let ajaxPromise = this.getAjaxPromise(model);
                let vmthis = this;
                ajaxPromise.then(function(response){
                    vmthis.$message.success('操作成功');
                    vmthis.$refs[name].resetFields();
                    vmthis.addressList=[];
                    vmthis.orderData=[];
                    vmthis.goodsIds=[];
                    vmthis.deal_id='';
                    vmthis.cus_id = '',
                    vmthis.data2 = {},
                    vmthis.gdsInpurNum = 100000,
                    vmthis.alertNum = 0,
                    vmthis.allNum = '',
                    vmthis.deal_name = '',
                    vmthis.totalMoney=0;
                    vmthis.active=0;
                    vmthis.$emit('submit-success', name);
                }).catch(function(error){
                    if(error.response){
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }else{
                        console.log('Error',error.message);
                    }
                    vmthis.$message.error('出错了');
                }).then(function(){
                    vmthis.$emit('submit-final', name);
                });
            },
            onOpen(param){
                this.addOrderForm.deal_id=this.user_id;
                this.addOrderForm.deal_name=this.getUser.realname;
                this.cus_id = param.params.model.id;
                this.addOrderForm.cus_id = this.cus_id;
                //this.id = param.params.model.id;
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
                // let orderDataProxy = new DataProxy('/goodsdetails',this.pageSize,this.getOrderData, this);
                // this.orderDataProxy = orderDataProxy;
                // let cates = {cate_id:cate_id};
                // this.orderDataProxy.setExtraParam(cates);
                // this.orderDataProxy.load();
                // this.goodsInfo = {};
                //this.data1 = {};
                // this.data2 = {};
                //alert(cate_id);
                this.goodsProxy.setParam({
                    cate_id:cate_id,
                    with:['skus'],
                    fields:['id','goods_name','goods_price','goods_number']
                }).load();
            },
            getOrderData(data) {
                //处理函数改成loadGoods
                this.goods=data.items;
                this.goodsInfoData=data.goods;
            },
            getAddress(cus_id){
                let selectProxy = new SelectProxy('/deliveryaddress?cus_id='+cus_id, this.getAddressData, this);
                selectProxy.load();
            },
            getAddressData(data){
                this.address=data.items;
                this.addressListData=data.address;
                this.fullAddressData=data.fullAddress;
            },
            getUsersData(data){
                console.log(data);
                this.users=data.items;
                //this.usersListData=data.users;
            },



            /**
             *  转成 key : {goods_id:xx, price:xxx, name:xxxx, num:xxx, sku_id:xxx, sku:xxx}
             *  这样的格式
             *  key 建议生成这样的格式 goods_id_xx_sku_id_xx 如果没有sku 那就这样sku_id_0
             *  例子：
             *  {
             *      goods_id_xx_sku_id_xx:{goods_id:xx, price:xxx, goods_name:xxxx, num:xxx, sku_id:xxx, sku_name:xxx},
             *      goods_id_xx_sku_id_xx:{goods_id:xx, price:xxx, goods_name:xxxx, num:xxx, sku_id:xxx, sku_name:xxx}
             *  }
             *  商品名称那里（下拉选择项）
             *  生成如下格式
             *  1、商品名称-价格（没有sku的）
             *  2、商品名称-sku名称-价格
             * 
             *  商品数量 那里 显示存库
             *  添加商品时 要把商品的规格、sku_id 保存（没有sku就不用保存）。
             *  
             *  data 的格式为,字段不完全
             *  items:[
             *      //商品的基本信息
             *      {  goods_id:xxx .... 
             *      // 同一款商品的不同型号（不同规格）
             *         sku:[
             *              {  id:xx, 
             *                 name:xxx,
             *                 price:xxx,
             *                 num:xxx,  
             *                 // attr 是规格数组 每一个规格的值在 pivot里的value  
             *                 attr:[{ id:xx,name:xxx,   pivot:{value:xx,addon_value:xx}}] 
             *              },...  
             *             ]
             *       },...
             *  ]
             *  
             */
            loadGoods(data){
                //console.log(data);
                var vmThis = this;
                this.data2 = {};
                for (let i = 0; i < data.items.length; i++) {
                    if(data.items[i].skus.length < 1){
                        let gid1 = data.items[i].id;
                        let goods_name1 = data.items[i].goods_name;
                        let goods_price1 = data.items[i].goods_price;
                        let goods_number1 = data.items[i].goods_number;
                        let vv1 = {goods_id:gid1, price:goods_price1, goods_name:goods_name1, num:goods_number1,sku_id:0, sku_name:''};
                        let kk1 = 'goods_id_'+gid1+'_sku_id_0';
                        vmThis.data2[kk1] = vv1;
                        //console.log(vmThis.data2);
                    }else{
                        let gid2 = data.items[i].id;
                        let goods_name2 = data.items[i].goods_name;
                        // let goods_price2 = data.items[i].goods_price;
                        // let goods_number2 = data.items[i].goods_number;  
                        
                        for (let n = 0; n < data.items[i].skus.length; n++) {
                            let sku_id2 = data.items[i].skus[n].id;
                            let sku_name2 = data.items[i].skus[n].name;
                            let sku_num2 = data.items[i].skus[n].num;
                            let sku_price2 = data.items[i].skus[n].price;
                            let kk2 = 'goods_id_'+gid2+'_sku_id_'+sku_id2;
                            let vv2 = {goods_id:gid2, price:sku_price2, goods_name:goods_name2, num:sku_num2,sku_id:sku_id2, sku_name:sku_name2};
                            vmThis.data2[kk2] = vv2;
                        }
                        //console.log(vmThis.data2);
                    }
             
                }  
                
            }


        },
        created(){
            let userDataProxy = new DataProxy('/employees',this.pageSize,this.getUsersData, this);
            userDataProxy.load();


            this.goodsProxy = new GoodsSelectProxy({}, this.loadGoods, this);

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
      