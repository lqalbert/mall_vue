<template>
    <div >
        <el-row :gutter="20">
            <el-col :span="6">
                <el-row>
                    <el-col :span="24">
                        <el-tree 
                            :data="topCates" 
                            :props="defaultProps" 
                            @node-click="handleNodeClick" 
                            :render-content="renderContent" 
                            node-key="id"
                            highlight-current>
                        </el-tree>
                    </el-col>
                </el-row>
                <br>
                <el-row>
                    <el-col :span="24">
                        <el-button type="primary" @click="showAdd">添加</el-button>
                    </el-col>
                </el-row>
                
            </el-col>
            <el-col :span="18">
                <TableProxy 
                    :url="mainurl" 
                    :param="mainparam"
                    :reload="dataTableReload" 
                    :page-size="15">
                    <el-table-column label="序号" align="center" type="index" width="65"> 
                    </el-table-column>
                    <el-table-column label="名称" prop="goods_name" header-align="center">
                    </el-table-column>
                    <el-table-column width="180" fixed="right"  label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="danger"  @click="deleteRelative(scope.row.id)" size="small" >删除关联</el-button>
                        </template>
                    </el-table-column>
                     <div slot="buttonbar">
                        <el-button size="small" icon="plus" type="info" @click="showGoodAdd" >添加</el-button>
                    </div>
                </TableProxy>
            </el-col>
        </el-row>

        <CateAdd name="front-cate-add" :ajax-proxy="frontCateAjax" @submit-success="handleReload"></CateAdd>
        <addSub name="front-subcate-add" :ajax-proxy="frontCateAjax" @submit-success="handleReload"></addSub>
        <addGoods name="front-add-goods" @submit-success="handleReload2"></addGoods>
        <Edit name="front-cate-edit" :ajax-proxy="frontCateAjax" @submit-success="handleReload"></Edit>
    </div>
</template>
<script>
    import PageMix from '@/mix/Page';
    import DataTable from '@/mix/DataTable';
    import FrontCategoryAjax from '@/ajaxProxy/CategoryFront';
    import GoodsDetailsAjax from '@/ajaxProxy/GoodsDetails';

    import CateAdd from './CateAdd';
    import addSub from './addSub';
    import addGoods from './addGoods';
    import Edit from './Edit';

    export default {
        name: 'FrontCategory',
        pageTitle:"前台商品分类",
        mixins: [PageMix, DataTable],
        components:{
            CateAdd,
            addSub,
            addGoods,
            Edit
        },
        data () {
            return {
                cates:[],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                mainparam:"",
                mainurl:GoodsDetailsAjax,
                frontCateAjax:FrontCategoryAjax,
                currentCate:null,
                currentPath:[],
            }
        },
        computed:{
            topCates(){
                let tmp = this.$store.getters.getFrontCatesByPid(0);
                this.cates = tmp;
                return tmp;
            }
        },
        watch:{
            currentCate(val, oldVal){
                this.setPath(val);
            }
        },
        methods:{
            handleNodeClick(data){
                this.currentCate = data;
                this.mainparam = JSON.stringify({front_id:data.id})
            },
            showEdit(row) {
                event.stopPropagation()
                this.$modal.show('front-cate-edit', row);
            },
            handleDelete(id){
                event.stopPropagation()
                FrontCategoryAjax.delete(id).then((response)=>{
                    if (response.data.status == 1) {
                        this.handleReload();
                    } else {
                        this.$message.error(response.data.msg);
                    }
                })
            },
            showAdd(){
                this.$modal.show('front-cate-add');
            },
            showGoodAdd(){
                if (this.currentCate) {
                    this.$modal.show('front-add-goods', {parent: this.currentCate, front_ids: this.currentPath});
                } else {
                    this.$message.error('请选中一个分类');
                }
                
            },
            addSub(row){
                event.stopPropagation()
                this.$modal.show('front-subcate-add', {parent: row});
            },
            
            handleReload(){
                // console.log('重加载');
                this.initCates();
            },
            initCates(){
                this.$store.dispatch('initAllFrontCates');
            },
            renderContent(h, { node, data, store }){
                return (
                    <span>
                    <span>
                    <span>{node.label}</span>
                   </span>
                <span style="float: right; margin-right: 20px">
                    <el-button size="mini" type="success" on-click={ () => this.showEdit(data) }>编 辑</el-button>
                    <el-button size="mini"  type="success" on-click={ () => this.addSub(data) }> 添加子类 </el-button>
                    <el-button size="mini" type="danger" on-click={ () => this.handleDelete(data.id) }>删除分类</el-button>
                </span>
                </span>);
            },
            handleReload2(){
                this.mainparam = JSON.stringify({front_id:this.currentCate.id, times: (new Date()).valueOf() });
            },
            deleteRelative(id){
                GoodsDetailsAjax.frontDetach(id).then((response)=>{
                    this.handleReload2();
                }).catch(()=>{

                })
            },
            setPath(val){
                let itemPath = [val];
                let vmthis = this;
                let re = this.$store.getters.getGrandFrontCates(val.pid);
                re = re.concat(itemPath);
                re.forEach((element)=>{
                    vmthis.currentPath.push(element.id);
                })
            }
        },
        created(){
            this.initCates();
            this.mainparam = JSON.stringify({front_id:-1});
        },
        mounted(){
            // this.cates = this.$store.getters.getFrontCatesByPid(0);
        }
    }
</script>
<style scoped>

</style>
  