<template>
    <div >
        <MyDialog title="添加客户收货地址" :name="name" :width="width" :height="height" @before-open="onOpen">
            <el-table
             :data="addressData"
             border
             style="width: 100%">
                <el-table-column label="序号" type="index" width="65"></el-table-column>
                <el-table-column prop="name" label="收货人" width="100"></el-table-column>
                <el-table-column prop="phone" label="手机号" width="130"></el-table-column>
                <el-table-column prop="zip_code" label="地址邮编" width="110"></el-table-column>
                <el-table-column prop="area_province_name" label="省" width="80"></el-table-column>
                <el-table-column prop="area_city_name" label="城市" width="80"></el-table-column>
                <el-table-column prop="area_district_name" label="区/县" width="80"></el-table-column>
                <el-table-column prop="address" label="详细地址" width="180"></el-table-column>
                <el-table-column  label="操作" header-align="center" width="150" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="handleCurrentChange(scope.row)">编 辑</el-button>
                        <el-button size="small" type="danger" @click="deleteAddress(scope.row)">删 除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <br/>
                <el-button v-show="showAddButton" type="primary" size="small" @click="handleAdd"> 添加地址 </el-button> <span></span>
            <el-form v-show="contactFormvisible" ref="addDeliveryAddressForm" :rules="rules" :model="addDeliveryAddressForm"  :label-width="labelWidth"   :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="name" label="收货人姓名">
                            <el-input class="name-input" v-model="addDeliveryAddressForm.name" size="small" placeholder="收货人姓名" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="phone" label="收货人手机号">
                            <el-input class="name-input" v-model.number="addDeliveryAddressForm.phone" size="small" placeholder="收货人手机号" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="zip_code" label="收货邮编">
                            <el-input class="name-input" v-model.number="addDeliveryAddressForm.zip_code" size="small" placeholder="收货邮编" ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item prop="area_province_id" label="省份">
                            <el-select v-model.number="addDeliveryAddressForm.area_province_id"
                                    @change="provinceChange" placeholder="请选择省份" size="small" clearable filterable>
                                <el-option v-for="province in provinces" :label="province.name" 
                                    :value="province.id" :key="province.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="area_city_id" label="市">
                            <el-select v-model.number="addDeliveryAddressForm.area_city_id"
                                @change="cityChange" placeholder="请选择城市" size="small" clearable filterable>
                                <el-option v-for="city in cities" :label="city.name"
                                    :value="city.id" :key="city.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="area_district_id" label="区/县">
                            <el-select v-model.number="addDeliveryAddressForm.area_district_id"
                                @change="districtChange" placeholder="区/县" size="small" clearable filterable>
                                <el-option v-for="district in districts" :label="district.name"
                                    :value="district.id" :key="district.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item prop="address" label="详细地址">
                            <el-input type="textarea" class="name-input" v-model="addDeliveryAddressForm.address"  placeholder="详细收货地址" ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item prop="default_address" label="是否为默认地址">
                            <el-radio-group v-model="addDeliveryAddressForm.default_address">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-form-item >
                    <submit-button
                            @click="handleSubmit"
                            :observer="dialogThis">
                        {{ formstate }}
                    </submit-button>
                    <el-button @click="handleCancel">取 消</el-button>
                </el-form-item>
            </el-form>
        </MyDialog>
    </div>
</template>

<script>
//  import DialogForm from '../../mix/DialogForm';

import FormMix from '@/mix/Form';
import Dialog from '@/mix/Dialog';

import DataProxy from '../../packages/DataProxy';
import SelectProxy from  '../../packages/SelectProxy';
import AreaSelect from '../../packages/AreaSelectProxy';
import { PHONE_REG } from '@/config/index';

