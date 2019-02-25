<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" :rules="searchRules" ref="searchForm" :model="searchForm">
                    <!-- <span>基本信息</span> -->
                    <el-form-item label="配送中心:" prop="entrepot_id">
                        <el-select
                                v-model="searchForm.entrepot_id"
                                size="small"
                                placeholder="配送中心" class="name-input">
                            <el-option v-for="v in distributors" :label="v.name"
                                        :value="v.id" :key="v.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="盘点单号:" prop="check_num" >
                        <el-input size="small" v-model="dataForm.check_num" disabled class="name-input"
                         placeholder="自动生成"></el-input>
                    </el-form-item>
                    <el-form-item label="开单人员:" prop="check_name" >
                        {{dataForm.check_name}}
                    </el-form-item>
                    <br>
                    <el-form-item label="备注信息:" prop="remark" >
                        <el-input size="small" v-model="dataForm.remark" type="textarea" class="name-input-area"
                         placeholder="备注信息"></el-input>
                    </el-form-item>
                    <br>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="showSelectDialog" 
                            icon="plus">添加商品</el-button>
                        <!-- <el-button size="small" type="primary" @click="searchToolReset('searchForm')">重置</el-button> -->
                        <el-button size="small" type="primary" @click="batchImportGoods">批量导入</el-button>
                        <el-button size="small" type="warning" @click="clearTable">清空</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col>
                <el-table :data="AddTableData" border highlight-current-row
                    element-loading-text="请添加商品" style="width: 100%">

                    <el-table-column prop="sku_sn" label="商品编号" header-align="center">
                    </el-table-column>

                    <el-table-column prop="entrepot_name" label="配送中心" header-align="center">
                        <template slot-scope="scope">
                            {{setFieldEntrepot(scope.row)}}
                        </template>
                    </el-table-column>

                    <el-table-column prop="goods_name" label="商品名称" header-align="center">
                    </el-table-column>

                    <!-- <el-table-column prop="cate_type" label="商品类型" align="center">
                        <template slot-scope="scope">
                            {{setFieldType(scope.row)}}
                        </template>
                    </el-table-column>

                    <el-table-column prop="cate_kind" label="商品分类" align="center">
                        <template slot-scope="scope">
                            {{setFieldKind(scope.row)}}
                        </template>
                    </el-table-column> -->

                    <el-table-column prop="entrepot_count" label="库存数量" header-align="center">
                    </el-table-column>

                    <el-table-column label="操作" fixed="right" header-align="center" width="100">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="deleteAddress(scope.row)">
                                删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row style="margin-top:10px;">
            <el-col>
                <el-button size="small" type="info" @click="addData">保存提交</el-button>
            </el-col>
        </el-row>

        <select-add name="select-add-dialog" 
              :types="types" :distributors="distributors">
        </select-add>

        <!-- <add name="add-data-dialog" :ajax-proxy="ajaxProxy"
             @submit-success="handleReload">
        </add> -->
    </div>
</template>

