<template>
    <div >
        <MyDialog title="添加" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm"  :label-width="labelWidth"   :label-position="labelPosition">

                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="基本信息" name="first">
                            <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="商品名称" prop="goods_name" >
                                            <el-input class="name-input" v-model="addForm.goods_name"  auto-complete="off" placeholder="请填写商品名称"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="商品类型"  prop="goods_type">
                                            <el-select  v-model="addForm.goods_type"  placeholder="请选择类型"  >
                                                <el-option  v-for='(item,key) in typeList' :label="item" :value="key" :key="key"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="商品价格"  prop="goods_price">
                                            <el-input class="name-input" v-model="addForm.goods_price"  auto-complete="off" placeholder="请填写商品价格"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="商品货号"  prop="goods_number">
                                            <el-input class="name-input" v-model="addForm.goods_number"  auto-complete="off" placeholder="请填写商品货号"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="单位类型"  prop="unit_type">
                                            <el-select v-model='addForm.unit_type'>
                                                <el-option v-for="(v,key) in unit_types" :label="v.name"
                                                           :value="v.id" :key="key">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="商品规格" name="second">
                            <el-table>
                                <el-table-column
                                prop="sku"
                                label="SKU"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="规格"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="price"
                                label="价格">
                                </el-table-column>
                                <el-table-column
                                prop="num"
                                label="库存">
                                </el-table-column>
                          </el-table>
                            这一块是动态的 跟据不同类型的商品生成不同的规格
                            <el-form-item label="颜色"  prop="unit_type">
                                <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
                                <AttrItem :form-object="attrForm" type="文本"></AttrItem>
                            </el-form-item>

                            <el-form-item label="尺坟"  prop="unit_type">
                                    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
                                    <AttrItem :form-object="attrForm" type="图片"></AttrItem>
                            </el-form-item>
                            //end of这一块是动态的

                            <el-form-item label="SKU"  prop="unit_type">
                                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                            </el-form-item>

                            <el-form-item label="价格"  prop="unit_type">
                                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                            </el-form-item>

                            <el-form-item label="数量"  prop="unit_type">
                                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                            </el-form-item>

                            <el-form-item  prop="unit_type">
                                <el-button>添加SKU</el-button>
                            </el-form-item>
                          
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" name="third">

                            <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :file-list="fileList2"
                                list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                    </el-tab-pane>
                    
                </el-tabs>
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
import AttrItem from '../common/AttrFormItem';
export default {
    name: 'Add',
    mixins:[DialogForm],
    components:{AttrItem},
    data () {
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            unit_types:[
                {id:'1',name:'瓶'},
                {id:'2',name:'套'},
                {id:'3',name:'盒'},

            ],
            topO:[
                {id:'1',name:'西北区'},
                {id:'2',name:'东南区'},
                {id:'3',name:'沿海区'},

            ],
            typeList:['化妆品','保健品'],

            state7: this.addOpen,
            addForm:{
                goods_name:"",
                goods_type:"",
                goods_price:"",
                goods_number:"",
                remark:"",
                unit_type:'',
            },

            attrForm:{
                value:"",
                addon_value:""
            }

        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
      