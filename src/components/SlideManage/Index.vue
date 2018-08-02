<template>
    <div class="hello">
        <el-row>
            <el-col :span="12">
                <el-form :inline="true"  ref="searchForm" :model="searchForm" class="search-bar">
                    <el-form-item prop="classify" style="width: 180px">
                        <el-select v-model.number="searchForm.classify" placeholder="请选择图片展示位置" >
                            <el-option v-for="v in classifys" :label="v.name" :value="v.id" :key="v.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button size="small" type="primary" icon="search" @click="searchToolChange('searchForm')" >查询</el-button>
                        <el-button size="small" @click="searchToolReset('searchForm')" type="primary">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>


        <el-row>
            <el-col>
                <TableProxy
                        :url="mainurl"
                        :param="mainparam"
                        :reload="dataTableReload"
                        @cellclick="rowCellClick"
                        :page-size="15">
                    <el-table-column label="序号" align="center"  type="index" width="65"></el-table-column>

                    <el-table-column label="展示位置"  prop="classify" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.classify==1">顶部展示</span>
                            <span v-else-if="scope.row.classify==2">重磅新品</span>
                            <span v-else-if="scope.row.classify==3">口碑之选</span>
                            <span v-else-if="scope.row.classify==4">中间展示</span>
                            <span v-else-if="scope.row.classify==5">图文结合</span>
                            <span v-else="scope.row.classify==6">底部展示</span>
                        </template>
                    </el-table-column>
                    <el-table-column   align="center" width="180" fixed="right"  label="操作"  >
                        <template slot-scope="scope">
                            <!--<el-button type="success" @click="openEdit(scope.row)"     size="small">编辑</el-button>-->
                            <el-button type="danger"  @click="handleDelete(scope.row.id)"   size="small" >删除</el-button>
                        </template>
                    </el-table-column>
                    <div slot="buttonbar">
                            <el-button size="small"  type="info" @click="$modal.show('choice')" >选择旧图</el-button>
                            <el-button size="small"  type="info" @click="$modal.show('add')" >上传新图</el-button>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>
        <br>
        <el-table :data="sliedPictureList"  border>
            <el-table-column label="序号" align="center"  type="index" width="65"></el-table-column>
            <el-table-column label="图片名称" align="center"   prop="name"></el-table-column>
            <el-table-column label="图片" align="center"  prop="url" >
                <template slot-scope="scope">
                    <img :src="scope.row.cover_url" width="50" height="50" alt="" />
                </template>
            </el-table-column>
            <el-table-column label="展示顺序" align="center"  prop="picture_sort" >
                <template slot-scope="scope">
                    <span v-if="scope.row.picture_sort">第 {{scope.row.picture_sort}} 位</span>
                    <span v-else>该图片还未排序</span>
                </template>
            </el-table-column>
            <el-table-column  label="操作" align="center" width="200">
                <template slot-scope="scope">
                    <el-button type="info" size="small" @click="order(scope.row)">改名和排序</el-button>
                    <el-button type="danger" size="small" @click="rowDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <el-row type="flex" justify="end">
            <el-col :span="12">
                <!--<slot name="buttonbar"></slot>-->
            </el-col>
            <el-col :span="12" >
                <div class="pull-right">
                    <el-pagination
                            :current-page="currentPage"
                            :page-size="pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="dataTotal"
                            @current-change="currentChange">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>

        <!-- / 修改公告 -->

        <Add name='add'
             :ajax-proxy="ajaxProxy"
             :classifys="classifys"
             :goods="goodsPictures"
             @submit-success="handleReload"/>

        <Choice name='choice'
             :ajax-proxy="ajaxProxy"
             :classifys="classifys"
             :goodsParentPictures="goodsPictures"
             @submit-success="handleReload"/>

        <Edit name='edit'
              :ajax-proxy="ajaxProxy"
              :classifys="classifys"
              @submit-success="handleReload"/>

        <Order name='order'
              :ajax-proxy="pictureAjaxProxy"
              :classifys="classifys"
               @order-ok="orderOk"
              @submit-success="handleReload"/>

    </div>

