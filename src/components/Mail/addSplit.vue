<template>
    <div >
        <MyDialog title="拆分寄件" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="addForm"  :label-width="labelWidth" :rules="rules" ref="addForm" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="name" >
                            <el-input class="name-input" v-model="addForm.name"  auto-complete="off"  placeholder="请填写收件人姓名"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="手机号" prop="phone" >
                            <el-input class="name-input" v-model="addForm.phone"  auto-complete="off"  placeholder="请填写收件人手机号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="area_province_id" label="省份">
                            <el-select v-model.number="addForm.area_province_id"
                                       @change="provinceChange" placeholder="请选择省份"  clearable filterable>
                                <el-option v-for="province in provinces" :label="province.name"
                                           :value="province.id" :key="province.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="area_city_id" label="市">
                            <el-select v-model.number="addForm.area_city_id"
                                       @change="cityChange" placeholder="请选择城市"  clearable filterable>
                                <el-option v-for="city in cities" :label="city.name"
                                           :value="city.id" :key="city.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="area_district_id" label="区/县">
                            <el-select v-model.number="addForm.area_district_id"
                                       @change="districtChange" placeholder="区/县"  clearable filterable>
                                <el-option v-for="district in districts" :label="district.name"
                                           :value="district.id" :key="district.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="详细地址" prop="address" >
                            <el-input type="textarea"  auto-complete="off" v-model="addForm.address" placeholder="请填写详细地址(100字以内)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注"  prop="comment">
                            <el-input type="textarea"  auto-complete="off" v-model="addForm.comment" placeholder="请填写备注(100字以内)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                    :observer="dialogThis"
                    @click="beforeSubmit" >
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>

<script>

    import DialogForm from '../../mix/DialogForm';
    import EmployeeSelectProxy from '../../packages/EmployeeSelectProxy';
    import AreaSelect from '../../packages/AreaSelectProxy';

    import { mapGetters } from 'vuex';

    import { PHONE_REG } from "@/config/index";
    // import Dialog from '../common/Dialog';
    export default {
        name: 'addDialog',
        mixins:[DialogForm],
        props:{
            distributors:{
                type: Array,
                default:function(){
                    return [];
                }
            },
        },
        // components:{
        //     Dialog
        // },
        data () {
            return {
                dialogThis:this,
                labelPosition:"right",
                labelWidth:'80px',
                computedusers:[],
                provinces:[],
                cities:[],
                districts:[],
                addForm:{
                    name: "",
                    phone: "",
                    eng_name: "",
                    contact: "",
                    contact_phone: "",
                    fixed_telephone: "",
                    address: '',
                    comment:'',
                    area_province_id:'',
                    area_city_id:'',
                    area_district_id:'',
                    area_province_name:'',
                    area_city_name:'',
                    area_district_name:'',
                    type:2
                },

                rules:{
                    name:[
                        { required: true, message: '请填写收件人姓名', trigger: 'blur' }
                    ],
                    eng_name:[
                        {  required:true, type:'string', pattern:/^[a-zA-Z]{2}$/, required: true, message:'英文简称2位数', trigger: 'blur', },
                        
                    ],
                    fixed_telephone:[
                        { required: true,message:'请输入正确的电话',pattern: /^1[34578]\d{9}$/, trigger:'blur'}
                    ],
                    // contact:[
                    //     { required: true,message:'请输入联系人', type: 'string', trigger:'blur'}
                    // ],
                    contact_phone:[
                        {message:'请输入正确的电话',pattern: /^1[34578]\d{9}$/, trigger:'blur'}
                    ],
                    comment:[
                        {max: 100, message: '长度不能超过100个字符', trigger: 'blur'  }
                    ],
                }
            }
        },
        methods:{
            getAjaxPromise(model){
                return this.ajaxProxy.create(model);
            },
            loadUsers(data){
                this.computedusers = data.items;
            },
            onOpen(param){
                this.provinces = param.params.provinces;
            },
            onDepartChange(v){
                this.employeeSelect.setParam({department_id:v, role:'group-captain', group_candidate:1})
                this.employeeSelect.load();
                this.addForm.manager_id = "";
            },
            provinceChange(id){
                this.addForm.area_city_id = '';
                this.getAreaName(this.provinces,'area_province_name',id);
                let areaSelect = new AreaSelect({pid:id,business:'city'},this.getAreaCities,this);
                areaSelect.load();
            },
            getAreaCities(data){
                this.cities = data;
            },
            getAreaDistricts(data){
                this.districts = data;
            },
            cityChange(id){
                this.addForm.area_district_id = '';
                this.getAreaName(this.cities,'area_city_name',id);
                let areaSelect = new AreaSelect({pid:id,business:'district'},this.getAreaDistricts,this);
                areaSelect.load();
            },
            districtChange(id){
                this.getAreaName(this.districts,'area_district_name',id);
            },
            getAreaName(arr,field,id){
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i]['id'] == id) {
                        this.addForm[field] = arr[i]['name'];
                    }
                }
            },


            beforeSubmit(){
                this.addForm.eng_name.toUpperCase();
                this.formSubmit('addForm');
            }
        },
        created(){
            this.employeeSelect = new EmployeeSelectProxy({}, this.loadUsers, this);

        }
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>

