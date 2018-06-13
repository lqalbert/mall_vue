<template>
    <div >
        <MyDialog title="添加商品" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="searchForm" ref="searchForm"  :label-width="labelWidth"  :label-position="labelPosition">　     
                <el-row>
                    <el-col :span="12">
                        <!-- <el-form-item label="配送中心" prop="entrepot_id">
                            <el-select
                                    clearable
                                    v-model="searchForm.entrepot_id"
                                    size="small"
                                    placeholder="配送中心">
                                <el-option v-for="v in distributors" :label="v.name"
                                            :value="v.id" :key="v.id">
                                </el-option>
                            </el-select>
                        </el-form-item> -->
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="商品类型" prop="cate_type_id">
                            <el-select
                                    v-model="searchForm.cate_type_id"
                                    size="small"
                                    placeholder="商品类型"
                                    @change="typeChange">
                                <el-option v-for="v in types" :label="v.label" :value="v.id" :key="v.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品品类" prop="cate_kind_id">
                            <el-select
                                    v-model="searchForm.cate_kind_id"
                                    size="small"
                                    placeholder="商品品类">
                                <el-option v-for="v in cate_kinds" :label="v.label"
                                        :value="v.id" :key="v.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="商品编号" prop="sku_sn">
                            <el-input v-model="searchForm.sku_sn" size="small" 
                            class="name-input" placeholder="商品编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="searchForm.goods_name" size="small" 
                            class="name-input" placeholder="商品名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
    
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button @click="handleReset">重 置</el-button>
                <el-button type="primary" @click="handleSubmit">查 询</el-button>

                <!-- <submit-button
                        @click="formSubmit('searchForm')"
                        :observer="dialogThis">
                    查 询
                </submit-button> -->
            </div>

        </MyDialog>
    </div>
</template>
    
<script>
    import DialogForm from '@/mix/DialogForm';
    
    export default {
        name: 'select-add-dialog',
        mixins:[DialogForm],
        props:{
            types:{
                type:Array,
                default:function () {
                    return [];
                }
            },
            distributors:{
                type:Array,
                default:function () {
                    return [];
                }
            }
        },
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'80px',
                cate_kinds:[],
                searchForm:{
                    entrepot_id:'',
                    cate_type_id:'',
                    cate_kind_id:'',
                    sku_sn:'',
                    goods_name:'',
                }
            }
        },
    
        methods:{
            onOpen(param){
                this.searchForm.entrepot_id = param.params.model;
            },
            handleReset(){
                // this.$refs.searchForm.resetFields();
                Object.assign(this.searchForm,this._queryForm);
                // this.$parent.$emit('search-tool-change', this.searchForm);
            },
            handleSubmit(){
                this.$parent.$emit('search-tool-change', this.searchForm);
                this.handleClose();
                this.$refs['searchForm'].resetFields();
            },
            typeChange(v){
                this.searchForm.cate_kind_id = '';
                for (let index = 0; index < this.types.length; index++) {
                    const element = this.types[index];
                    if (element.id == v) {
                        this.cate_kinds = element.children;
                    }
                }
            },
    
        },
        created(){
            
            this._queryForm = {};
            Object.assign(this._queryForm,this.searchForm);
        }
    
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .name-input{
        max-width: 217px;
    }
</style>
          
