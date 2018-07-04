<template>
    <div class="hello">
        <el-row>
            <el-form :inline="true" :model="addForm" ref="addForm" :rules="rules" label-position="right" class="demo-form-inline" size="small">
                <el-row>
                    <el-form-item prop="shipper" label="发货单位">
                        <el-input v-model="addForm.shipper" size="small" placeholder="发货单位" style="width:180px"></el-input>
                    </el-form-item>
                    <el-form-item prop="entrepot_id"  label="采购单位">
                        <el-select v-model.number="addForm.entrepot_id" placeholder="请选择采购单位" size="small" style="width:180px" @change="entrepotChange">
                            <el-option v-for="v in distributors" :label="v.name"
                                       :value="v.id" :key="v.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="到货时间" prop="contact_time">
                        <el-date-picker
                                v-model="addForm.contact_time"
                                type="date"
                                size="small"
                                @change="timeChange"
                                placeholder="选择日期时间" style="width:180px">
                        </el-date-picker>
                    </el-form-item>

                </el-row>

                <el-row>
                    <el-form-item prop="contact_name" label="采购人名">
                        <el-input v-model="addForm.contact_name" size="small" placeholder="采购人" style="width:180px"></el-input>
                    </el-form-item>
                    <el-form-item prop="contact_phone" label="联系电话">
                        <el-input v-model="addForm.contact_phone" size="small" placeholder="采购人电话" style="width:180px"></el-input>
                    </el-form-item>
                    <el-form-item prop="remark" label="采购单备注">
                        <el-input   v-model="addForm.remark" size="small"  placeholder="备注" style="width:180px"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item>
                            <el-button type="primary" size="small" @click="showAddGoods">添加商品</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col>
                        <el-table :data="goodsList" border>

                            <el-table-column label="sku编码" align="center"  prop="sku_sn" >
                            </el-table-column>

                            <el-table-column prop="goods_name" label="商品名称" align="center"></el-table-column>

                            <el-table-column prop="specifications" label="规格" align="center"></el-table-column>

                            <el-table-column prop="goods_purchase_num" label="采购数量" align="center">
                                <template slot-scope="scope">
                                        <el-input v-model="scope.row.goods_purchase_num" ></el-input>
                                </template>
                            </el-table-column>

                            <el-table-column prop="goods_purchase_price" label="采购价" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.goods_purchase_price"></el-input>
                                </template>
                            </el-table-column>

                            <el-table-column  label="操作" align="center" width="200">
                                <template slot-scope="scope">
                                    <el-button type="danger" size="small" @click="rowDelete(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>

                        </el-table>
                    </el-col>
                </el-row>


            </el-form>
        </el-row>
        <br>
        <el-row>

            <el-col :span="12">
                <el-button type="primary" size="small" @click="submit('addForm')">提交审核</el-button>
            </el-col>
        </el-row>
        <!-- 写弹窗组件 -->
        <Add name='add-express-company'
             :ajax-proxy="ajaxProxy"
             :distributors="distributors"
             @submit-success="handleReload">
        </Add>
        <AddGoods name='add-goods'
             :ajax-proxy="ajaxProxy"
             :distributors="distributors"
             @addGoods="addGoods"
             @submit-success="handleReload">
        </AddGoods>
        <CheckOrder name='add-check-order'
             :ajax-proxy="ajaxProxy"
             @submit-success="handleReload">
        </CheckOrder>

        <DeliverGoods name='add-deliver-goods'
             :ajax-proxy="ajaxProxy"
             @submit-success="handleReload">
        </DeliverGoods>

        <Edit name='edit-express-company'
              :ajax-proxy="ajaxProxy"
              @submit-success="handleReload">
        </Edit>
    </div>
