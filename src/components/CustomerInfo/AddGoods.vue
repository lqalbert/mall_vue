<template>
    <div>
        <el-form ref="goodsForm" :model="goodsForm" label-width="80px">

            <el-alert
                title="当库存为0时不能添加"
                type="warning">
              </el-alert>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商品分类" prop="dev">
                        <el-cascader
                        size="small"
                        v-model="goodsForm.dev"
                        :options="CategoryList"
                        @change="categoryChange">
                    </el-cascader>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="goods" label="商品名称">
                    <el-select v-model="goodsForm.goods" size="small" @change="getGoodsInfo">
                        <el-option v-for="(value,index) in goodsList" :value="index" :key="value.id" :label="value.goods_name">

                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="goods_number" label="商品数量">
                    <el-input-number size="small" :min="1" :max="entrepot_sum" v-model="goodsForm.goods_number" >
                    </el-input-number>
                    <span style="color:red;">当前库存：{{entrepot_sum}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="remark" label="备注">
                    <el-input type="textarea" class="name-input" size="small" v-model="goodsForm.remark"  placeholder="备注" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="12" style="text-align: center">
                <el-button @click="addGoods" type="primary" class="right">添 加</el-button>
            </el-col>
        </el-row>
    </el-form>
    </div>
</template>

<script>
    import OrderGoodsAjax from '@/ajaxProxy/Ordergoods';

    import GoodsSelectProxy from '@/packages/GoodsSelectProxy';
    import EntrepotProductAjax from '@/ajaxProxy/EntrepotProduct';

    export default {
        name: 'AddGoods',
        props:{
            CategoryList:'',
        },
        data () {
            return {
                goodsForm:{
                    goods:null,
                    goods_number:0,
                    remark:""
                },
                entrepot_sum:0,
                goodsList:[]
            }
        },
        methods:{
            categoryChange(val){
                // console.log(val);
                this.goodsProxy.setParam({
                    cate_id:val,
                    with:['skus'],
                    fields:['id','goods_name',
                    'goods_price','goods_number',
                    'sku_sn','unit_type','len','width','height','barcode','weight',
                    'bubble_bag','specifications']
                }).load();
            },
            addGoods(){
                if (this.entrepot_sum > 0) {

                    //处理数据
                    //然后上传
                    //保存成功后 触发事件 


                    this.$emit('add-goods', this.currentGoods);
                }
            },
            getGoodsInfo(index){
                let goods = this.goodsList[index];
                EntrepotProductAjax.getEntrepotCount(goods.sku_sn).then((response)=>{
                    // console.log(response.data.num);
                    this.entrepot_sum = response.data.num
                });
                this.currentGoods = goods;

            },
            loadGoods(data){
                this.goodsList = data.items;
            }
        },
        created(){
            this.goodsProxy = new GoodsSelectProxy({}, this.loadGoods, this);
        },
        beforeDestroy(){
            this.goodsProxy = null;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
  