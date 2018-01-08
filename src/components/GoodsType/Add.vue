<template>
    <div >
        <Dialog title="添加" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm"  :label-width="labelWidth"   :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="类型名称" prop="type_name" >
                            <el-input class="name-input" v-model="addForm.type_name"  auto-complete="off" placeholder="请填写类型名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="属性标签" prop="type_attr">
                    <el-checkbox-group v-model="addForm.type_attr">
                        <el-checkbox label="颜色">颜色</el-checkbox>
                        <el-checkbox label="尺寸">尺寸</el-checkbox>
                        <el-checkbox label="产地">产地</el-checkbox>
                        <el-checkbox label="内存">内存</el-checkbox>
                        <el-checkbox label="CPU">CPU</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
    
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button 
                    @click="formSubmit('addForm')"
                    :observer="dialogThis">
                    保 存
                </submit-button>
            </div>

        </Dialog>
    </div>
</template>

<script>
import DialogForm from '../../mix/DialogForm';
export default {
    name: 'Add',
    mixins:[DialogForm],
    data () {
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            state7: this.addOpen,
            addForm:{
                type_name:"",
                type_attr:[],
                
            },

        }
    },
    methods:{
        getAjaxPromise(model){
            //console.log(model);
            return this.ajaxProxy.create(model);
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
      