<template>
        <div>
            <MyDialog title="添加" :name="name" :width="width" :height="height">
                <el-form :model="addForm"  ref="addForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="名称" prop="name" >
                                <el-input class="name-input"  placeholder="" v-model="addForm.name"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="配送中心" prop="entrepot_id">
                                <el-select v-model.number="addForm.entrepot_id" >
                                    <el-option v-for="(v,index) in entrepots"
                                        :label="v.name" 
                                        :value="v.id"
                                        :key="v.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="快递公司" prop="express" >
                                <el-input class="name-input"  placeholder="" v-model="addForm.express"></el-input>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="是否统一运费" prop="is_unify" >
                                <el-radio class="radio" v-model="addForm.is_unify" :label="0">否</el-radio>
                                <el-radio class="radio" v-model="addForm.is_unify" :label="1">是</el-radio>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-show="isUnify">
                            <el-form-item label="统一运费" prop="unify_fee" >
                                <el-input v-model="addForm.unify_fee"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <div v-show="!isUnify">
                        <el-row>
                            <el-col :span="18">
                                <el-form-item label="支持包邮吗" prop="is_include" >
                                    <el-radio class="radio" v-model="addForm.is_include" :label="0">否</el-radio>
                                    <el-radio class="radio" v-model="addForm.is_include" :label="1">是</el-radio>
                                    <span>&nbsp;&nbsp;&nbsp;如果不支持包邮，则在包邮时不能按包邮方式计算运费</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
    
                        <el-row v-show="isInclude">
                            <el-col :span="12">
                                <el-form-item label="满足包邮金额" prop="stand_fee" >
                                    <el-input class="name-input"  placeholder="" v-model="addForm.stand_fee"><template slot="append">(含)</template></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="包邮额外费用" prop="stand_extra" >
                                    <el-input class="name-input"  placeholder="" v-model="addForm.stand_extra"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
    
                        <el-row >
                            <el-col :span="18">
                                <el-form-item label="不包邮基本费用" prop="basic_fee" >
                                    <el-input class="name-input"  placeholder="" v-model="addForm.basic_fee"></el-input>
                                    <span>特殊地区另外存储</span>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        
                    </div>
                    <el-row >
                        <el-col :span="18">
                            <el-form-item label="默认模板" prop="is_default" >
                                <el-radio class="radio" v-model="addForm.is_default" :label="0">否</el-radio>
                                <el-radio class="radio" v-model="addForm.is_default" :label="1">是</el-radio>
                                <span>&nbsp;&nbsp;&nbsp;计算运费的默认模板</span>
                            </el-form-item>
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
    

    import { mapGetters } from 'vuex';
    
    export default {
        name: 'Add',
        mixins:[DialogForm],
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'100px',
               
               
                addForm:{
                    entrepot_id:"",
                    name:"默认",
                    express:"",
                    is_unify:0,
                    is_include:0,
                    unify_fee:"0.00",
                    stand_fee:"268.00",
                    stand_extra:"0.00",
                    basic_fee:"10.00",
                    is_default:0
                },
                rules:{
                    name:[
                        { required: true, message:"请输入模板名", type:'string'},
                        { max:20, message:"最长不超过20个字符"}
                    ],
                    express:[
                        { max: 20 , message:"最长不超过20个字符"}
                    ],
                    entrepot_id:[
                        { required: true, message:"请选择配送中心", type:'number'}
                    ]
                },
                
            }
        },
        computed:{
            ...mapGetters({
                'entrepots':'getEntrepots'
            }),
            isInclude(){
                return this.addForm.is_include == '1';
            },
            isUnify(){
                return this.addForm.is_unify == '1';
            }
        },
        methods:{
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            } 
        },
        created(){

        }
    }
    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
        .name-input{
            max-width: 217px;
        }
    </style>
          