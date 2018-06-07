<template>
    <div >
        <el-row>
            <el-col :span="10">
                <div class="grid-content bg-purple">
                        <el-form :model="checkForm" ref="checkForm" :labelPosition="labelPosition" :labelWidth="labelWidth">
                            <el-row>
                                <!-- 自动跳到下一格 -->
                                <el-col :span="14">
                                    <el-form-item label="快递单号" prop="express_sn" >
                                        <el-input v-model="checkForm.express_sn" placeholder="请填写快递单号" @change="expressSnChange"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="14">
                                    <el-form-item label="商品重量(g)" prop="real_weigth" >
                                        <!-- 计算快递费 
                                            快递费用 = 首价 +（重量-首重)/续重*续价
                                            如果小于等于首重　则费用就是首价
                                        -->
                                        <el-input v-model="checkForm.real_weigth" placeholder="请填写商品重量" ref="real_weigth" ></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="10">
                                    <el-form-item label="完成后自动提交"  >
                                        <el-checkbox label="完成自动提交" v-model="autoSubmit"></el-checkbox>
                                    </el-form-item>
                                </el-col>
                                <!-- <el-col :span="8">
                                    <el-form-item label="后置打印" prop="carton_long" >
                                        <el-switch
                                                v-model="checkForm.carton_long"
                                                on-text=""
                                                off-text="">
                                        </el-switch>
                                    </el-form-item>
                                </el-col> -->
                            </el-row>
                            <el-row>
                                <el-col :span="14">
                                    <el-form-item label="称重误差(g)" prop="range">
                                        <el-slider v-model="checkForm.range"　:max="2000"></el-slider>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="14" :offset="6">
                                    <!-- 如果超过这个称重误差会弹出一个框 请核实重量是否确认发货 -->
                                    <!-- <el-button type="primary">确定发货</el-button> -->
                                    <submit-button
                                        :observer="dialogThis"
                                        @click="beforeSubmit" >
                                        提 交
                                    </submit-button>
                                </el-col>
                            </el-row>
                        </el-form>
                </div>
            </el-col>
            <el-col :span="14">
                <div class="grid-content bg-purple-light">
                    <el-row>
                        <el-col :span="12">
                            <h1 v-loading="load">快递单号:{{ checkForm.express_sn }}</h1>
                        </el-col>
                    </el-row>
                    <hr>
                    <div>
                        <el-row>
                            <el-col :span="15" >
                                <h1>收件人信息</h1>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7" :offset="1">
                                姓名:{{ address.name }}
                            </el-col>
                            <el-col :span="7" :offset="1">
                                手机:{{ address.phone }}
                            </el-col>
                            <el-col :span="7" :offset="1">
                                发货单打印状态: {{ model.assign_print_status == 0 ? "未打印" : "已打印" }}
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7" :offset="1">
                                省份:{{　address.area_province_name }}
                            </el-col>
                            <el-col :span="7" :offset="1">
                                城市: {{ address.area_city_name }}
                            </el-col>
                            <el-col :span="7" :offset="1">
                                区县: {{ address.area_district_name }}
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12" :offset="1">
                                地址: {{ address.address }}
                            </el-col>
                        </el-row>
                    </div>
                    <hr>
                    <div>
                        
                        <el-row>
                            <el-col :span="16">名称</el-col>
                            <el-col :span="4">数量</el-col>
                        </el-row>
                        
                        <el-row v-for="(item,index) in goods" :key="item.id">
                            <el-col :span="16">{{ item.goods_name }}</el-col>
                            <el-col :span="4">{{ item.goods_number }}</el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import PageMix from '@/mix/Page';
import FormMix from '@/mix/Form';
import AssignAjax from '@/ajaxProxy/Assign';

export default {
    name: 'DeliverGoods',
    pageTitle:"同步发货",
    mixins: [PageMix,FormMix],
    data () {
        return {
            dialogThis:null,
            labelPosition:"right",
            labelWidth:'120px',
            checkForm:{
                real_weigth:'',
                express_fee:"",
                range:0
            },
            load:false,

            model:{},
            address:{},
            goods:[],
            checkGoods:[],

            autoSubmit:false
        }
    },
    watch:{
        real_weigth(val, olv){
            if (this.autoSubmit && val.length!=0) {
                this.beforeSubmit();
            }
        }
    },
    methods:{
        expressSnChange(v){
            let vmthis = this;
            if (v.length == 0) {
                return;
            }
            if (this.assignRequest) {
                clearTimeout(this.assignRequest);
            }
            this.assignRequest = setTimeout(function(){
                vmthis.load = true;
                vmthis.$refs.weight.$refs.input.focus();//focus();
                AssignAjax.getByExpressSn(v, {with:['address', 'goods']}).then((response)=>{
                    vmthis.load = false;
                    if (!(response.data.data instanceof Array )) {
                        vmthis.model = response.data.data;
                        vmthis.address = vmthis.model.address;
                        vmthis.goods = vmthis.model.goods;
                    }  
                }).catch((response)=>{
                    vmthis.load = false;
                });
            }, 500);
            
        },
        beforeSubmit(){
            let re_weigth = parseInt(this.model.reckon_weigth);
            let range = parseInt(this.checkForm.range);
            let real_weigth = parseInt(this.checkForm.real_weigth);
            if ( Math.abs(real_weigth-re_weigth) >  range) {
                this.$confirm('请核实重量是否确认发货?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.formSubmit('checkForm')
                }).catch(() => {
                            
                });
            }
        },
        //---------提交请求
        getAjaxPromise(model){
            return AssignAjax.weightGoods(this.model.id, this.checkForm);
        },
    },
    created(){
        this.dialogThis = this;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  