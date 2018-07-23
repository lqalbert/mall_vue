<template>
    <div>
        <el-table :data="tableData"  style="width: 100%">
            <!-- 仿编辑订单 商品明细那里处理 -->
            <el-table-column   prop="province.name"   label="省份"  width="180">
                <template slot-scope="scope">
                    <span v-if="!scope.row.editState">{{ scope.row.province.name }}</span>
                    <span v-else><el-select size="small" v-model.number="scope.row.province_id">
                        <el-option v-for="item in provinces" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select></span>
                </template>
            </el-table-column>
            <el-table-column prop="fee"  label="费用"  width="180">
                <template slot-scope="scope">
                    <span v-if="!scope.row.editState">{{ scope.row.fee }}</span>
                    <span v-else>
                        <el-input size="small" v-model="scope.row.fee"></el-input>
                    </span>
                </template>
            </el-table-column>
            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="triggerEdit(scope.row)" v-if="!scope.row.editState">编辑</el-button>
                    <el-button size="small" @click="save(scope.row)" v-else>保存</el-button>
                    <el-button size="small" @click="deleteItem(scope.row.id)" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
      
<script>
    import FreightExtraProxy from '@/packages/FreightExtraProxy';
    import FreightExtraAjax from '@/ajaxProxy/FreightExtra';
    import { mapGetters } from 'vuex';
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
        computed:{
            
            ...mapGetters({
                'provinces':'province'
            }),
        },
        methods:{
            loadData(data){
                data.items.forEach(element => {
                    element.editState = false;
                });
                this.tableData = data.items;
            },
            triggerEdit(row){
                row.editState = true;
            },
            save(row){
                let model = {
                    province_id: row.province_id,
                    fee: row.fee
                }
                FreightExtraAjax.update(row.id, model).then((response)=>{
                    if (response.data.status == 0) {
                        this.$message.error(response.data.msg);
                    } else {
                        this.$message.success(response.data.msg);
                    }
                    row.editState = false;
                }).catch((response)=>{

                })
            },
            deleteItem(id){
                let vmthis = this;
                this.$confirm('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    FreightExtraAjax.delete(id).then((response)=>{
                        vmthis.freiprxoy.setParam({
                            fr_id: vmthis.currentRow.id,
                            with:['province']
                        }).load();
                    }).catch((response)=>{
                        vmthis.$message.error(response.data.msg);
                    })
                }).catch(() => {
                          
                });
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
      