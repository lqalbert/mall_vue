import rowInfo from "../rowInfo";
import exchange from "../exchange";
import addDialog from "../Add.vue";

import deleteMix from '@/mix/Delete';
import DataProxy from '@/packages/DataProxy';
// import SelectProxy from  '../../packages/SelectProxy';
// import OrderlistAjaxProxy from '@/ajaxProxy/OrderBasic';
// import UsersSelectProxy from '../../packages/UsersSelectProxy';
// import BuyerAjaxProxy from '../../ajaxProxy/Buyer';
// import OrdergoodsAjaxProxy from '../../ajaxProxy/Ordergoods';
// import DeliveryAddressAjaxProxy from '../../ajaxProxy/DeliveryAddress';
// import Tree from '../../ajaxProxy/Tree';
// import Users from '../../ajaxProxy/Users';
import TableProxy from '../../common/TableProxy';
import OrderBasic from '@/ajaxProxy/OrderBasic';

// import DataTable from '../../mix/DataTable';
// import SearchTool from "../../mix/SearchTool";
import mix from '../mix';
import { mapGetters  } from 'vuex';

export default {
    name: 'OrderList',
    pageTitle:"订单详情",
    mixins: [mix,deleteMix],
    components:{
        rowInfo,addDialog,exchange
    },
    data () {
        return {
            ajaxProxy:OrderBasic,
            orderBasicAjaxProxy:OrderBasic,
            mainurl:OrderBasic.getUrl(),
            mainparam:"",
            daterange:'',
            searchForm:{
                start:'',
                goods_name:'',
                consignee:'',
                sn:'',
                // deal_name:'',
                end:'',
                condition:'',
                deal_id:'',
                value7:"",

                // hyf 添加
                status:"", //订单状态 
                product_status:"", //货物状态
                after_sale_status:"",//售后状态,
                appends:['status_text','product_status_text','after_sale_status_text']

            },
            // tableData: '',
            bubble:null,
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }],
                disabledDate(time) {
                    return time.getTime() > Date.now();//- 8.64e7
                }
            },
            value6: '',
            value7: '',
            dbRow:null
        }
    },
    computed:{
        ...mapGetters([
            'user_id'
          ])
    },
    methods:{
        getAjaxProxy(){
            return  this.ajaxProxy;
        },
        showRowData(row){
            this.$modal.show('rowInfo',{rowData:row});
        },
        // showExchange(row){
        //     this.$modal.show('exchange',{rowData:row});
        // },
        /** 发起退款弹窗  */
        open2(id) {
            /*     this.$confirm('确认发起退款（需要审核）?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.refund(id),
                    // this.refresh(),
                    this.$message({
                        type: 'success',
                        message: '发起退款成功!'
                    });
            }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消'
                });
            }); */
        },

        /** 点击订单列表展示用户信息 */
        showRow(row){
            
            this.dbRow = row;
            // this.usertableData.splice(0,this.usertableData.length);
            // /** 选项卡1显示客户信息 */
            // let selectProxy = new SelectProxy(BuyerAjaxProxy.getUrl(), this.loadbuyer, this);
            // selectProxy.setExtraParam({cus_id:row.cus_id}).load();
            // /** 选项卡2获取订单商品信息 */
            // let goodsProxy = new SelectProxy(OrdergoodsAjaxProxy.getUrl(), this.loadgoods, this);
            // goodsProxy.setExtraParam({goods_id:row.goods_id,order_id:row.id}).load();
            // /** 选项卡3获取用户地址信息 */
            // let addressProxy = new SelectProxy(DeliveryAddressAjaxProxy.getUrl(), this.loaddelivery, this);
            // addressProxy.setExtraParam({address_id:row.address_id}).load();
            // /** 选项卡2显示订单商品信息 */
            // this.loadbuyer2(row.cus_id);
        },

        // getCategoryList(data){
        //     this.CategoryList=data.items;
        // },
       
        All:function(){
            this.orderlistInit();
        },
        typesearch:function($criteria){
            this.searchToolReset('searchForm');
            this.searchForm.type=$criteria;
            this.searchToolChange('searchForm');
        },
        refund(id)
        {
            let refundProxy = new SelectProxy(OrderlistAjaxProxy.getUrl(), this.loadtest, this);
            refundProxy.setExtraParam({refund_id:id}).load();

        },
        loadUsers(data) {
            this.users = data.items;
        },
        loadtest(data){
            this.mainData = data.items;
            // console.log(data.items);
        },
        loaddelivery(data){
            this.addresstableData = data.items;
        },
        loadbuyer(data) {
            this.usertableData1 = data.items;
            this.putbuyer(this.usertableData1);
        },
        putbuyer(data){
            var i=0;
            var id = this.buyer_id;
            console.log(data[0]);
            for(i=0;i<data.length;i++)
            {
                if(data[i].id==id)
                {
                    let addData ={
                        name:data[i].name,
                        sex:data[i].sex,
                        age:data[i].age,
                    };
                    this.usertableData.push(addData);
                }
            }
        },
        loadbuyer2(id){
            this.buyer_id = id;
        },
        loadcustomer(data){
            this.buyer = data.items;
        },
        loadgoods(data) {
            this.goods = data.items;
            this.goodstableData = this.goods;
        },
        /** 切换选项卡时查找对应信息 */
        // handleClick(tab, event) {
        //     this.tabindex = tab.index;
        // },
        
        
        delivesearch:function($criteria){
            this.searchToolReset('searchForm');
            this.searchForm.deliver=$criteria;
            this.searchToolChange('searchForm');
        },
        typeChange:function(v){
            this.typeName=this.conditions[v];
        },
        // showAdd:function(){
        //     this.$modal.show('add-orderBasic');
        // },
        startDateChange:function(v){
            if (v) {
                var sdate = v.split(' - ');
                this.searchForm.start = sdate[0] + " 00:00:00";
                this.searchForm.end = sdate[1] + " 23:59:59";
            } 
        },

       
        onSearchChange(param){
            
            if (param.value7.length != 2) {
                param.start = "";
                param.end   = "";
            }

            param.deal_id = this.user_id;
            this.mainparam = JSON.stringify(param);
        },
//        searchReset:function(){
//            this.$refs['searchForm'].resetFields();
//            this.typeName = '请选择排名方式';
//            this.toggleTableLoad();
//        },
        // getCategory(){
        //     let selectProxy = new SelectProxy(Tree.getUrl(), this.getCategoryList, this);
        //     selectProxy.load();
        // },

        // hyf 添加
        singlbutton(status, product_status, after_sale_status){
            this.searchForm.status = status,
            this.searchForm.product_status = product_status;
            this.searchForm.after_sale_status = after_sale_status;
        }

    },
    created(){
        let o = {};
        o['row-dblclick'] = this.showRow;
        this.bubble = o;

        this.onSearchChange(this.searchForm);
        this.$on('search-tool-change', this.onSearchChange);

       /*  let selectProxy = new SelectProxy(BuyerAjaxProxy.getUrl(), this.loadcustomer, this);
        selectProxy.load();
        this.$on('refresh-success', this.handleReload);
        let orderProxy = new UsersSelectProxy(null, this.loadUsers, this);
        this.orderProxy = orderProxy;
        this.orderProxy.load();
        this.getCategory(); //添加订单这时在用 */


    }
}