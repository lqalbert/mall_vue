<template>
        <div>
            <MyDialog title="添加特殊区域" :name="name" :width="width" :height="height" @before-open="onBeforeOpen">
                <el-form :model="addForm"  ref="addForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="省份" prop="province_id">
                                <el-select  v-model="addForm.province_id" >
                                    <el-option v-for="(v) in provinces"
                                        :label="v.name" 
                                        :value="v.id"
                                        :key="v.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="费用" prop="fee" >
                                <el-input class="name-input"  placeholder="" v-model="addForm.fee"></el-input>
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

    import FreightExtraAjax from '@/ajaxProxy/FreightExtra';
    
    export default {
        name: 'District',
        mixins:[DialogForm],
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'100px',

                addForm:{
                   fee:"18.00",
                   province_id:"",
                   fr_id:""
                },
                rules:{
                   
                },  
            }
        },
        computed:{
            ...mapGetters({
                'provinces':'province'
            }),
            
        },
        methods:{
            getAjaxPromise(model){
                return FreightExtraAjax.create(model);
            },
            onBeforeOpen(param){
                this.addForm.fr_id = param.params.id;
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
          