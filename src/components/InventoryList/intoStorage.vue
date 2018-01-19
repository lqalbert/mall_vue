<template>
    <MyDialog title="商品入库" :name="name" :width="width" :height="height">
        <el-form :model="intoForm" :inline="true" class="demo-form-inline" ref="intoForm">
            <el-form-item label="商品名称">
                <el-input v-model="intoForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品类型">
                <el-select v-model="intoForm.type" placeholder="请选择商品类型">
                    <el-option label="美妆" value="美妆"></el-option>
                    <el-option label="爽肤" value="美妆"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品数量">
                <el-input-number v-model="intoForm.amount" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="商品型号">
                <el-input v-model="intoForm.version"></el-input>
            </el-form-item>
            <el-form-item label="商品批次">
                <el-input v-model="intoForm.branch"></el-input>
            </el-form-item>
            <el-form-item label="入库时间">
                <el-date-picker
                        v-model="intoForm.action_time"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        @change="getTime"
                        placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="入库人">
                <el-select v-model="intoForm.action_user" placeholder="请选择入库人">
                    <el-option label="李达" value="李达"></el-option>
                    <el-option label="刘旭" value="刘旭"></el-option>
                    <el-option label="池沼" value="池沼"></el-option>
                    <el-option label="徐杰" value="徐杰"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="dialog-foot" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button :observer="dialogThis" @click="addStorage()" type="primary">确 定</el-button>
        </div>
    </MyDialog>
</template>

<script>
    import DialogForm from '../../mix/DialogForm'
    export default {
        name:'intoStorage',
        mixins:[DialogForm],
        props:{
        },
        data(){
            return{
                dialogThis:this,
                intoForm:{
                    types:'',
                    name: '',
                    type:'',
                    version:'',
                    amount:'',
                    branch:'',
                    action_time:'',
                    action_user:''
                }

            }
        },
        methods:{
            addStorage:function () {
                this.intoForm.types='入库';
                this.$emit('addStorage',this.intoForm)
                this.$modal.hide(this.name)
                //console.log(this.intoForm)
            },
            getTime:function (val) {
                this.intoForm.action_time=val
            }
        }
    }
</script>

<style>
</style>