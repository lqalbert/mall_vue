<template>
    <div>
        <el-table :data="tableData"  style="width: 100%">
            <!-- 仿编辑订单 商品明细那里处理 -->
            <el-table-column   prop="province.name"   label="省份"  width="180">
            </el-table-column>
            <el-table-column prop="fee"  label="费用"  width="180">
            </el-table-column>
            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <el-button size="small">编辑</el-button>
                    <el-button size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
      
<script>
    import FreightExtraProxy from '@/packages/FreightExtraProxy';
    export default {
        name: 'FreightExtra',
        props:{
            currentRow:{
                type: Object
            }
        },
        data () {
            return {
                tableData:[]
            }
        },
        methods:{
            loadData(data){
                this.tableData = data.items;
            }
        },
        watch:{
            currentRow(val,oldVal){
                if (val) {
                    this.freiprxoy.setParam({
                        fr_id: this.currentRow.id,
                        with:['province']
                    }).load();
                }
            }
        },
        created(){
            this.freiprxoy = new FreightExtraProxy({}, this.loadData, this);
        },
        beforeDestroy(){
            this.freiprxoy = null;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
      