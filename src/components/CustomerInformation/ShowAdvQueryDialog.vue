<template>
    <div >
        <MyDialog title="添加客户" :name="name" :width="width" :height="height">
            <el-form ref="advancedQueryForm" :model="advancedQueryForm"  :label-width="labelWidth"   :label-position="labelPosition"  label-width="140px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="name" label="客户姓名">
                            <el-input class="name-input" v-model="advancedQueryForm.name" size="small" placeholder="客户姓名" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="phone" label="手机号">
                            <el-input  class="name-input" v-model="advancedQueryForm.phone" size="small" placeholder="手机号" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="start" label="锁定起始时间">
                            <el-date-picker  v-model="advancedQueryForm.start" size="small" :editable="false" placeholder="请选择起日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item prop="end" label="锁定截止时间">
                            <el-date-picker v-model="advancedQueryForm.end" size="small" :editable="false" placeholder="请选择止日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="track_start" label="最后跟踪起始时间">
                            <el-date-picker v-model="advancedQueryForm.track_start" size="small" :editable="false" placeholder="请选择起日期" >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item prop="track_end" label="最后跟踪截止时间">
                            <el-date-picker v-model="advancedQueryForm.track_end" size="small" :editable="false" placeholder="请选择止日期" >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="type" label="客户类型">
                            <el-select v-model="advancedQueryForm.type" size="small" placeholder="请选择客户类型" >
                                <el-option v-for="(type, key) in customerType" :label="type" :value="key" :key="key"></el-option>
                            </el-select>
                        </el-form-item>
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

    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            status:this.advanceQuery,
            advancedQueryForm:{
                name:'',
                phone:'',
                start:'',
                end:'',
                track_start:'',
                track_end:'',
                type:'',
            },
            customerType:{
                "A":"A.准客户",
                "B":"B.意向客户",
                "C":"C.一般客户",
                "D":"D.未有意向客户",
                "E":"本地化客户",
                "F":"F.黑名单（同行）",
                "N":"N.无效客户",
                "V":"V.成交客户",
                "VX":"VX.审核未通过",
                "VT":"VT.有意见并投诉"
            }
        }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
      