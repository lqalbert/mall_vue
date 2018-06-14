<template>
    <div>
        <MyDialog title="修改地址" :name="name" :width="width" :height="height" @before-open="onBeforeOpen">
            <el-form :model="editForm" ref="editForm" :label-width="labelWidth"  :label-position="labelPosition">
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
                            <el-select v-model="editForm.area_province_id" placeholder="请选择" @change="proviceChange" clearable>
                                <el-option v-for="item in provices" :label="item.name" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="城市" prop="area_city_id" >
                            <el-select v-model="editForm.area_city_id" placeholder="请选择" @change="cityChange" clearable>
                                <el-option v-for="item in city" :label="item.name" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="区县" prop="area_district_id">
                            <el-select v-model="editForm.area_district_id" placeholder="请选择" @change="disChange" clearable>
                                    <el-option v-for="item in dis" :label="item.name" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="18">
                        <el-form-item label="地址" prop="address">
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
            // model.params;
            this.editForm.id = model.params.id;
            this.editForm.name = model.params.name;
            this.editForm.phone = model.params.phone;
            this.editForm.area_province_id = model.params.area_province_id;
            this.editForm.area_city_id = model.params.area_city_id;
            this.editForm.area_district_id = model.params.area_district_id;

            
            this.cityProxy.setParam({pid:this.editForm.area_province_id}).load();
            this.districProxy.setParam({pid:this.editForm.area_city_id}).load();
        },
        proviceChange(v){
            if (v != "" ) {
                this.cityProxy.setParam({pid:v}).load();
                let index = this.provices.findIndex((element)=>{
                    return element.id == v;
                })
                this.editForm.area_province_name = this.provices[index].name;
            } else {
                this.editForm.area_city_id = "";
                this.editForm.area_province_name = "";
                this.city = [];
            }
        },
        cityChange(v){
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
