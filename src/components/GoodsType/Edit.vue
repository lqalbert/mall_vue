<template>
    <div >
        <MyDialog title="编辑" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm" ref="editForm"  :label-width="labelWidth"   :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="类型名称" prop="type_name" >
                            <el-input class="name-input" v-model="editForm.type_name"  auto-complete="off" placeholder="请填写类型名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="属性标签" prop="type_attr">
                    <el-checkbox-group v-model="editForm.type_attr">
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
                    @click="formSubmit('editForm')"
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
    name: 'Edit',
    mixins:[DialogForm],
    props:{
        specs:{
            type: Array,
            default:function(){
                return [];
            }
        }
    },
    data () {
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            
            state7: this.addOpen,
            editForm:{
                type_name:"",
                type_attr:[],
            },
            model:null,
        }
    },
    methods:{
      onOpen(param){
        this.model = param.params.model;
        this.model.type_attr = this.model.type_attr.split(',')
        console.log(this.model);
      },
      getAjaxPromise(model){
          //console.log(model);
          return this.ajaxProxy.update(model.id, model);
      },
    },
    watch:{
      model:function(val, oldVal){
          for (const key in this.editForm) {
              if (this.editForm.hasOwnProperty(key)) {
                  this.editForm[key] = val[key];
              }
          }
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
      