<script>
    import PageMix from '../../mix/Page';
    import SearchTool from '../../mix/SearchTool';
    import InventoryGoodsSelectProxy from '../../packages/InventoryGoodsSelectProxy';
    import DistributionCenterProxy from '../../packages/DistributionCenterSelectProxy';
    import CategorySelectProxy from '../../packages/CategorySelectProxy';
    import StockCheckGoodsAjaxProxy from '../../ajaxProxy/StockCheckGoods';
    import { mapGetters } from 'vuex';
    import selectAdd from './SelectAdd';
    // import add from './Add';

    export default {
        name:'StockCheckGoods',
        pageTitle:"盘点开单",
        mixins: [PageMix, SearchTool],
        components:{
            selectAdd,
            // add,
        },
        data(){
            return {
                ajaxProxy:StockCheckGoodsAjaxProxy,
                searchForm: {
                    entrepot_id:'',
                    cate_type_id:'',
                    cate_kind_id:'',
                    sku_sn:'',
                    goods_name:'',
                },
                dataForm:{
                    check_name:'',
                    remark:'',
                    check_sn:'',
                    check_goods_data:[],
                    entrepot_id:'',
                    entrepot_name:'',
                },
                distributors:[],
                types:[],
                cate_kinds:[],
                AddTableData:[],
                flag:false,
                searchRules:{
                    entrepot_id:[
                        {required: true,type:'number',message: '请选择配送中心', trigger:'blur'}
                    ]
                }

            }
        },
        computed:{
            ...mapGetters([
                'getUser'
            ])
        },
        methods:{
            handleReload(){
                this.clearTable();
            },
            setFieldType(row){
                row['cate_type'] = row.category != null ?row.category.cate_type:'';
                row['cate_type_id'] = row.category != null ?row.category.cate_type_id:'';
                return row['cate_type'];  
            },
            setFieldKind(row){
                row['cate_kind'] = row.category != null ?row.category.cate_kind:'';
                row['cate_kind_id'] = row.category != null ?row.category.cate_kind_id:'';
                return row['cate_kind'];  
            },
            setFieldEntrepot(row){
                row['entrepot_name'] = row.entrepot != null ?row.entrepot.name:'';
                this.dataForm.entrepot_name = row['entrepot_name'];
                row['inventory_id'] = row.id;
                return row['entrepot_name'];
            },
            onSearchChange(param){
                // if(this.flag == false){
                    this.inventoryGoodsProxy.setParam({
                        sku_sn:param.sku_sn,
                        goods_name:param.goods_name,
                        entrepot_id:param.entrepot_id,
                        cate_type_id:param.cate_type_id,
                        cate_kind_id:param.cate_kind_id,
                    }).load();
                // }
            },
            getInventoryGoods(data){
                this.AddTableData = this.AddTableData.concat(data.items);
            },
            batchImportGoods(){
                // if(this.flag == false){
                    // this.$refs['searchForm'].resetFields();
                    this.$refs['searchForm'].validate((valid) => {
                        if (valid) {
                            this.AddTableData = [];
                            this.onSearchChange(this.searchForm);
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                    
                    // this.flag = true;
                // }
            },
            getDistributionCenter(data){
                this.distributors = data.items;
            },
            s(data){
                this.types = data.items;
            },
            deleteAddress(row){
                let index = this.AddTableData.indexOf(row);
                let vmThis = this;
                if( index > -1){
                    this.$confirm('确定删除?', '警告',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        this.AddTableData.splice(index,1);
                        // vmThis.$message.success("操作成功");
                    });
                }
            },
            clearTable(){
                this.AddTableData = [];
                // this.flag = false;
            },
            addData(){
                let vmThis= this;
                if(this.AddTableData.length>0){
                    this.dataForm.check_goods_data = this.AddTableData;
                    this.dataForm.entrepot_id = this.searchForm.entrepot_id;
                    // console.log(this.dataForm);
                    // this.$modal.show('add-data-dialog', {model:dataForm});
                    this.ajaxProxy.create(this.dataForm).then(function(response){
                        if (response.data.status　==　0) {
                            vmThis.$message.error(response.data.msg ? response.data.msg : "操作失败" );
                        } else {
                            vmThis.$message.success('操作成功');
                            vmThis.handleReload();
                        }
                    }).catch(function(error){
                        vmThis.$message.error('出错了');
                    });

                }else{
                    vmThis.$message.error('请先导入要盘点的商品');
                }
            },
            showSelectDialog(){
                let vmThis = this;
                this.$refs['searchForm'].validate((valid) => {
                    if (valid) {
                        this.$modal.show('select-add-dialog',{model:vmThis.searchForm.entrepot_id});
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            },

        },
        created(){
            this.$on('search-tool-change', this.onSearchChange);
            //获取配送中心数据
            let DistributionCenterSelect = new DistributionCenterProxy({}, this.getDistributionCenter, this);
            DistributionCenterSelect.load();
            //获取商品类型数据
            let CategorySelect = new CategorySelectProxy({}, this.s, this);
            CategorySelect.load();
            //获取仓库商品
            this.inventoryGoodsProxy = new InventoryGoodsSelectProxy({}, this.getInventoryGoods, this);
            this.dataForm.check_name = this.getUser.realname;
            this.dataForm.check_user_id = this.getUser.id;
        }
    }
</script>

<style scoped>
    .form-item-unique{
        width: 140px !important;
    }
    .name-input{
        max-width: 170px;
    }
    .name-input-area{
        max-width: 220px;
    }
</style>