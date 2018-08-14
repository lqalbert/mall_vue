<template>
        <div>
            <el-form ref="addOptionForm" :model="addOptionForm" :rules="rules" label-width="90px">
                <el-row>
                    <el-col :span="12" >
                        <el-form-item label="题目类型" prop="problem_type" >
                            <el-select v-model.number="addOptionForm.problem_type" size="small" @change="typeChange">
                                <el-option v-for="v in types" :label="v.name" :value="v.id" :key="v.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="问卷题目" prop="topic_name" >
                            <el-input  size="small" v-model="addOptionForm.topic_name"  auto-complete="off" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                    <el-row>
                        <el-col :span="24" class="col">
                            <el-form-item label="选项A" prop="option_a" >
                                <el-input  size="small" v-model="addOptionForm.option_a" :disabled="typeTwo" auto-complete="off" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" class="col">
                            <el-form-item label="选项B" prop="option_b" >
                                <el-input  size="small" v-model="addOptionForm.option_b" :disabled="typeTwo" auto-complete="off" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" class="col">
                            <el-form-item label="选项C" prop="option_c" >
                                <el-input  size="small" v-model="addOptionForm.option_c" :disabled="typeTwo" auto-complete="off" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" class="col">
                            <el-form-item label="选项D" prop="option_d" >
                                <el-input  size="small" v-model="addOptionForm.option_d" :disabled="typeTwo" auto-complete="off" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" class="col">
                            <el-form-item label="选项E" prop="option_e" >
                                <el-input  size="small" v-model="addOptionForm.option_e" :disabled="typeTwo" auto-complete="off" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                <el-row type="flex" justify="space-between">
                    <el-col :span="4">问卷列表</el-col>
                    <el-col :span="3"><el-button size="small" @click="addOptions" type="primary">添加</el-button></el-col>
                </el-row>
        </el-form>
        </div>
    </template>
    
    <script>
        import OrderGoodsAjax from '@/ajaxProxy/Ordergoods';
    
        import GoodsSelectProxy from '@/packages/GoodsSelectProxy';
        import EntrepotProductAjax from '@/ajaxProxy/EntrepotProduct';
    
        export default {
            name: 'AddOption',
            props:{
                CategoryList:'',
            },
            data () {
                return {
                    addOptionForm:{
                        problem_type:"",
                        topic_name:"",
                        option_a:'',
                        option_b:'',
                        option_c:'',
                        option_d:'',
                        option_e:'',
                    },
                    typeTwo:false,
                    selectableGoods:[],
                    goodsList:[],
                    data2:{},
                    order_goods:[],
                    rules:{
                        problem_type:[
                            { required: true, message:'请选择类型', type: 'number', trigger:'blur'}
                        ],
                        topic_name:[
                            { required: true, message: '请输入问卷题目', trigger: 'blur' },
                            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                        ],

                    },
                    types:[
                        {id:1,name:'选择题'},
                        {id:2,name:'填空题'}
                    ],
                }
            },
            computed:{
                cates(){
                    return this.$store.getters.getCates;
                }
            },
            methods: {
                goodsSearch(v) {
                    this.getGoods({goods_name: v});
                },
                typeChange(v) {
                    if (v == 2) {
                        this.typeTwo = true;
                    } else {
                        this.typeTwo = false;
                    }
                },
                addOptions() {
                    this.$refs['addOptionForm'].validate((valid) => {
                        if (valid) {
                            let item = this.addOptionForm;
                            let addData = {
                                problem_type: item.problem_type,
                                topic_name: item.topic_name,
                                option_a: item.option_a,
                                option_b: item.option_b,
                                option_c: item.option_c,
                                option_d: item.option_d,
                                option_e: item.option_e,
                            };
                            this.$emit('add-options', addData);
                            this.$refs.addOptionForm.resetFields();
                            this.typeTwo = false;
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                },

            },

            created(){
                // this.goodsProxy = new GoodsSelectProxy({}, this.loadGoods, this);
            }

        }
    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
        .col{
            height: 36px;
        }
    </style>
      
    