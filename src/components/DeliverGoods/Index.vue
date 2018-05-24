<template>
    <div >
        <el-row>
            <el-col :span="10">
                <div class="grid-content bg-purple">
                        <el-form :model="addForm" ref="addForm" :labelPosition="labelPosition" :labelWidth="labelWidth">
                            <el-row>
                                <el-col :span="14">
                                    <el-form-item label="快递单号" prop="carton_name" >
                                        <el-input v-model="addForm.carton_name" placeholder="请填写快递单号"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="14">
                                    <el-form-item label="商品重量" prop="carton_model" >
                                        <el-input v-model="addForm.carton_model" placeholder="请填写商品重量"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="10">
                                    <el-form-item label="完成后自动提交" prop="carton_wide" >
                                        <el-switch
                                                v-model="addForm.carton_wide"
                                                on-text=""
                                                off-text="">
                                        </el-switch>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="后置打印" prop="carton_long" >
                                        <el-switch
                                                v-model="addForm.carton_long"
                                                on-text=""
                                                off-text="">
                                        </el-switch>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="14">
                                    <el-form-item label="称重误差" prop="remark">
                                        <el-slider v-model="addForm.remark"></el-slider>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="14" :offset="6">
                                    <el-button type="primary">确定发货</el-button>
                                </el-col>
                            </el-row>
                        </el-form>

                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import PageMix from '@/mix/Page';
export default {
    name: 'DeliverGoods',
    pageTitle:"同步发货",
    mixins: [PageMix],
    data () {
        return {
            labelPosition:"right",
            labelWidth:'120px',
            addForm:{
                carton_name:'',
                carton_model:'',
                carton_long:'',
                carton_wide:'',
                carton_high:'',
                carton_weight:'',
                carton_number:[],
                remark:0,
            },
            num1:2,
            num2:3,
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  