<template>
        <div>
            <MyDialog title="新建问卷" :name="name" :width="width" :height="height"  @before-open="onOpen">
            <el-form ref="editOptionForm" :model="editOptionForm" :rules="rules" label-width="90px" >
                <el-row>
                    <el-col :span="12" >
                        <el-form-item label="题目类型" prop="problem_type" >
                            <el-select v-model.number="editOptionForm.problem_type" size="small" @change="typeChange">
                                <el-option v-for="v in types" :label="v.name" :value="v.id" :key="v.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="问卷题目" prop="topic_name" >
                            <el-input  size="small" v-model="editOptionForm.topic_name"  auto-complete="off" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                    <el-row>
                        <el-col :span="24" class="col">
                            <el-form-item label="选项A" prop="option_a" >
                                <el-input  size="small" v-model="editOptionForm.option_a" :disabled="typeTwo" auto-complete="off" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" class="col">
                            <el-form-item label="选项B" prop="option_b" >
                                <el-input  size="small" v-model="editOptionForm.option_b" :disabled="typeTwo" auto-complete="off" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" class="col">
                            <el-form-item label="选项C" prop="option_c" >
                                <el-input  size="small" v-model="editOptionForm.option_c" :disabled="typeTwo" auto-complete="off" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" class="col">
                            <el-form-item label="选项D" prop="option_d" >
                                <el-input  size="small" v-model="editOptionForm.option_d" :disabled="typeTwo" auto-complete="off" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" class="col">
                            <el-form-item label="选项E" prop="option_e" >
                                <el-input  size="small" v-model="editOptionForm.option_e" :disabled="typeTwo" auto-complete="off" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
        </el-form>
                <div slot="dialog-foot" class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <submit-button
                            :observer="dialogThis"
                            @click="formSubmit('editOptionForm')" >
                        保 存
                    </submit-button>
                </div>
            </MyDialog>
        </div>
    </template>
    
    <script>
        import OrderGoodsAjax from '@/ajaxProxy/Ordergoods';
    
        import GoodsSelectProxy from '@/packages/GoodsSelectProxy';
        import EntrepotProductAjax from '@/ajaxProxy/EntrepotProduct';
        import DialogForm from '../../mix/DialogForm';
        import QuestionnaireOptionsSelect from '@/packages/QuestionnaireOptionsSelectProxy';

        export default {
            name: 'edit-option',
            mixins:[DialogForm],
            props:{
                CategoryList:'',
            },
            data () {
                return {
                    dialogThis:this,
                    labelPosition:"right",
                    labelWidth:'100px',
                    editOptionForm:{
                        id:'',
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
                            {  message:'请选择类型', type: 'number', trigger:'blur'}
                        ],
                        topic_name:[
                            {  message: '请输入问卷题目', trigger: 'blur' },
                            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                        ],

                    },
                    types:[
                        {id:1,name:'单项选择型'},
                        {id:2,name:'多项选择型'},
                        {id:3,name:'文字填写型'}
                    ],
                    model:null,
                    row:null,
                    questionnaireOptionsResults:null,
                }
            },
            computed:{
                cates(){
                    return this.$store.getters.getCates;
                }
            },
            methods: {
                onOpen(param){
                    this.row = param.params.model;
                    this.questionnaireOptionsResults.setParam({
                        questionnaire_options_id:this.row.questionnaire_options_id,
                    });
                    this.questionnaireOptionsResults.load();
                },
                goodsSearch(v) {
                    this.getGoods({goods_name: v});
                },
                getAjaxPromise(model){
                    return this.ajaxProxy.update(model.id, model);
                } ,
                getQuestionnaireOptionsResults(res) {
                    this.model = res.items[0];
                },
                typeChange(v) {
                    if (v == 3) {
                        this.typeTwo = true;
                    } else {
                        this.typeTwo = false;
                    }
                },
                addOptions() {
                    this.$refs['editOptionForm'].validate((valid) => {
                        if (valid) {
                            let item = this.editOptionForm;
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
                            this.$refs.editOptionForm.resetFields();
                            this.typeTwo = false;
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                },

            },
            watch:{
                model:function(val, oldVal){
                    for (const key in this.editOptionForm) {
                        if (this.editOptionForm.hasOwnProperty(key)) {
                            this.editOptionForm[key] = val[key];
                        }
                    }
                }
            },
            created(){
                let NewObj = new QuestionnaireOptionsSelect({}, this.getQuestionnaireOptionsResults, this);
                this.questionnaireOptionsResults = NewObj;
            }

        }
    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
        .col{
            height: 36px;
        }
    </style>
      
    