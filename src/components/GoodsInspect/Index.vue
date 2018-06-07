<template>
    <div >
        <el-row>
            <el-col :span="10">
                <div class="grid-content bg-purple">
                    <el-form :model="checkForm" ref="checkForm" :labelPosition="labelPosition" :labelWidth="labelWidth">
                        <el-row>
                            <el-col :span="14">
                                <el-form-item label="快递单号" prop="express_sn" >
                                    <el-input v-model="checkForm.express_sn"　@change="expressSnChange" autofocus></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="14">
                                <el-form-item label="商品条码" prop="barcode" >
                                    <el-input v-model="checkForm.barcode" @change="barcodeChange" ref="barcode"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="14">
                                <el-form-item label="" prop="carton_number" >
                                    <el-checkbox-group v-model="checkForm.carton_number">
                                        <!-- <el-checkbox label="快速验货"></el-checkbox> -->
                                        <el-checkbox label="完成自动提交" v-model="autoSubmit"></el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="14">
                                <el-form-item label="进度" prop="remark">
                                    {{ checkTotal }}/{{ goodsTotal }}
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="14" :offset="6">
                                <submit-button
                                    :observer="dialogThis"
                                    @click="formSubmit('checkForm')" >
                                    提 交
                                </submit-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">

                                <img v-show="imgurl.length!=0" :src="imgurl" alt="">
                                

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
                            <el-col :span="12"><h2>未核对商品</h2></el-col>
                            <el-col :span="12"><h2>已核对商品</h2></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-row>
                                    <el-col :span="16">名称</el-col>
                                    <el-col :span="4">数量</el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="12">
                                <el-row>
                                    <el-col :span="16">名称</el-col>
                                    <el-col :span="4">数量</el-col>
                                </el-row>
                            </el-col>
                        </el-row>
  
                        <el-row>
                            <el-col :span="12">
                                <el-row v-for="(item,index) in goods" :key="item.id">
                                    <el-col :span="16">{{ item.goods_name }}</el-col>
                                    <el-col :span="4">{{ item.goods_number }}</el-col>
                                    <el-col :span="4">
                                        <el-button type="primary" size="mini" icon="plus" @click="checkIndex(index)"></el-button>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="12">
                                <el-row v-for="item in checkGoods">
                                    <el-col :span="16">{{ item.goods_name }}</el-col>
                                    <el-col :span="4">{{ item.goods_number }}</el-col>
                                </el-row>
                            </el-col>
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
import GoodsAjax from '@/ajaxProxy/GoodsDetails';



export default {
    name: 'GoodsInspect',
    pageTitle:"验货",
    mixins: [PageMix,FormMix],
    
    data () {
        return {
            dialogThis:null,
            labelPosition:"right",
            labelWidth:'120px',
            checkForm:{
                express_sn:'', 

            },
            autoSubmit:false,

            model:{},
            address:{},
            goods:[],
            checkGoods:[],

            assignRequest:null,
            load:false,

            imgurl:""
        }
    },
    computed:{
        goodsTotal(){
            return this.goods.length;
        },
        checkTotal(){
            return this.checkGoods.length;
        }
    },
    watch:{
        checkGoods(val, oldVal){
            if (this.autoSubmit) {
                if (this.goodsTotal.length!=0 && this.checkTotal == this.goodsTotal) {
                    //自动提交　状态改成已验货
                    this.formSubmit('checkForm');
                }
            }
        }
    },
    methods:{
        expressSnChange(v){
            // 快递单号扫好之后 要自动跳到下一行
            let vmthis = this;
            if (v.length == 0) {
                return;
            }
            if (this.assignRequest) {
                clearTimeout(this.assignRequest);
            }
           
            this.assignRequest = setTimeout(function(){
                vmthis.$refs.barcode.$refs.input.focus();//focus();
                vmthis.load = true;
                AssignAjax.getByExpressSn(v, {with:['address', 'goods']}).then((response)=>{
                    vmthis.load = false;
                    if (!(response.data.data instanceof Array )) {
                        vmthis.model = response.data.data;
                        vmthis.address = vmthis.model.address;
                        vmthis.goods = vmthis.model.goods;  
                    }
                }).catch((response)=>{
                    vmthis.load = false;
                    vmthis.$message.error('加载订单出错');
                });
            }, 800);
            
        },
        checkIndex(index){
            const item = this.goods.find((element, i)=>{
                return  i == index ;
            });
            
            GoodsAjax.find(item.goods_id, {fields:['id','cover_url']}).then((response)=>{
                this.imgurl = response.data.cover_url;
            }).catch((response)=>{

            })

            if (item) {
                this.checkGoods.splice(index, 0, item);
            }

            
        },
        barcodeChange(v){
            const index = this.goods.findIndex((element)=>{
                return v == element.barcode;
            })
            if (index !=-1) {
                this.checkIndex(index);
            } else {
                this.$message.error('未找到对应的商品');
            }
        },
        //---------提交请求
        getAjaxPromise(model){
            return AssignAjax.checkedGoods(this.model.id);
        },
        rest(){
            this.model = {}
            this.address={};
            this.goods=[];
            this.checkGoods=[];

            this.assignRequest = null;
        },
        onSuccess(){
            this.$message.success("提交成功");
            this.rest();
        }
    },
    created(){
        this.dialogThis = this;
        this.$emit('submit-success', this.onSuccess);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1 {
        font-size: 30px;
    }
</style>
  