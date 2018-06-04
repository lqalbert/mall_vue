<template>
    <div>
        <MyDialog title="审核" :name="name" :width="width" :height="height"  @before-open="onBeforeOpen">
            <el-form :model="checkForm" ref="checkForm" :label-width="labelWidth"  :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="快递公司" prop="express_id">
                            <el-select v-model="checkForm.express_id" clearable>
                                <el-option v-for="item in company" :label="item.company_name" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="快递号" prop="express_sn">
                            <el-col :span="14"><el-input v-model="checkForm.express_sn"></el-input></el-col>
                            <el-col :span="2">&nbsp;</el-col>
                            <el-col :span="4">
                                <state-button @click="getWaybill" ref="getWayBillState">
                                    获取
                                    <template slot="ing">获取中</template>
                                </state-button>
                            </el-col>
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
    import StateButton from '@/components/common/StateButton';
    import OrderGoodsAjaxProxy from "@/packages/OrderGoodsAjaxProxy";
    

    export default {
        name: 'Check',
        mixins:[DialogForm],
        components:{
            StateButton
        },
        data () {
            return {
                dialogThis:null,
                labelPosition:"right",
                labelWidth:'100px',
                checkForm:{
                    id:"",
                    express_id:"",
                    express_sn:"暂时没有",
                    corrugated_id:"",
                    corrugated_case:"",
                    corrugated_weight:"",
                    reckon_weigth:""
                },
                
                //需要计算　估计重量

                // company:[],
                // cartons:[],
                total_vol:0,
                order_id:0,
            }
        },
        computed:{
            cartons(){
                return this.$store.getters.getCartonsByEntrepot(this.$store.getters.userEntrepotId);
            },
            company(){
                return this.$store.getters.getExpressByEntrepot(this.$store.getters.userEntrepotId);
            }
        },
        methods:{
            onBeforeOpen(param){
                this.checkForm.id = param.params.row.id;
                this.order_id = param.params.row.order_id;
                this.goodsProxy.setParam({
                    order_id: this.order_id,
                    fields:['width','height','len']
                }).load();
                if (param.params.row.express_id != 0) {
                    this.checkForm.express_id = param.params.row.express_id;
                }
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
            getWaybill(){
                //需要设置一下　不能返复点击
                if (this.checkForm.express_id.length==0) {
                    this.$message.error('先选择快递公司');
                    this.$refs.getWayBillState.$emit('reset');
                    return;
                }
                let requestParam = {
                    assign_id: this.checkForm.id,
                    order_id: this.order_id,
                    express_id : this.checkForm.express_id
                }


                

            }
            
        },
        created(){
            this.dialogThis = this;
            //这个暂时还不能改成用　vuex　统一管理，因为由于更新的问题比如更换了某个商品．
            //vuex 暂时用来处理不会频繁更新的数据
            //后期可以考虑加入　
            //功能实现的基本设想　用HTTP缓存的 Last-Modified 来设置更新时间
            //服务器上用 updated_at created_at 来判断是不是　大于 Last-Modified 如果是就　返回新的数据并设置新的Last-Modified
            //如查不是就　返回 HTTP 304　
            this.goodsProxy =  new OrderGoodsAjaxProxy(null, this.loadGoods, this);

            this.$store.dispatch('initCartons', this.$store.getters.userEntrepotId);
            this.$store.dispatch('initExpress', this.$store.getters.userEntrepotId);
            
        },

        beforeDestroy(){
            this.goodsProxy = null;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
      