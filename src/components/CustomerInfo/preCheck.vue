<template>
    <div >
        <MyDialog title="客户预查" :name="name" :width="width" :height="height" >
<el-row>
    <el-col :span="24">
        <el-form :model="searchForm" class="search-bar" :inline="true" ref="searchForm"  :label-width="labelWidth" :label-position="labelPosition">
            <el-form-item prop="qq">
                <el-input v-model="searchForm.qq" placeholder="QQ号" size="small"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input v-model="searchForm.phone" placeholder="手机号" size="small"></el-input>
            </el-form-item>
            <el-form-item prop="weixin">
                <el-input v-model="searchForm.weixin" placeholder="微信号" size="small"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" size="small"  @click="searchChange()">查询</el-button>
                <el-button type="primary" size="small"  @click="searchReset('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>

    </el-col>
</el-row>
<el-row>
    <el-col :span="24">
    <el-table :data="list" border>
        <el-table-column prop="name" label="客户姓名" align="center"></el-table-column>
        <el-table-column prop="mid_relative.user_name" label="所属员工" align="center"></el-table-column>
    </el-table>
</el-col></el-row>

        </MyDialog>
    </div>
</template>

<script>
import SearchTool from '../../mix/SearchTool';
import DialogForm from '../../mix/DialogForm';
import AreaSelect from '../../packages/AreaSelectProxy';
export default {
    name: 'Edit',
    mixins:[SearchTool,DialogForm],
    props:{
        ajaxProxy:{
            required:true,
            type: Object,
            default: null
        },
        preCheckData:{
            required:true,
            type: Array,
            default: []
        }
    },
    data () {
        return {
            list:this.preCheckData,
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'200px',
            searchForm:{
                qq:'',
                weixin:"",
                phone:'',
            },
            model:''
        }
    },
    methods:{
        searchChange(){
        this.$emit('preCheckSearchChange',this.searchForm)
        },
        searchReset(name){
            this.searchToolReset(name);
            this.list=[];
        },
    },
    watch:{
        preCheckData:function(val,oldval){
            this.list=val;
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
      