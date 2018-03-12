<template>
    <div >
        <MyDialog title="生产入库2" :name="name" :width="width" :height="height" >
            <el-form :model="addForm"  :label-width="labelWidth"  ref="addForm" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="input_num"  label="入库单号">
                            <el-input v-model="addForm.input_num" placeholder="自动生成"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="input_time"  label="入库时间">
                            <el-date-picker
                              v-model="addForm.input_time"
                              type="datetime"
                              placeholder="默认当前时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="storage_id"  label="入库人">
                            <el-select v-model="addForm.storage_id" placeholder="默认当前员工">
                                <el-option v-for="v in storageUsers" :label="v.name"
                                           :value="v.id" :key="v.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="department_id"  label="配送中心">
                            <el-select v-model="addForm.distribution_id" placeholder="郑州配送中心">
                                <el-option v-for="v in distributors" :label="v.name"
                                           :value="v.id" :key="v.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item prop="remark"  label="备注">
                            <el-input type="textarea" v-model="addForm.remark" placeholder="备注"></el-input>  
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-table :data="tableData1" border style="width: 100%">
                    <el-table-column prop="goods_name" label="商品名称"></el-table-column>
                    <el-table-column prop="goods_num" label="商品编号"></el-table-column>
                    <el-table-column prop="num" label="输入数量"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="handleFormDel(scope.row)">删除</el-button>
                        </template>  
                    </el-table-column>
                </el-table>
                <br>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="goods_type_id"  label="商品类型">
                            <el-select v-model="addForm.goods_type_id" placeholder="商品类型">
                                <el-option v-for="v in types" :label="v.name"
                                           :value="v.id" :key="v.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="product_id"  label="商品品类">
                            <el-select v-model="addForm.product_id" placeholder="商品品类">
                                <el-option v-for="v in productNames" :label="v.name"
                                           :value="v.id" :key="v.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="销售类型" prop="sale_type" >
                            <el-select v-model="addForm.sale_type" placeholder="试用装、赠品、成品">
                                <el-option label="试用装" value="1"></el-option>
                                <el-option label="赠品" value="2"></el-option>
                                <el-option label="成品" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品名称" prop="goods_name" >
                            <el-input class="name-input" v-model="addForm.goods_name" placeholder="商品名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="商品编号" prop="goods_num" >
                            <el-input class="name-input" v-model="addForm.goods_num" placeholder="商品编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品数量" prop="num" >
                            <el-input class="name-input" v-model="addForm.num" placeholder="商品数量"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-button type="info" @click="handelAdd">添加</el-button>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                    :observer="dialogThis"
                    @click="formSubmit('addForm')" >
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>

<script>

    import DialogForm from '../../mix/DialogForm';
    import EmployeeSelectProxy from '../../packages/EmployeeSelectProxy';
    import { mapGetters } from 'vuex';

    // import Dialog from '../common/Dialog';
    export default {
        name: 'addDialogTwo',
        mixins:[DialogForm],
        // props:{
        //
        // },
        // components:{
        //     Dialog
        // },
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'80px',
                computedusers:[],
                types: [
                    {id:1,name:'面膜'},
                    {id:2,name:'爽肤水'},
                ],
                productNames: [
                    {id:1,name:'面膜-6张'},
                    {id:2,name:'爽肤水-200ml'},
                ],
                storageUsers: [
                    {id:1,name:'张三'},
                    {id:2,name:'李四'},
                ],
                distributors: [
                    {id:1,name:'郑州配送中心'},
                    {id:2,name:'广州配送中心'},
                ],
                addForm:{
                    input_num:'',
                    input_time:'',
                    storage_id:'',
                    department_id:'',
                    remark:'',
                    goods_type_id:'',
                    product_id:'',
                    sale_type:'',
                    goods_name:'',
                    goods_num:'',
                    num:'',
                },
                tableData1:[],
            }
        },
        computed:{
            ...mapGetters({
                'user_department_id':'department_id'
            }),

        },
        methods:{
            getAjaxPromise(model){
                //return this.ajaxProxy.create(model);
            },
            loadUsers(data){
                this.computedusers = data.items;
            },
            onDepartChange(v){
                this.employeeSelect.setParam({department_id:v, role:'group-captain', group_candidate:1})
                this.employeeSelect.load();
                this.addForm.manager_id = "";
            },
            handelAdd(){
              
                let vmThis = this;
                let data = {
                  goods_name:vmThis.addForm.goods_name,
                  goods_num:vmThis.addForm.goods_num,
                  num:vmThis.addForm.num,
                };
                if(data.goods_name && data.goods_num && data.num){
                    this.tableData1.push(data);
                    this.$refs.addForm.resetFields();
                }else{
                     this.$message.error("请先填写数据");
                }
                
            },
            handleFormDel(row){
                let index = this.tableData1.indexOf(row);
                let vmThis = this;
                if( index > -1){
                    this.tableData1.splice(index,1);
                    // this.$confirm('确定删除?', '警告',{
                    //     confirmButtonText: '确定',
                    //     cancelButtonText: '取消',
                    //     type: 'warning'
                    // }).then(()=>{
                    //     this.tableData1.splice(index,1);
                    //     vmThis.$message.success("操作成功");
                    // });
                }
            },
        },
        created(){
            this.employeeSelect = new EmployeeSelectProxy({}, this.loadUsers, this);

        }
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>

