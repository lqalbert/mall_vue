<template>
        <div >
            <MyDialog title="添加关联" :name="name" :width="width" :height="height" @before-open="onBeforeOpen" @before-close="onBeforeClose">
                <el-form :model="addForm"  ref="addForm" :rules="rules" :label-width="labelWidth"   :label-position="labelPosition">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="商品" prop="goods_id">
                                    <el-select
                                        v-model="goods_id"
                                        filterable
                                        remote
                                        placeholder="请输入关键词"
                                        :remote-method="remoteMethod"
                                        :loading="loading">
                                        <el-option
                                            v-for="item in goodslist"
                                            :key="item.id"
                                            :label="item.goods_name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                            </el-form-item>
                        </el-col>
                       
                        <el-col :span="12">
                            <el-form-item label="分类名" >
                                {{ parentName }}
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
        import GoodsDetailAjax from '@/ajaxProxy/GoodsDetails';
        export default {
            mixins:[DialogForm],
            name: 'addDialog',
            data () {
                return {
                    dialogThis:this,
                    labelPosition:"right",
                    labelWidth:'80px',
                    parentName:"",
                    rules:{
                        label: [
                            { required: true, message: '请输入分类名称', trigger: 'blur' },
                        ],
                    },
                    goods_id:null,
                    addForm:{
                        front_id:'',
                    },
                    goodslist:[],
                    loading:true,
                }
            },
            methods:{
                getAjaxPromise(model){
                   return GoodsDetailAjax.update(this.goods_id, model);
                },
                onBeforeOpen(param){
                    let parent = param.params.parent;
                    this.parentName = parent.label;
                    this.addForm.front_id = param.params.front_ids;
                },
                onBeforeClose(){
                    this.goods_id = null;
                },
                remoteMethod(q){
                    if (q != "" ) {
                        this.loading = true;
                        GoodsDetailAjax.get({goods_name:q,fields:['id','goods_name']}).then((response)=>{
                            // console.log(response.data);
                            this.goodslist = response.data.items;
                        }).catch((response)=>{

                        }).then(()=>{
                            this.loading = false;
                        })
                    }
                }
            }
        }
    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
        .name-input{
            max-width: 217px;
        }
    </style>
    
    