<template>
    <div class="hello">
        <MyDialog title="编辑商品" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-table
                    border
                    height="250"
                    :data="orderData"
                    style="width: 100%">
                <el-table-column label="序号" type="index" width="80"></el-table-column>
                <el-table-column prop="goods_name" label="商品名称"></el-table-column>
                <el-table-column prop="price" label="商品单价"></el-table-column>
                <el-table-column prop="goods_number" label="商品数量" width="180">
                    <template slot-scope="scope">
                        <span v-show="!scope.row.edit_state" >{{scope.row.goods_number}}</span>
                        <el-input-number v-show="scope.row.edit_state" size="small" v-model="scope.row.goods_number"></el-input-number> 
                    </template>
                </el-table-column>
                <el-table-column prop="moneyNotes" label="小 记"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column  label="操作" align="center" width="180">
                    <template slot-scope="scope">
                            <el-button size="small" v-if="!scope.row.edit_state" type="primary" @click="setEdit(scope.row)">编辑</el-button>
                            <el-button size="small" v-if="scope.row.edit_state" @click="saveGoods(scope.row)">保存</el-button>
                        <el-button size="small" type="danger" @click="deleteRow(scope.row)">删 除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <AddGoods :category-list="cates" @add-goods="addGoods"></AddGoods>

            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <!-- @click="formSubmit('editForm')" -->
                <!-- <submit-button
                    :observer="dialogThis"
                     >
                    保 存
                </submit-button> -->
            </div>
        </MyDialog>
    </div>
</template>
  
<script>
import AddGoods from '../CustomerInfo/AddGoods';
import MailGoodsAjax from '@/ajaxProxy/MailGoods';
import Dialog from '@/mix/DialogForm';
  export default {
    name: 'Goods',
    mixins:[Dialog],
    components:{
        AddGoods
    },
    data () {
      return {
        dialogThis:this,
        orderData:[],
        // goodsForm:{
        //     goods:
        // }
        id:""
        
      }
    },
    computed:{
        cates(){
            return this.$store.getters.getCates;
        },
    },
    methods:{
        onOpen(param){
            console.log(param.params);
            this.id = param.params.id;
            this.loadGoods();
            
        },
        loadGoods(){
            MailGoodsAjax.get({mail_id:this.id}).then((response)=>{
                response.data.items.forEach(element => {
                    element.edit_state = false;
                });
                this.orderData =  response.data.items;
            }).catch((response)=>{

            });
        },
        addGoods(param){
            // console.log(param);
            // this.orderData.push(param);
            param['mail_id'] = this.id;
            MailGoodsAjax.create(param).then((response)=>{
                if (response.data.status == 1) {
                    this.loadGoods();
                    // this.orderData.push(param);
                }
            }).catch((response)=>{

            })
        },
        deleteRow(row){

            MailGoodsAjax.delete(row.id).then((response)=>{
                if (response.data.status == 1) {
                    this.loadGoods();
                }
            }).catch((response)=>{

            })
        },
        setEdit(row){
            row.edit_state = true;
        },
        saveGoods(row){
            let id = row.id;
            delete row.id;
            delete row.edit_state;
            MailGoodsAjax.update(id, row).then((response)=>{
                if (response.data.status == 1) {
                    this.loadGoods();
                }
            }).catch((response)=>{

            })
        }
    }
  }
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  