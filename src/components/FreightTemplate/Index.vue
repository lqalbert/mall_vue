<template>
    <div >
        <el-row>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="small">
                <el-form-item prop="name" class="form-item-unique">
                    <el-input v-model="searchForm.name" size="small" placeholder="模板名"></el-input>
                </el-form-item>
                <el-form-item prop="entrepot_id" class="form-item-unique">
                    <el-select v-model="searchForm.entrepot_id" size="small" placeholder="配送中收">
                        <el-option v-for="entre in entrepots" :label="entre.name" :value="entre.id" :key="entre.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="searchToolChange('searchForm')">查询</el-button>
                    <el-button type="primary" size="small" @click="searchToolReset('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-row>

        <el-row>
            <el-col :span="24">
                <TableProxy :url="mainurl" :param="mainparam" :reload="dataTableReload" :bubble="bubble" :height="400" :page-size="20"   >
                    <el-table-column label="序号" align="center"  type="index" width="65"></el-table-column>
                    <el-table-column label="模板名" prop="name"  ></el-table-column>
                    <el-table-column label="快递公司" prop="express"  ></el-table-column>
                    <el-table-column label="统一邮费"   width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.is_unify == 1">{{ scope.row.unify_fee }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="支持包邮" width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.is_include == 0">不包</span>
                            <span v-else>满 {{ scope.row.stand_fee }} 包</span>
                            <span v-if="scope.row.stand_extra!='0.00'">额外{{ scope.row.stand_extra }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button type="success" @click.stop="openEdit(scope.row)"     size="small">编辑</el-button>
                            <el-button type="danger"  @click.stop="handleDelete(scope.row.id)"   size="small" >删除</el-button>
                        </template>
                    </el-table-column>
                    <div slot="buttonbar">
                        <el-button type="primary" size="small" @click="Add">添加模板</el-button>
                        <el-button type="primary" size="small" @click="AddDistrict">添加特殊地区</el-button>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>
        <!-- 弹窗 -->
        <Add :ajax-proxy="mainurl" name="add-freight"  @submit-success="handleReload"></Add>
        <Edit :ajax-proxy="mainurl" name="edit-freight" @submit-success="handleReload"></Edit>
        <District name="add-district"></District>
        <!-- 下半 -->
        <br>
        <SubDetail :current-row="currentRow"></SubDetail>
    </div>
</template>
  
<script>
    import PageMix from '@/mix/Page';
    import SearchTool from '@/mix/SearchTool';
    import DataTable from '@/mix/DataTable';
    import { mapGetters } from 'vuex';

    import SubDetail from './SubDetail';
    import Add from './Add';
    import Edit from './Edit';
    import District from './District';
    import FreightTemplateAjax from '@/ajaxProxy/FreightTemplate';

    export default {
        name: 'FerightTemplate',
        pageTitle:"运费模板",
        mixins:[PageMix,SearchTool,DataTable],
        components:{
            SubDetail,
            Add,
            Edit,
            District
        },
        data () {
            return {
                searchForm:{
                    name:"",
                    express:"",
                    entrepot_id:""
                },
                mainurl:FreightTemplateAjax,
                mainparam:"",
                bubble:null,
                currentRow:null
            }
        },
        methods:{
            onSearchChange(param){
                this.mainparam = JSON.stringify(param);
            },
            Add(){
                this.$modal.show('add-freight')
            },
            AddDistrict(){
                if (this.currentRow) {
                    this.$modal.show('add-district', {id:this.currentRow.id});
                } else {
                    this.$message.error('点击一行模板');
                }
            },
            onSelectRow(row){
                this.currentRow = row;
                console.log(this.currentRow);
            },
            openEdit(row){
                this.$modal.show('edit-freight', { model: row});
            },
            getAjaxProxy(){
                return FreightTemplateAjax;
            },
        },
        computed:{
            ...mapGetters({
                'entrepots':'getEntrepots'
            })
        },
        created(){
            this.$store.dispatch('initEntrepots');
            this.$store.dispatch('initProvince');

            this.$on('search-tool-change', this.onSearchChange);

            let bubble = {};
            bubble['row-click'] = this.onSelectRow;
            this.bubble = bubble;
        }
    }
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  </style>
  
