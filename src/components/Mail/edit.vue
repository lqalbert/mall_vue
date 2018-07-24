<template>
    <div >
        <MyDialog title="编辑配送中心" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-form :model="editForm"  :label-width="labelWidth" :rules="rules" ref="editForm" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="name" >
                            <el-input class="name-input" v-model="editForm.name"  auto-complete="off"  placeholder="请填写收件人姓名"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="手机号" prop="phone" >
                            <el-input class="name-input" v-model="editForm.phone"  auto-complete="off"  placeholder="请填写收件人手机号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="express_id" label="快递">
                            <el-select v-model="editForm.express_id"  placeholder="请选择快递" @change="expressChange">
                                <el-option v-for="v in companys" :value="v.id" :key="v.id" :label="v.company_name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="快递单号" prop="express_sn" >
                            <el-input class="name-input" v-model="editForm.express_sn"  auto-complete="off"  placeholder="请选择"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="area_province_id" label="省份">
                            <el-select v-model.number="editForm.area_province_id"
                                       @change="provinceChange" placeholder="请选择省份"  clearable filterable>
                                <el-option v-for="province in provinces" :label="province.name"
                                           :value="province.id" :key="province.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="area_city_id" label="市">
                            <el-select v-model.number="editForm.area_city_id"
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
                            <el-select v-model.number="editForm.area_district_id"
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
                            <el-input type="textarea"  auto-complete="off" v-model="editForm.address" placeholder="请填写详细地址(100字以内)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注"  prop="remark">
                            <el-input type="textarea"  auto-complete="off" v-model="editForm.remark" placeholder="请填写备注(100字以内)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                    :observer="dialogThis"
                    @click="formSubmit('editForm')" >
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
        name: 'editDialog',
        mixins:[DialogForm],
        props:{
            companys:{
                type:Array
            }
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
                editForm:{
                    id:'',
                    name: "",
                    phone: "",
                    express_id: "",
                    express_name: "",
                    express_sn: "",
                    address: '',
                    remark:'',
                    area_province_id:'',
                    area_city_id:'',
                    area_district_id:'',
                    area_province_name:'',
                    area_city_name:'',
                    area_district_name:'',
                },
                model:'',
                provinces:[],
                cities:[],
                districts:[],
                rules:{
                    name:[
                        { required: true, message: '请输入配送中心名称', trigger: 'blur' }
                    ],
                    eng_name:[
                        {  required:true, type:'string', pattern:/^[a-zA-Z]{2}$/, required: true, message:'请输入英文简称', trigger: 'blur', },

                    ],
                    fixed_telephone:[
                        { required: true,message:'请输入正确的电话',pattern: /^1[34578]\d{9}$/, trigger:'blur'}
                    ],
                    contact:[
                        { required: true,message:'请输入联系人', type: 'string', trigger:'blur'}
                    ],
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
                return this.ajaxProxy.update(model.id, model);
            },
            expressChange(v){
                let i ='';
                for (i in this.companys){
                    if(this.companys[i]['id'] == v){
                        this.editForm.express_name =this.companys[i]['company_name']
                    }
                }
            },
            onOpen(param){
                this.model = param.params.model;
                this.provinces = param.params.provinces;
                this.provinceChange(this.model.area_province_id);
                this.cityChange(this.model.area_city_id);
            },
            provinceChange(id){
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
                        this.editForm[field] = arr[i]['name'];
                    }
                }
            },

        },
        watch:{
            model:function(val, oldVal){
                for (const key in this.editForm) {
                    if (this.editForm.hasOwnProperty(key)) {
                        this.editForm[key] = val[key]
                    }
                }

            }
        },
        created(){


        }
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>

