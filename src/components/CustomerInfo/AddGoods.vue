<template>
    <div>
        <el-form ref="goodsForm" :model="goodsForm" label-width="80px">
            <el-alert
                title="当库存为缺货时不能添加"
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
                <el-form-item prop="goods_id" label="商品名称">
                    <el-select v-model="goodsForm.goods_id" size="small" @change="getGoodsInfo">
                        <el-option v-for="(value, item) in data2" :value="item" :key="item" :label="value.goods_name+
                        (value.sku_name != '' ?'-'+value.sku_name:'')"><!-- +'-'+value.price -->
                            <!--<span>{{value.goods_name}}{{ (value.sku_name && value.sku_name.length > 0) ? '-'+value.sku_name: ''  }}</span>-->
                            <span>{{value.goods_name}}</span>
                            <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{value}}</span>    -{{value.price}}-->
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="goods_number" label="商品数量">
                    <el-input-number size="small" :min="1" :max="entrepot_sum" v-model="goodsForm.goods_number">
                    </el-input-number>
                    <span style="color:red;">当前库存：{{entrepot_sum>0 ? '充足' : '缺货'}}</span>
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
                    // goods:null,
                    goods_id:"",
                    goods_number:0,
                    remark:""
                },
                entrepot_sum:0,
                goodsList:[],
                data2:{},
                order_goods:[],
            }
        },
        methods:{
            categoryChange(val){
                // console.log(val);
                this.goodsForm.goods_id = '';
                this.entrepot_sum = 0;
                this.goodsProxy.setParam({
                    cate_id:val,
                    with:['skus'],
                    fields:['id','goods_name',
                    'goods_price','goods_number',
                    'sku_sn','unit_type','len','width','height','barcode','weight',
                    'bubble_bag','specifications']
                }).load();
                this.data2 = {};
            },
            addGoods(){
                //if (this.entrepot_sum > 0) {
                    let vmThis = this;
                    let item = this.data2[vmThis.goodsForm.goods_id];
                    let moneyNotes =parseInt(item.price) * parseInt(this.goodsForm.goods_number);
                    let addData ={
                        moneyNotes:     moneyNotes,
                        goods_id:       item.goods_id,
                        sku_id:         item.sku_id,
                        sku_name:       item.sku_name,
                        goods_name:     item.goods_name,
                        price:          item.price,
                        goods_number:   vmThis.goodsForm.goods_number,
                        remark:         vmThis.goodsForm.remark,
                        sku_sn:         item.sku_sn,
                        unit_type:      item.unit_type,
                        len:            item.len,
                        width:          item.width,
                        height:         item.height,
                        barcode:        item.barcode,
                        weight:         item.weight,
                        bubble_bag:     item.bubble_bag,
                        specifications: item.specifications,
                    };
                    this.$emit('add-goods', addData);
                    this.$refs.goodsForm.resetFields();
                //}
            },
            getGoodsInfo(goods_id){
                let goods = this.data2[goods_id];
                if(goods){
                    EntrepotProductAjax.getEntrepotCount(goods.sku_sn).then((response)=>{
                        this.entrepot_sum = response.data.num;
                    })  
                }

            },
            loadGoods(data){
                let vmThis = this;
                this.data2 = {};
                for (let i = 0; i < data.items.length; i++) {
                    let gid1 = data.items[i].id;
                    let goods_name1 = data.items[i].goods_name;
                    let goods_price1 = data.items[i].goods_price;
                    let goods_number1 = data.items[i].goods_number;
                    let unit_type1 = data.items[i].unit_type;
                    let len = data.items[i].len;
                    let width = data.items[i].width;
                    let height = data.items[i].height;
                    let barcode = data.items[i].barcode;
                    let weight = data.items[i].weight;
                    let bubble_bag = data.items[i].bubble_bag;
                    let specifications = data.items[i].specifications;

                    if (data.items[i].skus.length > 0) {
                        this.contactChildren(data.items[i].skus, gid1, goods_name1,unit_type1,len,
                        width,height,barcode,weight,bubble_bag,specifications);
                    }else{
                        let vv1 = this.contactItem(gid1, goods_price1, goods_name1,
                        goods_number1, 0, '', data.items[i].sku_sn,unit_type1,len,width,height,barcode,weight,
                        bubble_bag,specifications);
                        let kk1 = 'goods_id_'+gid1+'_sku_id_0';
                        this.data2[kk1] = vv1;
                    }
                }
                console.log(this.data2)
            },
            contactItem(goods_id, price, name, num, sku_id, sku, sku_sn,unit_type,len,width,
                height,barcode,weight,bubble_bag,specifications){
                return {goods_id: goods_id,
                        price: price, 
                        goods_name: name,  
                        num: num, 
                        sku_id:sku_id, 
                        sku_name:sku, 
                        sku_sn:sku_sn,
                        unit_type:unit_type,
                        len:len,
                        width:width,
                        height:height,
                        barcode:barcode,
                        weight:weight,
                        bubble_bag:bubble_bag,
                        specifications:specifications};
            },
            contactChildren(children, goods_id, goods_name,unit_type,len,width,height,barcode,
                weight,bubble_bag,specifications){
                for (let i = 0; i < children.length; i++) {
                    const item = children[i];
                    let vv1 = this.contactItem(goods_id, item.price, goods_name,
                     item.num, item.id, item.name, item.sku_sn,unit_type,len,width,height,barcode,weight,bubble_bag,specifications);
                    let kk1 = 'goods_id_'+goods_id+'_sku_id_'+ item.id;
                    this.data2[kk1] = vv1;
                }
            },
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
  
