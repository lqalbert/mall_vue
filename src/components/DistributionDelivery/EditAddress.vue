<template>
    <div>
        <MyDialog title="修改地址" :name="name" :width="width" :height="height" @before-open="onBeforeOpen">
            <el-form :model="editForm" ref="editForm" :label-width="labelWidth" :rules="rules" :label-position="labelPosition">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="收件人姓名" prop="name" >
                            <el-input v-model="editForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="收件人手机" prop="phone">
                            <el-input v-model="editForm.phone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="省份" prop="area_province_id" >
                            <el-select v-model.number="editForm.area_province_id" placeholder="请选择" @change="proviceChange" clearable>
                                <el-option v-for="item in provices" :label="item.name" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="城市" prop="area_city_id" >
                            <el-select v-model.number="editForm.area_city_id" placeholder="请选择" @change="cityChange" clearable>
                                <el-option v-for="item in city" :label="item.name" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="区县" prop="area_district_id">
                            <el-select v-model.number="editForm.area_district_id" placeholder="请选择" @change="disChange" clearable>
                                    <el-option v-for="item in dis" :label="item.name" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="18">
                        <el-form-item label="详细地址" prop="address">
                            <el-input v-model="editForm.address" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                
            </el-form>
            <div slot="dialog-foot" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                 <submit-button
                    @click="formSubmit('editForm')"
                    :observer="dialogThis">
                    保 存
                </submit-button>
            </div>
        </MyDialog>
    </div>
</template>
<script>
import DialogForm from '@/mix/DialogForm';
import OrderAddressProxySelect from '@/ajaxProxy/OrderAddress';
import AreaSelect from '@/packages/AreaSelectProxy';
export default {
    name: 'add-delivery',
    mixins:[DialogForm],
    data(){
        return {
            dialogThis:this,
            labelPosition:"right",
            labelWidth:'120px',
            editForm:{
                id:'',
                name:"",
                phone:"",
                area_province_id:"",
                area_city_id:"",
                area_district_id:"",
                address:"",

                area_province_name:"",
                area_city_name:"",
                area_district_name:""
            },
            rules:{
                name:[
                    {required:true,message:'请填写收件人姓名', trigger: 'blur',},
                    { max: 10, message: '长度在10个字符以内', trigger: 'blur' }
                ],
                phone:[
                    {required:true,message:'请填写收件人手机号', trigger: 'blur'},
                    { max: 11, message: '长度在11个字符以内', trigger: 'blur' }
                ],
                area_province_id:[
                    {required:true,message:'请选择省份', trigger: 'blur',type:'number'},
                ],
                area_city_id:[
                    {required:true,message:'请选择城市', trigger: 'blur',type:'number'},
                ],
                area_district_id:[
                    {required:true,message:'请选择区县', trigger: 'blur',type:'number'},
                ],
                address:[
                    { required: true,message:'请输入收货地址',  trigger:'blur'},
                    { max: 100, message: '长度在100个字符以内', trigger: 'blur' }
                ],
            },
            provices:[],
            city:[],
            dis:[]
        }
    },
    methods:{
        
        getAjaxPromise(model){
            return OrderAddressProxySelect.update(model.id, model);
        },
        onBeforeOpen(model) {
            console.log(model);
            // model.params;
            this.editForm.id = model.params.address.id;
            this.editForm.name = model.params.address.name;
            this.editForm.phone = model.params.address.phone;
            this.editForm.address = model.params.address.address;
            this.editForm.area_province_id = model.params.address.area_province_id;
            this.editForm.area_city_id = model.params.address.area_city_id;
            this.editForm.area_district_id = model.params.address.area_district_id;
            this.editForm.area_province_name = model.params.address.area_province_name;
            this.editForm.area_city_name = model.params.address.area_city_name;
            this.editForm.area_district_name = model.params.address.area_district_name;
            this.editForm.assign_id = model.params.id;
            this.editForm.assign_sn = model.params.assign_sn;
            this.cityProxy.setParam({pid:this.editForm.area_province_id}).load();
            this.districProxy.setParam({pid:this.editForm.area_city_id}).load();
        },
        proviceChange(v){
            // this.city = [];
            // this.area_city_id = '0';
            if (v != "" ) {
                this.cityProxy.setParam({pid:v}).load();
                let index = this.provices.findIndex((element)=>{
                    return element.id == v;
                });
                console.log(this.provices[index].name);
                this.editForm.area_province_name = this.provices[index].name;
            } else {
                this.editForm.area_city_id = "";
                this.editForm.area_province_name = "";
                this.city = [];
            }
        },
        cityChange(v){
            this.area_district_id = '';
            if (v!="") {
                this.districProxy.setParam({pid:v}).load();
                let index = this.city.findIndex((element)=>{
                    return element.id == v;
                })
                this.editForm.area_city_name = this.city[index].name;
            } else {
                this.editForm.area_district_id = "";
                this.editForm.area_city_name = "";
                this.dis = [];
            }
        },
        disChange(v){
            if (v!="") {
                let index = this.dis.findIndex((element)=>{
                    return element.id == v;
                })
                this.editForm.area_district_name = this.dis[index].name;
            } else {
                this.editForm.area_district_name = "";
            }
        },
        loadProvince(data){
            this.provices = data;
        },
        loadCity(data){
            this.city = data;
        },
        loadDis(data){
            this.dis = data;
        }
    },
    created(){
        //下面这种方式可以考虑使用　工厂模式进行简化,其它页面也有这种类似的代码
        this.provinceProxy =  new AreaSelect({field:['id','name']}, this.loadProvince, this);
        this.cityProxy = new AreaSelect(null, this.loadCity, this);
        this.districProxy = new AreaSelect(null, this.loadDis, this);
        
        this.provinceProxy.load();

    },
    beforeDestroy(){
        this.provinceProxy =  null;
        this.cityProxy = null;
        this.districProxy = null;
    }
}
</script>
<style scoped>

</style>
