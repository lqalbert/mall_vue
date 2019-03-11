<template>
    <div >
        <MyDialog title="编辑方案" :name="name" :width="width" :height="height"  @before-open="onOpen">
            <el-form :model="editForm"  ref="editForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="方案编号" prop="plan_id" >
                            <el-input class="name-input" size="small" v-model="editForm.plan_id" disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="方案名称" prop="name" >
                            <el-input class="name-input" size="small" v-model="editForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="关键字" prop="key_words" >
                            <el-input  size="small" v-model="editForm.key_words"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="适用肤质" prop="situation" >
                            <el-input size="small" v-model="editForm.situation"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="搭配建议" prop="suggestion" >
                            <el-input size="small" v-model="editForm.suggestion"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <br>
            <br>
            <br>
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

                    <el-select v-model="comboForm.goods" size="small" placeholder="选择商品" >
                        <el-option v-for="item in comboForm.goodsList" :key="item.id"  :label="item.goods_name" :value="item.id"></el-option>
                    </el-select>
                    <el-input-number v-model="comboForm.number" :min="1" :max="100" size="small"></el-input-number>
                    <el-button size="small" @click="addPro">添加产品</el-button>
                </el-col>
            </el-row>
            <P>商品组合列表</P>
            <el-row>
                <el-col :span='24'>
                    <el-table  :data="comboGoods" border max-height="300">
                        <el-table-column label="商品类型" prop="type" width="120">
                            <template scope="scope">
                                {{ getType(scope.row.type, cateOptions) }}
                            </template>
                        </el-table-column>
                        <el-table-column label="商品名称" prop="id" width="140">
                            <template scope="scope">
                                {{ getName(scope.row.name, comboForm.allGoodsList) }}
                            </template>
                        </el-table-column>
                        <el-table-column label="数量" prop="number" width="80"></el-table-column>
                        <el-table-column label="功效" prop="efficacy">
                            <template scope="scope">
                                {{ getName(scope.row.name, comboForm.allGoodsList) }}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="120">
                            <template slot-scope="scope">
                                <el-button size="small" type="danger" @click="comboGoodsDelete(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        @click="beforeFormSubmit('editForm')"
                        :observer="dialogThis">
                    保 存
                </submit-button>
            </div>

        </MyDialog>    </div>
</template>

<script>
  import DialogForm from '@/mix/DialogForm';
  import GoodsSelectProxy from '@/packages/GoodsSelectProxy';
  import EfficacyAjax from  '../../ajaxProxy/Efficacy';

  export default {
    name: 'edit',
    mixins:[DialogForm],
    props:{
      cateOptions:{
        type:Array,
        default:[]
      }
    },

    data () {
      return {
        dialogThis:this,
        labelPosition:"right",
        labelWidth:'80px',
        editForm:{
          id:'',
          plan_id:'',
          name:"",
          key_words:"",
          situation:"",
          suggestion:"",
          combination_goods:[]
        },
        rules:{
          name:[
            { required: true, message: '请输入方案名称', trigger: 'blur'},
            { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
          ],
          key_words:[
            { required: true, message: '请输入关键字', trigger: 'blur'},
            { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }
          ],
          situation:[
            { required: true, message: '请输入适用情况', trigger: 'blur'},
            { min: 1, max: 128, message: '长度在 1 到 128 个字符', trigger: 'blur' }
          ],
          suggestion:[
            { required: true, message: '请输入搭配建议', trigger: 'blur'},
            { min: 1, max: 128, message: '长度在 1 到 128 个字符', trigger: 'blur' }
          ]
        },
        model:'',
        comboForm:{
          cate_id:[],
          goods:null,
          goodsList:[],
          allGoodsList:[],
          number:1
        },
        comboGoods:[]
      }
    },
    methods:{
      onOpen(param){
        this.model = param.params.model;
      },
      getAjaxPromise(model){
        return this.ajaxProxy.update(model.id, model);
      },
      removeItem(item){
        var index = this.editForm.add_value.indexOf(item)
        if (index !== -1) {
          this.editForm.add_value.splice(index, 1)
        }
      },
      addItem(){
        this.editForm.add_value.push({value:""});
      },
      changeComboCates(val){
        this.goodsProxy.setParam({
          cate_id:val,
          fields:['id','goods_name','efficacy']
        }).load();
      },
      loadGoods(data){
        this.comboForm.goods = null;
        this.comboForm.goodsList = data.items;
      },
      loadAllGoods(data){
        this.comboForm.allGoodsList = data.items;
      },
      addPro(){
        let  obj = {
          type:this.comboForm.cate_id[0],
          name: this.comboForm.goods,
          number: this.comboForm.number,
          plan_id: this.editForm.plan_id
        };
        let hasGoods = this.comboForm.goods;
        let hasOne = this.comboGoods.find((item)=>{
          return item.name == this.comboForm.goods
        })
        if (!hasOne) {
          if(hasGoods){
            this.comboGoods.push(obj);
          }else{
            this.$message.error('请先选择商品');
          }
        } else {
          this.$message.error('已添加同样的商品');
        }
        // this.comboGoods.push(obj);
      },
      getGoodsName(){
        this.allGoodsProxy = new GoodsSelectProxy({}, this.loadAllGoods, this);
        this.allGoodsProxy.setParam({
          cate_id:'',
          fields:['id','goods_name','efficacy']
        }).load();
      },
      comboGoodsDelete(row){
        this.comboGoods = this.comboGoods.filter((element)=>{
          return element.name != row.name;
        })
      },
      getType(id, arr){
        for ( var i = 0; i <arr.length; i++){
          if (arr[i]['id']==id){
            return arr[i]['label'];
          }
        }
      },
      getName(id, arr){
        for ( var i = 0; i <arr.length; i++){
          if (arr[i]['id']==id){
            return arr[i]['goods_name'];
          }
        }
      },
      getEfficacy(id, arr){
        for ( var i = 0; i <arr.length; i++){
          if (arr[i]['id']==id){
            return arr[i]['efficacy'];
          }
        }
      },
      resetEditFormField(){
        this.editForm.combination_goods = this.comboGoods;
      },
      getName(id, arr){
        for ( var i = 0; i <arr.length; i++){
          if (arr[i]['id']==id){
            return arr[i]['goods_name'];
          }
        }
      },
      getEfficacy(id, arr){
        for ( var i = 0; i <arr.length; i++){
          if (arr[i]['id']==id){
            return arr[i]['efficacy'];
          }
        }
      },
      beforeFormSubmit(name) {
        this.$emit('submit-final', this.resetEditFormField);
        if(this.comboGoods.length<1){
          this.$message.error('请先选择商品');
        }else{
          this.formSubmit(name)
        }

      },

    },
    watch:{
      model:function(val, oldVal){
        for (const key in this.editForm) {
          if (this.editForm.hasOwnProperty(key)) {
            this.editForm[key] = val[key]
          }
        }
        EfficacyAjax.depositDetail(val.plan_id).then((response)=>{
          this.comboGoods = response.data;
          // this.editForm.combination_goods = response.data;
        }).catch((response)=>{

        })
      }
    },

    created(){
      this.goodsProxy = new GoodsSelectProxy({}, this.loadGoods, this);
      this.resetEditFormField();
      this.$on('submit-final', this.resetEditFormField);
      this.getGoodsName();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
