<template>
    <div>
        <MyDialog title="添加库存盘点" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form class="add-dialog" :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-table border :data="checkData" style="width:100%">
                    <el-table-column label="序号" type="index" width="65"></el-table-column>
                    <el-table-column prop="goods_name" label="商品名称" width="140" header-align="center">
                    </el-table-column>
                    <el-table-column prop="sku_sn" label="商品编号" width="140" header-align="center">
                    </el-table-column>
                    <el-table-column prop="entrepot_name" label="配送中心" width="140" header-align="center">
                    </el-table-column>
                    <el-table-column prop="entrepot_count" label="库存数量" width="120" header-align="center">
                    </el-table-column>
                    <el-table-column prop="check_count" label="盘点数量" width="120" header-align="center">
                    </el-table-column>
                    <el-table-column prop="goods_price" label="商品单价" width="120" header-align="center">
                    </el-table-column>
                    <el-table-column label="盘盈" align="center">
                        <el-table-column prop="profit_count" label="盘盈数量" width="120" header-align="center">
                        </el-table-column>
                        <el-table-column prop="profit_money" label="盘盈金额" width="120" header-align="center">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="盘亏" align="center">
                        <el-table-column prop="loss_count" label="盘亏数量" width="120" header-align="center">
                        </el-table-column>
                        <el-table-column prop="loss_money" label="盘亏金额" width="120" header-align="center">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column prop="check_name" label="盘点人" width="140" header-align="center">
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" header-align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" align="center">
                        <template slot-scope="scope">
                            <el-button size="small" type="danger" @click="deleteAddress(scope.row)">删 除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="配送中心" prop="entrepot_id">
                            <el-select
                                    clearable
                                    v-model.number="addForm.entrepot_id"
                                    size="small" class="name-input"
                                    placeholder="配送中心" @change="entrepotChange">
                                <el-option v-for="v in distributors" :label="v.name"
                                            :value="v.id" :key="v.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品分类" prop="cate">
                            <el-cascader
                                v-model="addForm.cate" size="small"
                                :options="CategoryList" class="name-input"
                                @change="categoryChange">
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="仓库商品" prop="inventory_id">
                            <el-select v-model.number="addForm.inventory_id" size="small" 
                                placeholder="仓库商品" @change="inventoryGoodsChange" class="name-input">
                                <el-option v-for="v in inventoryGoods" :label="v.goods_name"
                                           :value="v.id" :key="v.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="sku_sn" label="商品编号:">
                            {{addForm.sku_sn}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="entrepot_count" label="库存数量:">
                            {{addForm.entrepot_count}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="goods_price" label="商品单价:">
                            <el-input class="name-input" size="small" 
                                v-model="addForm.goods_price" @change="handlePrice" 
                                placeholder="必须输入单价">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="check_count" label="盘点数量:">
                            <el-input class="name-input" size="small" 
                                v-model.number="addForm.check_count" @change="handleCheckCount" 
                                placeholder="输入盘点数量">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="profit_count" label="盘盈数量:">
                            {{addForm.profit_count}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="profit_money" label="盘盈金额:">
                            {{addForm.profit_money}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="loss_count" label="盘亏数量:">
                            {{addForm.loss_count}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="loss_money" label="盘亏金额:">
                            {{addForm.loss_money}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item prop="remark" label="备注:">
                            <el-input type="textarea" size="small" 
                                v-model="addForm.remark" placeholder="备注">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div style="float: left;margin:10px 0 0 50%;">
                    <el-button @click="addCheckData" type="info" size="small">添 加</el-button>
                </div>
            </el-form>

            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        :observer="dialogThis"
                        @click="handleSubmit">
                    提交盘点
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>
<script>
// import DialogForm from '../../mix/DialogForm';
import FormMix from '../../mix/Form';
import DialogMix from '../../mix/Dialog';
import APP_CONST from '../../config';
import SelectProxy from  '@/packages/SelectProxy';
import GoodsSelectProxy from '../../packages/GoodsSelectProxy';
import InventoryGoodsSelectProxy from '../../packages/InventoryGoodsSelectProxy';
import { mapGetters } from 'vuex';

export default {
    name: 'add-dialog',
    mixins:[DialogMix,FormMix],
    components: {
        
    },
    props:{
        ajaxProxy:{
            // required:true,
            type: Object,
            default: null
        },
        types:{
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
            labelWidth:'100px',
            addForm:{
                cate:[],
                cate_type_id:'',
                cate_kind_id:'',
                cate_type:'',
                cate_kind:'',
                entrepot_id:'',
                entrepot_name:'',
                inventory_id:'',
                sku_sn:'',
                entrepot_count:'',
                goods_name:'',
                check_count:'',
                goods_price:'',
                profit_count:'',
                profit_money:'',
                loss_count:'',
                loss_money:'',
                remark:'',
                check_name:'',
                check_user_id:'',
                check_data:[],
            },
            rules:{
                entrepot_id:[
                    {required: true,type:'number',message: '  ', trigger:'change'}
                ],
                cate:[
                    {required: true,type:'array',message: '请选择', trigger:'change'}
                ],
                inventory_id:[
                    {required: true,type:'number',message: '请选择', trigger:'change'}
                ],
                goods_price:[
                    {required: true,pattern:/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,message: '价格格式为00.00', trigger:'blur'}
                ],
                check_count:[
                    {required: true,type:'number',message: '填写数量纯数字', trigger:'blur'}
                ]
            },
            model:null,
            distributors:[],
            CategoryList:null,
            skus:[],
            inventoryGoods:[],
            checkData:[],
            checkDataForm:{
                check_data:[],
            }

        }
    },
    computed:{
        ...mapGetters([
            'user_id',
            'getUser',
        ])
    },
    methods:{
        onOpen(param){
            console.log(param.params);
            this.distributors = param.params.model;
            this.addForm.check_name = this.getUser.realname;
            this.addForm.check_user_id = this.getUser.id;
        },
        getAjaxPromise(model){
            console.log(this.checkDataForm);
            return this.ajaxProxy.create(model);
        },
        // formSubmit(){
        //     console.log(this.addForm);
        // },
        handleSubmit(){
            this.addForm.check_data = this.checkData;
            this.formSubmit('addForm');
        },
        getCategoryList(data){
            this.CategoryList=data.items;
        },
        getGoods(data){
            console.log(data);
            let vmThis = this;
            this.skus = [];
            for (let i = 0; i < data.items.length; i++) {
                this.skus.push(data.items[i].sku_sn);
            }
            this.handleInventoryGoods(); 
        },
        getInventoryGoods(data){
            console.log(data);
            this.inventoryGoods = data.items;
        },
        handleInventoryGoods(){
            let vmThis = this;
            if(this.addForm.cate.length>0 && this.addForm.entrepot_id != ""){
                this.inventoryGoodsProxy.setParam({
                    sku_sn:vmThis.skus,
                    entrepot_id:vmThis.addForm.entrepot_id,
                    cate_type_id:vmThis.addForm.cate[0],
                    cate_kind_id:vmThis.addForm.cate[1],
                }).load();
            }
        },
        entrepotChange(v){
            // console.log(this.distributors);
            for (let i = 0; i < this.distributors.length; i++) {
                if (this.distributors[i].id == v) {
                    this.addForm.entrepot_name = this.distributors[i].name;
                }
            }
            this.handleInventoryGoods();
        },
        categoryChange(cate_id){
            this.setTypeKind(cate_id);
            let vmThis = this;
            this.goodsProxy.setParam({
                cate_id:cate_id,
                with:['skus'],
                fields:['id','goods_name',
                'goods_price','sku_sn','unit_type']
            }).load();
        },
        setTypeKind(cate_id){
            for (let i = 0; i < this.CategoryList.length; i++) {
                if(this.CategoryList[i].id == cate_id[0]){
                    this.addForm.cate_type = this.CategoryList[i].label;
                    for (let k = 0; k < this.CategoryList[i].children.length; k++) {
                        if(this.CategoryList[i].children[k].id == cate_id[1]){
                            this.addForm.cate_kind = this.CategoryList[i].children[k].label;
                        }
                    }
                }
            }
        },
        inventoryGoodsChange(inventory_id){
            for (let i = 0; i < this.inventoryGoods.length; i++) {
                if(this.inventoryGoods[i].id ==inventory_id){
                    this.addForm.sku_sn = this.inventoryGoods[i].sku_sn;
                    this.addForm.entrepot_count = this.inventoryGoods[i].entrepot_count;
                    this.addForm.goods_name = this.inventoryGoods[i].goods_name;
                }
            }
        },
        handlePrice(v){
            if (this.addForm.check_count != '') {
                this.handleCheckCount(this.addForm.check_count);
            }
        },
        handleCheckCount(v){
            let check_count = v;
            let entrepot_count = this.addForm.entrepot_count;
            let goods_price = this.addForm.goods_price;
            let $num = check_count-entrepot_count;
            if(goods_price == '' || goods_price == undefined){
                this.$message.error('请输入价格才能计算盘盈/盘亏');
                return;
            }
            if($num>0){
                this.addForm.profit_count = $num;
                this.addForm.profit_money = $num*goods_price;
                this.addForm.loss_count = 0;
                this.addForm.loss_money = 0;
            }else if($num<0){
                this.addForm.profit_count = 0;
                this.addForm.profit_money = 0;
                this.addForm.loss_count = Math.abs($num);
                this.addForm.loss_money = Math.abs($num*goods_price);
            }else{
                this.addForm.profit_count = 0;
                this.addForm.profit_money = 0;
                this.addForm.loss_count = 0;
                this.addForm.loss_money = 0;
            }
        },
        addCheckData(){
            this.$refs.addForm.validate((valid)=>{
                if (valid) {
                    let row = {};
                    this.addForm.cate_type_id = this.addForm.cate[0];
                    this.addForm.cate_kind_id = this.addForm.cate[1];
                    if(this.addForm.sku_sn){
                        Object.assign(row,this.addForm)
                        delete row.cate;
                        delete row.check_data;
                        this.checkData.push(row);
                        this.$refs.addForm.resetFields();
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        deleteAddress(row){
            let index = this.checkData.indexOf(row);
            let vmThis = this;
            if( index > -1){
                this.$confirm('确定删除?', '警告',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.checkData.splice(index,1);
                    vmThis.$message.success("操作成功");
                });
            }
        },
        submitSuccess(name){
            this.checkData = [];
        }


    },
    created(){
        // 获取分类
        this.goodsProxy = new GoodsSelectProxy({}, this.getGoods, this);
        // 获取商品信息
        let selectProxy = new SelectProxy('/tree', this.getCategoryList, this);
        selectProxy.load();
        //获取仓库商品
        this.inventoryGoodsProxy = new InventoryGoodsSelectProxy({}, this.getInventoryGoods, this);

        this.$on('submit-success', this.submitSuccess);
    }

}
</script>
<style scoped>
    .name-input{
        max-width: 170px;
    }
    .add-dialog .el-form-item{
        margin-bottom:1px;
    }
</style>
