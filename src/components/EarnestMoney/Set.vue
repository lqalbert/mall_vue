<template>
    <div>
        <MyDialog title="设置" :name="name" :width="width" :height="height" @before-open="onBeforeOpen">
            <el-form :model="addForm"  ref="addForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="返还类型" prop="type">
                            <el-select clearable  placeholder="请选择"  v-model="addForm.type" >
                                <el-option v-for="(v, index) in types"
                                    :label="v" 
                                    :value="index"
                                    :key="index">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="运营比例YK" prop="yk" >
                            <el-input placeholder="请输入内容" v-model="addForm.yk">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="运营比例赠品YZ" prop="yz" >
                            <el-input placeholder="请输入内容" v-model="addForm.yz">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="仓库扣除C" prop="c" >
                            <el-input placeholder="请输入内容" v-model="addForm.c">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="赠品折扣ZN" prop="zn" >
                            <el-input placeholder="请输入内容" v-model="addForm.zn">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="京东扣点J" prop="j" >
                            <el-input placeholder="请输入内容" v-model="addForm.j">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="运营承担Y" prop="y" >
                            <el-input placeholder="请输入内容" v-model="addForm.y">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="内购折扣N" prop="n" >
                            <el-input placeholder="请输入内容" v-model="addForm.n">
                                <template slot="append">%</template>
                            </el-input>
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
import DialogForm from '@/mix/DialogForm';

import { mapGetters } from 'vuex';

export default {
    name: 'Add',
    mixins:[DialogForm],
    data () {
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            types:[
                "即时返还",
                "发货时返还",
                "签收时返还"
            ],
            
            addForm:{
                type:"",
                yk:"",
                yz:"",
                c:"",
                zn:"",
                j:"",
                y:"",
                n:""
            },
            rules:{
                // money:[
                //     { required: true, message:'金额未输入或输入的格式不正确', pattern:/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/ , trigger:'blur',min:0 }
                // ],
                // department_id:[
                //     {required: true, message:'请选择部门', type: 'number', trigger:'blur'}
                // ] ,
                // remark:[
                //     { message:'输入内容最大长度为200', type: 'string', trigger:'blur', max:200}
                // ]
            }
        }
    },
    computed:{
        ...mapGetters({
            // 'creator_id':'user_id',
        })
    },
    methods:{
        getAjaxPromise(model){
            return this.ajaxProxy.saveSet(model);
        },
        onBeforeOpen(){
            this.ajaxProxy.getSet().then((response)=>{
                const model = response.data.data;
                this.addForm.type = model.type;
                this.addForm.yk = model.yk;
                this.addForm.yz = model.yz;
                this.addForm.c = model.c;
                this.addForm.zn = model.zn;
                this.addForm.j = model.j;
                this.addForm.y = model.y;
                this.addForm.n = model.n;
                // this.addForm.appendage_rate = model.appendage_rate;
                // this.addForm.sale_rate = model.sale_rate;
                // this.addForm.return_rate = model.return_rate;
            });
        } 
    },
    created(){
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
      