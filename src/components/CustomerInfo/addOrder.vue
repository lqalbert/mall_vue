<template>
    <div >
        <MyDialog title="添加订单" :name="name" :width="width" :height="height" @before-open="onOpen">
            <br>
            <el-steps :space="300" :active="active" process-status="finish" finish-status="success" center align-center>
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
                                        size="small"
                                        v-model="addOrderForm.dev"
                                        :options="CategoryList"
                                        @change="categoryChange">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="goods_id" label="商品名称">
                                <el-select v-model="addOrderForm.goods_id" size="small" @change="getGoodsInfo">
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
                                <el-input type="textarea" class="name-input" size="small" v-model="addOrderForm.remark"  placeholder="备注" ></el-input>
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
                                <el-radio-group v-model="addOrderForm.address">
                                    <el-radio v-for="v in address" :label="v" :key="v.id" >{{v.id}}-{{v.area_province_name}}-
                                        {{v.area_city_name}}-{{v.area_district_name}}-{{v.name}}-{{v.fixed_telephone}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
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
                            :data="[addOrderForm.address]"
                            style="width: 100%">
                        <el-table-column label="序号" type="index" width="80 px"></el-table-column>
                        <el-table-column prop="name" label="收货人姓名"></el-table-column>
                        <el-table-column prop="fixed_telephone" label="固定电话"></el-table-column>
                        <el-table-column prop="address" label="收货地址"></el-table-column>
                        <el-table-column prop="zip_code" label="收货邮编"></el-table-column>
                        <!-- <el-table-column prop="deal_name" label="成交员工"></el-table-column> -->
                    </el-table>
                    <br>
                        <div>
                            <!-- <el-row>
                                <el-col :span="12">
                                    <el-form-item prop="remark" label="指定快递">
                                        <el-radio-group v-model="addOrderForm.express_delivery" @change="setExpressChange">
                                            <el-radio label="1">是</el-radio>
                                            <el-radio label="0">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item prop="express_id" label="快递公司" >
                                        <el-select v-model="addOrderForm.express_id" :disabled="addOrderForm.express_delivery==0" placeholder="请选择快递公司" size="small" @change="expressChange">
                                            <el-option v-for="v in companys" :value="v.id" :key="v.id" :label="v.company_name">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row> -->
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item prop="type" label="订单类型">
                                        <el-select v-model="addOrderForm.type">
                                            <el-option value="0" label="销售订单"></el-option>
                                            <el-option value="1" label="内部订单"></el-option>
                                            <el-option value="2" label="商城订单"></el-option>
                                        </el-select>
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
                </div>
            </el-form>
            <div slot="dialog-foot" >
                <el-row type="flex" justify="space-between">
                    <el-col :span="6" class="text-left">
                        <el-button   v-if="active>0" @click="last">上一步</el-button>
                        <el-button   v-show="active<2" @click="next">下一步</el-button>
                    </el-col>
                    
                    <el-col :span="6" v-show="active==2">
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
    import DialogForm from '../../mix/DialogForm';
    import DataProxy from '../../packages/DataProxy';
    import SelectProxy from  '../../packages/SelectProxy';
    import GoodsSelectProxy from '../../packages/GoodsSelectProxy';
    import EntrepotProductAjaxProxy from '@/ajaxProxy/EntrepotProduct';
    import ExpressCompanySelectProxy from '../../packages/ExpressCompanySelectProxy';

    import APP_CONST from '../../config';
    import { mapGetters, mapMutations } from 'vuex';
    export default {
        name: 'addOrder',
        mixins:[DialogForm],
        props:{
            CategoryList:'',
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
                    // address_id:"",
                    address:null,
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
                    express_delivery:'0',
                    express_id:'',
                    order_remark:'',
                    express_remark:'',
                    express_name:'',
                    type:'0',
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
        computed:{
            ...mapGetters([
                'user_id',
                'getUser',
            ])
        },
        methods:{
            expressChange(v){
                let i ='';
                for (i in this.companys){
                    if(this.companys[i]['id'] == v){
                        this.addOrderForm.express_name =this.companys[i]['company_name']
                    }
                }
            },
            addOrder(){
                if(this.alertNum != 0 ){
                    //console.log(this.data2);
                    var vmthis = this;
                    let moneyNotes =parseInt(this.data2[this.addOrderForm.goods_id].price) * parseInt(this.addOrderForm.goods_number);
                    let item = vmthis.data2[vmthis.addOrderForm.goods_id];
                    // console.log(item);
                    let addData ={
                        goods_id:    item.goods_id,
                        sku_id:      item.sku_id,
                        sku_name:    item.sku_name,
                        goods_name:  item.goods_name,
                        price:       item.price,
                        goods_number:vmthis.addOrderForm.goods_number,
                        remark:      vmthis.addOrderForm.remark,
                        moneyNotes:  moneyNotes,
                        sku_sn:      item.sku_sn,
                        unit_type:   item.unit_type,
                        len:         item.len,
                        width:       item.width,
                        height:      item.height,
                        barcode:     item.barcode,
                        weight:      item.weight,
                        bubble_bag:  item.bubble_bag,
                        specifications: item.specifications,
                    };
                    this.totalMoney += moneyNotes;
                    this.orderData.push(addData);
                    this.goodsIds.push(addData.goods_id);
                    this.$refs.addOrderForm.resetFields();
                    this.alertNum = 0;
                }
            },
            getGoodsInfo(goods_id){
                if(this.data2[goods_id]){
                    EntrepotProductAjaxProxy.getEntrepotCount(this.data2[goods_id].sku_sn).then((data)=>{
                        this.gdsInpurNum = parseInt(data.data.num);
                        this.alertNum = parseInt(data.data.num);
                        this.allNum = this.alertNum;
                    })  
                }
                    
            },
            gdsInpurNumChange(v){
                // this.alertNum = this.allNum-v>0 ? this.allNum-v : 0;
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
                this.addOrderForm.order_all_money = this.totalMoney;
                this.addOrderForm.order_pay_money = this.totalMoney;
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
                this.data2 = {},
                this.gdsInpurNum = 100000,
                this.alertNum = 0,
                this.allNum = '',
                this.deal_name = '',
                this.totalMoney=0;
                this.active=0;
                this.depositMoney = 0;
                this.$modal.hide(this.name);
            },
            getAjaxProxy(){
                return  this.ajaxProxy;
            },
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            },
            onOpen(param){
                // console.log(param.params);
                this.addOrderForm.cus_name = param.params.model.name;
                this.addOrderForm.group_id = this.getUser.group_id;
                this.addOrderForm.department_id = this.getUser.department_id;
                this.addOrderForm.deal_id=this.user_id;
                this.addOrderForm.deal_name=this.getUser.realname;
                this.cus_id = param.params.model.id;
                this.addOrderForm.cus_id = this.cus_id;
                this.addOrderForm.dep_group_realname = this.setDepGroupRealname(this.user_id);
                this.getAddress(this.cus_id);
                
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

                if(this.active == 0 && this.orderData.length == 0){
                    this.$message.error('添加商品');
                    return
                }


                if (this.active == 1 && this.addOrderForm.address == null) {
                    //检查地址？
                    this.$message.error('选择地址');
                    return ;
                    
                }
                if (this.active++ > 1) this.active = 2;
            },
            categoryChange(cate_id){
                this.addOrderForm.goods_id = '';
                this.alertNum = 0;
                this.goodsProxy.setParam({
                    cate_id:cate_id,
                    with:['skus'],
                    fields:['id','goods_name',
                    'goods_price','goods_number',
                    'sku_sn','unit_type','len','width','height','barcode','weight',
                    'bubble_bag','specifications']
                }).load();
                this.data2 = {};

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
                // this.addressListData=data.address;
                // this.fullAddressData=data.fullAddress;
            },
            getUsersData(data){
                console.log(data);
                this.users=data.items;
                //this.usersListData=data.users;
            },

            contactItem(goods_id, price, name, num, sku_id, sku, sku_sn,unit_type,len,width,height,barcode,weight,bubble_bag,specifications){
                return {goods_id: goods_id,
                        price: price, 
                        goods_name: name,  
                        num: num, 
                        sku_id:sku_id, 
                        sku_name:sku, 
                        sku_sn:sku_sn,
                        unit_type:unit_type,
                        len:len,
                        width:width,
                        height:height,
                        barcode:barcode,
                        weight:weight,
                        bubble_bag:bubble_bag,
                        specifications:specifications};
            },
            contactChildren(children, goods_id, goods_name,unit_type,len,width,height,barcode,weight,bubble_bag,specifications){
                for (let i = 0; i < children.length; i++) {
                    const item = children[i];
                    let vv1 = this.contactItem(goods_id, item.price, goods_name,
                     item.num, item.id, item.name, item.sku_sn,unit_type,len,width,height,barcode,weight,bubble_bag,specifications);
                    let kk1 = 'goods_id_'+goods_id+'_sku_id_'+ item.id;
                    this.data2[kk1] = vv1;
                }
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
                var vmThis = this;
                this.data2 = {};
                for (let i = 0; i < data.items.length; i++) {
                    let gid1 = data.items[i].id;
                    let goods_name1 = data.items[i].goods_name;
                    let goods_price1 = data.items[i].goods_price;
                    let goods_number1 = data.items[i].goods_number;
                    let unit_type1 = data.items[i].unit_type;
                    
                    let len = data.items[i].len;
                    let width = data.items[i].width;
                    let height = data.items[i].height;
                    let barcode = data.items[i].barcode;
                    let weight = data.items[i].weight;
                    let bubble_bag = data.items[i].bubble_bag;
                    let specifications = data.items[i].specifications;

                    let vv1 = this.contactItem(gid1, goods_price1, goods_name1,
                     goods_number1, 0, '', data.items[i].sku_sn,unit_type1,len,width,height,barcode,weight,
                     bubble_bag,specifications);
                    let kk1 = 'goods_id_'+gid1+'_sku_id_0';
                    this.data2[kk1] = vv1;
                    if (data.items[i].skus.length > 0) {
                        this.contactChildren(data.items[i].skus, gid1, goods_name1,unit_type1,len,
                        width,height,barcode,weight,bubble_bag,specifications);
                    }
                }
                // console.log(this.data2);  
            },

            resetForms(name){
                this.$refs[name].resetFields();
                this.addressList=[];
                this.orderData=[];
                this.orderAddressData=[];
                this.goodsIds=[];
                this.deal_id='';
                this.cus_id = '',
                this.data2 = {},
                this.gdsInpurNum = 100000,
                this.alertNum = 0,
                this.allNum = '',
                this.deal_name = '',
                this.totalMoney=0;
                this.active=0;
                this.depositMoney = 0;
            },
            getExpressCompanySelect(data){
                this.companys = data.items;
            },
            setExpressChange(v){
                if (v == 0) {
                    this.addOrderForm.express_id = "";
                    this.addOrderForm.express_name = "";
                }
            }

        },
        created(){
            // let userDataProxy = new DataProxy('/employees',this.pageSize,this.getUsersData, this);
            // userDataProxy.load();

            //获取快递公司数据
            // let ExpressCompanySelect = new ExpressCompanySelectProxy({}, this.getExpressCompanySelect, this);
            // ExpressCompanySelect.load();

            this.goodsProxy = new GoodsSelectProxy({}, this.loadGoods, this);

            this.$on('submit-error', this.resetForms)
            let user = this.getUser;
            this.addOrderForm.deal_id =  user.id;
            this.addOrderForm.deal_name = user.realname;

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
      
