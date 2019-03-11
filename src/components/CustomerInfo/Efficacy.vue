<template>
    <div >
        <MyDialog title="护理方案" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="addForm" ref="addForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="方案订单" name="first">
                        <el-row>
                            <span style="margin-right:80px ">客户姓名:{{this.params.name}}</span>
                            <!--<span v-if="this.params.sex==0">性别:未知</span>
                            <span v-else-if="this.params.sex==1" >性别:男</span>
                            <span v-else>性别:女</span>-->
                            <span style="margin-left:80px ">性别:{{this.params.sex_text}}</span>
                            <span style="margin-left:80px ">年龄:{{this.params.age}}</span>
                        </el-row>
                        <el-row>
                            <hr style="margin-top: 20px">
                        </el-row>
                        <el-row>
                            <el-form-item label="诊断情况">
                                <el-input type="textarea" v-model="addForm.diagnosis"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="解决方案">
                                <el-input type="textarea" v-model="addForm.deal_plan"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <hr style="margin-top: 10px">
                        </el-row>
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
                                <el-button size="small" @click="addPro">添加商品到方案</el-button>
                            </el-col>
                        </el-row>
                        <br>
                        <el-row>
                            <el-col :span='24'>
                                <el-table max-height="320" :data="comboGoods" border show-summary :summary-method="getSummaries">
                                    <el-table-column label="商品类型" prop="type" width="140">
                                        <template scope="scope">
                                            {{ getTheType(scope.row.type, cateOptions) }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="商品名称" prop="name" width="170">
                                        <template scope="scope">
                                            {{ getTheName(scope.row.name, comboForm.allGoodsList) }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="单价" prop="del_price">
                                        <!--<template scope="scope">
                                            {{ getThePrice(scope.row.name, comboForm.allGoodsList) }}
                                        </template>-->
                                    </el-table-column>
                                    <el-table-column label="数量" prop="number" width="80"></el-table-column>
                                    <el-table-column label="总金额" prop="total_price">
                                        <!--<template scope="scope">
                                            {{ (getThePrice(scope.row.name, comboForm.allGoodsList) * scope.row.number).toFixed(2) }}
                                        </template>-->
                                    </el-table-column>
                                    <el-table-column label="功效" prop="efficacy">
                                        <template scope="scope">
                                            {{ getTheEfficacy(scope.row.name, comboForm.allGoodsList) }}
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
                        <br>
                        <el-row>
                            <el-form-item label="导师签名">
                                <el-input class="name-input" v-model="addForm.sign"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="使用说明">
                                <el-input type="textarea" v-model="addForm.introduction"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-button size="small" @click="proOrder">生成订单</el-button>
                            <el-button size="small" @click="proPlan">生成方案</el-button>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="参考方案查看" name="second">
                        <el-row>
                            <el-form :inline="true"  ref="searchForm" class="demo-form-inline" :model="searchForm">
                                <el-form-item label="方案名称" prop="name">
                                    <el-input size="small" v-model="searchForm.name" class="form-item-unique"></el-input>
                                </el-form-item>
                                <el-form-item label="关键字" prop="key_words">
                                    <el-input size="small" v-model="searchForm.key_words" class="form-item-unique"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" size="small" icon="search" @click="search('searchForm')">查询
                                    </el-button>
                                    <el-button size="small" type="primary" @click="searchReset('searchForm')">重置</el-button>
                                </el-form-item>
                            </el-form>
                        </el-row>
                        <el-table
                                :data="tableData"
                                height="200"
                                max-height="200"
                                border
                                @row-dblclick="rowDbClick"
                                style="width: 100%">
                            <el-table-column label="编号" align="center" prop="plan_id" header-align="center">
                            </el-table-column>

                            <el-table-column label="方案名称" align="center" prop="name" header-align="center">
                            </el-table-column>

                            <el-table-column label="关键字" show-overflow-tooltip align="center" prop="key_words" header-align="center">
                            </el-table-column>

                            <el-table-column label="编写人员" align="center" prop="user.realname" header-align="center">
                            </el-table-column>
                        </el-table>
                        <el-row>
                            <div>
                                <p>适用情况:</p>
                                {{tips.situation}}
                            </div>
                            <div>
                                <p>搭配建议:</p>
                                {{tips.suggestion}}
                            </div>
                        </el-row>
                        <el-row>
                            <p>搭配组合</p>
                            <el-table
                                    :data="combo_goods"
                                    height="200"
                                    max-height="200"
                                    border
                                    style="width: 100%">
                                <el-table-column label="商品类型" align="center" prop="type" header-align="center" width="140">
                                    <template scope="scope">
                                        {{ getType(scope.row.type, cateOptions) }}
                                    </template>
                                </el-table-column>

                                <el-table-column label="商品名称" align="center" prop="name" header-align="center">
                                    <template scope="scope">
                                        {{ getName(scope.row.name, names) }}
                                    </template>
                                </el-table-column>

                                <el-table-column label="数量" align="center" prop="number" header-align="center" width="80">
                                </el-table-column>

                                <el-table-column label="功效" show-overflow-tooltip align="center" prop="efficacy" header-align="center">
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-form>

            <!--<div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        @click="formSubmit('addForm')"
                        :observer="dialogThis">
                    保 存
                </submit-button>
            </div>-->

        </MyDialog>
    </div>
</template>

<script>
  import DialogForm from '../../mix/DialogForm';
  import EfficacyAjax from '../../ajaxProxy/Efficacy';
  import PersonalCareAjax from '../../ajaxProxy/PersonalCare';
  import GoodsTypeProxy from '../../packages/GoodsTypeSelectProxy';
  import GoodsSelectProxy from '../../packages/GoodsSelectProxy';
  import SelectProxy from  '../../packages/SelectProxy';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Efficacy',
    mixins:[DialogForm],
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
        activeName:"first",
        tableData:[],
        tips:[],
        combo_goods:[],
        cateOptions:[],
        names:[],
        address:[],
        getCateCascaderUrl:"/tree",
        params:{},
        searchForm: {
          name: "",
          key_words: ""
        },
        addForm: {
            diagnosis:'',
            deal_plan:'',
            sign:'',
            introduction:''
        },
        rules:{
          diagnosis:[
            { required: true, message: '请输入诊断情况', trigger: 'blur'},
            { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
          ],
          deal_plan:[
            { required: true, message: '请输入解决方案', trigger: 'blur'},
            { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
          ]
        },
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
        /*this.addOrderForm.cus_name = param.params.model.name;
        this.addOrderForm.user_id = param.params.model.mid_relative.user_id;
        // this.addOrderForm.user_id = param.params.model.
        // this.addOrderForm.group_id = this.getUser.group_id;
        // this.addOrderForm.department_id = this.getUser.department_id;
        this.addOrderForm.deal_id=this.user_id;
        this.addOrderForm.deal_name=this.getUser.realname;
        this.cus_id = param.params.model.id;
        this.addOrderForm.cus_id = this.cus_id;
        // this.addOrderForm.dep_group_realname = this.setDepGroupRealname(this.user_id);
        this.getAddress(this.cus_id);

        this.setDefaultTemplate();//设置默认模板*/
        this.params = param.params.model;
        console.log(this.params);
      },
      search(){
        EfficacyAjax.efficacyDetail(this.searchForm).then(response => {
          this.tableData = response.data.items;
        }).catch(error => {

        })
      },
      searchReset(){
        this.searchForm =  {
          name: "",
          key_words: ""
        },
        EfficacyAjax.efficacyDetail(this.searchForm).then(response => {
          this.tableData = response.data.items;
        }).catch(error => {

        })
      },
      rowDbClick(row){
        EfficacyAjax.efficacyPlan(row).then(response => {
          this.tips = response.data.items[0];
        }).catch(error => {
        })

        EfficacyAjax.depositDetail(row.plan_id).then((response)=>{
          this.combo_goods = response.data;
        }).catch((response)=>{

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
      loadNames(data){
        this.names = data.items;
        console.log(this.names);
      },
      getNames(){
        let canAddNames = new GoodsSelectProxy({}, this.loadNames, this);
        canAddNames.load();
      },
      getTheType(id, arr){
        for ( var i = 0; i <arr.length; i++){
          if (arr[i]['id']==id){
            return arr[i]['label'];
          }
        }
      },
      getTheName(id, arr){
        for ( var i = 0; i <arr.length; i++){
          if (arr[i]['id']==id){
            return arr[i]['goods_name'];
          }
        }
      },
      getThePrice(id, arr){
        for ( var i = 0; i <arr.length; i++){
          if (arr[i]['id']==id){
            return arr[i]['del_price'];
          }
        }
      },
      getTheUnit(id, arr){
        for ( var i = 0; i <arr.length; i++){
          if (arr[i]['id']==id){
            return arr[i]['unit_type'];
          }
        }
      },
      getTheSku(id, arr){
        for ( var i = 0; i <arr.length; i++){
          if (arr[i]['id']==id){
            return arr[i]['sku_sn'];
          }
        }
      },
      getTheEfficacy(id, arr){
        for ( var i = 0; i <arr.length; i++){
          if (arr[i]['id']==id){
            return arr[i]['efficacy'];
          }
        }
      },
      initCateOptions(data){
        this.cateOptions = data.items;
        console.log(data.items);
      },
      getCateCascader(){
        let selectProxy = new SelectProxy(this.getCateCascaderUrl,this.initCateOptions,this);
        selectProxy.load();
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
          fields:['id','goods_name','efficacy','del_price','unit_type','sku_sn']
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
          goods_number: this.comboForm.number,
        };
        let hasGoods = this.comboForm.goods;
        let hasOne = this.comboGoods.find((item)=>{
          return item.name == this.comboForm.goods
        })
        if (!hasOne) {
          if(hasGoods){
            let goods_name = this.getName(obj.name,this.comboForm.allGoodsList);
            let efficacy = this.getTheEfficacy(obj.name,this.comboForm.allGoodsList);
            let unit_type = this.getTheUnit(obj.name,this.comboForm.allGoodsList);
            let sku_sn = this.getTheSku(obj.name,this.comboForm.allGoodsList);
            let del_price = this.getThePrice(obj.name,this.comboForm.allGoodsList);
            let total_price = (del_price * obj.number).toFixed(2);
            obj.del_price = del_price;
            obj.total_price = total_price;
            obj.unit_type = unit_type;
            obj.sku_sn = sku_sn;
            obj.goods_name = goods_name;
            obj.efficacy = efficacy;
            obj.price = del_price;
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
      getGoodsName(){
        this.allGoodsProxy = new GoodsSelectProxy({}, this.loadAllGoods, this);
        this.allGoodsProxy.setParam({
          cate_id:'',
          fields:['id','goods_name','efficacy','del_price','unit_type','sku_sn']
        }).load();
      },
      proOrder(){
        this.addForm.group_id = this.params.mid_relative.group_id;
        this.addForm.group_name = this.params.mid_relative.group_name;
        this.addForm.department_id = this.params.mid_relative.department_id;
        this.addForm.department_name = this.params.mid_relative.department_name;
        this.addForm.cus_id = this.params.id;
        this.addForm.cus_name = this.params.name;
        this.addForm.type = 3;
        this.addForm.include_freight = 1;
        this.addForm.express_delivery = '默认';
        let allMoney = 0;
        for(let v of this.comboGoods) {
          allMoney += parseFloat(v.goods_number * v.price);
        };
        this.addForm.order_all_money = allMoney;
        this.addForm.discounted_goods_money = allMoney;
        this.addForm.order_pay_money = allMoney;
        this.addForm.combination_goods = this.comboGoods;
        this.addForm.creator_id = this.creator;
        this.addForm.user_id =  this.params.mid_relative.user_id;
        this.addForm.deal_id =  this.creator;
        this.addForm.deal_name =  this.creator_name;
        if(this.comboGoods.length==0){
          this.$message.error('请先选择商品');
        }else{
          EfficacyAjax.addOrder(this.addForm).then((response)=>{
            this.$message.success('下单成功');
          }).catch((response)=>{
            this.$message.error('下单失败');
          });
        }

      },
      proPlan(){

        if(this.comboGoods.length==0){
          this.$message.error('请先选择商品')
        }else{
          this.addForm.combination_goods = this.comboGoods;
          this.addForm.user_id = this.params.id;
          this.addForm.user_name = this.params.name;
          this.addForm.user_sex = this.params.sex_text;
          let allMoney = 0;
          for(let v of this.comboGoods) {
            allMoney += parseFloat(v.goods_number * v.price);
          };
          this.addForm.sum = allMoney;
          PersonalCareAjax.create(this.addForm).then((response)=>{
            this.$message.success('方案生成成功');
            //清空输入的商品信息
            this.comboGoods = [];
            this.addForm = [];
            let id = this.params.id;
            let url = process.env.BASE_URL+ '/personal-care-show/'+ id;
            window.open(url);
          }).catch((response)=>{
            this.$message.error('方案生成失败');
          });
        }
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计金额';
            return;
          }
          if (index != 4) {
            sums[index] = '';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      }

    },
    created() {
      this.getNames();
      this.getCateCascader();
      this.goodsProxy = new GoodsSelectProxy({}, this.loadGoods, this);
      this.getGoodsName();
    }

  }
</script>
<!--客户添加项：姓名、客户类型、联系方式及昵称(QQ、手机、微信)、联系方式2及昵称、
客户来源、性别、年龄、省、市、县、地址、身份证、兴趣爱好、常用产品、备注等。 -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
