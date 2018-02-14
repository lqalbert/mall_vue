<template>
	<div>
		<MyDialog title="编辑规格" :name="name" :width="width" :height="height" @before-open="onOpen">
			<el-form :model="specForm" ref="specForm" :label-width="labelWidth"  :label-position="labelPosition">
				<el-table :data="skulist">
					<el-table-column type="index" label="序号" width="80">
					</el-table-column>
					<el-table-column prop="name" label="sku" width="80">
					</el-table-column>
					<el-table-column  label="规格小项" >
						<template slot-scope="scope">
							{{ displayAttr(scope.row.attr)|stringSuffix(10) }}
						</template>
					</el-table-column>
					<el-table-column type="expand">
						<template slot-scope="scope">
							<el-form label-position="left" inline class="table-expand " >
								<el-form-item v-for="item in scope.row.attr" :key="item.value" :label="item.name + '：'">
									<span>{{ item.value }}</span>
									<img v-if="item.addon_value && item.addon_value.length > 1" :src="item.addon_value" width="50" height="50" class="vertical-middle" >
								</el-form-item>
							</el-form>
						</template>
					</el-table-column>
					<el-table-column prop="price" label="价格" width="80">
					</el-table-column>
					<el-table-column prop="num" label="库存" width="80">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="small" type="danger" @click="deleteAttrItem(scope.$index)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<br>

				<AttrItem :form-object="attrForm"></AttrItem>
			
				<el-form-item label="SKU"  prop="name">
					<el-col :span="10">
						<el-input v-model="skuForm.name" placeholder="请输入内容"></el-input>
					</el-col>
				</el-form-item>
			
				<el-form-item label="价格"  prop="price">
					<el-col :span="10">
						<el-input v-model="skuForm.price" placeholder="请输入内容"></el-input>
					</el-col>
				</el-form-item>
			
				<el-form-item label="数量"  prop="num">
					<el-col :span="10">
						<el-input  v-model="skuForm.num" placeholder="请输入内容"></el-input>
					</el-col>
				</el-form-item>
			
				<el-form-item>
					<el-button @click="addSku">添加SKU</el-button>
				</el-form-item>
			</el-form>

			<div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button 
                    @click="beforeFormSubmit('specForm')"
                    :observer="dialogThis">
                    保 存
                </submit-button>
            </div>
		</MyDialog>
	</div>
</template>

<script>
import DialogForm from '../../mix/DialogForm';
import AttrItem from '../common/AttrFormItem';
import localMix from './mix';
import goodsAjax from '../../ajaxProxy/GoodsSku';



export default {
    name: 'Spec',
    mixins:[DialogForm,localMix],
    components: {
		AttrItem,
    },
    props:{

    },
    data(){
		return{
            dialogThis:this,
            labelPosition:"right",
			labelWidth:'80px',
			skulist:[],
			specForm:{
				skus:[],
			},
			attrForm:[],
			skuForm:{
                name:"",
                price:"",
                num:""
            },
		}
    },
    methods:{
		onOpen(param){
			// model = param.params.model;
			goodsAjax.get({goods_id:param.params.model.id}).then((data)=>{
				this.skulist = data.data.items;

				for (let index = 0; index < this.skulist.length; index++) {
                    const element = this.skulist[index];
                    // console.log(element);
                    element.attr.forEach(item => {
                        item.value = item.pivot.value;
                        item.addon_value = item.pivot.addon_value;
                    });
                    
				}
				console.log(this.skulist);

			});

		},
		getAjaxPromise(model){
			//console.log(model);
			//return this.ajaxProxy.update(model.id, model);
		},
		addSku(){
            // console.log(this.attrForm);
            // this.skuForm.attr  = this.attrForm.concat(); //concat 一个空的数组 返回一个新数组;
            this.skuForm.attr = [];
            this.copy(this.attrForm, this.skuForm.attr);
            let obj = Object.assign({}, this.skuForm);
            this.specForm.skus.push(obj);
            this.attrForm = [];
            this.copy(this._attrForm, this.attrForm);
            this.skuForm.name = "";
            this.skuForm.price = "";
            this.skuForm.num = "";
        },
        copy(source, target){
            source.forEach(function(item){
                this.push(Object.assign({}, item));
            }, target);
            return target;
		},
		displayAttr(attr){
            return attr.map((item)=>{
                return item.name+":"+item.value
            }).join("、");
        },
        deleteAttrItem(index){
            this.addForm.skus.splice(index,1);
        }
    }
}
</script>
