<template>
    <div >
        <MyDialog title="审核" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="checkForm" ref="checkForm" :label-width="labelWidth" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item  label="是否通过" prop="check_status">
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
                        @click="formSubmit('checkForm')" >
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
                order_statuslist:[
                    {id:'0',status:'未付款'},
                    {id:'1',status:'待确认'},
                    {id:'2',status:'已完成'},
                    {id:'3',status:'已关闭'},
                    {id:'4',status:'退款中'},
                ],
                shipping_statuslist:[
                    {id:'0',status:'待发货'},
                    {id:'1',status:'已发货'},
                    {id:'2',status:'已收货'},
                ],
                check_status:[
                    {id:'0', status:'通过'},
                    {id:'1', status:'未通过'},
                    {id:'2', status:'未审核'}
                ],

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
                /** 需要对直接传递过来的数据进行处理，中文转成英文 */
                var check_status = event.params.row.check_status;
                var true_check_status = this.check_status;
                var i = 0;
                var newdata = [];
                newdata = event.params.row;
                for(i=0;i<true_check_status.length;i++)
                {
                    if(check_status==true_check_status[i].status)
                    {
                        event.params.row.check_status = true_check_status[i].id;
                    }
                }
                for(i=0;i<this.order_statuslist.length;i++)
                {
                    if(event.params.row.order_status==this.order_statuslist[i].status)
                    {
                        event.params.row.order_status = this.order_statuslist[i].id;
                    }
                }
                for(i=0;i<this.shipping_statuslist.length;i++)
                {
                    if(event.params.row.shipping_status==this.shipping_statuslist[i].status)
                    {
                        event.params.row.shipping_status = this.shipping_statuslist[i].id;
                    }
                }
              this.checkForm = event.params.row;
            },
            getAjaxPromise(model){
                delete model.cus_name;
                delete model.user_name;
                return this.ajaxProxy.update(model.id, model);
            },
            realSubmit(model, name){
                let ajaxPromise =  this.getAjaxPromise(model);
                let vmthis = this;

                ajaxPromise.then(function(response){
                    vmthis.$message.success('操作成功');
                    vmthis.$refs[name].resetFields();
                    vmthis.$emit('submit-success', name);
                })
                    .catch(function(error){
                        if(error.response){
                            //存在请求，但是服务器的返回一个状态码
                            //他们都在2xx之外
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        }else{
                            //一些错误是在设置请求时触发的
                            console.log('Error',error.message);
                        }
                        console.log(error);
                        vmthis.$message.error('出错了');
                    })
                    .then(function(){
                        // vmthis.setSubmited(); // SubmitButtonMix
                        vmthis.$emit('submit-final', name);
                    });
            }
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

