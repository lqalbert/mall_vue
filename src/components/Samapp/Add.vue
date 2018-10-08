<template>
    <div>
        <MyDialog title="样品申请" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form ref="addForm" :model="addForm" :rules="rules" :label-width="labelWidth" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="申请时间" prop="app_time">
                            <el-date-picker size="small" v-model="addForm.app_time" 
                                placeholder="申请时间" :picker-options="setPicker"
                                @change="appTimeChange" :clearable="false" class="name-input">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="配送中心" prop="entrepot_id">
                            <el-select
                                    clearable
                                    v-model.number="addForm.entrepot_id"
                                    size="small"
                                    placeholder="配送中心" class="name-input">
                                <el-option v-for="v in entrepots" :label="v.name"
                                        :value="v.id" :key="v.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>    
                    <el-col :span="8">
                        <el-form-item label="申请人" prop="applicant">
                            <el-input size="small" v-model="addForm.applicant" class="name-input"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="操作人" prop="operator">
                            <el-input size="small" v-model="addForm.operator" class="name-input"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="所属部门" prop="department_id">
                            <el-select v-model.number="addForm.department_id" size="small" placeholder="部门" @change="departmentChange">
                                <el-option v-for="department in departments" :key="department.id" 
                                    :value="department.id" :label="department.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                   <el-col :span="16">
                        <el-form-item label="用途备注" prop="use_remark">
                            <el-input type="textarea" size="small" v-model="addForm.use_remark"></el-input>
                        </el-form-item>
                    </el-col> 
                </el-row>
                <hr>
                <ChoseGoods  @add-goods="addGoods"></ChoseGoods>
                <el-row>
                    <el-col :span="24">
                        <el-table height="200" border :data="goodsData">
                            <el-table-column label="序号"  width="80" type="index">
                            </el-table-column>
                            <el-table-column label="商品编号" prop="sku_sn" width="100" >
                            </el-table-column>
                            <el-table-column label="商品名称" prop="goods_name" >
                            </el-table-column>
                            <el-table-column label="商品单价" prop="price"  width="100">
                            </el-table-column>
                            <el-table-column label="申请数量" prop="goods_number"  width="100">
                            </el-table-column>
                            <el-table-column label="小记" prop="moneyNotes" width="100" >
                            </el-table-column>
                            <el-table-column label="操作" width="100" align="center">
                                <template slot-scope="scope">
                                    <el-button size="small" type="danger" @click="deleteRow(scope.row)">删 除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" >
                <el-row type="flex" justify="end">
                    <el-col :span="6" >
                        <el-button @click="handleClose">取 消</el-button>
                        <submit-button
                                ref="submitbutton"
                                @click="handleSubmit"
                                :observer="dialogThis">
                            提交申请
                        </submit-button>
                    </el-col>
                </el-row>
            </div>
        </MyDialog>
    </div>
</template>    
          
<script>
import DialogForm from '@/mix/DialogForm';
import { mapGetters } from 'vuex';
// import ChoseGoods from './ChoseGoods';
import ChoseGoods from '@/components/CustomerInfo/choseGoods';

export default {
    name: 'addSample',
    mixins:[DialogForm],
    components:{
        ChoseGoods
    },
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            setPicker:{
                disabledDate:function(time) {
                    return time.getTime() > Date.now();// - 8.64e7
                }
            },
            addForm:{
                app_time:'',
                applicant:'',
                operator:'',
                use_remark:'',
                totalMoney:0,
                // num:0,
                goodsData:[],
                entrepot_id:'',
                department_id:''
            },
            rules:{
                app_time:[
                    { required: true, message: '选择申请时间', trigger: 'blur' }
                ],
                entrepot_id:[
                    { required: true, type:'number',message: '选择配送中心', trigger: 'blur' }
                ],
                applicant:[
                    { required: true, message: '填写申请人', trigger: 'blur' }
                ],
                operator:[
                    { required: true, message: '填写操作人', trigger: 'blur' }
                ],
                department_id:[
                    { required: true,type:'number', message: '选择所属部门', trigger: 'blur' }
                ]
            },
            goodsData:[],
        }
    },
    computed:{
        ...mapGetters({
            'user_id':'user_id',
            'getUser':'getUser',
            'entrepots':'getEntrepots',
            'departments':'getDepartments'
        }),
        totalMoney(){
            let s = 0;
            this.goodsData.forEach((element)=>{
                s += element.moneyNotes;
            })
            return s;
        },
        totalNum(){
            let s = 0;
            this.goodsData.forEach((element)=>{
                s += element.goods_number;
            })
            return s;
        },
        
    },
    methods:{
        onOpen(param){

        },
        appTimeChange(v){
            this.addForm.app_time = v;
        },
        addGoods(v){
            this.goodsData.push(v);
        },
        deleteRow(row){
            let index = this.goodsData.indexOf(row);
            if( index > -1){
                this.goodsData.splice(index,1);
                this.totalMoney -= row.moneyNotes;
            }
        },
        handleSubmit(){
            this.addForm.totalMoney = this.totalMoney;
            this.addForm.num = this.totalNum;
            this.addForm.goodsData = this.goodsData;
            this.formSubmit('addForm');
        },
        getAjaxPromise(model){
            return this.ajaxProxy.create(model);
        },
        submitSuccess(){
            this.$refs.addForm.resetFields();
            this.addForm.addForm = [];
            this.goodsData = [];
            this.addForm.department_name = '';
        },
        departmentChange(v){
            this.getName(this.departments,'department_name',v);
        },
        getName(arr,field,id){
            for (let i = 0; i < arr.length; i++) {
                if (arr[i]['id'] == id) {
                    this.addForm[field] = arr[i]['name'] ? arr[i]['name'] : arr[i]['realname'];
                }
            }
        }
    },
    created(){
        this.$store.dispatch('initEntrepots');
        this.$store.dispatch('initDepartments');
        this.$on('submit-success', this.submitSuccess);
    },
}
</script>
<style scoped>
    .form-item-unique{
        width: 140px !important;
    }
    .name-input{
        max-width: 160px;
    }
    .name-input-area{
        max-width: 220px;
    }
    .pull-right {
        float: right;
    }

    .input-width {
        width: 120px;
    }
</style>