const maxLengthContacts = 20;
const FORMSTATE_ADD = '确 定';
const FORMSTATE_EDIT = '编 辑';
export default {
    name: 'addAddress',
    mixins:[FormMix,Dialog],
    props:{
        ajaxProxy:{
            // required:true,
            type: Object,
            default: null
        }
    },
    data(){
        return {
            dialogThis:null,
            labelPosition:"right",
            labelWidth:'120px',
            formstate:'',
            contactFormvisible:false,
            cus_id:'',
            id:'',
            addDeliveryAddressForm:{
                name:'',
                phone:'',
                address:'',
                default_address:1,
                zip_code:'',
                cus_id:'',
                area_province_name:'',
                area_city_name:'',
                area_district_name:'',
                id:'',
                area_province_id:'',
                area_city_id:'',
                area_district_id:'',
            },
            addressData:[],
            model:'',
            rules:{
                name:[
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min:1,   max: 10, message: '长度不能超过10个字符', trigger: 'blur'  }
                ],
                phone:[
                    { required: true, message:'请输入正确的手机号', pattern:PHONE_REG, trigger:'blur'},
                ],
                address:[
                    { required: true,message:'请输入收货地址',  trigger:'blur'},
                    {min:1, max: 100, message: '长度不能超过100个字符', trigger: 'blur'  }

                ],
                zip_code:[
                    { required: true,message:'请输入邮编且须数字', type: 'number', trigger:'blur'},
                    {min:1, max: 99999999, message: '长度不能超过7个字符', type: 'number',trigger: 'blur'  }

                ],
                area_province_id:[
                    { required: true, message:'请选择省份',type:'number', trigger:'blur'},
                ],
                area_city_id:[
                    { required: true, message:'请选择城市', type: 'number', trigger:'blur'},
                ],
                area_district_id:[
                    { required: true, message:'请选择区/县', type: 'number', trigger:'blur'},
                ],

            },
            dev:[],
            provinces:[],
            cities:[],
            districts:[],

        }
    },
    computed:{

        showAddButton(){
            return this.contactsLength != maxLengthContacts;
        },
        mainparam(){
            return JSON.stringify({cus_id: this.cus_id });
        }
    },
    methods:{
        handleSubmit(){
            this.addDeliveryAddressForm.cus_id=this.cus_id;
            this.formSubmit('addDeliveryAddressForm');
        },
        getAjaxProxy(){
            return  this.ajaxProxy;
        },
        getAjaxPromise(model){
            if(this.formstate == FORMSTATE_EDIT){
                return this.ajaxProxy.update(model.id, model);
            }else if(this.formstate == FORMSTATE_ADD){
                return this.ajaxProxy.create(model);
            }
        },
        onOpen(param){
            this.provinces = param.params.extra.provinces;
            this.cus_id = param.params.model.contacts[0].cus_id;
            this.id = param.params.model.id;
            this.getAddress(this.cus_id);
        },
        handleCurrentChange(row){   
            row.zip_code = parseInt(row.zip_code);
            this.showForm();
            this.formstate = FORMSTATE_EDIT;
            this.addDeliveryAddressForm = Object.assign({},row);
        },
        showForm(){
            this.contactFormvisible = true;
        },
        hideForm(){
            this.contactFormvisible = false;
            this.formstate='';
        },
        handleAdd(){
            this.formReset();
            this.showForm();
            this.formstate = FORMSTATE_ADD;
        },
        handleCancel(){
             this.formReset();
             this.hideForm();
             this.getAddress(this.cus_id);
        },
        formReset(){
            if(this.formstate == FORMSTATE_ADD){
                this.$refs.addDeliveryAddressForm.resetFields();
                this.addDeliveryAddressForm.id = '';
            }else if(this.formstate == FORMSTATE_EDIT){
                this.$refs.addDeliveryAddressForm.resetFields();
                this.addDeliveryAddressForm.id = this.id;
            }
            this.addDeliveryAddressForm.cus_id = this.cus_id;
            this.formstate='';
        },
        deleteAddress(row){
            this.cus_id=row.cus_id;
            this.handleDelete(row.id);
        },
        handleDelete(id){
            let vmthis = this;
            let ajaxProxy = this.getAjaxProxy();
            if(!ajaxProxy){
                return ;
            }
            this.$confirm('确定删除?', '警告',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                ajaxProxy.delete(id).then(function(response){
                    vmthis.$message.success("操作成功");
                    vmthis.getAddress(vmthis.cus_id);
                }).catch(function(error){
                    vmthis.$message.error("出错了")
                });
            });
        },

        getAddress(cus_id){
            let selectProxy = new SelectProxy(this.ajaxProxy.getUrl()+'?cus_id='+cus_id, this.getAddressData, this);
            selectProxy.load();
        },
        getAddressData(data){
            data.items.zip_code = parseInt(data.items.zip_code);
            this.addressData = data.items.concat();
        },
        getAreaCities(data){
            this.cities = data;
        },
        provinceChange(id){
            this.getAreaName(this.provinces,'area_province_name',id);
            // this.addDeliveryAddressForm.area_city_id = '';
            // this.addDeliveryAddressForm.area_district_id = '';
            let areaSelect = new AreaSelect({pid:id,business:'city'},this.getAreaCities,this);
            areaSelect.load();
        },
        getAreaDistricts(data){
            this.districts = data;
        },
        cityChange(id){
            this.getAreaName(this.cities,'area_city_name',id);
            // this.addDeliveryAddressForm.area_district_id = '';
            let areaSelect = new AreaSelect({pid:id,business:'district'},this.getAreaDistricts,this);
            areaSelect.load();
        },
        districtChange(id){
            this.getAreaName(this.districts,'area_district_name',id);
        },
        getAreaName(arr,field,id){
            for (let i = 0; i < arr.length; i++) {
                if (arr[i]['id'] == id) {
                    this.addDeliveryAddressForm[field] = arr[i]['name'];
                }
            }
        },
        submitSuccess(name){
            this.getAddress(this.cus_id);
            this.hideForm();
        }

    },
    created(){
        this.dialogThis = this;

        this.$on('submit-success', this.submitSuccess);
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
      
