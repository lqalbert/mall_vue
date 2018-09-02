<template>
    <div>
        <MyDialog title="样品商品展示" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-row>
                <el-col :span="24">
                    样品列表
                    <el-table height="200" border :data="goodsData">
                        <el-table-column label="序号"  width="70" type="index">
                        </el-table-column>
                        <el-table-column label="商品编号" prop="sku_sn" width="150" >
                        </el-table-column>
                        <el-table-column label="商品名称" prop="goods_name" >
                        </el-table-column>
                        <el-table-column label="商品单价" prop="price"  width="100">
                        </el-table-column>
                        <el-table-column label="申请数量" prop="goods_number"  width="100">
                        </el-table-column>
                        <el-table-column label="小记" prop="moneyNotes" width="100" >
                            <template slot-scope="scope">
                                {{parseInt(scope.row.price) * parseInt(scope.row.goods_number)}}
                            </template>
                        </el-table-column>
                        
                    </el-table>
                </el-col>
            </el-row>
            <div slot="dialog-foot" >
                <el-row type="flex" justify="end">
                    <el-col :span="6" >
                        <el-button @click="handleClose">确 定</el-button>
                        <!-- <submit-button
                                ref="submitbutton"
                                @click="handleSubmit"
                                :observer="dialogThis">
                            提交审核
                        </submit-button> -->
                    </el-col>
                </el-row>
            </div>
        </MyDialog>
    </div>
</template>
 
<script>
import DialogForm from '@/mix/DialogForm';
import { mapGetters } from 'vuex';

export default {
    name: 'show-goods',
    mixins:[DialogForm],
    components:{
        
    },
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',

            goodsData:[],
        }
    },
    computed:{
        ...mapGetters([
            'user_id',
            'getUser',
        ]),
    },
    methods:{
        onOpen(param){
            // console.log(param);

            this.goodsData = param.params.row.goods.concat();

        },
    },
    created(){

    },
    
}
</script>
<style scoped>
    .form-item-unique{
        width: 140px !important;
    }
    .name-input{
        max-width: 170px;
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

 