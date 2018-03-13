<template>
    <div >
        <MyDialog title="生产入库2" :name="name" :width="width" :height="height" >
            <el-form :model="addForm"  :label-width="labelWidth"  ref="addForm" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="enty_sn"  label="入库单号">
                            <el-input v-model="addForm.enty_sn" placeholder="自动生成"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="entry_at"  label="入库时间">
                            <el-date-picker
                              v-model="addForm.entry_at"
                              type="datetime"
                              placeholder="默认当前时间" @change="setEntyAt">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="user_id"  label="入库人">
                            <el-select v-model="addForm.user_id" placeholder="默认当前员工">
                                <el-option v-for="v in users" :label="v.realname"
                                           :value="v.id" :key="v.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="entrepot_id"  label="配送中心">
                            <el-select v-model="addForm.entrepot_id" placeholder="郑州配送中心">
                                <el-option v-for="v in distributors" :label="v.name"
                                           :value="v.id" :key="v.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item prop="comment"  label="备注">
                            <el-input type="textarea" v-model="addForm.comment" placeholder="备注"></el-input>  
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-table :data="tableData1" border style="width: 100%">
                    <el-table-column prop="goods_name" label="商品名称"></el-table-column>
                    <el-table-column prop="sku_sn" label="商品编号"></el-table-column>
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
                        <el-form-item prop="cate_type_id"  label="商品类型">
                            <el-select v-model="addForm.cate_type_id" placeholder="商品类型" @change="setCateKind">
                                <el-option v-for="v in types" :label="v.label"
                                           :value="v.id" :key="v.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="cate_kind_id"  label="商品品类">
                            <el-select v-model="addForm.cate_kind_id" placeholder="商品品类" @change="setKindName">
                                <el-option v-for="v in typesKind" :label="v.label"
                                           :value="v.id" :key="v.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="销售类型" prop="product_sale_type" >
                            <el-select v-model="addForm.product_sale_type" placeholder="试用装、赠品、成品">
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
                        <el-form-item label="商品编号" prop="sku_sn" >
                            <el-input class="name-input" v-model="addForm.sku_sn" placeholder="商品编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品数量" prop="num" >
                            <el-input-number v-model="addForm.num" :min="1" placeholder="商品数量"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-button type="info" @click="handelAdd">添加</el-button>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                    :observer="dialogThis"
                    @click="formSubmit('addForm')">
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>

<script>

    import DialogForm from '../../mix/DialogForm';
    import EmployeeSelectProxy from '../../packages/EmployeeSelectProxy';
    import DistributionCenterProxy from '../../packages/DistributionCenterSelectProxy';
    import CategorySelectProxy from '../../packages/CategorySelectProxy';
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
                types:[],
                typesKind:[],
                distributors:[],
                addForm:{
                    enty_sn:'',
                    entry_at:'',
                    user_id:'',
                    entrepot_id:'',
                    comment:'',
                    user_name:'',

                    cate_type:'',
                    cate_kind:'',
                    cate_type_id:'',
                    cate_kind_id:'',
                    product_sale_type:'',
                    goods_name:'',
                    sku_sn:'',
                    num:1,
                    parentData:{},
                    childrenData:[],
                },
                tableData1:[],
                users:{},
            }
        },
        computed:{
            ...mapGetters([
                'getUser',
            ]),
        },
        methods:{
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            },
            getDistributionCenter(data){
                this.distributors = data.items;
            },
            getTypes(data){
                console.log(data);
                this.types = data.items;
            },
            setCateKind(pid){
                for (let i = 0; i < this.types.length; i++) {
                    if (this.types[i].id == pid) {
                        this.typesKind = this.types[i].children;// && this.types[i].children 
                        this.addForm.cate_type = this.types[i].label;
                    }
                }
            },
            setKindName(id){
                for (let i = 0; i < this.typesKind.length; i++) {
                    if (this.typesKind[i].id == id) {
                        this.addForm.cate_kind = this.typesKind[i].label;
                    }
                }
            },
            setEntyAt(v){
                this.addForm.entry_at = v;
            },
            handelAdd(){
                let vmThis = this;
                let data = {
                    goods_name:vmThis.addForm.goods_name,
                    sku_sn:vmThis.addForm.sku_sn,
                    num:vmThis.addForm.num,
                    cate_type_id:vmThis.addForm.cate_type_id,
                    cate_kind_id:vmThis.addForm.cate_kind_id,
                    product_sale_type:vmThis.addForm.product_sale_type,
                    cate_type:vmThis.addForm.cate_type,
                    cate_kind:vmThis.addForm.cate_kind,
                };
                if(data.goods_name && data.sku_sn && data.num ){
                    this.tableData1.push(data);
                    //this.$refs.addForm.resetFields();
                    this.addForm.goods_name = '';
                    this.addForm.sku_sn = '';
                    this.addForm.num = '';
                    this.addForm.cate_type_id = '';
                    this.addForm.cate_kind_id = '';
                    this.addForm.product_sale_type = '';
                    this.addForm.cate_type = '';
                    this.addForm.cate_kind = '';
                }else{
                    this.$message.error("请先填写数据");
                }
                
            },
            formSubmit(name){
                this[name].childrenData = this.tableData1;
                this[name].parentData.enty_sn = this[name].enty_sn;
                this[name].parentData.entry_at = this[name].entry_at;
                this[name].parentData.user_id = this[name].user_id;
                this[name].parentData.entrepot_id = this[name].entrepot_id;
                this[name].parentData.comment = this[name].comment;
                this[name].parentData.user_name = this.getUser.realname;
                //console.log(this[name]);
                let model = this[name];
                if (this.$refs[name].rules) {
                    this.$refs[name].validate((valid)=>{
                        if (valid) {
                            this.realSubmit(model, name);
                        } else {
                            console.log('error submit!!', name);
                            this.$emit('valid-error', name);
                            return false;
                        }
                    })
                } else {
                    this.realSubmit(model, name);
                }
            },
            realSubmit(model, name){
                let ajaxPromise = this.getAjaxPromise(model);
                let vmthis = this;
                ajaxPromise.then(function(response){
                    vmthis.$message.success('操作成功');
                    vmthis.$refs[name].resetFields();
                    vmthis.tableData1 = [];
                    //vmthis.$emit('submit-success', name);
                }).catch(function(error){
                    if(error.response){
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }else{
                        console.log('Error',error.message);
                    }
                    vmthis.$message.error('出错了');
                }).then(function(){
                    vmthis.$emit('submit-final', name);
                });
            },
            handleFormDel(row){
                let index = this.tableData1.indexOf(row);
                let vmThis = this;
                if( index > -1){
                    this.tableData1.splice(index,1);
                }
            },
        },
        created(){
            //this.employeeSelect = new EmployeeSelectProxy({}, this.loadUsers, this);

            let DistributionCenterSelect = new DistributionCenterProxy({}, this.getDistributionCenter, this);
            DistributionCenterSelect.load();

            this.CategorySelect = new CategorySelectProxy({}, this.getTypes, this);
            this.CategorySelect.load();

            //console.log(this.getUser);
            this.users.users = this.getUser;

        },
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>

