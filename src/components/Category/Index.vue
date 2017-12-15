<template>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
</template>

<script>

        export default {
            name: 'Category',
            pageTitle:"商品分类",
            data() {
                return {
                    data: [{
                        label: '化妆品',
                        children: [
                            {
                            label: '补水',
                            children: [{
                                label: '补水王'
                            }]
                            } , {
                            label: '除痘',
                            children: [{
                                label: '除痘王'
                            }]
                            }
                        ]
                    }, {
                        label: '保健品',
                        children: [{
                            label: '老年保健品',
                            children: [{
                                label: '老白金'
                            }]
                        }, {
                            label: '幼儿保健品',
                            children: [{
                                label: '补钙片'
                            }]
                        }]
                    }, ],
                    defaultProps: {
                        children: 'children',
                        label: 'label'
                    }
                };
            },
            methods: {
                handleNodeClick(data) {
                    // console.log(data);
                }
            }

    }
</script>

<style scoped>

</style>