<template>
    <div >
        <MyDialog title="新建问卷" :name="name" :width="width" :height="height"  @before-open="onOpen">
            <el-form :model="addForm" :rules="rules" :label-width="labelWidth" ref="addForm" :label-position="labelPosition">
                <el-row>
                    <el-col :span="24" class="col">
                        <el-form-item label="标题" prop="title" >
                            <el-input  size="small" v-model="addForm.title"  auto-complete="off" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12" class="col">
                        <el-form-item label="发布时间" prop="start_time">
                            <el-date-picker
                                    v-model="addForm.start_time"
                                    type="datetime"
                                    size="small"
                                    @change="startChange"
                                    placeholder="选择日期时间" style="width:180px">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" class="col">
                        <el-form-item label="截止时间" prop="end_time">
                            <el-date-picker
                                    v-model="addForm.end_time"
                                    type="datetime"
                                    size="small"
                                    @change="endChange"
                                    placeholder="选择日期时间" style="width:180px">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <hr>
                <AddOption @add-options="addOptions"></AddOption>
                <el-row>
                    <el-col :span="24">
                        <el-table height="300" border :data="dataList">
                            <el-table-column label="序号"  width="80" type="index" align="center"></el-table-column>
                            <el-table-column label="题目类型" prop="problem_type" width="100" align="center">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.problem_type==1">选择题</span>
                                    <span v-if="scope.row.problem_type==2">填空题</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="问卷题目" prop="topic_name" show-overflow-tooltip  align="center"></el-table-column>
                            <el-table-column label="选项A" prop="option_a" show-overflow-tooltip  align="center"></el-table-column>
                            <el-table-column label="选项B" prop="option_b" show-overflow-tooltip  align="center"></el-table-column>
                            <el-table-column label="选项C" prop="option_c" show-overflow-tooltip  align="center" ></el-table-column>
                            <el-table-column label="选项D" prop="option_d" show-overflow-tooltip  align="center" ></el-table-column>
                            <el-table-column label="选项E" prop="option_e" show-overflow-tooltip  align="center" ></el-table-column>
                            <el-table-column label="操作"  align="center">
                                <template slot-scope="scope">
                                    <el-button size="small" type="danger" @click="deleteRow(scope.row)">删 除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <submit-button
                            :observer="dialogThis"
                            @click="beforeSubmit('addForm')" >
                        保 存
                    </submit-button>
            </div>
        </MyDialog>
    </div>
</template>

<script>
    import DialogForm from '../../mix/DialogForm';
    import APP_CONST from '../../config';
    import { quillRedefine } from 'vue-quill-editor-upload';
    import AddOption from './AddOption';
    // import Dialog from '../common/Dialog';
    export default {
        name: 'add-article',
        mixins:[DialogForm],
        components:{
            quillRedefine,
            AddOption,
        },
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'100px',
                addForm:{
                    title:"",
                    start_time:"",
                    end_time:"",
                    topic_name:"",
                    optionsData:[],
                },

                rules:{

                },

                editorOption:{},
                dataList:[],
                types:[
                    {id:1,name:'选择题'},
                    {id:2,name:'填空题'}
                ],
            }
        },

        methods:{
            onOpen(){
                this.imageUrl = '';
            },
            addOptions(v){
                this.dataList.push(v);
            },
            deleteRow(row){
                let index = this.dataList.indexOf(row);
                if( index > -1){
                    this.dataList.splice(index,1);
                }
            },
            startChange(v){
                this.addForm.start_time = v;
            },
            endChange(v){
                this.addForm.end_time = v;
            },
            beforeSubmit(name){
                this.addForm.optionsData = this.dataList;
                this.formSubmit(name);
            },
            realSubmit(model, name){
                let ajaxPromise =  this.getAjaxPromise(model);
                let vmthis = this;
                ajaxPromise.then(function(response){
                    if (response.data.status　==　0) {
                        vmthis.$message.error(response.data.msg ? response.data.msg : "操作失败" );
                        vmthis.$emit('submit-error', name);
                    } else {
                        vmthis.$message.success(response.data.msg);
                        vmthis.$refs[name].resetFields();
                        vmthis.$emit('submit-success', name);
                        vmthis.dataList = [];
                    }

                })
                    .catch(function(error){
                        if (error.response.status && error.response.status == 422) {
                            let x = error.response.data;
                            let message = [];
                            for (const key in x) {
                                if (x.hasOwnProperty(key)) {
                                    const element = x[key];
                                    message.push(element);
                                }
                            }
                            vmthis.$message.error(message.join());
                        } else {
                            console.log(error);
                            vmthis.$message.error('出错了');
                        }

                    })
                    .then(function(){
                        vmthis.$emit('submit-final', name);
                    });
            },
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            } ,

        },
        created(){
            this.editorOption = quillRedefine(APP_CONST.editor_option);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
    .avatar{
         max-width: 250px;
         max-height: 250px;
    }
    .col{
        height: 36px;
    }
</style>

