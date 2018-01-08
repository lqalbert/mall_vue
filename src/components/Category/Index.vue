<template>
    <!--<el-tree :data="data" :props="defaultProps" ></el-tree>-->
    <div>

        <el-input v-model="type_name" placeholder="输入关键字进行过滤" style="width: 300px"></el-input>
        <el-tree
                class="filter-tree"
                :data="data"
                :props="defaultProps"
                show-checkbox
                node-key="id"
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                ref="tree2"
                :render-content="renderContent">
        </el-tree>
        <el-button type="primary" size="small" @click="editCont">添加分类</el-button>

        <addDialog :add-open="addDialog" @add-window-close="handleAddWindow" @aaa='bbb'/>
        <editDialog :edit-open="editDialog" @add-window-close="handleAddWindow" @add='addAll'/>

    </div>

</template>

<script>
    import addDialog from './addDialog';
    import editDialog from './editDialog';
    import PageMix from '../../mix/Page';
    import DataProxy from '../../packages/DataProxy';
    import SearchTool from '../../mix/SearchTool';
    let id = 1000;
    export default {
        watch: {
            type_name(val) {
                this.$refs.tree2.filter(val);
            }
        },
        name: 'Category',
        pageTitle:"商品分类",
        components: {
            addDialog,
            editDialog,
        },
        mixins: [PageMix, SearchTool],
        data() {
            return {
                addDialog:false,
                editDialog:false,

                dev:'',
                type_name:'',
                data1:'',
                data: [{
                    id:1,
                    label: '化妆品',
                    children: [
                        {
                            id:3,
                            label: '补水',
                            children: [{
                                id:5,
                                label: '补水王'
                            }]
                        } , {
                            id:4,
                            label: '除痘',
                            children: [{
                                id:6,
                                label: '除痘王'
                            }]
                        }
                    ]
                }, {
                    id:2,
                    label: '保健品',
                    children: [{
                        id:7,
                        label: '老年保健品',
                        children: [{
                            id:9,
                            label: '老白金'
                        }]
                    }, {
                        id:8,
                        label: '幼儿保健品',
                        children: [{
                            id:10,
                            label: '补钙片'
                        }]
                    }]
                }, ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
            }

        },

        methods: {
            bbb:function(v){
                this.append(this.dev,this.data1,v.name);
                //console.log(this.data1);
            },
            addAll:function(v){
                var data = this.data;
                var res = data[data.length-1];
                var newData=[];
                newData.id = res.id +1;
                newData.children=[];
                newData.label = v.name;
                this.data.push(newData);
                console.log(this.data);

                renderContent(h, { node, data, store }) {

            },
            test:function(store, data){
                this.dev=store;
                this.data1 = data;
                this.addDialog=true;
            },
            editCont:function(){
                this.editDialog=true;
            },
            app(store,data,v)
            {
                this.$prompt('请输入分类名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.append(store,data,value),
                        this.$message({
                            type: 'success',
                            message: '你的分类名称是: ' + value
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });

            },
            handleedit:function(){
                this.editDialog =true;

            },
            switchHandle:function(index,row){

            },
            openAddDialog:function(){

            },
            closeDialog:function(){

            },
            handleAddWindow(){
                this.addDialog = false;
                this.editDialog =false;
            },
            append(store, data,v) {
                store.append({ id: id++, label: v, children: [] }, data);
                this.type_name='';
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },

            remove(store, data) {
                store.remove(data);
            },

            renderContent(h, { node, data, store }) {

                return (
                    <span>
                    <span>
                    <span>{node.label}</span>
                </span>
                <span style="float: right; margin-right: 20px">
                    <el-button size="mini" type="info"   on-click={ () => this.test(store, data) }>添加分类</el-button>
                <el-button size="mini" type="danger" on-click={ () => this.remove(store, data) }>删除分类</el-button>
                </span>
                </span>);
            }


    }
</script>

<style scoped>

</style>
