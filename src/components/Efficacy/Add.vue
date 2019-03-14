<template>
    <div >
        <MyDialog title="添加" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="方案编号" prop="plan_id" >
                            <el-input class="name-input" v-model="addForm.plan_id"  auto-complete="off" placeholder="格式为PLT+数字"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="方案名称" prop="name" >
                            <el-input class="name-input" v-model="addForm.name"  auto-complete="off" placeholder="请填写方案名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="关键字" prop="key_words" >
                            <el-input v-model="addForm.key_words"  auto-complete="off" placeholder="请填写方案关键字"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="适用肤质" prop="situation" >
                            <el-input v-model="addForm.situation"  auto-complete="off" placeholder="请填写方案适用情况"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="搭配建议" prop="suggestion" >
                            <el-input v-model="addForm.suggestion"  auto-complete="off" placeholder="请填写方案搭配建议"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
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
                            <el-table-column label="商品名称" prop="name" width="140">
                                <template scope="scope">
                                    {{ getName(scope.row.name, comboForm.allGoodsList) }}
                                </template>
                            </el-table-column>
                            <el-table-column label="数量" prop="number" width="80"></el-table-column>
                            <el-table-column show-overflow-tooltip label="功效" prop="efficacy">
                                <template scope="scope">
                                    {{ getEfficacy(scope.row.name, comboForm.allGoodsList) }}
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
            </el-form>

            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        @click="formSubmit('addForm')"
                        :observer="dialogThis">
                    保 存
                </submit-button>
            </div>

        </MyDialog>
    </div>
</template>

<script>
  import DialogForm from '../../mix/DialogForm';
  import GoodsSelectProxy from '@/packages/GoodsSelectProxy';
  import { mapGetters } from 'vuex';
  export default {
    name: 'Add',
    mixins:[DialogForm],
    props:{
      cateOptions:{
        type:Array,
        default:[]
      },
      comboGoods:{
        type:Array,
        default:[]
      }
    },
    computed:{
      ...mapGetters({
        // 映射 `this.creator` 为 `store.getters.user_id`
        // 映射 `this.creator_name` 为 `store.getters.realname`
        creator: 'user_id',
        creator_name:"realname",
        roles: 'assignable',
      })
    },
    data () {
      return {
        dialogThis:this,
        labelPosition:"right",
        labelWidth:'80px',
        addForm:{
          plan_id:"",
          name:"",
          key_words:"",
          situation:"",
          suggestion:""
        },
        showTypes:{},
        rules:{
          plan_id:[
            { required: true, message: '请按格式输入方案编号',pattern: /^PLT+[0-9]+$/, trigger: 'blur'},
            { min: 1, max: 32, message: '长度在 1 到 32 个字符', trigger: 'blur' }
          ],
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
        comboForm:{
          cate_id:[],
          goods:null,
          goodsList:[],
          allGoodsList:[],
          number:1
        },
        // comboGoods:[]
      }
    },
    methods:{
      onOpen(param){
        this.showTypes = param.params.model;
        console.log(param);
      },
      getAjaxPromise(model){
        // console.log(model);
        return this.ajaxProxy.create(model);
      },
      removeItem(item){
        var index = this.addForm.add_value.indexOf(item)
        if (index !== -1) {
          this.addForm.add_value.splice(index, 1)
        }
      },
      addItem(){
        this.addForm.add_value.push({value:""});
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
        //获取当前选中的商品信息

        let  obj = {
          type:this.comboForm.cate_id[0],
          name: this.comboForm.goods,
          number: this.comboForm.number,
          plan_id: this.addForm.plan_id
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
      resetAddFormField(){
        this.addForm.creator_id = this.creator;
        this.addForm.combination_goods = this.comboGoods;
      },
      getGoodsName(){
        this.allGoodsProxy = new GoodsSelectProxy({}, this.loadAllGoods, this);
        this.allGoodsProxy.setParam({
          cate_id:'',
          fields:['id','goods_name','efficacy']
        }).load();
      }
    },
    mounted(){
      console.log(this.showTypes);
      console.log(323)
    },
    created(){
      this.goodsProxy = new GoodsSelectProxy({}, this.loadGoods, this);
      this.getGoodsName();
      this.resetAddFormField();
      this.$on('submit-final', this.resetAddFormField);
    },
    beforeDestroy(){
      this.goodsProxy = null;
      this.allGoodsProxy = null;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
