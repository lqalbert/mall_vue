<template>
    <!--<el-tree :data="data" :props="defaultProps" ></el-tree>-->
    <div>

        <el-input v-model="type_name" placeholder="请输入要添加的商品类名" style="width: 300px"></el-input>
        <el-tree
                :data="data"
                :props="defaultProps"
                show-checkbox
                node-key="id"
                :expand-on-click-node="false"
                :render-content="renderContent">
        </el-tree>
    </div>

</template>

<script>
    import PageMix from '../../mix/Page';
    import DataProxy from '../../packages/DataProxy';
    import SearchTool from '../../mix/SearchTool';
    let id = 1000;
        export default {

            name: 'Category',
            pageTitle:"商品分类",
            mixins: [PageMix, SearchTool],
            data() {
                return {
                    type_name:'',
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
                append(store, data) {
                    store.append({ id: id++, label: this.type_name, children: [] }, data);
                    this.type_name='';
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
                        <el-button size="mini" type="info" on-click={ () => this.append(store, data) }>添加分类</el-button>
                        <el-button size="mini" type="danger" on-click={ () => this.remove(store, data) }>删除分类</el-button>
                    </span>
                    </span>);
                }
            }


    }
</script>

<style scoped>

</style>