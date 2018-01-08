<template>
    <div >
        <Dialog title="编辑" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm" ref="editForm"  :label-width="labelWidth"   :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="规格名称" prop="spec_name" >
                            <el-input class="name-input" v-model="editForm.spec_name"  auto-complete="off" placeholder="请填写规格名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="展示方式" prop="spec_way">
                            <el-radio-group v-model="editForm.spec_way">
                              <el-radio label="文字">文字</el-radio>
                              <el-radio label="图片">图片</el-radio>
                              <el-radio label="颜色">颜色</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
    
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button 
                    @click="formSubmit('editForm')"
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
    name: 'Edit',
    mixins:[DialogForm],
    data () {
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            
            state7: this.addOpen,
            editForm:{
                spec_name:"",
                spec_way:"",
                
            },
            model:null,
        }
    },
    methods:{
      onOpen(param){
        console.log(param);
        this.model = param.params.model;
      },
      getAjaxPromise(model){
          console.log(model);
          return this.ajaxProxy.update(model.id, model);
      },
    },
    watch:{
      model:function(val, oldVal){
          console.log(val);
          for (const key in this.editForm) {
              if (this.editForm.hasOwnProperty(key)) {
                  this.editForm[key] = val[key]
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
      