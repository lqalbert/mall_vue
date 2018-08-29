<template>
	<div>
		<MyDialog title="编辑套餐商品" :name="name" :width="width" :height="height" @before-open="onOpen" @before-close="onClose">
			<el-form :model="skuForm"   ref="skuForm" :label-width="labelWidth"  :label-position="labelPosition">
				
                <el-row>
                    <el-col :span="24">
                        <el-cascader
                            size="small"
                            expand-trigger="hover"
                            :options="cateOptions"
                            v-model="comboForm.cate_id"
                            @change="changeComboCates"
                            change-on-select 
                            placeholder="选择分类" >
                        </el-cascader>

                        <el-select v-model="comboForm.goods" size="small" placeholder="选择套餐包含的商品" @change="changeComboGoods">
                            <el-option v-for="item in comboForm.goodsList" :key="item.id"  :label="item.goods_name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <br>
                <el-alert
                    title="需要改一下价格，使其 所有商品的价格之和等于套餐价"
                    type="warning">
                </el-alert>
                <br>
                <el-row>
                    <el-col :span='24'>
                        <el-table  :data="comboGoods">
                            <el-table-column label="名称" prop="name"></el-table-column>
                            <el-table-column label="价格" prop="price">
                                <template slot-scope="scope">
                                    <el-input size="small" v-model="scope.row.price"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="数量" prop="num" width="180">
                                <template slot-scope="scope">
                                    <el-input-number size="small" v-model="scope.row.num" :mix="0" ></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="small" type="info" @click="save(scope.row)" >保存</el-button><el-button size="small" type="danger" @click="comboGoodsDelete(scope.row)">删除</el-button>
                                <span v-if="!scope.row.id"><el-tag>未保存</el-tag></span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
			</el-form>

			<div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">关 闭</el-button>
            </div>
		</MyDialog>
	</div>
</template>

<script>
	// todo 改造成 TableProxy
// import DialogForm from '../../mix/DialogForm';

import FormMix from '@/mix/Form';
import Dialog from '@/mix/Dialog';

import ComboAjax from '@/ajaxProxy/Combo';

import GoodsSelectProxy from '@/packages/GoodsSelectProxy';

export default {
    name: 'Spec',
    mixins:[FormMix,Dialog],

    props:{
        cateOptions:{
            type:Array,
            default:[]
        },

    },
    data(){
		return{
            dialogThis:this,
            labelPosition:"right",
			labelWidth:'80px',
			 

			skuForm:{
                 
            },
            
            comboForm:{
                cate_id:[],
                goods:null,
                goodsList:[]
            },
            comboGoods:[],
            combo_id:""
		}
    },
    methods:{
		onOpen(param){

            this.combo_id = param.params.id;
            this.loadCombo();

        },
        loadCombo(){
            ComboAjax.get({combo_id:this.combo_id}).then((response)=>{
                let re = response.data;
                this.comboGoods = re.items;
            })
        },
		getAjaxPromise(model){
			if(model.id){
                return ComboAjax.update(model.id, model);
            }else  {
                return ComboAjax.create(model);
            }
		},
		getAjaxProxy(){
			return ComboAjax;
		},
		
         
		onClose(){
			
		},

        changeComboCates(val){
            this.goodsProxy.setParam({
                cate_id:val,
                fields:['id','goods_name',  'goods_price']
            }).load();
        },
        findGoods(id, goods){
            return goods.find((element)=>{
                return element.id == id;
            })
        },
        changeComboGoods(v){
            let goods = this.findGoods(v, this.comboForm.goodsList);
            let  o = {
                goods_id:goods.id,
                name: goods.goods_name,
                price: goods.goods_price,
                num : 0,
                combo_id: this.combo_id
            };
            let hasOne = this.comboGoods.find((item)=>{
                return item.goods_id == v
            })
            if (!hasOne) {
                this.comboGoods.push(o);
            } else {
                this.$message.error('已添加同样的商品');
            }
        },
        comboGoodsDelete(row){
            this.$confirm('确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (row.id) {
                    ComboAjax.delete(row.id).then((response)=>{
                        this.deleteComboGoods(row);
                    }).catch((response)=>{

                    }); 
                } else {
                    this.deleteComboGoods(row);
                }
            }).catch(() => {
                         
            });
            
        },
        deleteComboGoods(row){
            this.comboGoods = this.comboGoods.filter((element)=>{
                return element.id != row.id;
            })
        },
        loadGoods(data){
            this.comboForm.goods = null;
            this.comboForm.goodsList = data.items;
        },
        save(row){
            this.getAjaxPromise(row).then((response)=>{
                let re = response.data;
                if (re.status == 1) {
                    this.$message.success(re.msg);
                    if (!row.id) {
                        let savedRow = re.data;
                        let goods = this.comboGoods.find((element)=>{
                            return element.goods_id == row.goods_id;
                        });
                        this.$set(goods, 'id', savedRow.id);
                        // goods.id = savedRow.id;
                        // this.comboGoods = this.comboGoods;
                    }
                    
                    // this.loadCombo();
                } else {
                    this.$message.error(re.msg);
                }

            }).catch((response)=>{

            });
        }
	},
	created(){
		this.goodsProxy = new GoodsSelectProxy({}, this.loadGoods, this);
    },
    beforDestroy(){
        this.goodsProxy = null;
    }
}
</script>
