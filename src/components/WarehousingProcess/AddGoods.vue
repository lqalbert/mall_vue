<template>
    <div>
        <MyDialog title="添加商品" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-row>
                <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                    <!--<el-form-item prop="company_name">-->
                        <!--<el-input v-model="searchForm.company_name" size="small" placeholder="分类"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item prop="sku_sn">
                        <el-input v-model="searchForm.sku_sn" size="small" placeholder="sku编码"></el-input>
                    </el-form-item>
                    <el-form-item prop="goods_name">
                        <el-input v-model="searchForm.goods_name" size="small" placeholder="商品名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" icon="search" @click="search">搜索</el-button>
                        <el-button type="primary" size="small" @click="resetForm('searchForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-row>

        <el-row>
            <el-col>
                <el-table :data="goods" border  @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="sku_sn" label="sku编码" align="center"></el-table-column>
                    <!--<el-table-column prop="goods_category" label="分类" align="center"></el-table-column>-->
                    <el-table-column prop="goods_name" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="specifications" label="规格" align="center"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
            <br>
            <el-button type="primary" @click="addGoods" >添加</el-button>

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
    import GoodsSelectProxy from '../../packages/GoodsSelectProxy';

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
                searchForm:{
                    sku_sn:'',
                    goods_name:'',
                },
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
                allNum:'',
                goods:[],
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

                },

                orderData:[],
                orderAddressData:[],
                goodsIds:[],
                orderBasicData:[],
                fullAddressData:[],
                selectionGoods:[],
                model:'',
                deal_name:'',
                depositMoney:0,

            }
        },
        methods:{
            handleSelectionChange(val) {
                this.selectionGoods = val;
            },
            addGoods() {
                this.$emit('addGoods',this.selectionGoods);
                this.handleClose();
            },
            onOpen(){
                this.getGoods();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.getGoods();
            },
            search(){
                let GoodsSelect = new GoodsSelectProxy(this.searchForm, this.getGoodsSelect, this);
                GoodsSelect.load();
            },
            getGoodsSelect(res){
                this.goods=res.items;
                this.goods.forEach(value => {
                    value.goods_purchase_num='';
                    value.goods_purchase_price='';
                })
            },
            getGoods() {
                //获取商品信息
                let GoodsSelect = new GoodsSelectProxy({}, this.getGoodsSelect, this);
                GoodsSelect.load();
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

        },
        created(){

        }


    }
</script>
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
