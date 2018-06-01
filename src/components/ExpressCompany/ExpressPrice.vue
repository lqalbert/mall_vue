<template>
    <div>
        <MyDialog title="快递价格" :name="name" :width="width" :height="height" @before-open="onOpen"  @before-close="onBeforeClose">
            <el-form :model="addForm" ref="addForm" :label-width="labelWidth" :rules="rules" :label-position="labelPosition">
                <el-row>

                    <el-col :span="12">
                        <el-form-item prop="area_province_id" label="省份">
                            <el-select v-model.number="addForm.area_province_id"
                                       @change="provinceChange" placeholder="请选择省份" size="small" clearable filterable>
                                <el-option v-for="province in provinces" :label="province.name"
                                           :value="province.id" :key="province.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="area_city_id" label="市">
                            <el-select v-model.number="addForm.area_city_id"
                                       @change="cityChange" placeholder="请选择城市" size="small" clearable filterable>
                                <el-option v-for="city in cities" :label="city.name"
                                           :value="city.id" :key="city.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="area_district_id" label="区/县">
                            <el-select v-model.number="addForm.area_district_id"
                                       @change="districtChange" placeholder="区/县" size="small" clearable filterable>
                                <el-option v-for="district in districts" :label="district.name"
                                           :value="district.id" :key="district.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="时效" prop="time_limit">
                            <el-input class="name-input" v-model="addForm.time_limit" placeholder="请填时效（天）"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="首重" prop="first_weight" >
                            <el-input class="name-input" v-model="addForm.first_weight" placeholder="请填首重（kg）"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="首价" prop="first_price">
                            <el-input class="name-input" v-model="addForm.first_price" placeholder="请填首价"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="续重" prop="continued_weight" >
                            <el-input class="name-input" v-model="addForm.continued_weight" placeholder="请填续重（kg）"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="续价" prop="continued_price">
                            <el-input class="name-input" v-model="addForm.continued_price" placeholder="请填续价"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="起始日期" prop="start_time" >
                            <el-date-picker
                                    v-model="addForm.start_time"
                                    type="date"
                                    @change="timeChange1"
                                    placeholder="选择起始日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="结束日期" prop="end_time" >
                            <el-date-picker
                                    v-model="addForm.end_time"
                                    type="date"
                                    @change="timeChange2"
                                    placeholder="选择结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="12">
                        <el-form-item label="是否启用" prop="is_use" >
                            <el-radio-group v-model="addForm.is_use">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="14">
                        <el-form-item label="备注" prop="remark">
                            <el-input type="textarea" v-model="addForm.remark" placeholder="请填写备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <submit-button
                        :observer="dialogThis"
                        @click="formSubmit('addForm')">
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>
<script>
import DialogForm from '../../mix/DialogForm';
import FormMix from '../../mix/Form';
import APP_CONST from '../../config';
import DialogMix from '../../mix/Dialog';
import { mapGetters } from 'vuex';
import { PHONE_REG } from "@/config/index";

import AreaSelect from '../../packages/AreaSelectProxy';

export default {
    name: 'Add',
    mixins:[DialogForm,FormMix],
    components: {
        
    },
    props:{
        distributors:{
            type: Array,
            default:function(){
                return [];
            }
        },
    },
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'80px',
            addForm:{
                area_province_name:'',
                area_city_name:'',
                area_district_name:'',
                area_province_id:'',
                area_city_id:'',
                area_district_id:'',
                time_limit:'',
                first_weight:'',
                first_price:'',
                continued_weight:'',
                continued_price:'',
                start_time:'',
                end_time:'',
                is_use:'',
                remark:'',
                express_id:'',
                express_name:'',
            },
            provinces:[],
            cities:[],
            districts:[],
            rules:{
                // company_name:[
                //     { required: true, message: '请输入物流公司名称', trigger: 'blur' }
                // ],
                // eng:[
                //     { required: true, message:'必填,两个英文字母', pattern:/^[a-zA-Z]{2}$/, trigger:'blur'},
                // ]

            }
        }
    },
    methods:{
        onOpen(param){
            this.provinces = param.params.provinces;
            this.addForm.express_id=param.params.model['id'];
            this.addForm.express_name=param.params.model['company_name'];
        },
        getAjaxPromise(model){
            return this.ajaxProxy.create(model);
        },
        timeChange1(v){
            this.addForm.start_time=v;
        },
        timeChange2(v){
            this.addForm.end_time=v;
        },
        onBeforeClose(){
            this.$emit('onBeforeClose');
            // this.addForm.end_time=v;
        },
        entrepotChange(v){
            let i =''
            for (i in this.distributors){
                if(this.distributors[i]['id'] == v){
                    this.addForm.entrepot_name =this.distributors[i]['name']
                }
            }
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
                    this.addForm[field] = arr[i]['name'];
                }
            }
        },

        // formSubmit(){
        //     console.log(this.addForm)
        // }
    },

    created(){

    }

}
</script>
<style scoped>
    .name-input{
        max-width: 217px;
    }
</style>
