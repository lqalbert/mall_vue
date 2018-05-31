<template>
    <div>
        <MyDialog title="审核" :name="name" :width="width" :height="height"  @before-open="onBeforeOpen">
            <el-form :model="checkForm" ref="checkForm" :label-width="labelWidth"  :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="快递公司" prop="express_id">
                            <el-select v-model="checkForm.express_id" clearable @change="expressChange">
                                <el-option v-for="item in company" :label="item.company_name" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="快递号" prop="express_sn">
                            <el-col :span="14"><el-input v-model="checkForm.express_sn"></el-input></el-col>
                            <el-col :span="2">&nbsp;</el-col>
                            <el-col :span="4"><el-button>获取</el-button></el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="纸箱型号"　prop="corrugated_id">
                            <el-col :span="14">
                                <el-select v-model="checkForm.corrugated_id">
                                    <el-option v-for="item in cartons" :label="item.carton_name" :value="item.id" :key="item.id"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="2">&nbsp;</el-col>
                            <el-col :span="4"><el-button @click="siCarton">匹配</el-button></el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                    @click="formSubmit('checkForm')"
                    :observer="dialogThis">
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>

<script>
    import DialogForm from '@/mix/DialogForm';

    import ExpressCompanySelectProxy from '@/packages/ExpressCompanySelectProxy';
    import CartonSelectProxy from '@/packages/CartonSelectProxy';
    import OrderGoodsAjaxProxy from "@/packages/OrderGoodsAjaxProxy";

    export default {
        name: 'Check',
        mixins:[DialogForm],
        data () {
            return {
                dialogThis:null,
                labelPosition:"right",
                labelWidth:'100px',
                checkForm:{
                    id:"",
                    express_id:"",
                    express_name:"",
                    express_sn:"暂时没有",
                    corrugated_id:"",
                    corrugated_case:"",
                    corrugated_weight:"",
                    reckon_weigth:""
                },
                //需要计算　估计重量

                company:[],
                cartons:[],

                total_vol:0
            }
        },
        methods:{
            loadCompany(data){
                this.company = data.items;
            },
            loadCarton(data){
                if (process.env.NODE_ENV == 'production') {
                    this.cartons = data.items;
                } else {
                    this.cartons = [
                        {carton_high:100,carton_wide:100, carton_long:50, id:1, carton_name:'aaa', carton_weight:100},
                        {carton_high:200,carton_wide:200, carton_long:100, id:2, carton_name:'aaab', carton_weight:130},
                        {carton_high:300,carton_wide:300, carton_long:150, id:3, carton_name:'aaabc', carton_weight:140},
                        {carton_high:400,carton_wide:400, carton_long:200, id:4, carton_name:'aaabdc', carton_weight:150},
                    ];
                }
                this.cartons.forEach(element => {
                    element.vol = element.carton_long * element.carton_wide * element.carton_high;
                });

                function volsort(a,b){
                    if(a.vol > b.vol){
                        return 1;
                    }
                    if(a.vol < b.vol){
                        return -1;
                    }
                    return 0;
                }
                this.cartons.sort(volsort);
            },
            onBeforeOpen(param){
                console.log(param.params);
                this.checkForm.id = param.params.row.id;
                this.expressCompany.setParam({
                    entrepot_id:param.params.row.entrepot_id,
                    fields:['id','name']
                }).load();

                this.carton.setParam({
                    entrepot_id:param.params.row.entrepot_id
                }).load();

                this.goodsProxy.setParam({
                    order_id:param.params.row.id,
                    fields:['width','height','len']
                }).load();
            },
            loadGoods(data){
                if (process.env.NODE_ENV == 'production') {
                    this.goods = data.items;
                } else {
                    this.goods = [
                        {width:50, height:90, len: 10, weight:2000, bubble_bag:10},
                        {width:20, height:40, len: 10, weight:2000, bubble_bag:10},
                        {width:60, height:30, len: 10, weight:2000, bubble_bag:10},
                        {width:20, height:30, len: 10, weight:2000, bubble_bag:10}
                    ];
                }
                this.total_vol = 0;
                this.goods_weight=0;
                this.goods.forEach(element => {
                    let vol = element.width * element.height * element.len;
                    this.total_vol+=vol;
                    this.goods_weight=  this.goods_weight +element.weight + element.bubble_bag;
                });
            },
            siCarton(){
                let index = this.cartons.findIndex((element)=>{
                    return (element.vol*7) >= (this.total_vol*10);
                });
                if (index !== -1) {
                    this.checkForm.corrugated_id = this.cartons[index].id;
                    this.checkForm.corrugated_case = this.cartons[index].carton_name;
                    this.checkForm.corrugated_weight = this.cartons[index].carton_weight;
                    
                    this.reckon_weigth = this.goods_weight + this.checkForm.corrugated_weight;
                } else {
                    this.$message.error('无法匹配纸箱，请手动选择');
                }
            },
            getAjaxPromise(model){
                return this.ajaxProxy.check(model.id, model);
            },
            expressChange(v){
                let index = this.company.findIndex((element)=>{
                    return element.id == v
                });
                this.checkForm.express_name = this.company[index].company_name;
            }
        },
        created(){
            this.dialogThis = this;
            this.expressCompany =  new ExpressCompanySelectProxy(null, this.loadCompany, this);
            this.carton = new CartonSelectProxy(null, this.loadCarton, this);
            this.goodsProxy =  new OrderGoodsAjaxProxy(null, this.loadGoods, this);
            
        },

        beforeDestroy(){
            this.expressCompany = null;
            this.carton = null;
            this.goodsProxy = null;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
      