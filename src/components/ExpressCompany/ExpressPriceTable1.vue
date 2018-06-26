<template>
    <div>
        <el-row>
            <el-col>
                <el-table :data="ExpressPriceData">

                    <el-table-column label="ID" align="center"  prop="id" width="65">
                    </el-table-column>

                    <el-table-column prop="express_name" label="快递公司" align="center" width="100px">
                    </el-table-column>

                    <el-table-column prop="area_province_name" label="省" align="center">
                    </el-table-column>

                    <el-table-column prop="area_city_name" label="市" align="center">
                    </el-table-column>

                    <el-table-column prop="area_district_name" label="区/县" align="center">
                    </el-table-column>

                    <el-table-column prop="time_limit" label="时效(天)" align="center" width="100px"></el-table-column>

                    <el-table-column prop="first_weight" label="首重" align="center"></el-table-column>
                    <el-table-column prop="first_price" label="首价" align="center"></el-table-column>
                    <el-table-column prop="continued_weight" label="续重" align="center"></el-table-column>
                    <el-table-column prop="continued_price" label="续价" align="center"></el-table-column>
                    <el-table-column prop="start_time" label="开始时间" align="center" width="150px"></el-table-column>
                    <el-table-column prop="end_time" label="结束时间" align="center" width="150px"></el-table-column>
                    <el-table-column prop="is_use" label="启用" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.is_use==1">是</span>
                            <span v-if="scope.row.is_use==0">否</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="remark" label="备注" align="center" :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column  label="操作" align="center" width="200">
                    <template slot-scope="scope">
                    <el-button type="info" size="small" @click="showEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <br>
        <el-row type="flex" justify="end">
            <el-col :span="12" >
                <div class="pull-right">
                    <el-pagination
                            :page-size="pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="total"
                            @current-change="currentChange">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
// import DialogForm from '../../mix/DialogForm';
// import FormMix from '../../mix/Form';
// import APP_CONST from '../../config';
// import DialogMix from '../../mix/Dialog';
// import { mapGetters } from 'vuex';
// import { PHONE_REG } from "@/config/index";
//
// import AreaSelect from '../../packages/AreaSelectProxy';

export default {
    name: 'Add',
    // mixins:[DialogForm,FormMix],
    components: {
    },
    props:{
        ExpressPriceData:{
            type: Array,
            default:function(){
                return [];
            }
        },

        total:{
            type: Number,
            default:0,
        },
    },
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            pageSize:1,
        }
    },
    methods:{

        currentChange(v){
            this.$emit('pageChange',v);
        },


    },

    created(){

    }

}
</script>
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
