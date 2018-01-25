<template>
    <div >
        <MyDialog title="添加" :name="name" :width="width" :height="height">
            <el-form :model="addForm" ref="addForm"  :label-width="labelWidth"   :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="规格名称" prop="spec_name" >
                            <el-input class="name-input" v-model="addForm.spec_name"  auto-complete="off" placeholder="请填写规格名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="展示方式" prop="spec_way">
                            <el-radio-group v-model="addForm.spec_way">
                              <el-radio label="1">文字</el-radio>
                              <el-radio label="2">图片</el-radio>
                              <el-radio label="3">自选</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row v-show="addForm.spec_way==3">
                    <el-col :span="12">
                        <el-form-item v-for="(i,index) in addForm.items" :label="'选项'+index" :key="index"  :prop="'items.' + index + '.value'" >
                                <el-col :span="11">
                                    <el-input v-model="i.value"  auto-complete="off" ></el-input>
                                </el-col>
                                <el-col :span="1">&nbsp;</el-col>
                                <el-col :span="10"><el-button @click.prevent="removeItem(i)">删除</el-button></el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-button @click.prevent="addItem()">添加</el-button>
                    </el-col>
                </el-row>
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
                spec_name:"",
                spec_way:"1",
                items:[{value:""}]
            },

        }
    },
    methods:{
        getAjaxPromise(model){
            //console.log(model);
            return this.ajaxProxy.create(model);
        },
        removeItem(item){
            var index = this.addForm.items.indexOf(item)
            if (index !== -1) {
                this.addForm.items.splice(index, 1)
            }
        },
        addItem(){
            this.addForm.items.push({value:""});
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
      