</template>

<script>

import Add from './Add';
import Edit from './Edit';
import Order from './Order';
import Choice from './Choice';


import DataTable from '../../mix/DataTable';
import PageMix from '../../mix/Page';
import config from '../../mix/Delete';
import SearchTool from '../../mix/SearchTool';
import SlideUploadPictureSelect from  '../../packages/SlideUploadPictureSelectProxy';
import GoodsSelectProxy from  '../../packages/GoodsSelectProxy';
import SlideManage from '../../ajaxProxy/SlideManage';
import SlideUploadPicture from '../../ajaxProxy/SlideUploadPicture';

export default {
    name: 'SlideManage',
    pageTitle:"前端图片管理",
    mixins: [PageMix,SearchTool,DataTable,config],
    components: {
        Add,
        Edit,
        Order,
        Choice,
    },

    data () {
        return {
            ajaxProxy:SlideManage,
            pictureAjaxProxy:SlideUploadPicture,
            mainurl:SlideManage.getUrl(),
            mainparam:"",
            pageSize:15,
            currentPage:1,
            dataTotal:0,
            dataLoad:false,
            sliedPictureList:[],
            goodsPictures:[],
            slideuploadpictureSelect:null,
            rowPicture:false,
            searchForm:{
                classify:"",
            },
            classifys :[
                {id:1,name:'顶部循环'},
                {id:2,name:'重磅新品'},
                {id:3,name:'口碑之选'},
                {id:4,name:'中间展示'},
                {id:5,name:'图文结合'},
                {id:6,name:'底部展示'},
            ],

        }
    },
    methods:{

        currentChange(v){
            this.slideuploadpictureSelect.setPage(v);
            this.slideuploadpictureSelect.load();
        },
        rowDelete(row){
            this.rowPicture = true;
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
                    vmthis.$emit('delete-success');
                    if(vmthis.rowPicture){
                        vmthis.orderOk();
                        vmthis.rowPicture = false;
                    }

                }).catch(function(error){
                    vmthis.$message.error("出错了")
                });
            });
        },
        order(row){
            this.$modal.show('order',{model:row});
        },
        orderOk(){
            this.slideuploadpictureSelect.setParam(
                {'classify':this.row_data.classify}
            ).load();
            },
        setSlideUploadPicture(){//获取幻灯片
            let slideuploadpictureselect = new SlideUploadPictureSelect({},this.getSlideUploadPicture,this);
            this.slideuploadpictureSelect = slideuploadpictureselect;
            this.slideuploadpictureSelect.setPageSize(this.pageSize);
        },
        getSlideUploadPicture(data){
            this.sliedPictureList = data.items;
            this.dataTotal = data.total;
        },
        rowCellClick(row){
            this.row_data = row;
            this.slideuploadpictureSelect.setParam(
                {'classify':this.row_data.classify}
            ).load();
        },
        getAjaxProxy(){
            if (this.rowPicture){
                return  this.pictureAjaxProxy;
            }else{
                return  this.ajaxProxy;
            }

        },
        onSearchChange(param){
            this.mainparam = JSON.stringify(param);
        },
        showAdd(){
            this.$modal.show('add');
        } ,
        openEdit(row){
            this.$modal.show('edit', {model:row});
        },
        getGoodsSelect(data){
            this.goodsPictures = data.items;
        },
    },
    created(){
        this.$on('search-tool-change', this.onSearchChange);
        this.onSearchChange(this.searchForm);
        this.setSlideUploadPicture();
//获取商品图片
        let GoodsSelect = new GoodsSelectProxy({},this.getGoodsSelect,this);
        this.getGoodsPictures = GoodsSelect;
        this.getGoodsPictures.load();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
