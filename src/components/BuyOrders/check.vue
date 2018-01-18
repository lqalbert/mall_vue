<template>
    <div >
        <MyDialog title="审核" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="checkForm" ref="checkForm" :label-width="labelWidth" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="是否通过" prop="check_satus">
                            <el-select size="small" placeholder="是否通过" v-model="checkForm.check_status">
                              <el-option value="1" label="通过"></el-option>
                              <el-option value="2" label="不通过"></el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        :observer="dialogThis"
                        @click="formSubmit('rowInfoForm')" >
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>

<script>
    import DialogForm from '../../mix/DialogForm';
    import SubmitButton from '../../components/common/SubmitButton';
    export default {
        name: 'addDialog',
        mixins:[DialogForm],
        props:{
            
        },
        ajaxProxy:{
            required:true,
            type: Object,
            default: null
        },
        data () {
            return {
                labelPosition:"right",
                labelWidth:'100px',
                checkForm:{
                    check_status:'1',
                },

            }
        },

        methods:{
            addFormSubmit:function(){
                console.log(this.checkForm);
                this.state6=false;
            },
            closeDialog:function(){
                this.state6=false;
            },
            pdtTimeDateChange(v){
                this.checkForm.pdt_time = v;
            },
            intoTimeDateChange(v){
                this.checkForm.into_time = v;
            },
            onOpen(event){
              //this.checkForm = event.params.row;
            },
            getAjaxPromise(model){
                console.log(1111);return;
                console.log(model);return;
                return this.ajaxProxy.update(model.id, model);
            },
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