</template>
<script>
    import PageMix from '../../mix/Page';
    import SearchTool from '../../mix/SearchTool';
    import DataTable from '../../mix/DataTable';
    import config from '../../mix/Delete';
    import WarehousingProcessAjaxProxy from '../../ajaxProxy/WarehousingProcess';
    import DistributionCenterProxy from '../../packages/DistributionCenterSelectProxy';

    import Add from './Add';
    import AddGoods from './AddGoods';
    import Edit from './Edit';
    import CheckOrder from './CheckOrder';
    import DeliverGoods from './DeliverGoods';
    export default {
        name: 'WarehousingProcess',
        pageTitle:"采购开单",
        mixins:[PageMix,SearchTool,DataTable,config,WarehousingProcessAjaxProxy],
        components:{
            Add,
            Edit,
            CheckOrder,
            AddGoods,
            DeliverGoods
        },
        data(){
            return {
                mainparam:"",
                mainurl:WarehousingProcessAjaxProxy.getUrl(),
                ajaxProxy:WarehousingProcessAjaxProxy,
                addForm:{
                    shipper:'',
                    entrepot_id:'',
                    entrepot_name:'',
                    contact_time:'',
                    contact_name:'',
                    contact_phone:'',
                    remark:'',
                    sku_type:0,
                    goods_total:0,
                    goods_money_total:0,
                    purchase_goods:[],
                },
                rules:{
                    shipper:[
                        { required: true, message: '请填写发货单位', trigger: 'blur' },
                        { min:1,   max: 20, message: '长度不能超过20个字符', trigger: 'blur'  }
                    ],
                    entrepot_id:[
                        { required: true, message: '请选择采购单位', trigger: 'blur',type:'number' },
                    ],
                    contact_time:[
                        { required: true, message: '请选择到货时间', trigger: 'blur' },
                    ],
                    contact_name:[
                        { required: true, message: '请填写采购人姓名', trigger: 'blur' },
                        { min:1,   max: 20, message: '长度不能超过20个字符', trigger: 'blur'  }
                    ],
                    contact_phone:[
                        { required: true, message: '请填写采购人电话',pattern: /^1[34578]\d{9}$/, trigger: 'blur' },
                    ],
                    remark:[
                        { min:1,   max: 100, message: '长度不能超过100个字符', trigger: 'blur'}
                    ],

                },
                distributors:[],
                goodsList:[],
                reFundCheckShow:false,
                row_model:'',
                is_submit:true,
            }
        },
        methods:{
            onSearchChange(param){
                this.mainparam = JSON.stringify(param);
            },
            entrepotChange(v){
                let i =''
                for (i in this.distributors){
                    if(this.distributors[i]['id'] == v){
                        this.addForm.entrepot_name =this.distributors[i]['name']
                    }
                }
            },
            timeChange(v) {
                this.addForm.contact_time=v;
            },
            rowDelete(row) {
                let index = this.goodsList.indexOf(row);
                this.goodsList.splice(index, 1);
            },
            addGoods(v) {
                this.goodsList=this.goodsList.concat(v);
            },
            submit(name) {
                this.is_submit = true;
                if(this.goodsList.length == 0){
                    this.$message.error('请选择采购商品');
                    return;
                }
                for(let i=0;i<this.goodsList.length;i++) {
                    if (this.goodsList[i].goods_purchase_num == undefined || this.goodsList[i].goods_purchase_price == undefined || this.goodsList[i].goods_purchase_num == 0 || this.goodsList[i].goods_purchase_price == 0) {
                        this.is_submit = false;
                        this.$message.error('请填写采购数量和价格');
                        return;
                    }
                        this.addForm.goods_total += parseInt(this.goodsList[i].goods_purchase_num);
                        this.addForm.goods_money_total += parseInt(this.goodsList[i].goods_purchase_num) * parseInt(this.goodsList[i].goods_purchase_price);
                }
                if(this.is_submit){
                    this.addForm.purchase_goods=this.goodsList;
                    this.addForm.sku_type=this.goodsList.length;
                    this.formSubmit(name);
                }


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
            realSubmit(model, name){
                let ajaxPromise =  this.getAjaxPromise(model);
                let vmthis = this;
                ajaxPromise.then(function(response){
                    vmthis.$message.success('操作成功');
                    vmthis.$refs[name].resetFields();
                    vmthis.goodsList=[];
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

            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            },
            showAdd(){
                this.$modal.show('add-express-company');
            },
            showAddGoods(){
                this.$modal.show('add-goods');
            },

            showEdit(row){
                this.$modal.show('edit-express-company',{model:row});
            },
            getAjaxProxy(){
                return  this.ajaxProxy;
            },
            //订单审核
            checkOrder(){
                if (this.openDialogCheck()) {
                    this.$modal.show('add-check-order', {row: this.row_model});
                }
            },
            //确认发货
            showDeliverGoods(){
                if (this.openDialogCheck()) {
                    this.$modal.show('add-deliver-goods', {row: this.row_model});
                }
            },
            openDialogCheck(){
                if (!this.hasCurrentRow()) {
                    this.$alert('请选择一行', '警告', {
                        confirmButtonText: '确定',
                    })
                    return false;
                } else {
                    return true;
                }
            },
            hasCurrentRow(){
                if (this.row_model) {
                    return true;
                } else {
                    return false;
                }
            },
            rowCellClick(row){
                this.row_model=row;
                if(!this.row_model){
                    this.reFundCheckShow = true;
                }else{
                    this.reFundCheckShow = false;
                }
            },
            getDistributionCenter(data){
                this.distributors = data.items;
            },
        },
        created(){
            this.$on('search-tool-change', this.onSearchChange);

            //获取配送中心数据
            let DistributionCenterSelect = new DistributionCenterProxy({}, this.getDistributionCenter, this);
            DistributionCenterSelect.load();
        },
        mounted(){

        },

    }
</script>
<style scoped>

</style>

