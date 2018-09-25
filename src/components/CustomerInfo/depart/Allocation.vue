<template>
    <MyDialog title="前台导入转让" :name="name" :width="width" :height="height" @before-open="onBeforeOpen">
        <br>
        <el-row>
            <el-col :span="24">
                每次最多300 名客户, 现在有 {{ statResult }} 名客户待分配
            </el-col>
            <el-col :span="24"> 
                <el-form ref="quitForm" :model="quitForm" >
                    <el-select v-model="quitForm.group_id" @change="groupChange" clearable>
                        <el-option v-for="g in groups" :key="g.id" :label="g.name" :value="g.id"></el-option>
                    </el-select>
                </el-form>
            </el-col>
            <br>
            <el-col :span="24">
                    <el-row v-for="(item,index) in quitForm.allocated" :key="item.id" >
                        <el-col :span="6">
                            {{ item.realname }} 
                        </el-col>
                        <el-col :span="18"><el-input-number size="small" :min="0" :max="statResult" v-model="item.num"></el-input-number></el-col>
                    </el-row>
            </el-col>
        </el-row>

        <div slot="dialog-foot" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <submit-button
                    @click="beforeSubmit('quitForm')"
                    :observer="dialogThis">
                保 存
            </submit-button>
        </div>
    </MyDialog>
</template>
        
<script>
    import FormMix from '@/mix/Form';
    import DialogMix from '@/mix/Dialog';
    import CustomerAjax from '@/ajaxProxy/Customer';
    import EmployeeSelect from '@/packages/EmployeeSelectProxy';
    import { mapGetters } from 'vuex';
    export default {
        name: 'Allocation',
        mixins:[FormMix,DialogMix],
        data () {
            return {
                dialogThis: this,
                statResult:0,
                multipleSelection:[],
                quitForm:{
                    group_id:'',
                    department_id:'',
                    allocated:[]
                },
                groups:[]
            }
        },
        methods:{
            onBeforeOpen(){
                CustomerAjax.getAllow().then((response)=>{
                    this.statResult = response.data.total;
                });
                if(this.groups.length ==0 ) {
                    this.groups = this.$store.getters.getGroupsByDepartment(this.$store.getters.department_id);
                }
            },
            getAjaxPromise(model){
                return CustomerAjax.allocateToUser(model);
            },
            groupChange(group_id){
                if (group_id) {
                    this.employeeSelect.setParam({
                        group_id, group_id
                    }).load();
                }
            },
            loadDatas(data){
                data.items.forEach((element)=>{
                    element.num = 0;
                })
                this.quitForm.allocated = data.items;
            },
            beforeSubmit(formName){
                let sum = 0;
                this.quitForm.allocated.forEach((element)=>{
                    sum += element.num;
                });
                if (sum > this.statResult) {
                    this.$message.error('数量不正确');
                    return ;
                }
                this.formSubmit(formName);
            }
        },
        created(){
            this.$store.dispatch('initGroups', {
                department_id: this.$store.getters.department_id
            });
            this.quitForm.department_id = this.$store.getters.department_id;
            this.employeeSelect = new EmployeeSelect(
                    { field:['id', 'realname'], business:'select'},
                    this.loadDatas,
                    this );
        },
        // mounted(){
           
        // },
        beforeDestroy(){
            this.employeeSelect = null;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
          