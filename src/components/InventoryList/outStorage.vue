<template>
    <MyDialog title="商品出库" :name="name" :width="width" :height="height" @before-open="onOpen">
        <el-form :model="outForm" :inline="true" class="demo-form-inline" ref="outForm">
            <el-form-item label="商品名称">
                <el-input v-model="outForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品类型">
                <el-select v-model="outForm.type" placeholder="请选择商品类型">
                    <el-option label="美妆" value="美妆"></el-option>
                    <el-option label="爽肤" value="美妆"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品数量">
                <el-input-number v-model="outForm.amount" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="商品型号">
                <el-input v-model="outForm.version"></el-input>
            </el-form-item>
            <br/>
            <el-form-item label="商品批次">
                <el-input v-model="outForm.branch"></el-input>
            </el-form-item>
            <el-form-item label="出库时间">
                <el-date-picker
                        v-model="outForm.action_times"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        @change="getTime"
                        placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="出库人">
                <el-select v-model="outForm.action_users" placeholder="请选择出库人">
                    <el-option label="李达" value="李达"></el-option>
                    <el-option label="刘旭" value="刘旭"></el-option>
                    <el-option label="池沼" value="池沼"></el-option>
                    <el-option label="徐杰" value="徐杰"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="销售人员">
                <el-select v-model="outForm.sale_user" placeholder="请选择销售人员">
                    <el-option label="李达" value="李达"></el-option>
                    <el-option label="刘旭" value="刘旭"></el-option>
                    <el-option label="池沼" value="池沼"></el-option>
                    <el-option label="徐杰" value="徐杰"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="销售时间">
                <el-date-picker
                        v-model="outForm.sale_time"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        @change="getTimeS"
                        placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="审核人员">
                <el-select v-model="outForm.review_user" placeholder="请选择审核人员">
                    <el-option label="李达" value="李达"></el-option>
                    <el-option label="刘旭" value="刘旭"></el-option>
                    <el-option label="池沼" value="池沼"></el-option>
                    <el-option label="徐杰" value="徐杰"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核时间">
                <el-date-picker
                        v-model="outForm.review_time"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        @change="getTimeR"
                        placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="订单物流">
                <el-select v-model="outForm.logistics" placeholder="请选择物流">
                    <el-option label="顺丰" value="顺丰"></el-option>
                    <el-option label="韵达" value="韵达"></el-option>
                    <el-option label="圆通" value="圆通"></el-option>
                    <el-option label="中通" value="中通"></el-option>
                    <el-option label="百世" value="百世"></el-option>
                    <el-option label="邮政" value="邮政"></el-option>
                    <el-option label="菜鸟" value="菜鸟"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="dialog-foot" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button :observer="dialogThis" @click="addStorage" type="primary">确 定</el-button>
        </div>
    </MyDialog>
</template>

<script>
    import DialogForm from '../../mix/DialogForm'
    export default {
        name:'outStorage',
        mixins:[DialogForm],
        props:{
        },
        data(){
            return{
                dialogThis:this,
                outForm:{
                    types:'',
                    name: '',
                    type:'',
                    amount:'',
                    version:'',
                    branch:'',
                    sale_user:'',
                    review_user:'',
                    action_times:'',
                    action_users:'',
                    sale_time:'',
                    review_time:'',
                    logistics:''
                },
                model:''
            }
        },
        methods:{
            onOpen:function (param) {
                this.model = param.params.model;
            }
            ,
            addStorage:function () {
                this.outForm.types='出库';
                this.$emit('addStorages',this.outForm)
                this.$modal.hide(this.name)
                //console.log(this.outForm)
            },
            getTime:function (val) {
                this.outForm.action_time=val
            },
            getTimeS:function (val) {
                this.outForm.sale_time=val
            },
            getTimeR:function (val) {
                this.outForm.review_time=val
            },
        },
        watch:{
            model:function(val, oldVal){
                for (const key in this.outForm) {
                    if (this.outForm.hasOwnProperty(key)) {
                        this.outForm[key] = val[key]
                    }
                }
            }
        },
    }
</script>

<style>
</style>