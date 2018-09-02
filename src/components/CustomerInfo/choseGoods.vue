<template>
    <!-- 新版下单选择商品 -->
        <div>
            <el-form ref="goodsForm" :model="goodsForm" label-width="90px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="商品类型" prop="dev">
                            <el-cascader size="small"  v-model="goodsForm.dev" :options="cates" @change="categoryChange"></el-cascader>
                        </el-form-item>        
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="商品名称" prop="goods">
                            <!-- remote 
                                :remote-method="goodsSearch"  -->
                            <el-select size="small" 
                                v-model="goodsForm.goods"  
                                :loading="goodsSearching"
                                @change="goodsChange">
                                <el-option v-for="item in selectableGoods" :key="item.value" :label="item.goods_name" :value="item" >{{ item.goods_name }}</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="数量" prop="goods_number">
                            <el-input-number v-model="goodsForm.goods_number" size="small" :min="1" :max="entrepot_sum"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="12">
                            <span style="color:red;">当前库存：{{entrepot_sum>0 ? '充足' : '缺货'}}</span>
                    </el-col>
                    <el-col :span="12">
                        <el-alert
                            title="当库存为缺货时不能添加"
                            type="warning">
                        </el-alert>
                    </el-col>
                </el-row>
                
                <el-row type="flex" justify="space-between">
                    <el-col :span="4">商品列表</el-col>
                    <el-col :span="3"><el-button size="small" @click="addGoods">添加</el-button></el-col>
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
                        goods:"",
                        goods_number:0,
                        remark:""
                    },
                    goodsSearching:false,
                    selectableGoods:[],
                    entrepot_sum:0,


                    goodsList:[],
                    data2:{},
                    order_goods:[],
                }
            },
            computed:{
                cates(){
                    return this.$store.getters.getCates;
                }
            },
            methods:{
                getGoods(obj){
                    let originParam = {
                        with:['skus'],
                        fields:['id','goods_name',
                        'goods_price','goods_number',
                        'sku_sn','unit_type','len','width','height','barcode','weight',
                        'bubble_bag','specifications']
                    };
                    this.goodsSearching = true;
                    this.goodsProxy.setParam(Object.assign({},obj, originParam)).load();
                },
                goodsSearch(v){
                    this.getGoods({goods_name:v});
                },

                categoryChange(val){
                    this.entrepot_sum = 0;
                    this.getGoods({cate_id:val});
                },
                addGoods(){
                    if (this.combo) {
                        let addData = null;
                        for (let index = 0; index < this.combo.length; index++) {
                            const element = this.combo[index];
                            addData = {
                                moneyNotes:     element.price * element.goods_number,
                                goods_id:       element.id,
                                sku_id:         0,
                                sku_name:       null,
                                goods_name:     element.goods_name,
                                price:          element.price,
                                goods_number:   element.goods_number,
                                remark:         '',
                                sku_sn:         element.sku_sn,
                                unit_type:      element.unit_type,
                                len:            element.len,
                                width:          element.width,
                                height:         element.height,
                                barcode:        element.barcode,
                                weight:         element.weight,
                                bubble_bag:     element.bubble_bag,
                                specifications: element.specifications,
                            };
                            // console.log(addData);
                            this.$emit('add-goods', addData);
                        }
                        delete this.combo;
                        return ;
                    }


                    if (this.entrepot_sum > 0) {
                        let item = this.goodsForm.goods;
                        let moneyNotes =parseInt(item.price) * parseInt(this.goodsForm.goods_number);
                        let addData ={
                            moneyNotes:     moneyNotes,
                            goods_id:       item.goods_id,
                            sku_id:         item.sku_id,
                            sku_name:       item.sku_name,
                            goods_name:     item.goods_name,
                            price:          item.price,
                            goods_number:   this.goodsForm.goods_number,
                            remark:         this.goodsForm.remark,
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
                    }
                },
                loadGoods(data){
                    let vmThis = this;
                    let tmp = [];
                    for (let i = 0; i < data.items.length; i++) {

                        let o = {
                            goods_id : data.items[i].id,
                            sku_id : 0 ,
                            sku_sn: data.items[i].sku_sn,
                            goods_name: data.items[i].goods_name,
                            sku_name:null,
                            price: data.items[i].goods_price,
                            goods_number : 0,
                            remark:"",
                            unit_type: data.items[i].unit_type,
                            len: data.items[i].len,
                            width: data.items[i].width,
                            height: data.items[i].height,
                            barcode: data.items[i].barcode,
                            weight: data.items[i].weight,
                            buggle_bag: data.items[i].bubble_bag,
                            specifications: data.items[i].specifications,
                            value: data.items[i].id + "_" + 0
                        };
                        
                        tmp.push(o);
                        if (data.items[i].skus.length != 0) {
                            this.insetGoodsSku(tmp, o, data.items[i].skus)
                        }
                        
                    }
                    // console.log(tmp);
                    this.selectableGoods = tmp;
                    this.goodsSearching = false;
                },
                
                insetGoodsSku(re, o, skus){
                    let origin = o;
                    for (let index = 0; index < skus.length; index++) {
                        const element = skus[index];
                        var tmp = Object.assign({}, origin);
                        tmp.sku_name = element.name;
                        tmp.sku_sn = element.sku_sn;
                        tmp.price = element.price;
                        tmp.value = tmp.goods_id + "_" + element.id;
                        re.push(tmp);
                    }
                },
                goodsChange(v){
                    let goods = v;
                    if(goods){
                        EntrepotProductAjax.getEntrepotCount(goods.sku_sn).then((response)=>{
                            this.entrepot_sum = response.data.num;
                            if (response.data.goods) {
                                this.combo = response.data.goods;
                            }
                        })  
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
      
    