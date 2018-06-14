<template>
        <MyDialog title="高级查询" :name="name" :width="width" :height="height" >
            <el-form :model="queryForm"  ref="queryForm"  :label-width="labelWidth"   :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="assign_sn" label="发货单编号">
                            <el-input size="small" v-model="queryForm.assign_sn"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="order_sn" label="订单编号">
                            <el-input size="small" v-model="queryForm.order_sn"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="pstatus" label="发货单状态">
                            <el-select size="small" v-model="queryForm.pstatus" clearable>
                                <el-option v-for="(item,index) in assign_status" :label="item" :value="index" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="corrugated_id" label="箱类型">
                            <el-select size="small" v-model="queryForm.corrugated_id">
                                　 <el-option v-for="item in cartons" :label="item.carton_name" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item> 
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="name" label="收货人">
                            <el-input size="small" v-model="queryForm.name" class="name-input" placeholder="请输入收货人名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="phone" label="收货手机">
                            <el-input size="small"  v-model="queryForm.phone" class="name-input" placeholder="请输入收货人手机"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="area_province_id" label="收货省份">
                            <el-select size="small" v-model="queryForm.area_province_id" @change="proviceChange" clearable>
                                    　<el-option v-for="item in provices" :label="item.name" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="area_city_id" label="收货城市">
                            <el-select size="small" v-model="queryForm.area_city_id" clearable>
                                　<el-option v-for="item in city" :label="item.name" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item> 
                    </el-col>
                </el-row>
                <el-row>
                    
                    <el-col :span="12">
                        <el-form-item prop="price_range" label="订单金额">
                            <el-select size="small" v-model="queryForm.price_range" clearable>
                                　<el-option label="1w以上" value="0"></el-option>
                                　<el-option label="2w以上" value="1"></el-option>
                                　<el-option label="3w以上" value="2"></el-option>
                                　<el-option label="4w以上" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                            <el-form-item prop="express_remark" label="订单备注">
                                <el-select size="small" v-model="queryForm.express_remark" clearable>
                                    　<el-option label="无" value="0"></el-option>
                                    　<el-option label="有" value="1"></el-option>
                                </el-select>
                            </el-form-item> 
                        </el-col>
                </el-row>
                <el-row>
                    <!-- <el-col :span="12">
                        <el-form-item prop="self_express" label="自提">
                            <el-select size="small" v-model="queryForm.self_express" clearable>
                                　<el-option label="否"　value="0"></el-option>
                                　<el-option label="是"　value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> -->
                   
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="cate_ids" label="商品类型">
                            <!-- @change="categoryChange" -->
                                <el-cascader
                                    size="small"
                                    v-model="queryForm.cate_ids"
                                    :options="cates"
                                    >
                                </el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="auto_field" label="查询日期">
                            <el-select v-model="queryForm.auto_field" size="small" clearable>
                                　<el-option label="提交时间" value="created_at"></el-option>
                                <!-- 　<el-option label="销售时间" value="sale_at"></el-option> -->
                                　<el-option label="审单时间" value="pass_check"></el-option>
                                　<el-option label="打印清单时间" value="assign_print_at"></el-option>
                                　<el-option label="打印运单时间" value="express_print_at"></el-option>
                                　<el-option label="发货时间" value="out_entrepot_at"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>  
                <el-row>
                        <el-col :span="12">
                            <el-form-item prop="range" label="时间范围">
                                <el-date-picker
                                    v-model="range"
                                    size="small"
                                    type="datetimerange"
                                    @change="rangeChange">
                                  </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>      
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button @click="handleReset">重 置</el-button>
                <el-button @click="handleSubmit" type="info">查 询</el-button>
            </div>
        </MyDialog>
    </template>
    
<script>
    import DialogForm from '@/mix/DialogForm';
    // import DepartmentSelectProxy from '@/packages/DepartSelectProxy';
    // import GroupSelectProxy from '@/packages/GroupSelectProxy';
    // import EmployeeSelectProxy from '@/packages/EmployeeSelectProxy';
    import AreaSelect from '@/packages/AreaSelectProxy';
    import CartonSelectProxy from '@/packages/CartonSelectProxy';
    import { mapGetters } from 'vuex';

    export default {
        name: 'advance',
        mixins:[DialogForm],
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'100px',
                department:[],
                groups:[],
                users:[],
                range:"",
                
                queryForm:{
                    name:"",
                    assign_sn:"",
                    order_sn:"",
                    pstatus:"",
                    area_province_id:"",
                    area_city_id:"",
                    phone:"",
                    corrugated_id:"",
                    price_range:"",
                    self_express:"",
                    auto_field:"",
                    cate_ids:[],
                    range:"",
                    express_remark:""
                },
                
                //需要从服务器上获取
                assign_status:[
                    '未审核',
                    '已审核',
                    '审核未通过',
                    '已拦截',
                    '已发货',
                    '已打印',
                    '已验货'
                ],
                // provices:[],
                // city:[],
                // cartons:[]
            }
        },
        computed:{
            //这个好6
            city(){
                return this.$store.getters.city(this.queryForm.area_province_id);
            },
            cartons(){
                return this.$store.getters.getCartonsByEntrepot(this.$store.getters.userEntrepotId);
            },
            ...mapGetters({
                'cates':'getCates',
                'provices':'province',
                // 'cartons':'cartons'
            })
        },
        methods:{
            handleReset(){
                // this.$refs.queryForm.resetFields();
                this.initObject(this._queryForm, this.queryForm);
                this.$parent.$emit('search-tool-change', this.queryForm);
            },
            handleSubmit(){
                this.$parent.$emit('search-tool-change', this.queryForm);
                this.handleClose();
            },
            rangeChange(v){
                
                if (v) {
                    this.queryForm.range  = v.split(" - ");
                } else {
                    this.queryForm.range = "";
                }
            }, 
            proviceChange(v){
                if (v != "" ) {
                    this.$store.dispatch("setSubArea", {c:"addCities",pid:v});
                } else {
                    this.queryForm.area_city_id = "";
                    // this.city = [];
                }
            },
            
        },
        created(){
            
            this._queryForm = {};
            this.initObject(this.queryForm, this._queryForm);
                        
            // this.carton = new CartonSelectProxy(null, this.loadCarton, this);
            // this.carton.load();
            this.$store.dispatch('initCartons', this.$store.getters.userEntrepotId);
        },
        
        beforeDestroy(){
            // this.carton = null;
        }
    }
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
        .name-input{
            max-width: 217px;
        }
    </style>
    
