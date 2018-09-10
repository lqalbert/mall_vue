<template>
	<div>
		<MyDialog title="编辑套餐商品" :name="name" :width="width" :height="height" @before-open="onOpen" @before-close="onClose">
			<el-form :model="skuForm"   ref="skuForm" :label-width="labelWidth"  :label-position="labelPosition">
                <!-- <el-row>
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
                </el-row> -->
                <br>
                <el-row>
                    <el-col :span='24'>
                        <el-table  :data="comboGoods">
                            <el-table-column label="名称" prop="name"></el-table-column>
                            <el-table-column label="价格" prop="price">
                            </el-table-column>
                            <!-- 如果改数量，把套装减回去会出错。比如原来是1，后来改成2，然后套装减回去，就多了。
                                 所以不允许改数量。 -->
                            <el-table-column label="数量" prop="num" width="180">
                                <!-- <template slot-scope="scope">
                                    <el-input-number size="small" v-model="scope.row.num" :mix="0" ></el-input-number>
                                </template> -->
                            </el-table-column> 
                            <!-- <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="small" type="info" @click="save(scope.row)" >保存</el-button>
                                    <el-button size="small" type="danger" @click="comboGoodsDelete(scope.row)">删除</el-button>
                                <span v-if="!scope.row.id"><el-tag>未保存</el-tag></span>
                                </template>
                            </el-table-column> -->
                        </el-table>
                    </el-col>
                </el-row>
                <br>
                <!-- 添加/减少：<el-input-number v-model="setInventory" size="small"  ></el-input-number> (套) <el-button size="small">保存</el-button> -->
                <el-row  v-for="item in entrepots" :key="item.id">
                    <el-col :span="4">
                        {{ item.name }} 
                    </el-col>
                    <el-col :span="20">
                        当前可售存库：{{ item.saleable_count }} 
                    </el-col>
                </el-row>
                <br>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-select v-model="setEntrepotId" size="small">
                            <el-option v-for="item in entrepots" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="18">
                        添加/减少：<el-input-number v-model="setInventory" size="small"  ></el-input-number> (套) 
                        <el-button size="small" @click="SaveCombo" :loading="save_state">保存</el-button>
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
import EntrepotProductAjax from '@/ajaxProxy/EntrepotProduct';
import StateButton from '@/components/common/StateButton';

export default {
    name: 'Spec',
    mixins:[FormMix,Dialog],
    components:{
        StateButton
    },
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
            combo_id:"",
            setInventory:0,
            setEntrepotId:"",
            entrepots:[],
            save_state:false,
            sku_sn:"",
		}
    },
    methods:{
		onOpen(param){
            this.combo_id = param.params.id;
            this.sku_sn = param.params.sku_sn;
            this.loadCombo();
            // console.log(param.params);
            this.loadComboCount(EntrepotProductAjax, param.params.sku_sn);
        },
        loadCombo(){
            ComboAjax.get({combo_id:this.combo_id}).then((response)=>{
                let re = response.data;
                this.comboGoods = re.items;
            })
        },
        setEntrepots(response){
            this.entrepots = response.data.items;
        },
        loadComboCount(ajaxproxy, sku_sn){
            ajaxproxy.getComboCount(sku_sn)
            .then(this.setEntrepots.bind(this))
            .catch((response)=>{

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
            this.comboGoods = [];
            this.entrepots = [];
            this.setEntrepotId="";
            this.save_state = false;
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
        },
        SaveCombo(){
            let f = {
                entrepot_id:this.setEntrepotId,
                num:this.setInventory,
                combo_id:this.combo_id
            };
            if (f.entrepot_id == "") {
                this.$message.error("设置配送中心");
                return
            }
            if (f.num == 0) {
                this.$message.error("设置数量");
                return
            }
            this.save_state = true;
            EntrepotProductAjax.addCombo(f).then((response)=>{
                if (response.data.status == 1) {
                    this.save_state = false;
                    this.$message.success(response.data.msg);
                    this.loadComboCount(EntrepotProductAjax, this.sku_sn);
                } else {
                    this.save_state = false;
                    this.$message.error(response.data.msg);
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
