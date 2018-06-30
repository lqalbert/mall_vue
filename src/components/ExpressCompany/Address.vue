<template>
        <div>
            <MyDialog title="选择地址" :name="name" :width="width" :height="height" @before-open="onOpen">
                <el-form :model="editForm" ref="editForm" :label-width="labelWidth"   :label-position="labelPosition">
                    <el-alert
                        title="请选择正确的地址 测试数据"
                        type="warning"
                        show-icon>
                      </el-alert>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item prop="send_address"  label="地址">
                                <el-radio-group v-model="editForm.send_address">
                                    <el-radio v-for="item in addresslist" :label="item.address" :key="item.id">{{ item.name }} - {{item.address.province}} - {{item.address.town}} - {{item.address.city}} - {{item.address.district}} - {{item.address.detail}} </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                </el-form>
                <div slot="dialog-foot" class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <submit-button
                            :observer="dialogThis"
                            @click="formSubmit('editForm')">
                        保 存
                    </submit-button>
                </div>
            </MyDialog>
        </div>
    </template>
    <script>
    import DialogForm from '@/mix/DialogForm';
    import APP_CONST from '@/config';
    import { mapGetters } from 'vuex';
    
    export default {
        name: 'Edit',
        mixins:[DialogForm],
        props:{
            ajaxProxy:{type: Object}
        },
        data(){
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'80px',
                editForm:{
                    id:'',
                    send_address:null
                },
                addresslist:[]
            }
        },
        methods:{
            getAjaxPromise(model){
                return this.ajaxProxy.updateAddress(model.id, model);
            },
            onOpen(param){
                this.editForm.id = param.params.id;
                this.ajaxProxy.getAddress(param.params.id).then((Response)=>{
                    if (Response.data.state ==1) {
                        //waybillApplySubscriptionCols
                        this.parseAddress(Response.data.data['waybillApplySubscriptionCols']);
                    } else {
                        this.$message.error(Response.data.msg);
                    }
                }).catch((Response)=>{
                    this.$message.error(Response.data.msg);
                });

            },

            parseAddress(ar){
                let re = [];
                
                if (ar.length == 0) {
                    this.$message.error('请联系管理员，没有找到发货地址');
                    return ;
                }

                for (let index = 0; index < ar.length; index++) {
                    const element = array[index];
                    var d = {};
                    if (element.branchAccountCols.length) {
                        d.address = element.branchAccountCols[0].shippAddressCols[0];
                        d.name    = element.branchAccountCols[0].branchName;
                    }

                    re.push(d);   
                }


                this.addresslist = re;
            }
            
        },
        created(){
            this.addresslist = [{
                    address:{
                        "province":"浙江省",
                        "town":"仓前街道",
                        "city":"杭州市",
                        "district":"余杭区",
                        "detail":"文一西路"
                    },
                    name:'杭州网点'
                }];
        },
        
    
    }
    </script>
    <style scoped>
        .name-input{
            max-width: 217px;
        }
    </style>
    