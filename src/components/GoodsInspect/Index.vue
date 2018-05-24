<template>
    <div >
        <el-row>
            <el-col :span="10">
                <div class="grid-content bg-purple">
                        <el-form :model="addForm" ref="addForm" :labelPosition="labelPosition" :labelWidth="labelWidth">
                            <el-row>
                                <el-col :span="14">
                                    <el-form-item label="快递单号" prop="carton_name" >
                                        <el-input v-model="addForm.carton_name" placeholder="请填写纸箱类型"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="14">
                                    <el-form-item label="商品编号" prop="carton_model" >
                                        <el-input v-model="addForm.carton_model" placeholder="请填写纸箱型号"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="14">
                                    <el-form-item label="" prop="carton_number" >
                                        <el-checkbox-group v-model="addForm.carton_number">
                                            <el-checkbox label="快递验货"></el-checkbox>
                                            <el-checkbox label="完成自动提交"></el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="14">
                                    <el-form-item label="进度" prop="remark">
                                        3/5
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="14" :offset="6">
                                    <el-button type="primary">提  交</el-button>
                                </el-col>
                            </el-row>
                        </el-form>

                </div>
            </el-col>

            <el-col :span="14">
                <div class="grid-content bg-purple-light">
                    <el-row>
                        <el-col :span="12" :offset="8">
                            <h1>快递单号:0000000001</h1>
                        </el-col>
                    </el-row>
                    <hr>
                    <el-row>
                        <el-row>
                            <el-col :span="15" >
                                <span>收件人信息</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7" :offset="1">
                                姓名:张三
                            </el-col>
                            <el-col :span="7" :offset="1">
                                手机:13588888888
                            </el-col>
                            <el-col :span="7" :offset="1">
                                发货单打印状态:已打印
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7" :offset="1">
                                省份:四川
                            </el-col>
                            <el-col :span="7" :offset="1">
                                城市:成都
                            </el-col>
                            <el-col :span="7" :offset="1">
                                区县:青阳区
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12" :offset="1">
                                地址:四川成都高新区天府三街10086号
                            </el-col>
                        </el-row>
                    </el-row>
                    <hr>
                    <el-row >
                        <el-row>
                            <el-col :span="9" :offset="3">未核对商品</el-col>
                            <el-col :span="9" :offset="3">已核对商品</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="5">名称</el-col>
                            <el-col :span="5">数量</el-col>
                            <el-col :span="2">&nbsp;</el-col>
                            <el-col :span="5">名称</el-col>
                            <el-col :span="5">数量</el-col>
                            <el-col :span="2">&nbsp;</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="5">洗面奶</el-col>
                            <el-col :span="5">2 </el-col>
                            <el-col :span="2">
                                <el-button type="primary" size="mini" icon="plus"></el-button>
                            </el-col>
                            <el-col :span="5">爽肤水</el-col>
                            <el-col :span="5">3 </el-col>
                            <el-col :span="2">
                                <el-button type="primary" size="mini" icon="plus"></el-button>
                            </el-col>

                        </el-row>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import PageMix from '@/mix/Page';
export default {
    name: 'GoodsInspect',
    pageTitle:"验货",
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
                remark:'',
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
  