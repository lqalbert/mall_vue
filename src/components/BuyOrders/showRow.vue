<template>
    <div >
        <Dialog title="查看" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="rowForm" ref="rowForm" :label-width="labelWidth" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="产品类型" prop="pdt_type">
                            <el-input v-model="rowForm.pdt_type" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="产品名称" prop="pdt_name">
                            <el-input v-model="rowForm.pdt_name" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label="客户姓名" prop="cus_name">
                            <el-input v-model="rowForm.cus_name" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="销售员工" prop="sale_name">
                            <el-input v-model="rowForm.sale_name" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label="数量" prop="pdt_num">
                            <el-input v-model="rowForm.pdt_num" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="购买时间" prop="buy_time">
                            <el-input v-model="rowForm.buy_time" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button @click="formSubmit('rowForm')" type="primary">确 定</el-button>
            </div>
        </Dialog>
    </div>
</template>

<script>
    import DialogForm from '../../mix/DialogForm';
    export default {
        name: 'addDialog',
        mixins:[DialogForm],
        props:{
            
        },
        data () {
            return {
                labelPosition:"right",
                labelWidth:'100px',
                rowForm:{
                    pdt_type:'',
                    pdt_name:'',
                    cus_name:'',
                    sale_name:'',
                    pdt_num:'',
                    buy_time:'',
                },

            }
        },

        methods:{
            addFormSubmit:function(){
                console.log(this.rowForm);
                this.state6=false;
            },
            closeDialog:function(){
                this.state6=false;
            },
            pdtTimeDateChange(v){
                this.rowForm.pdt_time = v;
            },
            intoTimeDateChange(v){
                this.rowForm.into_time = v;
            },
            onOpen(event){
              this.rowForm = event.params.row;
            }
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

