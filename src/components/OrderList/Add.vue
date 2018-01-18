<template>
    <div>
        <MyDialog title="添加" :name="name" :width="1200" :height="height">
            <el-steps :active="active" finish-status="success">
                <el-step title="选择用户"></el-step>
                <el-step title="选择商品"></el-step>
                <el-step title="收货信息"></el-step>
            </el-steps>
            <el-form :model="addForm"  ref="addForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">
                <div class="tabs" v-show="active==0">
                    <el-form-item label="购买用户"  prop="users">
                        <el-select v-model='addForm.users'>
                            <el-option v-for="user in users"
                                       :label="user.name"
                                       :value="user.id"
                                       :key="user.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="销售员工"  prop="contact">
                        <el-select v-model='addForm.manager_id'>
                            <el-option v-for="user in computedusers" :label="user.realname"
                                       :value="user.user_id" :key="user.user_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="tabs" v-show="active==1">
                        <el-table :data="tableData"  v-loading.body="dataLoad" empty-text="请录入客户信息"
                                  highlight-current-row border ref="select" style="width: 100%">
                            <el-table-column label="序号" width="65" type="index" align="center"></el-table-column>
                            <el-table-column label="产品类型" prop="pdt_type" align="center" width="150"></el-table-column>
                            <el-table-column label="产品名称" prop="pdt_name" align="center" width="150"></el-table-column>
                            <el-table-column label="产品单价" prop="price"></el-table-column>
                            <el-table-column
                                    label="数量"
                                    width="200" prop="number">
                                <template scope="scope">
                                    <div>
                                        <el-input
                                                v-model="scope.row.number" @change="handleInput(scope.row)">
                                            <el-button slot="prepend" @click="del(scope.row)"><i class="el-icon-minus"></i></el-button>
                                            <el-button slot="append" @click="add(scope.row)"><i class="el-icon-plus"></i></el-button>
                                        </el-input>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="小计"
                                    width="150"
                                    prop="goodTotal">
                            </el-table-column>
                            <el-table-column label="操作">
                                <template scope="scope">
                                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">
                                        删除<i class="el-icon-delete2 el-icon--right"></i>
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    <br>
                    <el-button type="info" style="float: right">{{"商品总额：" + moneyTotal}}</el-button>
                    <el-form-item label="购买商品"  prop="contact">
                        <el-select v-model='addForm.manager_id' placeholder="请选择商品分类">
                            <el-option v-for="user in computedusers" :label="user.realname"
                                       :value="user.user_id" :key="user.user_id">
                            </el-option>
                        </el-select>
                        <el-select v-model='addForm.manager_id' placeholder="请选择商品">
                            <el-option v-for="user in computedusers" :label="user.realname"
                                       :value="user.user_id" :key="user.user_id">
                            </el-option>
                        </el-select>
                        <el-button type="info" @click="">
                            购买
                        </el-button>
                    </el-form-item>
                </div>
                <div class="tabs" v-show="active==2">

                        <el-form-item label="收货地址"  prop="contact">
                            <div class="areainp"><area-cascader type='text' :level='1' v-model="value1" placeholder="请选择地址"></area-cascader></div>
                        </el-form-item>
                    <el-form-item label="具体地址"  prop="contact">
                        <div><el-input class="" v-model="addForm.name"  auto-complete="off" placeholder="请填写具体收货地址"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="status">
                        <el-input class="" v-model="addForm.name"  auto-complete="off" placeholder="请填写收件人手机号码"></el-input>
                    </el-form-item>
                </div>


            </el-form>
            <el-button  @click="prv" v-show="stepActive==1">上一步</el-button>
            <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
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
    import DataProxy from '../../packages/DataProxy';

    export default {
        name: 'Add',
        mixins:[DialogForm],
        props:{
            typeList:{
                type:Array,
                default:['销售部','推广部','风控部','人事部']
            },
            users:{
                type:Array,
                default:[],
            },

        },
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                active: 0,
                labelWidth:'80px',
                computedusers:[
                    {user_id:'1',realname:'李青(测试数据)'},
                    {user_id:'2',realname:'高鹏(测试数据)'},
                    {user_id:'3',realname:'马娇(测试数据)'},
                    {user_id:'4',realname:'吴继伟(测试数据)'},
                ],
                tableData:[
                    {
                        pdt_type:'保健品',
                        pdt_name:'aaa',
                        price:'22',
                        pdt_num:'10',
                        number:'1',
                    },
                    {
                        pdt_type:'保健品',
                        pdt_name:'aaa',
                        price:'11',
                        pdt_num:'10',
                        number:'1',
                    },
                    {
                        pdt_type:'保健品',
                        pdt_name:'aaa',
                        price:'11',
                        pdt_num:'10',
                        number:'1',
                    },
                    {
                        pdt_type:'保健品',
                        pdt_name:'aaa',
                        price:'12',
                        pdt_num:'10',
                        number:'1',
                    },

                ],
                moneyTotal:0,
                addForm:{
                    name:"",
                    type:"",
                    manager_id:"",
                    remarks:"",
                    status:1,
                },
                rules:{
                    name:[
                        { required: true, message: '请输入部门名称', trigger: 'blur' }
                    ],
                    type:[
                        { required: true, message:'请选择类型', type: 'number', trigger:'change'}
                    ]
                },


            }
        },
        methods:{
            handleDelete(index, row) {
                this.$confirm('确定删除该商品？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //删除数组中指定的元素
                    this.tableData.splice(index,1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleInput:function(value){
                if(null==value.number || value.number==""){
                    value.number=1;
                }
                value.goodTotal=(value.number*value.price).toFixed(2);//保留两位小数
                //增加商品数量也需要重新计算商品总价
                this.selected(this.multipleSelection);
                console.log(value.goodTotal);
            },
            add:function(addGood){
                //输入框输入值变化时会变为字符串格式返回到js
                //此处要用v-model，实现双向数据绑定
                if(typeof addGood.number=='string'){
                    addGood.number=parseInt(addGood.number);
                };
                addGood.number+=1;
                this.handleInput(addGood);
            },
            del:function(delGood){
                if(typeof delGood.number=='string'){
                    delGood.number=parseInt(delGood.number);
                };
                if(delGood.number>1){
                    delGood.number-=1;
                }
                this.handleInput(delGood);
            },
            //返回的参数为选中行对应的对象
//            selected:function(selection){
//                this.multipleSelection=selection;
//                this.moneyTotal=0;
//                //此处不支持forEach循环，只能用原始方法了
//                for(var i=0;i<selection.length;i++){
//                    //判断返回的值是否是字符串
//                    if(typeof selection[i].goodTotal=='string'){
//                        selection[i].goodTotal=parseInt(selection[i].goodTotal);
//                    };
//                    this.moneyTotal+=selection[i].goodTotal;
//                }
//            },

            next() {
                if (this.active++ > 1) this.active = 0;
            },
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            },
            //加减号
            changeQuantity(row, type){
                if( type > 0 ){
                    row.count++;
                }else{
                    row.count > 1 ? row.count--: row.count = 1;
                }
                this.changeCount(row);
            },
            //数量文本框值改变
            changeCount (row) {
                if(null == row.count || row.count == ""){
                    row.count=1;
                }
                row.totalPrice = (row.count * row.price).toFixed(2);//保留两位小数
                console.log(row.totalPrice+" = "+ row.count +" * "+ row.price)
                //增加商品数量也需要重新计算商品总价
            },

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
