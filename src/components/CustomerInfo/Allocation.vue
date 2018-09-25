<template>
    <!-- 给总经办用的  -->
        <MyDialog title="前台导入转让" :name="name" :width="width" :height="height" @before-open="onBeforeOpen">
            <el-row>
                <el-col :span="24">
                
                    <el-table :data="statResult" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column label="姓名" prop="user_name"></el-table-column>
                        <el-table-column label="部门"  prop="department_name"></el-table-column>
                        <el-table-column label="人数"  prop="cus_count"></el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <br>
            <el-row>
                <el-col :span="6">
                    每次最多300 名客户
                </el-col>
                <el-col :span="18"> 
                    <el-form ref="quitForm" :model="quitForm" >
                        <el-form-item label="转入部门" prop="department_id">
                            <el-select v-model="quitForm.department_id" >
                                <el-option v-for="department in allDepartments" :key="department.id" :label="department.name" :value="department.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>

            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        @click="formSubmit('quitForm')"
                        :observer="dialogThis">
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </template>
    
    <script>
        import DataTable from '@/mix/DataTable';
        import FormMix from '@/mix/Form';
        import DialogMix from '@/mix/Dialog';
        import CustomerAjax from '@/ajaxProxy/Customer';
        import { mapGetters } from 'vuex';
        export default {
            name: 'Allocation',
            mixins:[DataTable,FormMix,DialogMix],
            data () {
                return {
                    dialogThis: this,
                    statResult:[],
                    multipleSelection:[],
                    quitForm:{
                        department_id:"",
                        source_id:""
                    },
                    rules:{
                        department_id:[
                            { required: true},
                        ],
                        source_id:[
                            { required:true }
                        ]
                    }
                }
            },
            computed:{
                ...mapGetters({
                    'allDepartments':'getDepartments'
                }),
            },
            methods:{
                onBeforeOpen(){
                    // this.employeeSelect.load();

                    CustomerAjax.frontLedIn().then((response)=>{
                        this.statResult = response.data.items;
                    })
                },
                getAjaxPromise(model){
                    return CustomerAjax.transferFrontLedIn(model);
                },
                handleSelectionChange(val){
                    this.multipleSelection = val;
                    let re = [];
                    this.multipleSelection.forEach(element => {
                        re.push(element.user_id);
                    });
                    this.quitForm.source_id = re;
                }
            },
            created(){
                this.$store.dispatch('initDepartments');
            }
            
        }
    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
    </style>
      